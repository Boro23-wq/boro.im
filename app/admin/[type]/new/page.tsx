import { notFound } from "next/navigation";
import { PostForm } from "@/app/components/admin/post-form";

export const metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ type: string }>;
};

export default async function NewPostPage({ params }: Props) {
  const { type } = await params;
  if (type !== "blog" && type !== "project") {
    notFound();
  }

  return (
    <section>
      <PostForm type={type} mode="new" />
    </section>
  );
}
