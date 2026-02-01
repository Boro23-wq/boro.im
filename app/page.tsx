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
      <section data-animation-controller="true" className="leading-7 dark:text-[#d4d4d4]">
        {/* intro */}
        <div
          style={{ "--stagger": 1 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mb-4"
        >
          <h4 className="font-medium text-lg mb-8 tracking-normal">Sintu Boro</h4>
        </div>

        {/* bio */}
        <p
          style={{ "--stagger": 2 } as React.CSSProperties}
          data-animate
          className="animate-enter mb-8"
        >
          <span className="newsreader-400">Developing experiences.</span> I transform complex
          business processes into efficient and user-friendly interfaces — delivering solutions that
          are intuitive, scalable, and easy to use.
        </p>

        {/* Building Bite section - NEW */}
        <div
          style={{ "--stagger": 4 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-14"
        >
          <h4 className="newsreader-400">Building Bite.</h4>
        </div>

        <Link
          href="/project/bite"
          style={{ "--stagger": 5 } as React.CSSProperties}
          data-animate
          className="animate-enter block my-6 group"
        >
          <div className="relative overflow-hidden rounded-sm border border-neutral-200/30 dark:border-neutral-700/30 bg-gradient-to-br from-white/60 via-white/50 to-neutral-100/60 dark:from-neutral-800/60 dark:via-neutral-900/50 dark:to-neutral-900/60 backdrop-blur-xl p-4 transition-all duration-300">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-neutral-200 dark:border-neutral-700 p-0.5 mr-4 bg-white dark:bg-neutral-900">
                    <img
                      src="/projects/bite/bite-logo.png"
                      alt="Bite logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <h3 className="text-xl font-semibold newsreader-400">Bite — AI Recipe Saver</h3>
                </div>

                <div className="mt-[-28] text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  <ArrowRightTopIcon />
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Save recipes from anywhere on the web using AI. Building an MVP that lets you
                organize and manage your recipe collection effortlessly.
              </p>

              {/* Footer Row */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-1 rounded-sm bg-green-100/80 dark:bg-green-900/40 text-green-700 dark:text-green-400 backdrop-blur-sm">
                  In Progress
                </span>

                <span className="text-neutral-500 dark:text-neutral-400">Updated weekly</span>
              </div>
            </div>
          </div>
        </Link>

        {/* main blog/project highlight */}
        <div
          style={{ "--stagger": 6 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-10"
        >
          <h4 className="newsreader-400">Highlight.</h4>
        </div>

        {/* scroll */}
        <div
          style={{ "--stagger": 7 } as React.CSSProperties}
          data-animate
          className="my-4 animate-enter"
        >
          <Scroller />
        </div>

        {/* experience */}
        <div
          style={{ "--stagger": 8 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-10"
        >
          <h4 className="newsreader-400 mb-2">Current experience.</h4>
        </div>

        <div
          style={{ "--stagger": 9 } as React.CSSProperties}
          data-animate
          className="animate-enter"
        >
          <div className="pt-4 mb-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              I am currently contracted with the{" "}
              <Link
                className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
                href="https://wavedds.com/"
                target="_blank"
              >
                Wave DDS
              </Link>{" "}
              team, to build swimmer safety software solutions. I build and maintain scalable React
              and Next.js applications, delivering accessible, high-performance interfaces.
            </p>
          </div>

          <div
            style={{ "--stagger": 10 } as React.CSSProperties}
            data-animate
            className="animate-enter pt-4 mb-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <p>
              I lead refactors and component standardization initiatives, collaborate
              cross-functionally, and contribute full-stack through Express-based APIs and SQL
              databases.
            </p>
          </div>

          <div
            style={{ "--stagger": 11 } as React.CSSProperties}
            data-animate
            className="animate-enter pt-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <p>
              My current project involves developing a customer portal for Wave customers to monitor
              hub activity for improved management and reporting. Discover more about my current
              projects, past and present work{" "}
              <Link
                className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
                href="/work"
              >
                <span className="newsreader-400">here</span>
              </Link>
              .
            </p>
          </div>

          {/* connect */}
          <div
            style={{ "--stagger": 12 } as React.CSSProperties}
            data-animate
            className="animate-enter flex items-center mt-14"
          >
            <h4 className="newsreader-400">Connect with me.</h4>
          </div>

          <div
            style={{ "--stagger": 13 } as React.CSSProperties}
            data-animate
            className="animate-enter my-6"
          >
            <ul className="flex flex-wrap">
              {social.map((social, index) => (
                <li
                  key={index}
                  className="bg-neutral-100 text-neutral-600 hover:bg-neutral-800 hover:text-neutral-50 dark:hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-neutral-900 dark:bg-neutral-800 px-2.5 py-1 rounded-sm mr-2 mb-2"
                >
                  <a
                    className="flex items-center"
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
