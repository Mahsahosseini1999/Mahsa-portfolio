import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Mahsa Hosseini",
};

export default function ContactPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-3 pt-24 pb-20 sm:px-5 lg:px-6">
        <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)]">Contact</h1>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
