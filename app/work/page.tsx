import { DownloadIcon } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import Link from "next/link";
import { InternAccordion } from "../components/int-accordion";

export const metadata = {
  title: "Work",
  description: "Read my work.",
};

export default function Page() {
  return (
    <>
      <Sidebar path="/work" />

      <section className="leading-relaxed dark:text-[#d4d4d4]">
        <p className="newsreader-400-tall font-medium mt-1">{`/ work`}</p>
        <div className="mt-8 flex justify-start items-start flex-col sm:flex-row">
          <div className="flex mr-6 mb-2">
            <p className="text-pretty text-neutral-800 dark:text-neutral-300">
              Experienced software developer with a knack for enhancing web
              applications, streamlining development processes through
              innovative solutions.
            </p>
          </div>

          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mt-3 mb-5 sm:mb-0 sm:mt-1.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-100 text-neutral-500 hover:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 px-2.5 py-1 rounded-md transition-all"
          >
            <button className="flex text-nowrap text-sm">Resume</button>
            <DownloadIcon className="flex w-3.5 h-3.5 ml-2" />
          </Link>
        </div>
        <div className="mt-5 mb-6">
          <p className="newsreader-400-tall">Experience</p>
        </div>
        <div className="prose prose-neutral dark:prose-invert mt-4">
          {/* beacon */}
          <>
            <div className="flex items-center relative !m-0 !mb-1">
              <p className="text-xs uppercase !mb-0">May, 2024 - Current</p>
              <hr className="flex-grow ml-2 border-t border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors duration-300" />
            </div>

            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
              <p className="text-md !mb-1.5 md:!mb-2 !text-neutral-800 dark:!text-neutral-300">
                Beacon Technologies, Inc.
              </p>
              <p className="text-sm !mb-0 !text-neutral-500 dark:!text-neutral-400">
                Programmer Analyst IV
              </p>
            </div>

            <ul className="!mt-4">
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Enhanced Efficiency:
                </span>{" "}
                Developed code for Collibra ingestion, reduced upload time by
                30% using Postman scripts, and increased BO extraction
                efficiency by 25%.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  {" "}
                  Workflow Optimization:
                </span>{" "}
                Implemented 10+ workflows within the Collibra platform,
                translating business processes and streamlining asset
                management, resulting in a 50% reduction in manual effort.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Issue Resolution:
                </span>{" "}
                Addressed and resolved 90% of production issues within a couple
                weeks time, ensuring uninterrupted operation, and resolved 60%
                of existing issues during comprehensive BO extractor runs on 50+
                files.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Process Improvement:
                </span>{" "}
                Reviewed and improved 20 existing diagrams, implementing best
                practices for visualizing relationships. Conducted preliminary
                testing on 10+ sample files, ensuring 99% accuracy for import
                readiness.
              </li>
            </ul>

            <div className="flex gap-2 flex-wrap mt-5">
              <div className="flex flex-wrap items-center text-sm gap-1.5 !ml-5 sm:!ml-0">
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  C#
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Python
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Java
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Collibra
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  .NET
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  REST
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  GraphQL
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  Postman
                </p>
              </div>
            </div>
          </>

          {/* Smart solutions */}
          <div className="mt-12">
            <div className="flex items-center relative !m-0 !mb-1">
              <p className="text-xs uppercase !mb-0">Sep, 2023 - May, 2024</p>
              <hr className="flex-grow ml-2 border-t border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors duration-300" />
            </div>

            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
              <p className="text-md !mb-1.5 md:!mb-2 !text-neutral-800 dark:!text-neutral-300">
                Smart Solutions, Inc.
              </p>
              <p className="text-sm !mb-0 !text-neutral-500 dark:!text-neutral-400">
                Programmer Analyst IV
              </p>
            </div>

            <ul className="!mt-4">
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Platform Administration:
                </span>{" "}
                Administered and customized the Collibra platform, leveraging
                Python for task automation, enhancing platform functionalities,
                and increasing user interface customization by 20%.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  {" "}
                  Implementation:
                </span>{" "}
                Implemented 10+ efficient workflows and governance flows,
                translating business processes into the Collibra platform,
                leading to a 15% improvement in business process efficiency.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  API and Process Streamlining:
                </span>{" "}
                Utilized Java and configured APIs to support platform
                administration, and streamlined asset management processes,
                achieving a 50% reduction in manual effort.
              </li>
            </ul>

            <div className="flex gap-2 flex-wrap mt-5">
              <div className="flex flex-wrap items-center text-sm gap-1.5 !ml-5 sm:!ml-0">
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Collibra
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Workflow
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Java
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  Python
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  REST
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  Eclipse
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  Flowable BPMN
                </p>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="mt-12">
            <div className="flex items-center relative !m-0 !mb-1">
              <p className="text-xs uppercase !mb-0">May, 2022 - Sep, 2023</p>
              <hr className="flex-grow ml-2 border-t border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors duration-300" />
            </div>

            <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
              <p className="text-md !mb-1.5 md:!mb-2 !text-neutral-800 dark:!text-neutral-300">
                Wave DDS
              </p>
              <p className="text-sm !mb-0 !text-neutral-500 dark:!text-neutral-400">
                UI/UX Designer
              </p>
            </div>

            <ul className="!mt-4">
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Comprehensive UI/UX Development:
                </span>{" "}
                Demonstrated all stages of UI/UX development, creating personas,
                experience maps, sitemaps, wireframes, and prototypes using
                Figma.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Agile Collaboration:
                </span>{" "}
                Worked seamlessly in an Agile environment, collaborating with
                senior developers to design and document interaction design
                specifications, including detailed design rationale.
              </li>
              <li className="!text-neutral-500 dark:!text-neutral-400 list-[upper-roman]">
                <span className="!text-neutral-700 dark:!text-neutral-300">
                  Effective UX Practices:
                </span>{" "}
                Followed best UX design practices to build compelling
                single-page applications (SPA) using React for WAVE
                applications, while collaborating with marketing and development
                teams to achieve quarterly KPIs.
              </li>
            </ul>

            <div className="flex gap-2 flex-wrap mt-5">
              <div className="flex flex-wrap items-center text-sm gap-1.5 !ml-5 sm:!ml-0">
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  React.js
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Javascript
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  Material UI
                </p>
                <p className="!mb-0 border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 rounded-lg">
                  {" "}
                  Figma
                </p>
              </div>
            </div>
          </div>

          {/* internship  */}
          <div className="mt-10 mb-4">
            <p className="newsreader-400-tall !text-neutral-800 dark:!text-neutral-300">
              Internship
            </p>
          </div>

          <p>
            I have experience from internships working with aspects of
            development, from design and implementation to deployment.
          </p>

          <InternAccordion />

          {/* Slotly */}
        </div>
      </section>
    </>
  );
}
