import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 font-geistmono text-xs text-slate-500 sm:flex-row dark:text-neutral-500">
        <p>
          <span className="text-emerald-600 dark:text-emerald-400">$</span>{" "}
          echo &quot;&copy; {new Date().getFullYear()} Dawood Waseem&quot;
        </p>

        <p className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          available for opportunities
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/dawoodwaseem5-bit"
            target="_blank"
            aria-label="GitHub"
            className="transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <BsGithub size={16} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dawood-waseem-94724221a/"
            target="_blank"
            aria-label="LinkedIn"
            className="transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <BsLinkedin size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
