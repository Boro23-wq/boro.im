import React from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import Pre from "./pre";
import RoundedImage from "./rounded-image";
import { BentoGrid } from "./bento-grid";
import { Carousel } from "./carousel";

/** @type {import('rehype-pretty-code').Options} */
const options = {
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

// callout types
interface CalloutProps {
  emoji: string;
  children: React.ReactNode;
}

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th className="newsreader-400" key={index}>
      {header}
    </th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table className="table-blur">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: "newsreader-600-tall dark:text-white text-black",
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function CustomCheckbox({ checked, children }) {
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

function CustomListItem({ children }) {
  if (children && children[0]?.type === "input") {
    const checked = children[0]?.props.checked || false;
    const checkboxLabel = children[2];

    return (
      <li className="task-list-item">
        <CustomCheckbox checked={checked}>{checkboxLabel}</CustomCheckbox>
      </li>
    );
  }

  return <li className="task-list-item">{children}</li>;
}

function Callout({ children, emoji }: CalloutProps) {
  return (
    <div className="my-8 px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-neutral-100 via-neutral-100 to-neutral-200 dark:bg-gradient-to-r dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 ">
      <div className="flex items-center w-4 mr-6 text-xl">{emoji}</div>
      <div className="w-full callout">{children}</div>
    </div>
  );
}

let components = {
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

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, options]],
        },
      }}
    />
  );
}
