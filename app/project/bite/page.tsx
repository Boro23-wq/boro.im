import { Sidebar } from "@/app/components/sidebar";
import { notFound } from "next/navigation";
import { getProjects } from "../utils";
import { getBitePosts } from "./utils";
import { CustomMDX } from "@/app/components/mdx";
import { formatDate } from "../utils";
import { BookOpenTextIcon } from "lucide-react";
import { estimateReadingTime } from "@/lib/reading-time";
import { CopyLink } from "@/app/components/copy-link";
import { BiteContent } from "./bite-content";

export const metadata = {
  title: "Bite — Recipe Building App",
  description: "Building an MVP recipe app from scratch",
};

export default function BitePage() {
  const projects = getProjects();
  const biteProject = projects.find((p) => p.slug === "bite");

  if (!biteProject) notFound();

  const bitePosts = getBitePosts()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => ({
      ...post,
      formattedDate: formatDate(post.metadata.publishedAt),
    }));

  const readingTime = estimateReadingTime(biteProject.content);

  const {
    headings,
    metadata: { tags },
  } = biteProject;

  let allTags: string[] = [];
  if (Array.isArray(tags)) {
    allTags = tags as unknown as string[];
  } else if (typeof tags === "string" && tags.trim().length > 0) {
    try {
      allTags = JSON.parse(tags);
    } catch {
      allTags = [tags];
    }
  }

  return (
    <>
      <Sidebar slug={biteProject.slug} headings={biteProject.headings} path="/project" />

      <section className="dark:text-[#d4d4d4]">
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {biteProject.metadata.title}
        </h1>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-4 sm:gap-0 justify-between items-left sm:items-center mt-2 text-sm">
            <div className="flex items-center gap-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(biteProject.metadata.publishedAt)}
              </p>

              <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                <BookOpenTextIcon className="w-4 h-4" />
                <p className="ml-2">{readingTime}</p>
              </div>
            </div>

            <div className="flex">
              <CopyLink w="8" h="8" />
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex mt-4 mb-6">
              {allTags.map((tag, index) => (
                <p
                  key={`${tag}-${index}`}
                  className="text-sm mr-2 px-2 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                >
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>

        <hr className="h-0.5 mx-auto !mt-0 mb-4 bg-neutral-200 border-0 md:my-6 dark:bg-neutral-700" />

        <BiteContent bitePosts={bitePosts} />

        <article className="prose leading-7 mb-8 mt-8">
          <CustomMDX source={biteProject.content} />
        </article>

        <hr className="h-0.5 mx-auto my-8 bg-neutral-200 border-0 dark:bg-neutral-700" />
      </section>
    </>
  );
}
