import HomeScene from "@/components/HomeScene";
import BioSection from "@/components/BioSection";
import DrawingCanvas from "@/components/DrawingCanvas";
import HomeFooter from "@/components/HomeFooter";

export default function Home() {
  return (
    <div className="bg-[#d6c9f2]">
      <HomeScene />
      <BioSection />
      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Draw something</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Download it, or send it Mahsa&rsquo;s way if you please.
          </p>
        </div>
        <div className="mt-8">
          <DrawingCanvas />
        </div>
      </section>
      <HomeFooter />
    </div>
  );
}
