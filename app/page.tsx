import { Suspense } from "react";
import Link from "next/link";
import Scroller from "./components/scroller";
import RecentWriting from "./components/recent-writing";
import { SocialPills } from "./components/social-pills";
import { CommandMenuHint } from "./components/command-menu-hint";
import { Reveal } from "./components/motion";
import { getBlogPosts } from "./blog/utils";
import { getProjects } from "./project/utils";

function getStats() {
  const posts = getBlogPosts();
  const projects = getProjects();
  const oldestYear = posts.reduce((min, post) => {
    const year = new Date(post.metadata.publishedAt).getFullYear();
    return year < min ? year : min;
  }, new Date().getFullYear());
  const years = Math.max(1, new Date().getFullYear() - oldestYear);

  return { postCount: posts.length, projectCount: projects.length, years };
}

export default function Page() {
  const { postCount, projectCount, years } = getStats();

  return (
    <div>
      <section data-animation-controller="true" className="leading-7 dark:text-[#d4d4d4]">
        {/* intro */}
        <div
          style={{ "--stagger": 1 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mb-4"
        >
          <h4 className="font-medium text-lg mb-8 tracking-normal">Sintu Boro</h4>
        </div>

        {/* bio */}
        <p
          style={{ "--stagger": 2 } as React.CSSProperties}
          data-animate
          className="animate-enter mb-2"
        >
          <span className="newsreader-400">Developing experiences.</span> I take complicated
          business processes and turn them into simple, clean interfaces that are easy to work
          with.
        </p>

        {/* stats */}
        <p
          style={{ "--stagger": 3 } as React.CSSProperties}
          data-animate
          className="animate-enter mb-8 text-xs font-mono text-neutral-400"
        >
          {postCount} posts · {projectCount} projects · {years}
          {years === 1 ? " yr" : " yrs"} building for the web
        </p>

        {/* now */}
        <div
          style={{ "--stagger": 4 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-10"
        >
          <h4 className="newsreader-400 mb-2">Now.</h4>
        </div>

        <p
          style={{ "--stagger": 5 } as React.CSSProperties}
          data-animate
          className="animate-enter mb-8"
        >
          Lately, I&apos;ve been building a customer portal so Wave&apos;s customers can keep an
          eye on hub activity more easily. If you&apos;re curious, you can check out more of what
          I&apos;ve built, past and present,{" "}
          <Link
            className="link-underline decoration-1 decoration-neutral-200 dark:decoration-neutral-600"
            href="/work"
          >
            <span className="newsreader-400">here</span>
          </Link>
          .
        </p>

        {/* main blog/project highlight */}
        <div
          style={{ "--stagger": 6 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-14"
        >
          <h4 className="newsreader-400">Highlight.</h4>
        </div>

        {/* scroll */}
        <div
          style={{ "--stagger": 7 } as React.CSSProperties}
          data-animate
          className="my-4 animate-enter"
        >
          <Scroller />
        </div>

        {/* experience */}
        <div
          style={{ "--stagger": 8 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-10"
        >
          <h4 className="newsreader-400 mb-2">Current experience.</h4>
        </div>

        <div
          style={{ "--stagger": 9 } as React.CSSProperties}
          data-animate
          className="animate-enter"
        >
          <div className="pt-4 mb-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              These days, I&apos;m working with the{" "}
              <Link
                className="link-underline decoration-1 decoration-neutral-200 dark:decoration-neutral-600"
                href="https://wavedds.com/"
                target="_blank"
              >
                Wave DDS
              </Link>{" "}
              team on software that helps keep swimmers safe. I spend my time shaping interfaces
              that feel fast, intuitive, and easy for anyone to use, while also leading refactors
              and helping the team standardize how we build things.
            </p>
          </div>
        </div>

        {/* recent writing */}
        <Reveal>
          <div className="mt-14 flex items-center">
            <h4 className="newsreader-400">Recent writing.</h4>
          </div>

          <div className="my-4">
            <Suspense fallback={null}>
              <RecentWriting />
            </Suspense>
          </div>
        </Reveal>

        {/* connect */}
        <Reveal>
          <div className="flex items-center mt-14">
            <h4 className="newsreader-400">Connect with me.</h4>
          </div>

          <div className="my-6">
            <SocialPills />
          </div>

          <p className="mt-10 text-xs font-mono text-neutral-400">
            Press{" "}
            <CommandMenuHint className="inline-flex mx-1 items-center gap-x-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />{" "}
            to explore
          </p>
        </Reveal>
      </section>
    </div>
  );
}
