import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { AnimateBrand } from "./components/animate-brand";

export const metadata = {
  title: "404",
  description: "404 - Not found.",
};

export default function NotFound() {
  return (
    <>
      <section className="dark:text-[#d4d4d4]">
        <AnimateBrand />

        <div className="flex items-center mb-8">
          <h1 className="inline-block border-r-2 pr-6 mr-5 dark:border-r-neutral-600 text-xl font-semibold tracking-tighter">
            404
          </h1>
          <p className="inline-block text-md">Page could not be found.</p>
        </div>
        <p className="mb-4 newsreader-400">
          Always remember, Frodo, the page is trying to get back to its master.
          It wants to be found.
        </p>

        <div className="flex items-center gap-2 mt-16 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 dark:text-neutral-500 transition-all">
          <Undo2Icon className="w-3 h-3 mb-1" />
          <Link className="newsreader-400" href={"/"}>
            Return home
          </Link>
        </div>
      </section>
    </>
  );
}
