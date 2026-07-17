import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import ProjectsList from "../components/projects-list";

export const metadata = {
  title: "Projects — Dawood Waseem",
  description:
    "Featured projects by Dawood Waseem: Afraz Apparel, Auto-Aid, and Nutri-Track.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex cursor-pointer items-center gap-2 font-geistmono text-sm text-slate-500 transition-colors duration-200 hover:text-emerald-600 dark:text-neutral-500 dark:hover:text-emerald-400"
        >
          <HiArrowLeft size={14} />
          back to home
        </Link>

        <div className="mb-12">
          <p className="mb-2 font-geistmono text-sm text-emerald-600 dark:text-emerald-400">
            04
            <span className="text-slate-400 dark:text-neutral-600">.</span>{" "}
            <span className="text-slate-400 dark:text-neutral-600">{"//"}</span>{" "}
            projects
          </p>
          <h1 className="font-geist text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl dark:text-neutral-100">
            Featured Projects
          </h1>
          <div className="mt-4 h-px w-16 bg-emerald-500/70" />
          <p className="mt-5 max-w-2xl font-geist text-base leading-relaxed text-slate-600 dark:text-neutral-400">
            A selection of web and mobile applications I&apos;ve built — from
            client work to full-stack products.
          </p>
        </div>

        <ProjectsList />
      </div>
    </main>
  );
}
