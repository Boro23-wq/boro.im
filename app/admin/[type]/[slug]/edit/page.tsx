import { notFound } from "next/navigation";
import { PostForm } from "@/app/components/admin/post-form";
import { getBlogPosts } from "@/app/blog/utils";
import { getProjects } from "@/app/project/utils";

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

  return (
    <section>
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
