"use client";

import { LinkIcon } from "lucide-react";
import React from "react";

interface CopyLinkProps {
  w?: string;
  h?: string;
}

export const CopyLink = ({ w, h }: CopyLinkProps) => {
  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <LinkIcon
      onClick={handleCopyUrl}
      className={`w-${w ? w : 8} h-${
        h ? h : 8
      } text-neutral-400 dark:text-neutral-500 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 rounded-full transition-all transform active:scale-90 cursor-copy`}
    />
  );
};
