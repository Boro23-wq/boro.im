"use client";

import { useEffect, useState } from "react";

export function CommandMenuHint({ className }: { className?: string }) {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform ?? navigator.userAgent));
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-command-menu"))}
      className={
        className ??
        "py-1 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-sm border border-neutral-200 bg-white text-neutral-400 shadow-sm hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-800 motion-safe:active:scale-[0.98] motion-safe:transition-transform"
      }
    >
      <kbd className="font-sans">{isMac ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
