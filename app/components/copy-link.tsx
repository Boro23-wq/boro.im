"use client";

import { LinkIcon } from "lucide-react";
import React, { useState } from "react";

interface CopyLinkProps {
  w?: string;
  h?: string;
}

export const CopyLink = ({ w, h }: CopyLinkProps) => {
  const [disabled, setDisabled] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard!");
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 5000); // Hide the message after 5 seconds
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="text-neutral-400 dark:text-neutral-500 bg-neutral-50 hover:bg-neutral-100 disabled:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 disabled:dark:bg-neutral-700 rounded-full transition-all transform disabled:transform-none disabled:active:scale-180 active:scale-90 cursor-copy disabled:cursor-not-allowed"
        onClick={handleCopyUrl}
        disabled={disabled}
      >
        <LinkIcon className={`w-${w ? w : 8} h-${h ? h : 8} p-2`} />
      </button>
    </div>
  );
};
