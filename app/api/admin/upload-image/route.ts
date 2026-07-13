import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdminSession } from "@/lib/admin-auth";

export const runtime = "edge";

type PostType = "blog" | "project";

const ALLOWED_EXTS = new Set(["png", "jpg", "jpeg", "webp", "gif", "avif", "svg"]);

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const type = form.get("type") as PostType;
  const slug = (form.get("slug") as string) ?? "";
  const kind = form.get("kind") === "cover" ? "cover" : "img";

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (type !== "blog" && type !== "project") {
    return NextResponse.json({ error: "Invalid post type" }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Enter a valid slug before uploading images" },
      { status: 400 },
    );
  }

  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_EXTS.has(ext)) {
    return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
  }

  const dir = type === "blog" ? `blog/${slug}` : `projects/${slug}`;
  const pathname = `${dir}/${kind}-${Date.now()}.${ext}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || undefined,
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
