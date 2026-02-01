"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { BlogHeader } from "./blog-header";

type BlogPost = {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
    summary: string;
  };
};

type BlogPostsWithSearchProps = {
  posts: BlogPost[];
};

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function BlogPostsWithSearch({ posts }: BlogPostsWithSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const { filteredBlogs, groupedBlogs } = useMemo(() => {
    const filtered = posts
      .filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
          post.metadata.title.toLowerCase().includes(query) ||
          post.metadata.summary.toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
      );

    const grouped = filtered.reduce((acc: { [key: string]: BlogPost[] }, blog) => {
      const year = new Date(blog.metadata.publishedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(blog);
      return acc;
    }, {});

    const sortedGroups = Object.entries(grouped).sort(
      ([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA),
    );

    return { filteredBlogs: filtered, groupedBlogs: sortedGroups };
  }, [searchQuery, posts]);

  return (
    <>
      <BlogHeader
        onToggleSearch={() => setIsSearchVisible(!isSearchVisible)}
        isSearchVisible={isSearchVisible}
      />

      <div className="relative pb-28">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              No posts found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedBlogs.map(([year, posts]) => (
              <div key={year}>
                <div className="bg-neutral-100/65 dark:bg-neutral-800/45 px-4 py-2 mb-1">
                  <span className="text-xs tracking-wide font-semibold text-neutral-900 dark:text-neutral-400">
                    {year}
                  </span>
                </div>
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 border-b border-neutral-200/45 dark:border-neutral-800/75 last:border-0"
                  >
                    <span className="w-12 text-xs text-neutral-400 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                      <HighlightText text={post.metadata.title} query={searchQuery} />
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
        )}

        {/* Blur gradient backdrop above search bar */}
        <div
          className={`fixed left-0 right-0 bottom-0 h-64 z-40 pointer-events-none transition-opacity duration-700 ${
            isSearchVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Light mode gradient */}
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background: "linear-gradient(to top, white, transparent)",
              backdropFilter: "blur(2px)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, white 75%)",
              maskImage: "linear-gradient(to bottom, transparent, white 75%)",
            }}
          />
          {/* Dark mode gradient */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background: "linear-gradient(to top, #161616, transparent)",
              backdropFilter: "blur(2px)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, #161616 75%)",
              maskImage: "linear-gradient(to bottom, transparent, #161616 75%)",
            }}
          />
        </div>

        {/* Floating Search Bar with smooth slide + fade animation */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50 transition-all duration-700 ease-out ${
            isSearchVisible
              ? "bottom-8 opacity-100 translate-y-0"
              : "bottom-0 opacity-0 translate-y-12 pointer-events-none"
          }`}
        >
          <div className="backdrop-blur-3xl backdrop-saturate-200 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-sm shadow-2xl p-0.5 transition-all duration-700">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 transition-all duration-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-11 pr-11 py-3 bg-transparent border-0 text-sm focus:outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 px-11 pb-2 text-xs text-neutral-500 transition-all duration-300">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? "post" : "posts"} found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
