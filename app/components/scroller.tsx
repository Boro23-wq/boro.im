import React from "react";
import Link from "next/link";
import { ArrowRightTopIcon } from "./icons";
import { getBlogPosts } from "../blog/utils";
import { getProjects } from "../project/utils";

function byRecent(a: { metadata: { publishedAt: string } }, b: { metadata: { publishedAt: string } }) {
  return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
}

const Scroller = () => {
  const recentPosts = getBlogPosts().sort(byRecent).slice(0, 2);
  const recentProjects = getProjects().sort(byRecent).slice(0, 2);

  return (
    <div className="scroller relative">
      <div className="flex overflow-x-auto space-x-8">
        {/* articles */}
        <div className="flex-shrink-0 w-56 sm:w-48">
          <h1 className="text-sm mb-4 text-neutral-500">articles</h1>
          <div className="mb-8 content">
            <div className="flex items-center mb-0.5">
              <Link
                href="https://overreacted.io/before-you-memo/"
                className="mr-1 text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-500 transition-all"
                passHref
                target="_blank"
              >
                Before You memo()
              </Link>
              <ArrowRightTopIcon />
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              Rendering optimizations that come naturally.
            </p>
          </div>
          <div className="mb-8 content">
            <div className="flex items-center mb-0.5">
              <Link
                href="https://kentcdodds.com/blog/inversion-of-control"
                className="mr-1  text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-500 transition-all"
                passHref
                target="_blank"
              >
                Inversion of control
              </Link>
              <ArrowRightTopIcon />
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              Make code less nightmare to use and maintain.
            </p>
          </div>
        </div>

        {/* blogs */}
        <div className="flex-shrink-0 w-56 sm:w-48">
          <h1 className="text-sm mb-4 text-neutral-500">recent writings</h1>
          {recentPosts.map((post) => (
            <div key={post.slug} className="mb-8 content">
              <div className="mb-0.5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden max-h-7 text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-500 transition-all"
                >
                  {post.metadata.highlightTitle ?? post.metadata.title}
                </Link>
              </div>
              <p className="overflow-hidden max-h-14 text-wrap md:text-wrap text-md font-normal text-neutral-500">
                {post.metadata.highlightDescription ?? post.metadata.summary}
              </p>
            </div>
          ))}
          <div>
            <div className="flex items-center mb-0.5">
              <Link
                href="/blog"
                className="text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-500 transition-all"
              >
                All writings
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              More insights on design and code.
            </p>
          </div>
        </div>

        {/* projects */}
        <div className="flex-shrink-0 w-56 sm:w-48">
          <h1 className="text-sm mb-4 text-neutral-500">projects</h1>
          {recentProjects.map((project) => (
            <div key={project.slug} className="mb-8 content">
              <div className="mb-0.5">
                <Link
                  href={`/project/${project.slug}`}
                  className="block overflow-hidden max-h-7 text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-500 transition-all"
                >
                  {project.metadata.highlightTitle ?? project.metadata.title}
                </Link>
              </div>
              <p className="overflow-hidden max-h-14 text-wrap md:text-wrap text-md font-normal text-neutral-500">
                {project.metadata.highlightDescription ?? project.metadata.summary}
              </p>
            </div>
          ))}
          <div>
            <div className="flex items-center mb-0.5">
              <Link
                href="/project"
                className=" text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-500 transition-all"
              >
                All projects
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              More design and development projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroller;
