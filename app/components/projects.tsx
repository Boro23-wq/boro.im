// app/components/projects.tsx
import { Globe } from "lucide-react";
import { getProjects } from "../project/utils";
import Link from "next/link";
import Image from "next/image";

export function Projects() {
  let allProjects = getProjects();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-neutral-200 dark:border-neutral-800  overflow-hidden">
      {allProjects
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((project, index) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="group flex flex-col border-b border-r border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-300"
          >
            {/* Image Section */}
            <div className="aspect-[2/1] border-b border-neutral-200 dark:border-neutral-800 overflow-hidden relative">
              {project.metadata.image ? (
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
                  <Globe className="w-16 h-16 text-neutral-300 dark:text-neutral-700" />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6 relative">
              {/* Date */}
              <p className="text-xs uppercase tracking-wide font-semibold text-neutral-400 dark:text-neutral-500 mb-4">
                {new Date(project.metadata.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {/* Title */}
              <h3 className="newsreader-400-tall text-xl font-medium mb-3 dark:text-[#d4d4d4]">
                {project.metadata.title}
              </h3>

              {/* Summary */}
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow line-clamp-3">
                {project.metadata.summary}
              </p>

              {/* Blur gradient from bottom - more noticeable */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 dark:from-[#161616] dark:via-[#161616]/80 group-hover:from-neutral-50 group-hover:via-neutral-50/80 dark:group-hover:from-[#161616] dark:group-hover:via-[#161616]/80 to-transparent pointer-events-none" />

              {/* Tags Section */}
              {project.metadata.tags && project.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
                  {JSON.parse(project.metadata.tags).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
}
