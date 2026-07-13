import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { saveDraft, deleteDraft, type Draft, type PostType } from "@/lib/drafts";

export const runtime = "edge";

function validSlug(slug: unknown): slug is string {
  return typeof slug === "string" && /^[a-z0-9-]+$/.test(slug);
}

export async function PUT(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { draft, previousSlug }: { draft: Draft; previousSlug?: string } = await req.json();

  if (!draft || (draft.type !== "blog" && draft.type !== "project") || !validSlug(draft.slug)) {
    return NextResponse.json({ error: "Invalid draft" }, { status: 400 });
  }

  await saveDraft({ ...draft, savedAt: new Date().toISOString() });

  if (previousSlug && validSlug(previousSlug) && previousSlug !== draft.slug) {
    await deleteDraft(draft.type, previousSlug);
  }

  return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, slug }: { type: PostType; slug: string } = await req.json();
  if ((type !== "blog" && type !== "project") || !validSlug(slug)) {
    return NextResponse.json({ error: "Invalid draft" }, { status: 400 });
  }

  await deleteDraft(type, slug);

  return NextResponse.json({ ok: true });
}
