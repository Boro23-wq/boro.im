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
      <section
        data-animation-controller="true"
        className="leading-relaxed dark:text-[#d4d4d4]"
      >
        {/* intro */}
        <div
          style={{ "--stagger": 1 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mb-4"
        >
          <h4 className="font-medium text-lg mb-5 tracking-normal">
            Sintu Boro
          </h4>
        </div>

        {/* bio */}
        <p
          style={{ "--stagger": 2 } as React.CSSProperties}
          data-animate
          className="animate-enter mb-5"
        >
          <span className="newsreader-400">Developing experiences.</span> I have
          transformed complex business processes into efficient and
          user-friendly interfaces.
        </p>

        {/* work highlight */}
        <p
          style={{ "--stagger": 3 } as React.CSSProperties}
          data-animate
          className="animate-enter text-md"
        >
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

        {/* main blog/project highlight */}
        <div
          style={{ "--stagger": 4 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-14"
        >
          <h4 className="newsreader-400 ">Highlight.</h4>
        </div>

        {/* scroll */}
        <div
          style={{ "--stagger": 5 } as React.CSSProperties}
          data-animate
          className="my-4 animate-enter"
        >
          <Scroller />
        </div>

        {/* experience */}
        <div
          style={{ "--stagger": 6 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-10"
        >
          <h4 className="newsreader-400 mb-2">Current experience.</h4>
        </div>

        <div
          style={{ "--stagger": 7 } as React.CSSProperties}
          data-animate
          className="animate-enter"
        >
          <div className="pt-4 mb-2.5 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              I'm currently working as a Programmer Analyst IV with the
              Enterprise and Data Architecture team at the{" "}
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

          <div
            style={{ "--stagger": 8 } as React.CSSProperties}
            data-animate
            className="animate-enter pt-4 mb-2.5 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <p>
              My day-to-day activities include administering and customizing the
              Collibra DGC platform to meet user requirements, translating
              business processes into workflows; support platform administration
              and data organization.
            </p>
          </div>

          <div
            style={{ "--stagger": 9 } as React.CSSProperties}
            data-animate
            className="animate-enter pt-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <p>
              Discover more about my current projects, past and present work{" "}
              <Link
                className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
                href="/work"
              >
                here
              </Link>
              .
            </p>
          </div>

          {/* connect */}
          <div
            style={{ "--stagger": 10 } as React.CSSProperties}
            data-animate
            className="animate-enter flex items-center mt-14"
          >
            <h4 className="newsreader-400">Connect with me.</h4>
          </div>

          <div
            style={{ "--stagger": 11 } as React.CSSProperties}
            data-animate
            className="animate-enter delay-1400 my-6"
          >
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
