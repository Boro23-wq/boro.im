import { getBlogPosts } from "./blog/utils";
import { getVisibleProjects } from "./project/utils";
import { getBitePosts } from "./project/bite/utils";

export const baseUrl = "https://boro.im";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let projects = getVisibleProjects().map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }));

  let bitePosts = getBitePosts().map((post) => ({
    url: `${baseUrl}/project/bite/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/blog", "/project", "/work"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects, ...bitePosts];
}
