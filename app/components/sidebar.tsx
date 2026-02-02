"use client";

import { MoveUpLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  slug?: string;
  headings?: string[];
  path: string;
}

const navItems = {
  "/blog": {
    name: "home",
    url: "/",
  },
  "/blog-post": {
    name: "blogs",
    url: "/blog",
    pattern: /^\/blog\/.+$/,
  },
  "/project": {
    name: "home",
    url: "/",
  },
  "/project-post": {
    name: "projects",
    url: "/project",
    pattern: /^\/project\/.+$/,
  },
  "/project/bite": {
    name: "bite",
    url: "/project/bite",
    pattern: /^\/project\/bite\/.+$/,
  },
  "/work": {
    name: "home",
    url: "/",
  },
};

function formatHeadingToId(heading: string): string {
  let formatted = heading.toLowerCase();
  formatted = formatted.replace(/[^\w\s-]/g, ""); // Remove special characters
  formatted = formatted.replace(/\s+/g, "-"); // Replace spaces with dashes
  formatted = formatted.replace(/-+$/g, ""); // Remove trailing dashes
  return formatted;
}

export function Sidebar({ slug, headings, path }: SidebarProps) {
  const pathname = usePathname();
  const navItem = navItems[path];
  const [isScrollable, setIsScrollable] = useState(false);
  const [showBlurTop, setShowBlurTop] = useState(false);
  const [showBlurBottom, setShowBlurBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setIsScrollable(container.scrollHeight > container.clientHeight);
        setShowBlurTop(container.scrollTop > 0);
        setShowBlurBottom(container.scrollTop + container.clientHeight < container.scrollHeight);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setShowBlurTop(container.scrollTop > 0);
        setShowBlurBottom(container.scrollTop + container.clientHeight < container.scrollHeight);
      }
    };

    checkScrollable(); // Check on mount
    window.addEventListener("resize", checkScrollable); // Check on resize
    containerRef.current?.addEventListener("scroll", handleScroll); // Check on scroll

    return () => {
      window.removeEventListener("resize", checkScrollable);
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const isExactMatch = pathname === path;
  const isPatternMatch = navItem.pattern && navItem.pattern.test(pathname);

  if (!isExactMatch && !isPatternMatch) {
    return null;
  }

  return (
    <div className="sidebar md:sticky dark:text-[#d4d4d4] transition-all">
      <div className="flex mb-10">
        <Link className="hover:animate-left-translate" href={navItem.url}>
          <MoveUpLeft className="bg-neutral-50 text-neutral-400 hover:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 mr-2 h-8 w-8 rounded-sm p-2" />
        </Link>

        <span className="mt-0.5 newsreader-400-tall hidden sm:block">{navItem.name}</span>
      </div>

      {headings && headings.length > 0 && (
        <div className="relative">
          <div
            className="headings-container no-scrollbar hidden xl:flex overflow-hidden"
            ref={containerRef}
          >
            <ul>
              {headings.map((heading, index) => {
                const formattedId = formatHeadingToId(heading);
                const isNumbered = /^\d+\./.test(heading);
                const headingText = isNumbered ? heading.replace(/^\d+\.\s*/, "") : heading;

                return (
                  <li
                    key={index}
                    className="my-3 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-400 transition-all text-[15px]"
                  >
                    <Link
                      href={`/${path === "/blog-post" ? "blog" : "project"}/${slug}#${formattedId}`}
                    >
                      {headingText}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {showBlurTop && <div className="absolute scroll-blur-top"></div>}{" "}
          {showBlurBottom && <div className="absolute scroll-blur-bottom"></div>}{" "}
        </div>
      )}
    </div>
  );
}
