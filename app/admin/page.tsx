import Link from "next/link";
import { getBlogPosts, formatDate } from "@/app/blog/utils";
import { getProjects } from "@/app/project/utils";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function PostList({
  type,
  posts,
}: {
  type: "blog" | "project";
  posts: { slug: string; metadata: { title: string; publishedAt: string } }[];
}) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
      {sorted.length === 0 && (
        <p className="p-4 text-sm text-neutral-500 dark:text-neutral-400">No posts yet.</p>
      )}
      {sorted.map((post) => (
        <Link
          key={post.slug}
          href={`/admin/${type}/${post.slug}/edit`}
          className="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <span className="text-sm text-neutral-800 dark:text-neutral-200">
            {post.metadata.title}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0 ml-4">
            {formatDate(post.metadata.publishedAt)}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const blogPosts = getBlogPosts();
  const projects = getProjects();

  return (
    <section className="leading-7 dark:text-[#d4d4d4]">
      <div className="flex items-center justify-between mb-8">
        <p className="newsreader-400-tall font-medium text-xl tracking-tight">/ admin</p>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="newsreader-400-tall text-lg">Blog</h4>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors rounded-sm text-sm font-medium"
          >
            New post
          </Link>
        </div>
        <PostList type="blog" posts={blogPosts} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="newsreader-400-tall text-lg">Projects</h4>
          <Link
            href="/admin/project/new"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors rounded-sm text-sm font-medium"
          >
            New project
          </Link>
        </div>
        <PostList type="project" posts={projects} />
      </div>
    </section>
  );
}
