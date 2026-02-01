"use client";

import { Keyboard, KeyboardOff } from "lucide-react";

type BlogHeaderProps = {
  onToggleSearch: () => void;
  isSearchVisible: boolean;
};

export function BlogHeader({ onToggleSearch, isSearchVisible }: BlogHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <p className="newsreader-400-tall font-medium dark:text-[#d4d4d4]">/ blog</p>
      <button
        onClick={onToggleSearch}
        className="flex items-center justify-center w-8 h-8 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-800 rounded-sm hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
      >
        {isSearchVisible ? <Keyboard className="w-4 h-4" /> : <KeyboardOff className="w-4 h-4" />}
      </button>
    </div>
  );
}
