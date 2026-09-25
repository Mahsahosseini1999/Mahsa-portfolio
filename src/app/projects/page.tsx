import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Mahsa Hosseini",
};

const accentVar: Record<string, string> = {
  pink: "var(--pink)",
  skyblue: "var(--skyblue)",
  lavender: "var(--lavender)",
  indigo: "var(--indigo)",
};

export default function ProjectsPage() {
  return (
    <>
    <main className="mx-auto w-full max-w-7xl px-3 pt-20 pb-16 sm:px-4 lg:px-6">
      <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)]">Projects</h1>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.filter((project) => !project.hidden).map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
            style={{ ["--accent" as string]: project.theme?.bg ?? accentVar[project.accent] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/15 bg-paper-deep">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-2xl text-ink-soft">
                    in progress
                  </span>
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 0 3px var(--accent)" }}
              />
            </div>
            <h2 className="mt-4 font-display text-2xl group-hover:text-accent transition-colors">
              {project.title}
            </h2>
          </Link>
        ))}
      </div>
    </main>
    <Footer />
    </>
  );
}
