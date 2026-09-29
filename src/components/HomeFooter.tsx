export default function HomeFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 py-10 text-center sm:px-8 lg:px-12">
      <p className="text-sm text-ink-soft">Groningen, Netherlands</p>
      <a
        href="mailto:Hosseiniii.mahsaa@gmail.com"
        className="mt-2 inline-block text-sm underline decoration-ink/30 underline-offset-4 hover:decoration-accent hover:text-accent transition-colors"
      >
        Hosseiniii.mahsaa@gmail.com
      </a>
      <div className="mt-4 flex items-center justify-center gap-4">
        <a
          href="https://on.soundcloud.com/lIrFovyiY4OGvQjVDy"
          target="_blank"
          rel="noreferrer"
          aria-label="SoundCloud"
          className="text-ink transition-colors hover:text-accent"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 15.5v-3M5.2 16v-5M7.4 16v-7M9.6 16.2V10M11.8 16.2V8.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M12.2 16.2h6.3a2.9 2.9 0 0 0 .5-5.76 3.9 3.9 0 0 0-7.4-1.5 2.3 2.3 0 0 0-.9-.06z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href="https://youtube.com/@mahsahosseini99"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="text-ink transition-colors hover:text-accent"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5.5" width="20" height="13" rx="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" />
          </svg>
        </a>
        <a
          href="https://mahsa.bandcamp.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Bandcamp"
          className="text-ink transition-colors hover:text-accent"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 4.5l16 7.5-16 7.5z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
