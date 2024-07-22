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

      <section className="mt-8 md:mt-10 leading-relaxed">
        <BlogPosts page="blog" />
      </section>
    </>
  );
}
