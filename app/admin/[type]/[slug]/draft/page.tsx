import { notFound } from "next/navigation";
import { PostForm } from "@/app/components/admin/post-form";
import { getDraft } from "@/lib/drafts";

export const metadata = {
  title: "Draft",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

export default async function DraftPage({ params }: Props) {
  const { type, slug } = await params;
  if (type !== "blog" && type !== "project") {
    notFound();
  }

  const draft = await getDraft(type, slug);
  if (!draft) {
    notFound();
  }

  return (
    <section>
      <PostForm
        type={type}
        mode={draft.isNew ? "new" : "edit"}
        fromDraft
        initial={{
          slug: draft.slug,
          title: draft.title,
          publishedAt: draft.publishedAt,
          summary: draft.summary,
          tags: draft.tags,
          image: draft.image,
          content: draft.content,
        }}
      />
    </section>
  );
}
