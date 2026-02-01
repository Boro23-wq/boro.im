import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";

type BlogPost = {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
    summary: string;
  };
};

type BlogPostsProps = {
  page: string;
};

export function BlogPosts({ page }: BlogPostsProps) {
  let allBlogs: BlogPost[] = getBlogPosts();

  const isHomePage = page === "home";

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const blogsToDisplay = isHomePage ? sortedBlogs.slice(0, 5) : sortedBlogs;

  const groupBlogsByYear = (blogs: BlogPost[]): [string, BlogPost[]][] => {
    const grouped = blogs.reduce((acc: { [key: string]: BlogPost[] }, blog) => {
      const year = new Date(blog.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    }, {});

    return Object.entries(grouped).sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA));
  };

  const groupedBlogs = groupBlogsByYear(blogsToDisplay);

  return isHomePage ? (
    <div>
      {blogsToDisplay.map((post) => (
        <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/blog/${post.slug}`}>
          <div className="w-full flex flex-col items-center md:flex-row space-x-0 md:space-x-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {groupedBlogs.map(([year, posts]) => (
        <div key={year}>
          <div className="bg-neutral-100/75 dark:bg-neutral-800/40 px-4 py-2 mb-1">
            <span className="text-xs tracking-wide font-semibold text-neutral-900 dark:text-neutral-400">
              {year}
            </span>
          </div>
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800/60 last:border-0"
            >
              <span className="w-12 text-xs text-neutral-400 font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-neutral-700 dark:text-neutral-300">
                {post.metadata.title}
              </span>
              <time className="text-sm text-neutral-500 font-mono">
                {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </time>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
