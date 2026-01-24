import { ArrowRightIcon } from "lucide-react";
import { getProjects } from "../project/utils";
import Link from "next/link";

export function Projects() {
  let allProjects = getProjects();

  return (
    <>
      {allProjects
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((project) => (
          <div
            key={project.slug}
            className="relative flex flex-col dark:text-[#d4d4d4] px-4 py-2 mb-8 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 group"
          >
            <Link href={`/project/${project.slug}`} className="">
              <div className="flex items-center relative mb-2">
                <p className="newsreader-400-tall">{project.metadata.title}</p>
                <hr className="flex-grow ml-2 border-t border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-300 dark:group-hover:border-neutral-600 transition-colors duration-300" />
              </div>

              <p className="mt-0.5 text-neutral-500 dark:text-neutral-400">
                {project.metadata.summary}
              </p>

              {project.metadata.tags && project.metadata.tags.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap mt-4 mb-2 gap-2">
                    {JSON.parse(project.metadata.tags).map((tag, index) => (
                      <p
                        key={index}
                        className="text-sm px-2 py-1 rounded-md bg-neutral-100 group-hover:bg-neutral-200 dark:bg-neutral-800 dark:group-hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                  <div className="ml-4 mt-1.5 flex text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-x">
                    <ArrowRightIcon className="w-6 h-6" />
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
    </>
  );
}
