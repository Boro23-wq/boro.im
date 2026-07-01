import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { putFile } from "@/lib/github";

export const runtime = "edge";

type PostType = "blog" | "project";

function imageDir(type: PostType, slug: string) {
  return type === "blog" ? `public/blog/${slug}` : `public/projects/${slug}`;
}

function publicDir(type: PostType, slug: string) {
  return type === "blog" ? `/blog/${slug}` : `/projects/${slug}`;
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug, dataUrl }: { type: PostType; slug: string; dataUrl: string } =
    await req.json();

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Enter a valid slug before uploading images" },
      { status: 400 },
    );
  }

  const match = /^data:image\/(\w+);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
  }
  const [, mime, base64] = match;
  const ext = mime === "jpeg" ? "jpg" : mime;
  const filename = `image-${Date.now()}.${ext}`;

  const repoPath = `${imageDir(type, slug)}/${filename}`;
  const publicPath = `${publicDir(type, slug)}/${filename}`;

  await putFile(session.accessToken, repoPath, base64, `Add image for ${slug}: ${filename}`);

  const snippet = `<Image\n  width="800"\n  height="450"\n  src="${publicPath}"\n  alt=""\n/>`;

  return NextResponse.json({ publicPath, snippet });
}
