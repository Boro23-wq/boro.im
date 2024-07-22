import { notFound } from "next/navigation";
import { BookOpenTextIcon, Eye } from "lucide-react";
import Link from "next/link";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { baseUrl } from "@/app/sitemap";
import { estimateReadingTime } from "@/lib/reading-time";
import { Sidebar } from "@/app/components/sidebar";
import { CustomMDX } from "@/app/components/mdx";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { CopyLink } from "@/app/components/copy-link";

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export const revalidate = 60;

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: Props) {
  let posts = getBlogPosts();
  const views =
    (await redis.get<number>(
      ["pageviews", "projects", params.slug].join(":")
    )) ?? 0;

  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  let postIndex = sortedPosts.findIndex((post) => post.slug === params.slug);

  if (postIndex === -1) {
    notFound();
  }

  let post = posts[postIndex];
  let previousPost = posts[postIndex - 1] || null;
  let nextPost = posts[postIndex + 1] || null;

  const readingTime = estimateReadingTime(post.content);

  const { headings } = post;

  return (
    <>
      <Sidebar slug={post.slug} headings={headings} path={`/blog-post`} />

      <section className="dark:text-[#d4d4d4]">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Sintu Boro",
                name: "Blog | Sintu Boro",
              },
            }),
          }}
        />
        <ReportView slug={params.slug} />
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex  gap-4 sm:gap-0 flex-wrap justify-between items-center mt-2 mb-6 text-sm">
          <div className="flex flex-wrap gap-4">
            <p className="flex text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>
            <div className="flex items-center text-neutral-600 dark:text-neutral-400">
              <BookOpenTextIcon className="w-4 h-4" />
              <p className="ml-2">{readingTime}</p>
            </div>
            <span
              title="View counter for this page"
              className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400"
            >
              <Eye className="w-5 h-5" />
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views
              )}
            </span>
          </div>
          <div className="flex">
            <CopyLink w="8" h="8" />
          </div>
        </div>

        <hr className="h-0.5 mx-auto my-4 bg-neutral-200 border-0 md:my-6 dark:bg-neutral-700" />

        <article className="mb-10 text-base prose">
          <CustomMDX source={post.content} />
        </article>

        <hr className="w-60 h-0.5 mx-auto my-4 bg-neutral-200 border-0 rounded-lg md:my-10 dark:bg-neutral-700" />

        <div className="flex justify-between mt-8">
          {previousPost ? (
            <div className="flex items-end">
              <Link
                aria-label={`Go to next page: ${previousPost.metadata.title}`}
                className="flex flex-col justify-between text-md"
                href={`/blog/${previousPost?.slug}`}
              >
                <span className="transition-all text-sm mb-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300">
                  Previous
                </span>
                <span className="w-36 sm:w-60 md:w-75 truncate transition-all text-md text-neutral-700 dark:text-neutral-300">
                  {previousPost.metadata.title}
                </span>
              </Link>
            </div>
          ) : (
            <span></span>
          )}
          {nextPost ? (
            <div className="flex items-end">
              <Link
                aria-label={`Go to next page: ${nextPost.metadata.title}`}
                className="flex flex-col justify-between text-md"
                href={`/blog/${nextPost?.slug}`}
              >
                <span className="text-right transition-all text-sm mb-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300">
                  Next
                </span>
                <span className="text-right w-36 sm:w-60 md:w-75 truncate transition-all text-md text-neutral-700 dark:text-neutral-300">
                  {nextPost.metadata.title}
                </span>
              </Link>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </section>
    </>
  );
}
