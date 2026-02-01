import { BlogPostsWithSearch } from "../components/posts-with-search";
import { Sidebar } from "../components/sidebar";
import { getBlogPosts } from "../blog/utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const allBlogs = getBlogPosts();

  return (
    <>
      <Sidebar path="/blog" />

      <section className="mb-8 mt-4 leading-7">
        <BlogPostsWithSearch posts={allBlogs} />
      </section>
    </>
  );
}
