import Link from "next/link";
import Scroller from "./components/scroller";
import { ArrowRightTopIcon } from "./components/icons";

const social = [
  { name: "boro@github", url: "https://github.com/Boro23-wq" },
  { name: "boro@linkedin", url: "https://www.linkedin.com/in/sintu-boro/" },
  {
    name: "boro@mail",
    url: "mailto:sboro2899@gmail.com?subject=Let's%20connect!",
  },
];

export default function Page() {
  return (
    <div>
      <section className="leading-relaxed dark:text-[#d4d4d4]">
        {/* intro */}
        <div className="fade-in delay-200 flex items-center mb-4">
          <h4 className="font-medium text-lg mb-5 tracking-normal">
            Sintu Boro
          </h4>
        </div>
        <p className="fade-in mb-5 delay-400">
          <span className="newsreader-400">Developing experiences.</span> I have
          transformed complex business processes into efficient and
          user-friendly digital experiences.
        </p>

        <p className="fade-in delay-400 text-md">
          Currently working alongside the{" "}
          <Link
            href="https://www.beacontechinc.com/"
            target="_blank"
            className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
          >
            Beacon Tech
          </Link>{" "}
          team to build and deliver robust software solutions.
        </p>

        {/* highlight */}
        <div className="flex items-center mt-14">
          <h4 className="newsreader-400 fade-in delay-600">Highlight.</h4>
        </div>
        <div className="my-4 fade-in delay-800">
          <Scroller />
        </div>

        {/* experience */}
        <div className="fade-in delay-1000 flex items-center mt-10">
          <h4 className="newsreader-400 mb-2">Current experience.</h4>
        </div>
        <div className="fade-in delay-1200">
          <div className="pt-4 mb-2.5 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              Programmer Analyst IV with the Enterprise and Data Architecture
              team at the{" "}
              <Link
                className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
                href="https://dcf.wisconsin.gov/"
                target="_blank"
              >
                Wisconsin Department of Children and Families
              </Link>{" "}
              (DCF).
            </p>
          </div>
          <div className="pt-4 mb-2.5 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              My day-to-day activities include administering and customizing the
              Collibra DGC platform to meet user and agency requirements,
              translating business processes into workflows; utilize APIs, and
              automation scripts, to support platform administration and manage
              data organization to name a few.
            </p>
          </div>

          <div className="pt-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              Discover more about my current projects, past and present{" "}
              <Link
                className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
                href="/work"
              >
                work
              </Link>
              .
            </p>
          </div>

          {/* connect */}
          <div className="fade-in delay-1000 flex items-center mt-14">
            <h4 className="newsreader-400">Connect with me.</h4>
          </div>
          <div className="fade-in delay-1400 my-6">
            <ul className="flex flex-wrap">
              {social.map((social, index) => (
                <li
                  key={index}
                  className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-2xl mr-2 mb-2"
                >
                  <a
                    className="flex items-center text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-all"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={social.url}
                  >
                    <p className="mr-1 text-sm">{social.name}</p>
                    <ArrowRightTopIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
