import Link from "next/link";

export default function BioSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-2xl px-5 pb-16 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-4 text-justify font-display text-lg leading-snug sm:text-xl">
        <p>You have somehow ended up here.</p>
        <p>
          This is the website of Mahsa,
          <br />
          a multidisciplinary artist born in December 1999 (yes, from a century ago).
        </p>
        <p className="flex items-center gap-2">
          She is a serious One Piece fan.
          <Link href="/projects/one-piece" aria-label="One Piece — a straw hat" className="inline-block shrink-0 opacity-90 transition-opacity hover:opacity-100">
            <svg viewBox="0 0 100 70" width="40" height="28" fill="none">
              <ellipse cx="50" cy="30" rx="46" ry="10" fill="#ffd400" stroke="#013961" strokeWidth="2.4" />
              <path d="M22 30c0-14 12-24 28-24s28 10 28 24" fill="#ffd400" stroke="#013961" strokeWidth="2.4" />
              <rect x="22" y="26" width="56" height="8" rx="1" fill="#ff2e63" />
            </svg>
          </Link>
        </p>
        <p>Her mind is sometimes chaos; her room never is.</p>
        <p>She makes things. Collects materials. Gets obsessed with stuff. Changes her mind.</p>
        <p>There is probably a more professional way to explain all of this.</p>
      </div>
    </section>
  );
}
