import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "@/app/components/admin/post-form";
import { getBlogPosts } from "@/app/blog/utils";
import { getProjects } from "@/app/project/utils";
import { getDraft } from "@/lib/drafts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { type, slug } = await params;
  if (type !== "blog" && type !== "project") {
    notFound();
  }

  const posts = type === "blog" ? getBlogPosts() : getProjects();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const metadata = post.metadata as { tags?: string; image?: string } & typeof post.metadata;
  const draft = await getDraft(type, slug).catch(() => null);

  return (
    <section>
      {draft && (
        <p className="mb-6 text-sm text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 rounded-sm px-3 py-2">
          This post has unsaved draft changes.{" "}
          <Link href={`/admin/${type}/${slug}/draft`} className="underline underline-offset-2">
            Resume draft
          </Link>
        </p>
      )}
      <PostForm
        type={type}
        mode="edit"
        initial={{
          slug: post.slug,
          title: post.metadata.title,
          publishedAt: post.metadata.publishedAt,
          summary: post.metadata.summary,
          tags: metadata.tags,
          image: metadata.image,
          content: post.content,
        }}
      />
    </section>
  );
}
