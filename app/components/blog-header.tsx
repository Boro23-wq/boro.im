"use client";

import { useState } from "react";
import Search from "./search";
import { KeyboardIcon, LinkIcon } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
}

export default function BlogHeaderWSearch() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [displayedResults, setDisplayedResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setQuery("");
    setResults([]);
    setDisplayedResults([]);
  };

  return (
    <div className="dark:text-[#d4d4d4]">
      <div className="relative flex justify-between mt-0 mt-1 !mb-8 items-center">
        <p className="newsreader-400-tall font-medium text-xs mt-1">{`/ blog`}</p>
        <div className="flex items-center">
          <button
            onClick={toggleSearch}
            className="border-0 text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400 text-sm py-1 px-2 rounded transition-all cursor-pointer"
          >
            <KeyboardIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div
          onClick={toggleSearch}
          className="fixed inset-0 bg-opacity-100 backdrop-blur-xl z-40"
        ></div>
      )}

      <div
        className={`relative transition-all duration-300 ease-in ${
          isSearchOpen ? "block" : "hidden"
        }`}
      >
        {/* Search component */}
        <div className="relative z-50">
          <Search
            toggleSearch={toggleSearch}
            query={query}
            results={results}
            displayedResults={displayedResults}
            setQuery={setQuery}
            setResults={setResults}
            setDisplayedResults={setDisplayedResults}
          />
        </div>
      </div>
    </div>
  );
}
