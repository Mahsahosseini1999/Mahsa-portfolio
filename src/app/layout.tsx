import type { Metadata } from "next";
import { Pixelify_Sans, Karla } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahsa Hosseini",
  description: "Mahsa Hosseini — multidisciplinary artist. Drawing, sculpture, photography, video.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pixelify.variable} ${karla.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Nav />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
