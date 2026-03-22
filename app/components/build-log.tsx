import Link from "next/link";

export type BuildLogEntry = {
  week: number;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
  done?: boolean;
};

export function BuildLog({ entries }: { entries: BuildLogEntry[] }) {
  return (
    <div className="my-8">
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1;
        return (
          <div key={entry.week} className="flex gap-0">
            {/* Spine */}
            <div className="flex flex-col items-center w-7 flex-shrink-0">
              <div
                className="w-2 h-2 rounded-full mt-[5px] flex-shrink-0"
                style={{
                  background: entry.done ? "#FF6B35" : "transparent",
                  border: entry.done ? "none" : "1.5px solid #FF6B35",
                }}
              />
              {!isLast && (
                <div
                  className="flex-1 mt-1"
                  style={{
                    width: "1px",
                    borderLeft: "1px dashed #3a3a3a",
                    minHeight: "10px",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${!isLast ? "pb-3" : ""}`}>
              {/* Header row */}
              <div className="flex items-center gap-1">
                <span
                  className="text-[12px] font-medium rounded px-1.5 py-0 flex-shrink-0"
                  style={{ color: "#FF6B35", background: "#FF6B3518" }}
                >
                  W{entry.week}
                </span>
                <Link
                  href={entry.href}
                  className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 !no-underline !hover:underline underline-offset-2 decoration-neutral-400"
                >
                  {entry.title}
                </Link>
                <span className="text-[13px] text-neutral-400 dark:text-neutral-500 ml-auto flex-shrink-0">
                  {entry.date}
                </span>
              </div>

              {/* Summary */}
              <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed !mt-1 mb-0 ">
                {entry.summary}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
