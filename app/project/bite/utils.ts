import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function extractHeadings(content: string): string[] {
  const headingRegex = /^(#{1,3})\s+(.*)$/gm;
  const headings: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[2]);
  }

  return headings;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

export function getBitePosts() {
  const postsDir = path.join(process.cwd(), "app", "project", "bite", "posts");
  let mdxFiles = getMDXFiles(postsDir);

  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(postsDir, file));
    let slug = path.basename(file, path.extname(file));
    let headings = extractHeadings(content);

    return {
      metadata,
      slug,
      content,
      headings,
    };
  });
}
