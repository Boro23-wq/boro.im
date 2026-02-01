import * as React from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import Pre from "./pre";
import RoundedImage from "./rounded-image";
import { BentoGrid } from "./bento-grid";
import { Carousel } from "./carousel";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  defaultColor: "dark",
  cssVariablePrefix: "--shiki-",
  defaultLang: {
    block: "js",
    inline: "plaintext",
  },
};

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="my-8 overflow-x-auto">
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden inline-block">
        <table>
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-900/20">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="newsreader-400 text-left text-sm text-neutral-900 dark:text-neutral-100 px-4 py-3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white dark:bg-neutral-800/35"
                    : "bg-neutral-100/50 dark:bg-neutral-900/50"
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomLink(props: React.ComponentPropsWithoutRef<"a">) {
  const href = props.href || "";
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a {...props} />;
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function slugify(str: React.ReactNode) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug, className: "newsreader-600-tall dark:text-white text-black" },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
        children,
      ],
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

function CustomCheckbox({ checked, children }: { checked: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="h-3.5 w-3.5 accent-neutral-600 checked:dark:accent-neutral-400 transition-all duration-150 ease-in-out"
      />
      <label className="ml-1">{children}</label>
    </div>
  );
}

function CustomListItem({ children }: { children: any }) {
  if (children && children[0]?.type === "input") {
    const checked = children[0]?.props?.checked ?? false;
    const checkboxLabel = children[2];
    return (
      <li className="task-list-item">
        <CustomCheckbox checked={checked}>{checkboxLabel}</CustomCheckbox>
      </li>
    );
  }
  return <li className="task-list-item">{children}</li>;
}

function Callout({ children, emoji }: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="my-8 px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-neutral-100 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 rounded-sm p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100">
      <div className="flex items-center w-4 mr-6 text-xl">{emoji}</div>
      <div className="w-full callout">{children}</div>
    </div>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  li: CustomListItem,
  Callout,
  Table,
  BentoGrid,
  pre: Pre,
  Carousel,
};

export function CustomMDX({
  source,
  components: extraComponents,
}: {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
}) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
      components={{ ...components, ...extraComponents }}
    />
  );
}
