import { notFound } from "next/navigation";
import { BookOpenTextIcon } from "lucide-react";
import Link from "next/link";

import { formatDate } from "../../utils";
import { baseUrl } from "@/app/sitemap";
import { estimateReadingTime } from "@/lib/reading-time";
import { Sidebar } from "@/app/components/sidebar";
import { CopyLink } from "@/app/components/copy-link";
import { CustomMDX } from "@/app/components/mdx";
import { getBitePosts } from "../utils";

type Params = { slug: string };
type Props = { params: Promise<Params> };

export async function generateStaticParams() {
  const posts = getBitePosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBitePosts().find((p) => p.slug === slug);
  if (!post) return;

  const { title, publishedAt: publishedTime, summary: description } = post.metadata;

  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/project/bite/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BitePost({ params }: Props) {
  const { slug } = await params;

  const posts = getBitePosts();
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  if (!post) notFound();

  const previousPost = posts[postIndex - 1] || null;
  const nextPost = posts[postIndex + 1] || null;

  const readingTime = estimateReadingTime(post.content);

  return (
    <>
      <Sidebar slug={post.slug} headings={post.headings} path="/project/bite" />

      <section className="dark:text-[#d4d4d4]">
        {/* Breadcrumb */}
        <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <Link
            href="/project"
            className="text-xs uppercase font-semibold tracking-wide hover:text-neutral-700 dark:hover:text-neutral-400"
          >
            Project
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/project/bite"
            className="text-xs uppercase font-semibold tracking-wide hover:text-neutral-700 dark:hover:text-neutral-400"
          >
            Bite
          </Link>
          <span className="mx-2">/</span>
          <span className="text-xs uppercase font-semibold tracking-wide hover:text-neutral-700 dark:hover:text-neutral-400">
            {post.metadata.title}
          </span>
        </div>

        <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>

        <div className="flex flex-wrap gap-4 sm:gap-0 justify-between items-left sm:items-center mt-2 text-sm">
          <div className="flex items-center gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt)}
            </p>

            <div className="flex items-center text-neutral-600 dark:text-neutral-400">
              <BookOpenTextIcon className="w-4 h-4" />
              <p className="ml-2">{readingTime}</p>
            </div>
          </div>

          <div className="flex">
            <CopyLink w="8" h="8" />
          </div>
        </div>

        <hr className="h-0.5 mx-auto  mb-4 bg-neutral-200 border-0 md:my-6 dark:bg-neutral-700" />

        <article className="prose leading-7">
          <CustomMDX source={post.content} />
        </article>

        <hr className="w-60 h-0.5 mx-auto my-4 bg-neutral-200 border-sm md:my-10 dark:bg-neutral-700" />

        <div className="flex justify-between mt-8">
          {previousPost ? (
            <div className="flex items-end">
              <Link
                aria-label={`Go to previous page: ${previousPost.metadata.title}`}
                className="flex flex-col justify-between text-md"
                href={`/project/${previousPost.slug}`}
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
            <span />
          )}

          {nextPost ? (
            <div className="flex items-end">
              <Link
                aria-label={`Go to next page: ${nextPost.metadata.title}`}
                className="flex flex-col justify-between text-md"
                href={`/project/${nextPost.slug}`}
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
            <span />
          )}
        </div>
      </section>
    </>
  );
}
