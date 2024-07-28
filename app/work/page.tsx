import Link from "next/link";
import { Sidebar } from "../components/sidebar";
import { BriefcaseIcon, DownloadIcon } from "lucide-react";
import { BentoGridWork } from "../components/bento-grid-work";
import { Carousel } from "../components/carousel";

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

      <section className="leading-relaxed dark:text-[#d4d4d4]">
        <p className="newsreader-400-tall font-medium mt-1">{`/ work`}</p>
        <div className="mt-8 flex justify-start items-start flex-col sm:flex-row">
          <div className="flex mb-2">
            <p className="text-pretty text-neutral-800 dark:text-neutral-300">
              Experienced software developer with a knack for enhancing web
              applications, and streamlining development processes through
              innovative solutions.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="newsreader-400-tall">Experience</p>
        </div>

        <div className="mt-8">
          <ol className="relative border-s border-neutral-200 dark:border-neutral-700">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-neutral-100 rounded-full border dark:border-neutral-600 -start-3 ring-4 ring-white dark:ring-neutral-900 dark:bg-neutral-800">
                <BriefcaseIcon className="w-3 h-3 text-neutral-400 dark:text-neutral-400" />
              </span>
              <h3 className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center mb-1 text-md font-normal text-neutral-600 dark:text-neutral-200">
                Beacon Technologies, Inc.{" "}
                <span className="text-neutral-500 text-xs font-normal me-2 rounded dark:text-neutral-500 ms-0 sm:mt-0 sm:mb-0 mt-0.5 mb-2">
                  May, 2024 - Current
                </span>
              </h3>
              <p className="block mb-2 text-sm font-normal leading-none text-neutral-400 dark:text-neutral-500">
                Programmer Analyst IV
              </p>
              <p className="mt-4 mb-4 text-base font-normal text-neutral-500 dark:text-neutral-400">
                Developed code for Collibra ingestion, reduced upload time by
                30%, and increased BO extraction efficiency by 25%. Implemented
                workflows within the Collibra platform, streamlining asset
                management and reducing manual effort by 50%. Addressed 90% of
                production issues and reviewed diagrams to implement best
                practices.
              </p>

              <div className="relative p-3 max-w-fit border border-neutral-200 rounded-lg bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 glow-border-light dark:glow-border-dark">
                <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                  I joined Beacon as part of its merger with Smart.
                </p>
              </div>

              {/* sub timeline */}
              <ol className="relative border-s border-neutral-200 dark:border-neutral-700 mt-6 ml-8">
                <li className="ms-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 border dark:border-neutral-600 bg-neutral-100 rounded-full -start-3 ring-8 ring-white dark:ring-neutral-900 dark:bg-neutral-800">
                    <BriefcaseIcon className="w-3 h-3 text-neutral-400 dark:text-neutral-400" />
                  </span>
                  <h3 className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center mb-1 text-md font-normal text-neutral-600 dark:text-neutral-200">
                    Smart Solutions, Inc.{" "}
                    <span className="text-neutral-500 text-xs font-normal me-2 rounded dark:text-neutral-500 ms-0 sm:mt-0 sm:mb-0 mt-0.5 mb-2">
                      Sep, 2023 - May, 2024
                    </span>
                  </h3>
                  <p className="block mb-2 text-sm font-normal leading-none text-neutral-400 dark:text-neutral-500">
                    Programmer Analyst IV
                  </p>
                  <p className="mt-4 text-base font-normal text-neutral-500 dark:text-neutral-400">
                    Administered and customized Collibra, enhancing
                    functionalities and increasing UI customization by 20%.
                    Implemented efficient workflows, improving business process
                    efficiency by 15%. Utilized Java and configured APIs,
                    reducing manual effort by 50%.
                  </p>
                </li>
              </ol>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 border dark:border-neutral-600 bg-neutral-100 rounded-full -start-3 ring-8 ring-white dark:ring-neutral-900 dark:bg-neutral-800">
                <BriefcaseIcon className="w-3 h-3 text-neutral-400 dark:text-neutral-400" />
              </span>
              <h3 className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center mb-1 text-md font-normal text-neutral-600 dark:text-neutral-200">
                Wave DDS{" "}
                <span className="text-neutral-500 text-xs font-normal me-2 rounded dark:text-neutral-500 ms-0 sm:mt-0 sm:mb-0 mt-0.5 mb-2">
                  May, 2022 - Sep, 2023
                </span>
              </h3>
              <p className="block mb-2 text-sm font-normal leading-none text-neutral-400 dark:text-neutral-500">
                UI/UX Developer
              </p>
              <p className="mt-4 text-base font-normal text-neutral-500 dark:text-neutral-400">
                Demonstrated all stages of UI/UX development including
                experience maps, wireframes using Figma. Collaborated with
                senior developers to design interaction specifications. Followed
                best UX practices to build SPAs with React.
              </p>
            </li>
          </ol>

          {/* carousel */}
          <div className="mb-10">
            <Carousel
              imgs={waveImages}
              subtitle="Few mockup screens I designed for WAVE app."
            />
          </div>

          <ol className="relative border-s border-neutral-200 dark:border-neutral-700">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 border dark:border-neutral-600 bg-neutral-100 rounded-full -start-3 ring-4 ring-white dark:ring-neutral-900 dark:bg-neutral-800">
                <BriefcaseIcon className="w-3 h-3 text-neutral-400 dark:text-neutral-400" />
              </span>
              <h3 className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center mb-1 text-md font-normal text-neutral-600 dark:text-neutral-200">
                Slotly{" "}
                <span className="text-neutral-500 text-xs font-normal me-2 rounded dark:text-neutral-500 ms-0 sm:mt-0 sm:mb-0 mt-0.5 mb-2">
                  Jan, 2021 - Aug, 2021
                </span>
              </h3>
              <p className="block mb-2 text-sm font-normal leading-none text-neutral-400 dark:text-neutral-500">
                Software Developer
              </p>
              <p className="mt-4 mb-4 text-base font-normal text-neutral-500 dark:text-neutral-400">
                Elevated customer-facing apps, boosting user time by 2 minutes.
                Led scheduling platform redesign, improving server-side
                rendering and core web vitals. Streamlined CI/CD pipeline and
                API implementation, enhancing code delivery by 5% and feature
                shipping by 6%.
              </p>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 border dark:border-neutral-600 bg-neutral-100 rounded-full -start-3 ring-4 ring-white dark:ring-neutral-900 dark:bg-neutral-800">
                <BriefcaseIcon className="w-3 h-3 text-neutral-400 dark:text-neutral-400" />
              </span>
              <h3 className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center mb-1 text-md font-normal text-neutral-600 dark:text-neutral-200">
                BlackX{" "}
                <span className="text-neutral-500 text-xs font-normal me-2 rounded dark:text-neutral-500 ms-0 sm:mt-0 sm:mb-0 mt-0.5 mb-2">
                  Feb, 2020 - Jan, 2021
                </span>
              </h3>
              <p className="block mb-2 text-sm font-normal leading-none text-neutral-400 dark:text-neutral-500">
                Frontend Developer
              </p>
              <p className="mt-4 mb-4 text-base font-normal text-neutral-500 dark:text-neutral-400">
                Collaborated with close group of developers and translated
                wireframes into code. Built reusable components, improving load
                time by 10%. Integrated APIs, optimized components, handled
                authentication, and debugged with 25+ test cases, analyzing user
                requirements for performance needs.
              </p>
            </li>
          </ol>
        </div>

        {/* more screens */}
        <div className="flex items-center mt-8">
          <h4 className="newsreader-400">More screens</h4>
        </div>

        <p className="mt-4 mb-10 text-base font-normal text-neutral-500 dark:text-neutral-400">
          These components were created based on requirements for re-developing
          the Blackx web analytics screen. Below are some of the components and
          design styles that I mocked.
        </p>

        <BentoGridWork imgs={blackxImages} />

        {/* read more */}
        <div className="flex items-center mt-8">
          <h4 className="newsreader-400">Read more?</h4>
        </div>

        <div className="mt-4 mb-6">
          <ul className="flex flex-wrap">
            <li className="bg-neutral-100 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-50 dark:hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-neutral-900 dark:bg-neutral-800 px-2.5 py-1 rounded-2xl mr-2 mb-2">
              <Link
                className="flex items-center"
                rel="noopener noreferrer"
                target="_blank"
                href="/resume.pdf"
              >
                <p className="mr-2 text-sm">Download CV</p>
                <DownloadIcon className="w-3 h-3" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
