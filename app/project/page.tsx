import { Projects } from "../components/projects";
import { Sidebar } from "../components/sidebar";

export const metadata = {
  title: "Project",
  description: "Read my project.",
};

export default function Page() {
  return (
    <>
      <Sidebar path="/project" />

      <section className="leading-6">
        <p className="newsreader-400-tall font-medium mb-8 mt-1 dark:text-[#d4d4d4]">
          / project
        </p>
        <div className="mt-8 md:mt-10">
          <Projects />
        </div>
      </section>
    </>
  );
}
