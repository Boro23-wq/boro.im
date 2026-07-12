"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightTopIcon } from "./icons";
import { social } from "@/lib/social";

export function SocialPills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className="flex flex-wrap">
      {social.map((item) => {
        const Item = shouldReduceMotion ? "li" : motion.li;

        return (
          <Item
            key={item.name}
            className="bg-neutral-100 text-neutral-600 hover:bg-neutral-800 hover:text-neutral-50 dark:hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-neutral-900 dark:bg-neutral-800 px-2.5 py-1 rounded-sm mr-2 mb-2"
            {...(!shouldReduceMotion && {
              whileHover: { y: -2, scale: 1.04 },
              whileTap: { scale: 0.97 },
              transition: { type: "spring", stiffness: 400, damping: 20 },
            })}
          >
            <a
              className="flex items-center"
              rel="noopener noreferrer"
              target="_blank"
              href={item.url}
            >
              <p className="mr-1 text-sm">{item.name}</p>
              <ArrowRightTopIcon />
            </a>
          </Item>
        );
      })}
    </ul>
  );
}
