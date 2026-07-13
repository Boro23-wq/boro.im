import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { requireAdminSession } from "@/lib/admin-auth";

export const runtime = "edge";

export async function DELETE(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url }: { url: string } = await req.json();

  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }
  if (!hostname.endsWith(".public.blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Not a blob storage URL" }, { status: 400 });
  }

  await del(url);

  return NextResponse.json({ ok: true });
}
