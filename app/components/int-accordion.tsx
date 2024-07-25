"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export const InternAccordion = () => {
  const itemClasses = {
    base: "py-0 w-full m-0",
    title: "font-normal text-medium",
    subtitle: "font-normal text-sm dark:text-neutral-500",
    titleWrapper: "!my-2.5",
    trigger: "px-0 py-0 flex items-center",
    indicator: "text-medium",
    content: "text-medium px-2 pt-0 pb-2 prose prose-neutral dark:prose-invert",
  };

  return (
    <Accordion
      className="flex flex-col gap-3"
      itemClasses={itemClasses}
      variant="splitted"
    >
      <AccordionItem
        key="1"
        aria-label="Slotly"
        title="Slotly"
        subtitle="Software Developer"
        // subtitle="Software Developer"
      >
        <ul className="!mt-4">
          <li className="!text-neutral-500 dark:!text-neutral-400 !mb-4 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Enhanced Web Application:
            </span>{" "}
            Built type-safe components with Next.js and TypeScript, improving
            average user time on page by 2 minutes.
          </li>
          <li className="!text-neutral-500 dark:!text-neutral-400 !mb-4 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Optimized Scheduling Platform:
            </span>{" "}
            Led the redesign and migration of an end-to-end scheduling platform
            to Next.js, improving server-side rendering and core web vitals,
            resulting in better FID and LCP metrics.
          </li>
          <li className="!text-neutral-500 dark:!text-neutral-400 !mb-4 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Improved Development Processes:
            </span>{" "}
            Overhauled the CI/CD pipeline, increasing code delivery speed by 5%,
            and implemented REST APIs using Nest.js, reducing time to ship new
            features by 6%.
          </li>
          <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Tech stack:
            </span>{" "}
            Next.js, AWS, TypeScript, NestJS, Styled Components.
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="BlackX"
        title="BlackX"
        subtitle="Frontend Developer"
        // subtitle="Software Developer"
      >
        <ul className="!mt-4">
          <li className="!text-neutral-500 dark:!text-neutral-400 !mb-4 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Collaboration:
            </span>{" "}
            Worked with a close group of developers convert wireframes into
            functional code, enhancing team productivity.
          </li>
          <li className="!text-neutral-500 dark:!text-neutral-400 !mb-4 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Efficient Component Development:
            </span>{" "}
            Developed reusable UI components, optimized component load time by
            10%, and increased user engagement.
          </li>
          <li className="!text-neutral-500 dark:!text-neutral-400 !mb-4 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Robust API development:
            </span>{" "}
            Integrated REST API, optimized data synchronization through 25+ test
            cases, ensuring high performance and reliability while meeting 5+
            user requirements.
          </li>
          <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
            <span className="!text-neutral-700 dark:!text-neutral-300">
              Tech stack:
            </span>{" "}
            React.js, Node.js, Django, Python, Figma.
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  );
};
