import Link from "next/link";
import { Sidebar } from "../components/sidebar";
import { BriefcaseIcon, DownloadIcon } from "lucide-react";
import { Carousel } from "../components/carousel";
import Image from "next/image";

export const metadata = {
  title: "Work",
  description: "Read my work.",
};

const blackxImages = [
  "/blackx/total-rev.png",
  "/blackx/total-cust.png",
  "/blackx/total-prod.png",
  "/blackx/filter.png",
  "/blackx/filter-dropdown.png",
  "/blackx/slider.png",
  "/blackx/topbar.png",
];

const waveImages = [
  "/wave/monitor-1.png",
  "/wave/monitor-2.png",
  "/wave/manage-1.png",
  "/wave/manage-2.png",
];

export default function Page() {
  return (
    <>
      <Sidebar path="/work" />

      <section className="leading-7 dark:text-[#d4d4d4]">
        {/* Header */}
        <div className="mb-8">
          <p className="newsreader-400-tall font-medium mt-1 text-xl tracking-tight">{`/ work`}</p>
          <p className="mt-8 text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
            Experienced software developer with a knack for enhancing web applications, and
            streamlining development processes through innovative solutions.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="space-y-4">
          {/* Wave DDS - Current */}
          <div className="group border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all p-6 rounded-sm bg-white dark:bg-neutral-900/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-neutral-900/50 dark:to-purple-950/20">
                <div className="w-10 h-10 bg-neutral-800 dark:bg-neutral-200 flex items-center justify-center rounded-sm">
                  <BriefcaseIcon className="w-4 h-4 text-neutral-200 dark:text-neutral-800" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 tracking-tight">
                    Wave DDS
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Software Developer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded-sm">
                  Current
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:block">
                  Oct 2025 - Present
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Building a customer portal with Next.js for real-time swimmer-safety hub monitoring.
              Developing backend APIs with Express and SQL for hub status, activity tracking,
              alerts, and reporting. Refactoring components, improving data flow and performance
              while collaborating with designers and engineers.
            </p>
          </div>

          {/* Beacon Technologies */}
          <div className="group border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all p-6 rounded-sm bg-white dark:bg-neutral-900/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-sm border border-neutral-200 dark:border-neutral-700">
                  <BriefcaseIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 tracking-tight">
                    Beacon Technologies, Inc.
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Programmer Analyst IV
                  </p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                May 2024 - Aug 2025
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Developed Collibra ingestion code, reducing upload time by 30% and increasing BO
              extraction efficiency by 25%. Implemented workflows streamlining asset management and
              reducing manual effort by 50%. Addressed 90% of production issues.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-sm">
              <div className="w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                Joined via merger with Smart Solutions
              </p>
            </div>

            {/* Smart Solutions - nested */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight">
                    Smart Solutions, Inc.
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Programmer Analyst IV
                  </p>
                </div>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  Sep 2023 - May 2024
                </span>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Administered and customized Collibra, increasing UI customization by 20%.
                Implemented efficient workflows, improving business process efficiency by 15%.
                Utilized Java and configured APIs, reducing manual effort by 50%.
              </p>
            </div>
          </div>

          {/* Wave DDS - Previous */}
          <div className="group border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all p-6 rounded-sm bg-white dark:bg-neutral-900/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-sm border border-neutral-200 dark:border-neutral-700">
                  <BriefcaseIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 tracking-tight">
                    Wave DDS
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    UI/UX Developer
                  </p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                May 2022 - Sep 2023
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Led UI/UX development including experience maps and wireframes using Figma.
              Collaborated with senior developers on interaction specifications. Built SPAs with
              React following UX best practices.
            </p>
          </div>

          {/* Wave carousel */}
          <div className="my-16">
            <Carousel imgs={waveImages} subtitle="Few mockup screens I designed for WAVE app." />
          </div>

          {/* Slotly */}
          <div className="group border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all p-6 rounded-sm bg-white dark:bg-neutral-900/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-sm border border-neutral-200 dark:border-neutral-700">
                  <BriefcaseIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 tracking-tight">
                    Slotly
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Software Developer
                  </p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                Jan 2021 - Aug 2021
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Elevated customer-facing apps, boosting user engagement by 2 minutes. Led scheduling
              platform redesign improving server-side rendering and core web vitals. Streamlined
              CI/CD pipeline and API implementation, enhancing code delivery by 5% and feature
              shipping by 6%.
            </p>
          </div>

          {/* BlackX */}
          <div className="group border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all p-6 rounded-sm bg-white dark:bg-neutral-900/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center rounded-sm border border-neutral-200 dark:border-neutral-700">
                  <BriefcaseIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-200 tracking-tight">
                    BlackX
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Frontend Developer
                  </p>
                </div>
              </div>
              <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                Feb 2020 - Jan 2021
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Translated wireframes into code and built reusable components, improving load time by
              10%. Integrated APIs, optimized components, handled authentication, and debugged with
              25+ test cases while analyzing user requirements for performance needs.
            </p>
          </div>
        </div>

        {/* Components Section */}
        <div className="mt-6">
          <div className="mb-8">
            <h4 className="newsreader-400-tall tracking-tight mb-2">Components</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              These components were created based on requirements for re-developing the Blackx web
              analytics screen. Below are some of the mock components I designed.
            </p>
          </div>

          {/* bento grid */}
          <div className="bento grid auto-rows-[192px] gap-1 grid-cols-2 sm:grid-cols-3">
            {blackxImages.map((img, i) => (
              <div
                key={i}
                className={`relative ${img} max-h-[192px] overflow-hidden bg-[#e9eaec] dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm ${
                  i === 6 ? "col-span-2 sm:col-span-3" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={img}
                  layout="fill"
                  objectFit="contain"
                  className="px-3 py-4 sm:py-0"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-wider">
            BlackX web analytics components
          </p>
        </div>

        {/* Read more */}
        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <h4 className="newsreader-400 text-xl tracking-tight mb-4">Read more?</h4>
          <Link
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors rounded-sm text-sm font-medium"
            rel="noopener noreferrer"
            target="_blank"
            href="/resume/resume.pdf"
          >
            <span>Read CV</span>
            <DownloadIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
