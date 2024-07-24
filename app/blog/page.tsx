import BlogHeaderWSearch from "../components/blog-header";
import { BlogPosts } from "../components/posts";
import { Sidebar } from "../components/sidebar";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <>
      <Sidebar path="/blog" />

      <BlogHeaderWSearch />

      <section className="mb-8 mt-4 leading-relaxed">
        <BlogPosts page="blog" />
      </section>
    </>
  );
}
