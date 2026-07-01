import { NextRequest, NextResponse } from "next/server";
import { encryptSession, OAUTH_STATE_COOKIE, SESSION_COOKIE } from "@/lib/session";
import { getGitHubUser } from "@/lib/github";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/admin/login?error=state", req.url));
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("GitHub OAuth is not configured", { status: 500 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: new URL("/api/auth/callback", req.url).toString(),
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken: string | undefined = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/admin/login?error=token", req.url));
  }

  const user = await getGitHubUser(accessToken);
  const allowedUsername = process.env.ADMIN_GITHUB_USERNAME;

  if (!user || !allowedUsername || user.login.toLowerCase() !== allowedUsername.toLowerCase()) {
    const res = NextResponse.redirect(new URL("/admin/login?error=forbidden", req.url));
    res.cookies.delete(OAUTH_STATE_COOKIE);
    return res;
  }

  const session = await encryptSession({
    login: user.login,
    accessToken,
    issuedAt: Date.now(),
  });

  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.cookies.delete(OAUTH_STATE_COOKIE);
  return res;
}
