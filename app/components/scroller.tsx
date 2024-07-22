import React from "react";
import Link from "next/link";
import { ArrowRightTopIcon } from "./icons";

const Scroller = () => {
  return (
    <div className="scroller relative">
      <div className="flex overflow-x-auto space-x-8">
        {/* articles */}
        <div className="flex-shrink-0 w-40 sm:w-48">
          <h1 className="text-sm mb-4 text-neutral-500">articles</h1>
          <div className="mb-8 content">
            <div className="flex items-center mb-2">
              <Link
                href="https://overreacted.io/before-you-memo/"
                className="mr-1 text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
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
            <div className="flex items-center mb-2">
              <Link
                href="https://kentcdodds.com/blog/inversion-of-control"
                className="mr-1  text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
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
        <div className="flex-shrink-0 w-40 sm:w-48">
          <h1 className="text-sm mb-4 text-neutral-500">writing</h1>
          <div className="mb-8 content">
            <div className="mb-2">
              <Link
                href="/blog/netflix-architecture"
                className=" text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
              >
                Netflix streaming
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              System behind the tremendous scale.
            </p>
          </div>
          <div className="mb-8 content">
            <div className="mb-2">
              <Link
                href="/blog/module-federation"
                className="text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
              >
                Module federation
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              Architecture using reusable components.
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <Link
                href="/blog"
                className="text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
              >
                All blogs
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              More insights on design and code.
            </p>
          </div>
        </div>

        {/* projects */}
        <div className="flex-shrink-0 w-40 sm:w-48">
          <h1 className="text-sm mb-4 text-neutral-500">projects</h1>
          <div className="mb-8 content">
            <div className="flex items-center mb-2">
              <Link
                href="/project/carely"
                className=" text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
              >
                Carely
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              Care co-ordination and management portal.
            </p>
          </div>
          <div className="mb-8 content">
            <div className="flex items-center mb-2">
              <Link
                href="/project/ui-ux-design"
                className=" text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
              >
                UI/UX Design
              </Link>
            </div>
            <p className="text-wrap md:text-wrap text-md font-normal text-neutral-500">
              My interaction with web design and what I've built.
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <Link
                href="/project"
                className=" text-md text-wrap md:text-wrap font-normal underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
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
