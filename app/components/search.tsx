"use client";

import { useCallback, useRef, useState, ChangeEvent } from "react";
import Link from "next/link";
import {
  FileTextIcon,
  LoaderIcon,
  ChevronDownIcon,
  XIcon,
  SearchIcon,
  CircleAlertIcon,
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
}

interface SearchProps {
  toggleSearch: () => void;
  query: string;
  results: SearchResult[];
  displayedResults: SearchResult[];
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setDisplayedResults: (displayedResults: SearchResult[]) => void;
}

export default function Search({
  toggleSearch,
  query,
  setQuery,
  results,
  displayedResults,
  setResults,
  setDisplayedResults,
}: SearchProps) {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const resultsPerPage = 5;

  const searchEndpoint = (query: string) => `/api/search?q=${query}`;

  const fetchResults = useCallback(async (query: string) => {
    setLoading(true); // Set loading to true before starting fetch
    try {
      const res = await fetch(searchEndpoint(query));
      const data = await res.json();
      setResults(data.results);
      setDisplayedResults(data.results.slice(0, resultsPerPage)); // Show initial results
      setCurrentPage(0); // Reset page number
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setQuery(query);
      if (query.length) {
        fetchResults(query);
        setActive(true); // Keep results window open when there is a query
      } else {
        setResults([]);
        setDisplayedResults([]);
        setCurrentPage(0);
        setActive(false); // Close results window when query is empty
      }
    },
    [fetchResults]
  );

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick as EventListener);
  }, []);

  const onClick = useCallback((event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setActive(false);
      window.removeEventListener("click", onClick as EventListener);
    }
  }, []);

  const loadMoreResults = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * resultsPerPage;
    const newResults = results.slice(startIndex, startIndex + resultsPerPage);

    setDisplayedResults([...displayedResults, ...newResults]);

    setCurrentPage(nextPage);
  };

  const hasMoreResults = results.length > displayedResults.length;

  return (
    <>
      <div className="flex mb-3 items-center">
        <CircleAlertIcon className="w-4 h-4 sm:w-3 sm:h-3 text-neutral-400 dark:text-neutral-500 mr-2" />
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          This search uses fuzzy matching to find blog posts.
        </p>
      </div>
      <div className="relative" ref={searchRef}>
        <input
          className="pl-10 pr-8 border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 hover:border hover:border-neutral-200 hover:dark:border-neutral-700 transition-all rounded-md p-2 w-full text-base focus:outline-none focus:ring-0"
          onChange={onChange}
          onFocus={onFocus}
          placeholder="Search blog posts..."
          type="text"
          value={query}
        />

        {/* Search Icon positioned inside the input field */}
        <div className="absolute inset-y-0 left-2 flex items-center pl-2 pointer-events-none">
          <SearchIcon className="h-4 w-4 text-neutral-500" />
        </div>

        {/* Close Icon positioned outside the input field */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <XIcon
            onClick={() => {
              toggleSearch();
              setQuery(""); // Reset the query when closing
            }}
            className="h-4 w-4 text-neutral-500 hover:text-neutral-400 transition-all cursor-pointer"
          />
        </div>

        {(active || displayedResults.length > 0) && (
          <div className="relative">
            <ul className="border border-neutral-100 dark:border-neutral-800 rounded-md list-none overflow-hidden my-2 py-1 px-2 absolute top-full left-0 right-0 z-50 backdrop-filter backdrop-blur-2xl max-h-80 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center m-0 px-6 py-2">
                  <LoaderIcon className="h-5 w-5 animate-spin" />
                </div>
              ) : displayedResults.length > 0 ? (
                displayedResults.map(({ id, title }) => (
                  <li className="text-white m-0 py-0.5" key={id}>
                    <Link href="/blog/[id]" as={`/blog/${id}`}>
                      <div className="flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 w-full p-2 rounded-md">
                        <div className="flex-shrink-0">
                          <FileTextIcon className="h-5 w-5 text-neutral-400" />
                        </div>
                        <p className="text-neutral-800 dark:text-white ml-4 ">
                          {title}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-center text-sm text-neutral-500 dark:text-neutral-400 m-0 px-6 py-2">
                  No blog found.
                </li>
              )}

              {hasMoreResults && !loading ? (
                <div className="flex justify-center mt-2 cursor-pointer">
                  <ChevronDownIcon
                    onClick={loadMoreResults}
                    className="animate-bounce w-6 h-6"
                  />
                </div>
              ) : (
                displayedResults.length > 0 &&
                !loading && (
                  <li className="text-center uppercase text-xs text-neutral-400 dark:text-neutral-500 m-0 px-6 py-2">
                    End of results
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
