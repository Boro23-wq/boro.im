import Link from "next/link";
import { Redis } from "@upstash/redis";
import { getBlogPosts, formatDate } from "../blog/utils";

async function getRecentPostsWithViews() {
  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 3);

  let views: number[] = posts.map(() => 0);

  try {
    const redis = Redis.fromEnv();
    const keys = posts.map((post) => ["pageviews", "projects", post.slug].join(":"));
    const results = await redis.mget<number[]>(...keys);
    views = results.map((v) => v ?? 0);
  } catch {
    // Redis env not configured (e.g. local dev) — render without view counts.
  }

  return posts.map((post, i) => ({ post, views: views[i] }));
}

export default async function RecentWriting() {
  const items = await getRecentPostsWithViews();

  return (
    <div className="space-y-1">
      {items.map(({ post, views }) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex items-center px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 motion-safe:hover:translate-x-0.5 motion-safe:transition-transform border-b border-neutral-200/45 dark:border-neutral-800/75 last:border-0"
        >
          <span className="flex-1 text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors truncate">
            {post.metadata.title}
          </span>
          <span className="text-xs font-mono text-neutral-400 ml-4 shrink-0">
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)} views
          </span>
          <time className="text-sm text-neutral-500 font-mono ml-4 shrink-0">
            {formatDate(post.metadata.publishedAt)}
          </time>
        </Link>
      ))}
    </div>
  );
}
