import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CV — Mahsa Hosseini",
};

const education = [
  {
    school: "Frank Mohr Institute",
    detail: "Fine Art and Design, Master",
    years: "2024–2026",
  },
  {
    school: "Tehran University of Art",
    detail: "Handicrafts, Bachelor",
    years: "2018–2021",
  },
];

const courses = [
  { title: "Art History", instructor: "Hamid Severi", years: "2019–2021" },
  { title: "Contemporary Drawing", instructor: "Hamid Severi", years: "2020" },
  { title: "Modern Sculpture", instructor: "Helia Darabi", years: "2020" },
];

const training = [
  { title: "Pottery — Wheel-throwing", instructor: "Khashyar Zivlaei", years: "2022" },
  { title: "Carpentry", instructor: "Hamze Defaei", years: "2021" },
  {
    title: "Pottery",
    subtitle: "Hand-building and Wheel-throwing",
    instructor: "Mahsa Hakak",
    years: "2016–2017",
  },
];

const experience = [
  {
    role: "Content Creator",
    place: "Darz.art Platform",
    years: "2021–2023",
    detail: [
      "Maintained the platform's bilingual exhibition archive",
      "Wrote and translated listings and show texts between Persian and English",
      "Researched and tracked exhibitions across Tehran, other Iranian cities, and internationally, and built artist profiles for the platform",
      "Interviewed artists for the platform",
      "Photographed and documented gallery exhibitions, edited the images, and published them to the site",
    ],
    link: { label: "darz.art/en/shows", href: "https://darz.art/en/shows" },
  },
  {
    role: "Volunteer Content Creator",
    place: "Honaragah Digital Magazine",
    years: "2021",
    detail: [
      "Writing about visual artists and their recent works in Persian",
      "Translating articles and short essays about the visual arts from English to Persian",
    ],
  },
  {
    role: "Photographer",
    place: "Ala Kindergarten",
    years: "2018",
    detail: ["Photographed children and daily activities"],
  },
];

const residencies = [
  {
    title: "E-waste Recycling Center Residency",
    instructor: "Organized by Luuk Schröder",
    years: "2025",
    place: "Apeldoorn",
  },
];

const scholarships = [
  {
    title: "Hanze Scholarship",
    detail: "Hanze University of Applied Sciences, Groningen",
    years: "2025/26",
  },
  {
    title: "NL Scholarship",
    detail:
      "Dutch Ministry of Education, Culture and Science and Hanze University of Applied Sciences",
    years: "2024/25",
  },
];

const workshops = [
  {
    title:
      "Specialized Online Workshop: Curatorial Studies – Introduction to Contemporary Curatorial Principles",
    instructor: "Organized by Maryam Majd Art Projects (mm.artprojects)",
    years: "2026",
  },
  {
    title:
      "Specialized Online Workshop: Art Project Management – From Idea to Execution, Documentation, and Evaluation",
    instructor: "Organized by Maryam Majd Art Projects (mm.artprojects)",
    years: "2026",
  },
  {
    title: "Landscape Crafting",
    instructor: "Led by Holy Dale and Willie Vogel",
    years: "2025",
  },
];

const workshopsAndTraining: {
  title: string;
  subtitle?: string;
  instructor: string;
  years: string;
}[] = [...workshops, ...training];

const exhibitions = [
  {
    title: "29 Way Out",
    subtitle: "FMI Graduation Show",
    place: "A-Kerk, Groningen",
    years: "25–28 June 2026",
  },
  {
    title: "Bakstain",
    place: "Groninger Museum, Groningen",
    years: "9 May–23 August 2026",
  },
  {
    title: "Noorderlicht Biennial: Machine Entanglements",
    subtitle: "Student Open Call Exhibition",
    place: "De Proef, Frederiksoord, Netherlands",
    years: "12 July–7 September 2025",
  },
  {
    title: "Between Green and Art",
    subtitle: "A Journey of Discovery",
    place: "Tuin In De Stad, Groningen",
    years: "19 June–19 July 2025",
  },
  {
    title: "Caring for Material Lives",
    place: "Roam, Groningen",
    years: "24 April–16 May 2025",
  },
  {
    title: "Body And Spirit",
    place: "Remonstrantse Kerk, Groningen",
    years: "7–11 October 2024",
  },
];

