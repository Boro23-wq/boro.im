import { NextRequest, NextResponse } from "next/server";
import { decryptSession, SESSION_COOKIE } from "./lib/session";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const session = cookie ? await decryptSession(cookie) : null;

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}
