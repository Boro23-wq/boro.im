import Link from "next/link";
import Scroller from "./components/scroller";
import { ArrowRightTopIcon } from "./components/icons";

const social = [
  { name: "github", url: "https://github.com/Boro23-wq" },
  { name: "linkedin", url: "https://www.linkedin.com/in/sintu-boro/" },
  { name: "x", url: "https://x.com/sdotboro" },
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
          <span className="newsreader-400">Developing experiences.</span> I take complicated
          business processes and turn them into simple, clean interfaces that are easy to work
          with.
        </p>

        {/* main blog/project highlight */}
        <div
          style={{ "--stagger": 3 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-14"
        >
          <h4 className="newsreader-400">Highlight.</h4>
        </div>

        {/* scroll */}
        <div
          style={{ "--stagger": 4 } as React.CSSProperties}
          data-animate
          className="my-4 animate-enter"
        >
          <Scroller />
        </div>

        {/* experience */}
        <div
          style={{ "--stagger": 5 } as React.CSSProperties}
          data-animate
          className="animate-enter flex items-center mt-10"
        >
          <h4 className="newsreader-400 mb-2">Current experience.</h4>
        </div>

        <div
          style={{ "--stagger": 6 } as React.CSSProperties}
          data-animate
          className="animate-enter"
        >
          <div className="pt-4 mb-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              These days, I&apos;m working with the{" "}
              <Link
                className="underline underline-offset-2 decoration-1 decoration-neutral-200 dark:decoration-neutral-600 hover:decoration-neutral-400 hover:dark:decoration-neutral-300 transition-all"
                href="https://wavedds.com/"
                target="_blank"
              >
                Wave DDS
              </Link>{" "}
              team on software that helps keep swimmers safe. I spend my time shaping interfaces
              that feel fast, intuitive, and easy for anyone to use, while also leading refactors
              and helping the team standardize how we build things.
            </p>
          </div>

          <div
            style={{ "--stagger": 7 } as React.CSSProperties}
            data-animate
            className="animate-enter pt-4 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <p>
              Lately, I&apos;ve been building a customer portal so Wave&apos;s customers can keep an
              eye on hub activity more easily. If you&apos;re curious, you can check out more of
              what I&apos;ve built, past and present,{" "}
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
            style={{ "--stagger": 8 } as React.CSSProperties}
            data-animate
            className="animate-enter flex items-center mt-14"
          >
            <h4 className="newsreader-400">Connect with me.</h4>
          </div>

          <div
            style={{ "--stagger": 9 } as React.CSSProperties}
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