export default function CvPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-3 pt-24 pb-20 sm:px-5 lg:px-6">
        <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)]">CV</h1>

        <div className="mt-8 flex flex-col gap-1 text-lg">
          <span className="font-medium">Mahsa Hosseini</span>
          <span className="text-base text-ink-soft">Groningen, Netherlands</span>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl">Group Exhibitions</h2>
          <p className="mt-1 text-base text-ink-soft">Selected</p>
          <div className="mt-6 flex flex-col gap-5">
            {exhibitions.map((e) => (
              <div key={e.title} className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">{e.title}</span>
                  <span className="text-base text-ink-soft">{e.years}</span>
                </div>
                {e.subtitle && <span className="font-medium text-lg">{e.subtitle}</span>}
                <span className="text-base text-ink-soft">{e.place}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-12">
          <h2 className="font-display text-3xl">Experience</h2>
          <div className="mt-6 flex flex-col gap-8">
            {experience.map((e) => (
              <div key={e.role + e.place} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">
                    {e.role} — {e.place}
                  </span>
                  <span className="text-base text-ink-soft">{e.years}</span>
                </div>
                <ul className="flex flex-col gap-1 text-base text-ink-soft">
                  {e.detail.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 text-base underline decoration-ink/30 underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
                  >
                    {e.link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>



        <div className="mt-12">
          <h2 className="font-display text-3xl">Residencies</h2>
          <div className="mt-6 flex flex-col gap-4">
            {residencies.map((r) => (
              <div key={r.title} className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">{r.title}</span>
                  <span className="text-base text-ink-soft">{r.years}</span>
                </div>
                <span className="text-base text-ink-soft">{r.instructor}</span>
                <span className="text-base text-ink-soft">{r.place}</span>
              </div>
            ))}
          </div>
        </div>



        <div className="mt-12">
          <h2 className="font-display text-3xl">Scholarships</h2>
          <div className="mt-6 flex flex-col gap-4">
            {scholarships.map((sc) => (
              <div key={sc.title} className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">{sc.title}</span>
                  <span className="text-base text-ink-soft">{sc.years}</span>
                </div>
                <span className="text-base text-ink-soft">{sc.detail}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-12">
          <h2 className="font-display text-3xl">Education</h2>
          <div className="mt-6 flex flex-col gap-6">
            {education.map((e) => (
              <div key={e.school} className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">{e.school}</span>
                  <span className="text-base text-ink-soft">{e.years}</span>
                </div>
                <span className="text-base text-ink-soft">{e.detail}</span>
              </div>
            ))}
          </div>
        </div>



        <div className="mt-12">
          <h2 className="font-display text-3xl">Workshops</h2>
          <div className="mt-6 flex flex-col gap-4">
            {workshopsAndTraining.map((w) => (
              <div key={w.title} className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">{w.title}</span>
                  <span className="text-base text-ink-soft">{w.years}</span>
                </div>
                {w.subtitle && (
                  <span className="font-medium text-lg">{w.subtitle}</span>
                )}
                <span className="text-base text-ink-soft">{w.instructor}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-12">
          <h2 className="font-display text-3xl">Courses</h2>
          <div className="mt-6 flex flex-col gap-4">
            {courses.map((c) => (
              <div key={c.title} className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-medium text-lg">{c.title}</span>
                  <span className="text-base text-ink-soft">{c.years}</span>
                </div>
                <span className="text-base text-ink-soft">{c.instructor}</span>
              </div>
            ))}
          </div>
        </div>


      </main>
      <Footer />
    </>
  );
}
