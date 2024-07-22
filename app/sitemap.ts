import { getBlogPosts } from "./blog/utils";
import { getProjects } from "./project/utils";

export const baseUrl = "https://boro.im";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let projects = getProjects().map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }));

  let routes = ["", "/blog", "/project", "/work"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects];
}
