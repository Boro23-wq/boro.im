import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getFileSha, putFile, deleteFile, textToBase64 } from "@/lib/github";

export const runtime = "edge";

type PostType = "blog" | "project";

type SavePayload = {
  type: PostType;
  slug: string;
  isNew: boolean;
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  content: string;
  coverImage?: { dataUrl: string } | null;
  existingImagePath?: string;
};

function mdxPath(type: PostType, slug: string) {
  return type === "blog" ? `app/blog/posts/${slug}.mdx` : `app/project/projects/${slug}.mdx`;
}

function coverImagePath(type: PostType, slug: string, ext: string) {
  return type === "blog"
    ? { repoPath: `public/blog/${slug}/cover.${ext}`, publicPath: `/blog/${slug}/cover.${ext}` }
    : {
        repoPath: `public/projects/cover/${slug}.${ext}`,
        publicPath: `/projects/cover/${slug}.${ext}`,
      };
}

function buildFrontmatter(payload: SavePayload, imagePublicPath?: string) {
  const lines = [`title: ${payload.title}`];
  if (payload.type === "project") {
    lines.push(`summary: ${payload.summary}`);
    lines.push(`publishedAt: "${payload.publishedAt}"`);
  } else {
    lines.push(`publishedAt: "${payload.publishedAt}"`);
    lines.push(`summary: ${payload.summary}`);
  }
  if (imagePublicPath) {
    lines.push(`image: ${imagePublicPath}`);
  }
  if (payload.type === "project" && payload.tags && payload.tags.length > 0) {
    lines.push(`tags: [${payload.tags.map((t) => `"${t}"`).join(", ")}]`);
  }
  return `---\n${lines.join("\n")}\n---\n\n${payload.content.trim()}\n`;
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload: SavePayload = await req.json();
  const { type, slug, isNew } = payload;

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Slug must be lowercase letters, numbers, and hyphens" }, {
      status: 400,
    });
  }

  const path = mdxPath(type, slug);
  const existingSha = await getFileSha(session.accessToken, path);

  if (isNew && existingSha) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }
  if (!isNew && !existingSha) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let imagePublicPath: string | undefined = payload.existingImagePath;

  if (payload.coverImage) {
    const match = /^data:image\/(\w+);base64,(.+)$/.exec(payload.coverImage.dataUrl);
    if (!match) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }
    const [, mime, base64] = match;
    const ext = mime === "jpeg" ? "jpg" : mime;
    const { repoPath, publicPath } = coverImagePath(type, slug, ext);
    const imageSha = await getFileSha(session.accessToken, repoPath);
    await putFile(
      session.accessToken,
      repoPath,
      base64,
      `${isNew ? "Add" : "Update"} cover image for ${slug}`,
      imageSha ?? undefined,
    );
    imagePublicPath = publicPath;
  }

  const frontmatterText = buildFrontmatter(payload, imagePublicPath);

  await putFile(
    session.accessToken,
    path,
    textToBase64(frontmatterText),
    `${isNew ? "Add" : "Update"} ${type} post: ${payload.title}`,
    existingSha ?? undefined,
  );

  return NextResponse.json({ ok: true, slug });
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug }: { type: PostType; slug: string } = await req.json();
  const path = mdxPath(type, slug);
  const sha = await getFileSha(session.accessToken, path);

  if (!sha) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await deleteFile(session.accessToken, path, `Delete ${type} post: ${slug}`, sha);

  return NextResponse.json({ ok: true });
}
