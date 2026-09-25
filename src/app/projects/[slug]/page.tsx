import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, type Section } from "@/data/projects";
import Footer from "@/components/Footer";
import AnimatedTitle from "@/components/AnimatedTitle";
import ArcTitle from "@/components/ArcTitle";
import Slideshow from "@/components/Slideshow";
import GunsPlayfulGallery from "@/components/GunsPlayfulGallery";
import StorylinesMarquee from "@/components/StorylinesMarquee";

function GalleryGrid({ section }: { section: Extract<Section, { type: "gallery" }> }) {
  const colClass =
    section.columns === 5
      ? "grid-cols-2 sm:grid-cols-5"
      : section.columns === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : section.images.length === 1
      ? "grid-cols-1"
      : "grid-cols-2 sm:grid-cols-2";
  const sizeClass =
    section.size === "sm"
      ? "mx-auto max-w-sm"
      : section.size === "lg"
      ? "w-[108%] -ml-[4%]"
      : "";
  const gapClass = section.gap === "loose" ? "gap-6 sm:gap-8" : "gap-3";
  const uniform = section.images.length > 1;
  return (
    <div className={`flex flex-col gap-3 ${sizeClass}`}>
      <div className={`grid ${gapClass} ${colClass}`}>
        {section.images.map((img, j) => (
          <div key={j} className="flex h-full flex-col gap-2">
            <div
              className={`relative overflow-hidden rounded-sm bg-paper-deep ${
                uniform ? "aspect-[4/3]" : "mx-auto w-fit"
              }`}
            >
              {uniform ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className={`object-cover ${section.treatment === "grain" ? "grain-treatment" : ""}`}
                />
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  sizes={section.size === "sm" ? "24rem" : "(min-width: 640px) 52vw, 90vw"}
                  className={`h-auto max-h-[80vh] w-auto max-w-full object-contain ${
                    section.treatment === "grain" ? "grain-treatment" : ""
                  }`}
                />
              )}
            </div>
            {img.caption && (
              <p
                className={`whitespace-pre-line text-center text-sm leading-snug ${
                  section.captionColor ? "" : "text-accent"
                }`}
                style={section.captionColor ? { color: section.captionColor } : undefined}
              >
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
      {section.caption && (
        <p
          className={`whitespace-pre-line text-center text-sm ${
            section.captionColor ? "" : "text-accent"
          }`}
          style={section.captionColor ? { color: section.captionColor } : undefined}
        >
          {section.caption}
        </p>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return { title: project ? `${project.title} — Mahsa Hosseini` : "Projects" };
}

const accentVar: Record<string, string> = {
  pink: "var(--pink)",
  skyblue: "var(--skyblue)",
  lavender: "var(--lavender)",
  indigo: "var(--indigo)",
};

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const visibleProjects = projects.filter((p) => !p.hidden);
  const visibleIndex = visibleProjects.findIndex((p) => p.slug === slug);
  const next =
    visibleIndex === -1
      ? visibleProjects[0]
      : visibleProjects[(visibleIndex + 1) % visibleProjects.length];

  const themeStyle: React.CSSProperties & Record<string, string> = {
    "--accent": accentVar[project.accent],
  };
  if (project.theme) {
    themeStyle.background = project.theme.bg;
    themeStyle.color = project.theme.text;
    themeStyle["--ink"] = project.theme.text;
    themeStyle["--ink-soft"] = project.theme.textSoft;
    if (project.theme.cardBg) themeStyle["--paper-deep"] = project.theme.cardBg;
  }

  return (
    <>
    <main
      className="w-full min-h-screen overflow-x-hidden pt-20 pb-16"
      style={themeStyle}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="text-sm text-ink-soft hover:text-accent transition-colors"
      >
        &larr; Projects
      </Link>

      {project.animateTitle ? (
        <AnimatedTitle title={project.title} />
      ) : project.arcTitle ? (
        <ArcTitle title={project.title} />
      ) : (
        <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,5rem)] leading-[1.02]">
          {project.title}
        </h1>
      )}
      <p className="mt-2 text-sm uppercase tracking-[0.14em] text-ink-soft">
        {project.medium}
      </p>
      {project.credit && (
        <p className="mt-1 text-sm text-ink-soft">{project.credit}</p>
      )}
      {project.venue && (
        <p className="mt-1 text-sm text-ink-soft">{project.venue}</p>
      )}

      <div className="mt-10 flex flex-col gap-10">
        {(() => {
          const nodes: React.ReactNode[] = [];
          let headingCount = 0;

          for (let i = 0; i < project.sections.length; i++) {
          const section = project.sections[i];

          if (section.type === "intro") {
            nodes.push(
              <div key={i} className="mx-auto flex w-full max-w-3xl flex-col gap-4">
                {section.body.map((p, j) => {
                  const link = section.links?.find((l) => p.includes(l.word));
                  if (!link) {
                    return (
                      <p key={j} className="whitespace-pre-line text-lg leading-relaxed">
                        {p}
                      </p>
                    );
                  }
                  const idx = p.indexOf(link.word);
                  const before = p.slice(0, idx);
                  const after = p.slice(idx + link.word.length);
                  return (
                    <p key={j} className="whitespace-pre-line text-lg leading-relaxed">
                      {before}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 hover:opacity-80"
                        style={{ color: link.color }}
                      >
                        {link.word}
                      </a>
                      {after}
                    </p>
                  );
                })}
                {section.poem && (
                  <div className="mt-2 flex flex-col gap-2">
                    {section.poem.lines.map((line, j) => (
                      <p
                        key={j}
                        className={`text-lg leading-tight ${
                          j === 0 ? "font-bold not-italic" : "italic"
                        }`}
                        style={{ color: section.poem?.color ?? undefined }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
            continue;
          }

          if (section.type === "heading") {
            headingCount += 1;
            const tint = headingCount % 2 === 0 ? "bg-accent/8" : "bg-accent/[0.14]";
            const tilt = headingCount % 2 === 0 ? "-rotate-1" : "rotate-1";
            const boxed = section.boxed !== false;
            const wave = (
              <div className="w-[112%] -ml-[6%]">
                <svg
                  viewBox="0 0 340 14"
                  preserveAspectRatio="none"
                  className="h-3 w-full"
                  style={{ color: section.lineColor ?? undefined }}
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7c9-9 18 9 27 0s18-9 27 0 18 9 27 0 18-9 27 0 18 9 27 0 18-9 27 0 18 9 27 0 18-9 27 0 18 9 27 0 18-9 27 0 18 9 27 0"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className={section.lineColor ? undefined : "text-accent"}
                  />
                </svg>
              </div>
            );

            const nextSection = project.sections[i + 1];
            if (boxed && section.panelBg && nextSection?.type === "gallery") {
              nodes.push(
                <div key={i} className="flex flex-col gap-4">
                  {wave}
                  <div
                    className="flex flex-col gap-8 rounded-2xl px-7 py-10 sm:px-12 sm:py-14"
                    style={{ background: section.panelBg, color: section.panelText }}
                  >
                    <div className="flex flex-col gap-3">
                      <h2 className="font-display text-3xl">{section.title}</h2>
                      {section.body?.map((p, j) => (
                        <p key={j} className="text-lg leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                    <GalleryGrid section={nextSection} />
                  </div>
                </div>
              );
              i += 1;
              continue;
            }

            if (!boxed) {
              const titleColor = section.titleColor ?? section.lineColor;
              nodes.push(
                <div key={i} className="mx-auto flex w-full max-w-3xl flex-col gap-4">
                  {wave}
                  <h2
                    className={`font-display text-3xl ${titleColor ? "" : "text-accent"}`}
                    style={titleColor ? { color: titleColor } : undefined}
                  >
                    {section.title}
                  </h2>
                  {section.body?.map((p, j) => (
                    <p
                      key={j}
                      className={`whitespace-pre-line text-lg ${
                        p.includes("\n") ? "leading-tight" : "leading-relaxed"
                      }`}
                      style={titleColor ? { color: titleColor } : undefined}
                    >
                      {p}
                    </p>
                  ))}
                  {section.poem && (
                    <div className="mt-4 flex flex-col gap-2">
                      {section.poem.title && (
                        <p
                          className="text-xl leading-relaxed"
                          style={{ color: section.poem.color ?? titleColor ?? undefined }}
                        >
                          {section.poem.title}
                        </p>
                      )}
                      {section.poem.lines.map((line, j) => (
                        <p
                          key={j}
                          className="text-lg leading-tight"
                          style={{ color: section.poem?.color ?? titleColor ?? undefined }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
              continue;
            }

            nodes.push(
              <div key={i} className="mx-auto flex w-full max-w-3xl flex-col gap-4">
                {wave}
                <div
                  className={`flex flex-col gap-3 rounded-2xl ${tilt} px-6 py-8 sm:px-9 ${
                    section.panelBg ? "" : tint
                  }`}
                  style={
                    section.panelBg
                      ? { background: section.panelBg, color: section.panelText }
                      : undefined
                  }
                >
                  <h2
                    className={`font-display text-3xl ${section.panelText ? "" : "text-accent"}`}
                  >
                    {section.title}
                  </h2>
                  {section.body?.map((p, j) => (
                    <p key={j} className="text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );
            continue;
          }

          if (section.type === "gallery" && section.layout === "slideshow") {
            nodes.push(
              <Slideshow
                key={i}
                images={section.images}
                captionColor={section.captionColor}
                treatment={section.treatment}
              />
            );
            continue;
          }

          if (section.type === "gallery") {
            nodes.push(<GalleryGrid key={i} section={section} />);
            continue;
          }

          if (section.type === "video") {
            const stillImage = (
              <Image
                src={section.still}
                alt={section.alt}
                placeholder="blur"
                sizes="90vw"
                className="h-auto max-h-[80vh] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            );

            nodes.push(
              <div key={i} className="flex w-full flex-col gap-2">
                {section.href ? (
                  <a
                    href={section.href}
                    target={section.href.startsWith("http") ? "_blank" : undefined}
                    rel={section.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group relative block w-fit self-center overflow-hidden rounded-sm bg-paper-deep"
                  >
                    {stillImage}
                    {section.showPlayIcon !== false && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/90 shadow-lg transition-transform group-hover:scale-110">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--ink)">
                            <path d="M6 4l10 6-10 6V4z" />
                          </svg>
                        </span>
                      </span>
                    )}
                  </a>
                ) : (
                  <div className="relative mx-auto w-fit overflow-hidden rounded-sm bg-paper-deep">
                    {stillImage}
                  </div>
                )}
                {section.caption && (
                  <p
                    className={`text-center text-sm ${section.captionColor ? "" : "text-accent"}`}
                    style={section.captionColor ? { color: section.captionColor } : undefined}
                  >
                    {section.caption}
                  </p>
                )}
                {section.href && section.linkLabel && (
                  <div className="flex items-center justify-center text-sm">
                    <a
                      href={section.href}
                      target={section.href.startsWith("http") ? "_blank" : undefined}
                      rel={section.href.startsWith("http") ? "noreferrer" : undefined}
                      className="underline decoration-ink/30 underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
                    >
                      {section.linkLabel}
                    </a>
                  </div>
                )}
              </div>
            );
            continue;
          }

          if (section.type === "marquee") {
            nodes.push(
              <div key={i} className="flex flex-col gap-3">
                <StorylinesMarquee images={section.images} />
                {section.caption && (
                  <p
                    className={`whitespace-pre-line text-center text-sm ${section.captionColor ? "" : "text-accent"}`}
                    style={section.captionColor ? { color: section.captionColor } : undefined}
                  >
                    {section.caption}
                  </p>
                )}
              </div>
            );
            continue;
          }

          if (section.type === "placeholder") {
            nodes.push(
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center rounded-sm border border-dashed border-ink/25 text-ink-soft"
              >
                {section.note}
              </div>
            );
            continue;
          }
          }

          return nodes;
        })()}
      </div>

      {project.playfulGallery && (
        <div className="mt-10">
          <GunsPlayfulGallery images={project.playfulGallery} />
        </div>
      )}

      <div className="mt-16 border-t border-ink/10 pt-8">
        <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col">
          <span className="text-xs uppercase tracking-[0.14em] text-ink-soft">
            Next
          </span>
          <span className="font-display text-3xl group-hover:text-accent transition-colors">
            {next.title}
          </span>
        </Link>
      </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
