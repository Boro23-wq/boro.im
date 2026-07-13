import { NextRequest, NextResponse } from "next/server";
import { list, del } from "@vercel/blob";
import { requireAdminSession } from "@/lib/admin-auth";
import { getFileSha, putFile, deleteFile, textToBase64 } from "@/lib/github";
import { deleteDraft } from "@/lib/drafts";

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
  image?: string;
};

function mdxPath(type: PostType, slug: string) {
  return type === "blog" ? `app/blog/posts/${slug}.mdx` : `app/project/projects/${slug}.mdx`;
}

function blobDir(type: PostType, slug: string) {
  return type === "blog" ? `blog/${slug}` : `projects/${slug}`;
}

function buildFrontmatter(payload: SavePayload) {
  const lines = [`title: ${payload.title}`];
  if (payload.type === "project") {
    lines.push(`summary: ${payload.summary}`);
    lines.push(`publishedAt: "${payload.publishedAt}"`);
  } else {
    lines.push(`publishedAt: "${payload.publishedAt}"`);
    lines.push(`summary: ${payload.summary}`);
  }
  if (payload.image) {
    lines.push(`image: ${payload.image}`);
  }
  if (payload.type === "project" && payload.tags && payload.tags.length > 0) {
    lines.push(`tags: [${payload.tags.map((t) => `"${t}"`).join(", ")}]`);
  }
  return `---\n${lines.join("\n")}\n---\n\n${payload.content.trim()}\n`;
}

async function cleanupOrphanBlobs(type: PostType, slug: string, keep: (url: string) => boolean) {
  try {
    const { blobs } = await list({ prefix: `${blobDir(type, slug)}/` });
    await Promise.all(blobs.filter((b) => !keep(b.url)).map((b) => del(b.url)));
  } catch {
    // Cleanup is best-effort; never block a publish on it.
  }
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

  const frontmatterText = buildFrontmatter(payload);

  await putFile(
    session.accessToken,
    path,
    textToBase64(frontmatterText),
    `${isNew ? "Add" : "Update"} ${type} post: ${payload.title}`,
    existingSha ?? undefined,
  );

  await cleanupOrphanBlobs(
    type,
    slug,
    (url) => payload.content.includes(url) || url === payload.image,
  );
  await deleteDraft(type, slug).catch(() => {});

  return NextResponse.json({ ok: true, slug });
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug }: { type: PostType; slug: string } = await req.json();

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const path = mdxPath(type, slug);
  const sha = await getFileSha(session.accessToken, path);

  if (!sha) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await deleteFile(session.accessToken, path, `Delete ${type} post: ${slug}`, sha);

  await cleanupOrphanBlobs(type, slug, () => false);
  await deleteDraft(type, slug).catch(() => {});

  return NextResponse.json({ ok: true });
}
