// app/project/bite/bite-content.tsx
"use client";

import Link from "next/link";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Post = {
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
  };
  slug: string;
  formattedDate: string;
};

export function BiteContent({ bitePosts }: { bitePosts: Post[] }) {
  const POSTS_PER_PAGE = 5;
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayedPosts = bitePosts.slice(0, displayCount);
  const hasMore = displayCount < bitePosts.length;
  const remainingCount = bitePosts.length - displayCount;

  const checkScroll = () => {
    if (cardsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = cardsScrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [displayCount]);

  const scroll = (direction: "left" | "right") => {
    if (cardsScrollRef.current) {
      const scrollAmount = 400;
      cardsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + POSTS_PER_PAGE, bitePosts.length));
    setTimeout(() => {
      if (cardsScrollRef.current) {
        cardsScrollRef.current.scrollTo({
          left: cardsScrollRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs tracking-wide font-semibold uppercase text-neutral-400 dark:text-neutral-500">
          Weekly Progress Updates
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400 dark:text-neutral-500">
            {bitePosts.length} {bitePosts.length === 1 ? "update" : "updates"}
          </span>
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-sm border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-sm border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards row - below timeline */}
      <div className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800">
        {/* Left blur gradient */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#161616] via-white/50 dark:via-[#161616]/50 to-transparent z-10 pointer-events-none" />
        )}

        {/* Right blur gradient */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#161616] via-white/50 dark:via-[#161616]/50 to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={cardsScrollRef}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={(e) => {
            // Sync scroll between timeline and cards
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollLeft = e.currentTarget.scrollLeft;
            }
          }}
        >
          <div className="relative inline-flex min-w-full">
            {/* Posts */}
            {displayedPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/project/bite/${post.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col flex-shrink-0 w-[320px] border-b border-r border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                  index === 0 ? "border-l" : ""
                }`}
              >
                {/* Content card */}
                <div className="w-full px-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                      {post.formattedDate}
                    </p>
                    <ArrowRightIcon className="w-4 h-4 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="newsreader-400 text-md mb-1 line-clamp-2">
                    {post.metadata.title}
                  </h3>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
                    {post.metadata.summary}
                  </p>
                </div>
              </Link>
            ))}

            {/* Load more button inline */}
            {hasMore && (
              <div className="flex-shrink-0 w-[200px] flex items-center justify-center border-b border-r border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 text-sm font-medium whitespace-nowrap"
                >
                  Load {Math.min(POSTS_PER_PAGE, remainingCount)} more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
