"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

const ThemeIndicator = () => (
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
  </span>
);

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);

    let audioFile;

    if (newTheme === "dark") {
      audioFile = "/audio/light-switch-off.mp3";
    } else if (newTheme === "light") {
      audioFile = "/audio/light-switch-on.mp3";
    }

    // Play the appropriate sound when the theme changes
    const audio = new Audio(audioFile);
    audio.play();
  };

  return (
    <div className="relative inline-flex">
      <button
        id="hs-dropdown-default"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="py-1 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-neutral-200 bg-white text-neutral-400 shadow-sm hover:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-800"
      >
        {theme === "system" && <SunMoonIcon className="w-4 h-4" />}
        {theme === "light" && <SunIcon className="w-4 h-4" />}
        {theme === "dark" && <MoonIcon className="w-4 h-4" />}

        {capitalizeFirstLetter(theme)}
        <svg
          className={`size-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`absolute min-w-full left-0 transform -translate-y-full -mt-1 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:divide-neutral-700 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="flex justify-between min-w-full items-center gap-x-3.5 py-1 px-2 rounded-lg text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 dark:focus:bg-neutral-800"
          onClick={() => handleChange("system")}
        >
          System
          {theme === "system" && <ThemeIndicator />}
        </button>
        <button
          className="flex justify-between min-w-full items-center gap-x-3.5 py-1 px-2 rounded-lg text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 dark:focus:bg-neutral-800"
          onClick={() => handleChange("light")}
        >
          Light
          {theme === "light" && <ThemeIndicator />}
        </button>
        <button
          className="flex justify-between min-w-full items-center gap-x-3.5 py-1 px-2 rounded-lg text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 dark:focus:bg-neutral-800"
          onClick={() => handleChange("dark")}
        >
          Dark
          {theme === "dark" && <ThemeIndicator />}
        </button>
      </div>
    </div>
  );
};
