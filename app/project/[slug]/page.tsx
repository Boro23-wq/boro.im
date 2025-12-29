import React from "react";
import { notFound } from "next/navigation";
import { BookOpenTextIcon } from "lucide-react";
import Link from "next/link";
import { formatDate, getProjects } from "../utils";
import { baseUrl } from "@/app/sitemap";
import { estimateReadingTime } from "@/lib/reading-time";
import { Sidebar } from "@/app/components/sidebar";
import { CopyLink } from "@/app/components/copy-link";

import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import ClientMDXWrapper from "@/app/components/mdx-wrapper";
import { CustomMDX } from "@/app/components/mdx";

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  defaultColor: "dark",
  cssVariablePrefix: "--shiki-",
  defaultLang: {
    block: "js",
    inline: "plaintext",
  },
};

export async function generateStaticParams() {
  let projects = getProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  let project = getProjects().find((project) => project.slug === params.slug);
  if (!project) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project.metadata;
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
      url: `${baseUrl}/blog/${project.slug}`,
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

export default async function Project({ params }) {
  let projects = getProjects();

  let projectIndex = projects.findIndex(
    (project) => project.slug === params.slug
  );

  let project = projects[projectIndex];
  let previousProject = projects[projectIndex - 1] || null;
  let nextProject = projects[projectIndex + 1] || null;

  if (!project) {
    notFound();
  }

  // Serialize the raw MDX content before rendering
  const mdxSource = await serialize(project.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, options]],
    },
  });

  const readingTime = estimateReadingTime(project.content);
  const {
    headings,
    metadata: { tags },
  } = project;

  let allTags = tags && JSON.parse(tags);

  return (
    <>
      <Sidebar slug={project.slug} headings={headings} path={`/project-post`} />

      <section className="dark:text-[#d4d4d4]">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Project",
              headline: project.metadata.title,
              datePublished: project.metadata.publishedAt,
              dateModified: project.metadata.publishedAt,
              description: project.metadata.summary,
              image: project.metadata.image
                ? `${baseUrl}${project.metadata.image}`
                : `/og?title=${encodeURIComponent(project.metadata.title)}`,
              url: `${baseUrl}/blog/${project.slug}`,
              author: {
                "@type": "Sintu Boro",
                name: "My Portfolio",
              },
            }),
          }}
        />
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {project.metadata.title}
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-4 sm:gap-0 justify-between items-left sm:items-center mt-2 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {formatDate(project.metadata.publishedAt)}
                </p>
              </div>
              <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                <BookOpenTextIcon className="w-4 h-4" />
                <p className="ml-2">{readingTime}</p>
              </div>
            </div>

            <div className="flex">
              <CopyLink w="8" h="8" />
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex mt-6 mb-8">
              {allTags.map((tag, index) => (
                <p
                  key={index}
                  className="text-xs mr-2 px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                >
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>

        <hr className="h-0.5 mx-auto !mt-0 mb-4 bg-neutral-200 border-0 md:my-6 dark:bg-neutral-700" />

        <article className="prose">
          <CustomMDX source={mdxSource} />
        </article>

        <hr className="w-60 h-0.5 mx-auto my-4 bg-neutral-200 border-0 rounded-lg md:my-10 dark:bg-neutral-700" />

        <div className="flex justify-between mt-8">
          {previousProject ? (
            <div className="flex items-end">
              <Link
                aria-label={`Go to next page: ${previousProject.metadata.title}`}
                className="flex flex-col justify-between text-md"
                href={`/project/${previousProject?.slug}`}
              >
                <span className="transition-all text-sm mb-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300">
                  Previous
                </span>
                <span className="w-36 sm:w-60 md:w-75 truncate transition-all text-md text-neutral-700 dark:text-neutral-300">
                  {previousProject.metadata.title}
                </span>
              </Link>
            </div>
          ) : (
            <span></span>
          )}
          {nextProject ? (
            <div className="flex items-end">
              <Link
                aria-label={`Go to next page: ${nextProject.metadata.title}`}
                className="flex flex-col justify-between text-md"
                href={`/project/${nextProject?.slug}`}
              >
                <span className="text-right transition-all text-sm mb-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-300">
                  Next
                </span>
                <span className="text-right w-36 sm:w-60 md:w-75 truncate transition-all text-md text-neutral-700 dark:text-neutral-300">
                  {nextProject.metadata.title}
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
