import { NextRequest } from "next/server";
import { decryptSession, SESSION_COOKIE } from "@/lib/session";

export async function requireAdminSession(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const session = cookie ? await decryptSession(cookie) : null;
  if (!session) return null;

  const allowed = process.env.ADMIN_GITHUB_USERNAME;
  if (!allowed || session.login.toLowerCase() !== allowed.toLowerCase()) return null;

  return session;
}
