import { Sidebar } from "../components/sidebar";

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
        <div className="prose prose-neutral dark:prose-invert mt-8 md:mt-10">
          <p className="!text-neutral-700 dark:!text-neutral-400">
            As a developer/programmer analyst, I specialize in customizing and
            optimizing software platforms for improved efficiency and user
            experience. I focus on delivering impactful solutions that enhance
            both the functionality and usability of the systems I work with.
          </p>
          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

          <p className="newsreader-400-tall !mb-0">Beacon Technologies, Inc.</p>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-sm !text-neutral-500 !dark:text-neutral-400">
              IT Consultant/Programmer Analyst IV
            </p>
            <p className="hidden md:block text-xs !text-neutral-500 !dark:text-neutral-400">
              May, 2024 - Current
            </p>
          </div>
          <p className="!text-neutral-500 dark:!text-neutral-400">
            I joined Beacon Technologies as a merger with Smart Solutions. While
            the company name might have changed, the core focus of being part of
            a great team and delivering robust software solutions remains the
            same.
          </p>
          <ul>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Completed POC phase, developing code for Collibra ingestion.
              Utilized Postman scripts for content upload, reducing upload time
              by 30%. Conducted preliminary testing on 10+ sample files,
              ensuring 99% accuracy for import readiness.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Implemented workflows and governance flows, translating business
              processes into 10+ efficient workflows within the Collibra
              platform.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Resolved 90% of production issues within a week, ensuring
              uninterrupted operation. Developed script for bulk deletion,
              reducing deletion time by 40%.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Streamlined asset management processes, resulting in 50% reduction
              in manual effort.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Reviewed 20 existing diagrams, implementing best practices for
              visualizing relationships.
            </li>
          </ul>
          <p className="!text-neutral-500 dark:!text-neutral-400">
            Since joining Beacon Tech I have addressed code issues, increased BO
            extraction efficiency by 25%, conducted comprehensive BO extractor
            runs on 50+ files, identified and resolved 60% of existing issues.
          </p>

          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

          <h2 className="newsreader-400-tall !mb-0">Smart Solutions, Inc.</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="my-0 text-sm !text-neutral-500 !dark:text-neutral-400">
              IT Consultant/Programmer Analyst IV
            </p>
            <p className="hidden md:block my-0 text-xs !text-neutral-500 !dark:text-neutral-400">
              Sep, 2023 - May, 2024
            </p>
          </div>
          <ul>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Administered and customized the Collibra platform to meet user and
              agency requirements; utilized Python for automating tasks,
              contributing to improved functionalities.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Implemented workflows and governance flows, translating business
              processes into 10+ efficient workflows within the Collibra
              platform.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Worked extensively with Collibra platform, utilizing Java and
              configuring APIs to support administration.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Contributed to a 20% increase in user interface customization and
              optimization; mapped and optimized workflows, resulting in a 15%
              improvement in business process efficiency.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Streamlined asset management processes, resulting in 50% reduction
              in manual effort.
            </li>
          </ul>

          <hr className="my-6 border-neutral-100 dark:border-neutral-800" />

          <h2 className="newsreader-400-tall !mb-0">
            Wave Drowning Prevention Systems
          </h2>
          <div className="flex flex-col md:flex-row justify-between">
            <p className="my-0 text-sm !text-neutral-500 !dark:text-neutral-400">
              UI/UX Designer and Developer
            </p>
            <p className="hidden md:block my-0 text-xs !text-neutral-500 !dark:text-neutral-400">
              May, 2022 - Sep, 2023
            </p>
          </div>
          <ul>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Demonstrated all stages of the UI/UX development process; created
              hypothetical personas, experience maps, sitemaps and utilized
              Figma to develop wireframes and prototypes taking user and design
              specifications into consideration.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Worked seamlessly in an Agile environment; collaborated with
              senior developers to represent information architectures,
              workflows, UI concepts and documented interaction design
              specifications including detailed design rationale.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Followed the current best practices and conventions in UX design
              and applied them to build effective and compelling screen-based
              single-page applications (SPA) for WAVE applications using React,
              while assisting the development team.
            </li>
            <li className="!text-neutral-500 dark:!text-neutral-400">
              Collaborated effectively with the marketing, development teams and
              senior engineers to achieve quarterly KPIs.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
