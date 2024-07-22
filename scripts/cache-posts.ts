import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  id: string;
  title: string;
  summary: string;
}

function getBlogPosts(): string {
  const postsDirectory = path.join(process.cwd(), "app", "blog", "posts");
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const posts: Post[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title as string,
      summary: matterResult.data.summary as string,
    };
  });
  return JSON.stringify(posts);
}

const fileContents = `export const posts = ${getBlogPosts()}`;

try {
  fs.readdirSync("cache");
} catch (e) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/blog-posts.ts", fileContents, function (err) {
  if (err) return console.log(err);
  console.log("Blog posts successfully cached.");
});
