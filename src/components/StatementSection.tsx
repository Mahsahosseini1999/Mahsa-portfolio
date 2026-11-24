import { statement } from "@/data/statement";

export default function StatementSection() {
  return (
    <section className="mx-auto w-full max-w-2xl px-5 pb-16 pt-10 sm:px-8 lg:px-12">
      <h2 className="font-display text-3xl sm:text-4xl">Statement</h2>
      <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg">
        {statement.map((p, i) => (
          <p key={i} className="whitespace-pre-line">{p}</p>
        ))}
      </div>
    </section>
  );
}
