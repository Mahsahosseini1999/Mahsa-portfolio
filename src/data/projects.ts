import type { StaticImageData } from "next/image";

import aob01 from "@/assets/work/arc-of-birth/01.jpg";
import aob02 from "@/assets/work/arc-of-birth/02.jpg";
import aob03 from "@/assets/work/arc-of-birth/03.jpg";
import aob04 from "@/assets/work/arc-of-birth/04.jpg";
import aob05 from "@/assets/work/arc-of-birth/05.jpg";
import aob06 from "@/assets/work/arc-of-birth/06.jpg";
import aob07 from "@/assets/work/arc-of-birth/07.jpg";
import aob08 from "@/assets/work/arc-of-birth/08.jpg";
import aob09 from "@/assets/work/arc-of-birth/09.jpg";
import aob10 from "@/assets/work/arc-of-birth/10.jpg";
import aob11 from "@/assets/work/arc-of-birth/11.jpg";
import aob12 from "@/assets/work/arc-of-birth/12.jpg";

import tehran01 from "@/assets/work/interrelation-tehran/01.jpg";
import tehran02 from "@/assets/work/interrelation-tehran/02.jpg";
import tehran03 from "@/assets/work/interrelation-tehran/03.jpg";
import tehran04 from "@/assets/work/interrelation-tehran/04.jpg";
import tehran05 from "@/assets/work/interrelation-tehran/05.jpg";
import tehran06 from "@/assets/work/interrelation-tehran/06.jpg";
import chairs01 from "@/assets/work/interrelation-chairs/01.jpg";
import dance01 from "@/assets/work/interrelation-dance/01.jpg";

import ppt01 from "@/assets/work/people-places-time/01.jpg";
import ppt02 from "@/assets/work/people-places-time/02.jpg";
import ppt03 from "@/assets/work/people-places-time/03.jpg";
import ppt04 from "@/assets/work/people-places-time/04.jpg";
import ppt05 from "@/assets/work/people-places-time/05.jpg";
import ppt06 from "@/assets/work/people-places-time/06.jpg";
import ppt07 from "@/assets/work/people-places-time/07.jpg";
import ppt08 from "@/assets/work/people-places-time/08.jpg";
import ppt09 from "@/assets/work/people-places-time/09.jpg";
import ppt10 from "@/assets/work/people-places-time/10.jpg";

import brickBallet01 from "@/assets/work/brick-ballet/01.jpg";
import ewaste01 from "@/assets/work/where-it-ends-up/01.jpg";

import cableMan01 from "@/assets/work/cable-man/01.jpg";
import cableMan02 from "@/assets/work/cable-man/02.jpg";
import cableMan03 from "@/assets/work/cable-man/03.jpg";

import gun01 from "@/assets/work/the-g-word/01.jpg";
import gun02 from "@/assets/work/the-g-word/02.jpg";
import gun03 from "@/assets/work/the-g-word/03.jpg";
import gun04 from "@/assets/work/the-g-word/04.jpg";
import gun05 from "@/assets/work/the-g-word/05.jpg";
import gun06 from "@/assets/work/the-g-word/06.jpg";
import gun07 from "@/assets/work/the-g-word/07.jpg";
import gun08 from "@/assets/work/the-g-word/08.jpg";
import gun09 from "@/assets/work/the-g-word/09.jpg";
import gun10 from "@/assets/work/the-g-word/10.jpg";
import gun11 from "@/assets/work/the-g-word/11.jpg";
import gun12 from "@/assets/work/the-g-word/12.jpg";
import gun13 from "@/assets/work/the-g-word/13.jpg";
import gun14 from "@/assets/work/the-g-word/14.jpg";

import becomingSoilCover from "@/assets/work/becoming-soil-cover/01.jpg";
import windWillCarry01 from "@/assets/work/becoming-soil-wind-will-carry/01.jpg";
import decompostProcess from "@/assets/work/becoming-soil-decompost/01.jpg";
import decompostStill from "@/assets/work/becoming-soil-decompost/02.jpg";

export type Accent = "pink" | "skyblue" | "lavender" | "indigo";

export type Section =
  | { type: "intro"; body: string[] }
  | {
      type: "heading";
      title: string;
      body?: string[];
      boxed?: boolean;
      panelBg?: string;
      panelText?: string;
      lineColor?: string;
      titleColor?: string;
      poem?: { title: string; lines: string[] };
    }
  | {
      type: "gallery";
      images: { src: StaticImageData; alt: string; caption?: string }[];
      treatment?: "grain";
      captionColor?: string;
      layout?: "slideshow";
      caption?: string;
      columns?: number;
      size?: "sm" | "lg";
      gap?: "loose";
    }
  | {
      type: "video";
      still: StaticImageData;
      alt: string;
      href?: string;
      linkLabel?: string;
      showPlayIcon?: boolean;
      caption?: string;
      captionColor?: string;
    }
  | { type: "placeholder"; note: string };

export type Theme = {
  bg: string;
  text: string;
  textSoft: string;
  cardBg?: string;
};

export type Project = {
  slug: string;
  title: string;
  medium: string;
  credit?: string;
  venue?: string;
  blurb: string;
  accent: Accent;
  cover?: StaticImageData;
  sections: Section[];
  inProgress?: boolean;
  theme?: Theme;
  animateTitle?: boolean;
  arcTitle?: boolean;
  playfulGallery?: { src: StaticImageData; alt: string; caption?: string }[];
};

export const projects: Project[] = [
  {
    slug: "the-g-word",
    title: "The G Word",
    medium: "Drawing",
    blurb: "Guns, drawn in every colour but the ones they come in.",
    accent: "pink",
    cover: gun14,
    theme: {
      bg: "#fcd7e0",
      text: "#013961",
      textSoft: "#4d7290",
    },
    sections: [
      {
        type: "intro",
        body: ["Are you ready to Die?"],
      },
    ],
    playfulGallery: [
      { src: gun01, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2025. Colour pencil and marker on paper, 21.5 × 14 cm." },
      { src: gun02, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2025. Marker on paper, 21.5 × 14 cm." },
      { src: gun03, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2025. Marker on paper, 21.5 × 14 cm." },
      { src: gun04, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2026. Colour pencil and marker on paper, 21.5 × 14 cm." },
      { src: gun05, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2026. Colour pencil and marker on paper, 21.5 × 14 cm." },
      { src: gun06, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2026. Colour pencil and marker on paper, 21.5 × 14 cm." },
      { src: gun07, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2026. Colour pencil and marker on paper, 21.5 × 14 cm." },
      { src: gun08, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2024. Colour pencil and marker on paper, 27.5 × 21 cm." },
      { src: gun09, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2024. Colour pencil, 27.5 × 21 cm." },
      { src: gun10, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2024. Colour pencil, 27.5 × 21 cm." },
      { src: gun11, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2024. Colour pencil, 27.5 × 21 cm." },
      { src: gun12, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2024. Colour pencil, 27.5 × 21 cm." },
      { src: gun13, alt: "Colourful drawing from The G Word", caption: "Untitled Gun, 2024. Colour pencil, 27.5 × 21 cm." },
    ],
  },

  {
    slug: "brick-ballet",
    title: "Brick Ballet",
    medium: "Video",
    credit: "Collaboration with Evangelia Moschou and Chrysa Mpampa",
    blurb: "A collaborative dance, danced on bricks.",
    accent: "indigo",
    cover: brickBallet01,
    theme: {
      bg: "#c0e2fa",
      text: "#013961",
      textSoft: "#4d7290",
    },
    sections: [
      {
        type: "intro",
        body: [
          "Beneath every street we walk on lies the invisible work of the bodies that made the bricks and the hands that placed them in walls or on the ground. We move across these surfaces every day, but we rarely stop to consider the weight of that history beneath our feet.",
          "This raises the question: what does it mean to truly “get in touch” with a brick?",
          "By attaching bricks to the feet of a dancer, the material becomes an extension of the body. The brick meets the street and becomes a tool for marking and sounding the city. This work invites audiences to experience brick in a unique way through seeing and hearing. The dancer moves through the urban space and feels the weight and resistance of the bricks with every step. Moving takes effort. grace becomes struggle.",
          "With this work, Hosseini and Moschou aim to bring material and body closer together and let us feel what it means to carry bricks in another way.",
        ],
      },
      {
        type: "video",
        still: brickBallet01,
        alt: "Still collage from Brick Ballet",
        href: "https://youtu.be/PxJO553yYas",
        linkLabel: "Watch Brick Ballet",
        showPlayIcon: false,
        caption: "Brick Ballet, 2026. Video still.",
      },
    ],
  },

  {
    slug: "in-the-ground",
    title: "Becoming Soil",
    medium: "Installation, video, sound, drawing",
    blurb: "Death, grief, and our relation to nature — in several parts.",
    accent: "lavender",
    cover: becomingSoilCover,
    theme: {
      bg: "#ffffff",
      text: "#013961",
      textSoft: "#4d7290",
    },
    sections: [
      {
        type: "heading",
        title: "Wind Will Carry",
        boxed: false,
        body: [
          "I made this work when I had started researching an idea that had occupied me since childhood: death. Grief was part of this research from the beginning.",
          "I collected fallen autumn leaves and arranged them on a stone chair outside the exhibition space. Throughout the exhibition, I tended to them and kept the wind from scattering them. At the end, I sat and watched the wind carry them away.",
          "The leaves became a way of approaching grief through material. Rather than representing loss, I was watching something disappear.",
        ],
        poem: {
          title: "The loss.",
          lines: [
            "You wake up and the world is not the same.",
            "It's gone, and this is the beginning of emptiness.",
            "It has a way of creeping in, like a shadow. There's no preparation for this moment.",
            "It feels like a hole is opening up inside, wrapping around you like a heavy blanket.",
            "You are left to carry on.",
          ],
        },
      },
      {
        type: "gallery",
        captionColor: "#013961",
        images: [
          {
            src: windWillCarry01,
            alt: "Fallen autumn leaves arranged in a body shape on a stone bench",
            caption: "Wind Will Carry, collected autumn leaves, 2024, installation view.",
          },
        ],
      },
      {
        type: "heading",
        title: "De-Compost",
        boxed: false,
        body: [
          "I started collecting soil from cemeteries in Groningen and brought it back to my studio. I placed small samples under a microscope and photographed what I found.",
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: decompostProcess,
            alt: "Studio setup with a microscope, soil samples in labelled jars, and a laptop showing microscope footage",
          },
        ],
      },
      {
        type: "intro",
        body: [
          "I was looking for traces of life in the soil, trying to understand what happens to the particles I’ll one day become; what life looks like for them. I added parts of my own body into the soil and watched it all shift, blend, and change over time. I was facing my fear little by little, through curiosity and observation.",
          "The microscope gave me another way of looking at the material. I was no longer only looking at soil as something that holds the dead, but as a living environment in itself.",
        ],
      },
      {
        type: "video",
        still: decompostStill,
        alt: "Microscopic still from De-Compost",
        href: "https://youtu.be/js5gvgXz_HM?si=4D5iWRxUSI8GdiPr",
        linkLabel: "Watch De-Compost",
        showPlayIcon: false,
        captionColor: "#013961",
        caption: "De-compost, microscopic footage video, 2025.",
      },
    ],
  },

  {
    slug: "where-it-ends-up",
    title: "Where It Ends Up",
    medium: "Video, sculpture",
    blurb: "Electronic devices, an e-waste residency, and where they end up.",
    accent: "skyblue",
    cover: ewaste01,
    sections: [
      {
        type: "intro",
        body: [
          "In March 2025 I spent a week in residency at an e-waste recycling facility in the Netherlands, observing the process of separation and working one shift alongside the people who work there.",
          "The so-called waste arrives after it reaches the point where it is no longer considered useful or wanted. It is separated into batches by what it is and what it is made of. Batteries are pulled aside because of the danger they pose. They are the only thing here still treated as capable of doing something.",
          "What interested me was that objects at different points in technological time end up in the same batch. What a thing was for, and who it belonged to, stops being information here.",
          "We meet things in the middle of their lives. Where they are made, and what is taken out of the ground to make them, happens out of sight. What happens to them afterwards is out of sight again. This place is one of the few points where any of it is visible, and I saw only the separation.",
          "Working there became almost meditative after a while.",
          "The soundtrack is built from recordings collected on site, mixed with composed musical elements.",
        ],
      },
      {
        type: "video",
        still: ewaste01,
        alt: "Pile of discarded phones and electronics",
        href: "https://youtu.be/5dVrn3wv0Hw?si=0D8Q_FabA04v6Soa",
        linkLabel: "Watch Where It Ends Up",
        showPlayIcon: false,
        caption: "Where It Ends Up, 2025. Video still.",
        captionColor: "#1c05a1",
      },
      {
        type: "heading",
        title: "Cable Man",
        boxed: false,
        lineColor: "#1c05a1",
        body: [
          "A human figure built entirely from discarded cables found at the facility.",
          "Drowning without noticing\nCables are everywhere\nnot always visible but they surround me\nThe world is vast and fast,\nThe more I look the more I stoop into it and it easily drowns me\na blackhole filled with data",
        ],
      },
      {
        type: "gallery",
        captionColor: "#1c05a1",
        size: "sm",
        images: [
          {
            src: cableMan01,
            alt: "Cable Man sculpture on an orange industrial post at the e-waste facility",
            caption: "Cable Man, 2025. Discarded electronic cables.\nAt the E-waste facility.",
          },
        ],
      },
      {
        type: "gallery",
        captionColor: "#1c05a1",
        caption: "Cable Man in the city. 2025. Discarded electronic cables and cardboard.",
        images: [
          {
            src: cableMan02,
            alt: "Cable Man installed in a city square, with pedestrians passing by",
          },
          {
            src: cableMan03,
            alt: "Cable Man glowing red at night, wrapped around a pole with a recycling bin",
          },
        ],
      },
    ],
  },

  {
    slug: "arc-of-birth",
    title: "Arc of Birth",
    medium: "Drawing",
    arcTitle: true,
    blurb: "What pregnancy and women's bodies carry, in colour.",
    accent: "indigo",
    cover: aob05,
    theme: {
      bg: "#fcd7e0",
      text: "#013961",
      textSoft: "#4d7290",
    },
    sections: [
      {
        type: "intro",
        body: [
          "I have never been pregnant or given birth. This series began from curiosity, not experience. What I know comes from growing up in a large family, from the joy I felt around newborns, and from my fascination with what happens to a body while it is making another body.",
          "Cells develop inside another person and slowly become someone who can live alone. I watched footage of caesarean sections and vaginal births, looking directly at the moment those nine months end and a lifetime begins. A head comes out of a vagina. My body shivers every time I watch it. I am drawn to it, and it unsettles me.",
          "I kept drawing the same thing: a naked woman with a big pregnant belly, again and again, from different angles and in different colours. I never drew faces, because it was about the body itself. I also drew vulvas, because I still do not understand how a human comes out of such a small hole.",
          "Will it be me one day?",
        ],
      },
      {
        type: "gallery",
        layout: "slideshow",
        images: [
          { src: aob01, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Soft pastel on paper, 20 × 13 cm." },
          { src: aob02, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Soft pastel on paper, 20 × 15 cm." },
          { src: aob03, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Soft pastel on paper, 20 × 13 cm." },
          { src: aob04, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Soft pastel on paper, 20 × 13 cm." },
          { src: aob05, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Soft pastel on paper, 20 × 15 cm." },
          { src: aob06, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Colour pencil on paper, 20 × 15 cm." },
          { src: aob07, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Colour pencil on paper, 20 × 13 cm." },
          { src: aob08, alt: "Drawing from Arc of Birth", caption: "Untitled, 2023. Soft pastel on paper, 22 × 22 cm." },
          { src: aob09, alt: "Drawing from Arc of Birth", caption: "Untitled, 2023. Soft pastel on paper, 22 × 22 cm." },
          { src: aob10, alt: "Drawing from Arc of Birth", caption: "Untitled, 2023. Colour pencil on paper, 22 × 22 cm." },
          { src: aob11, alt: "Anatomic Variations of the Hymen, a drawing from Arc of Birth", caption: "Anatomic Variations of the Hymen, 2023. Colour pencil on paper, 22 × 22 cm." },
          { src: aob12, alt: "Drawing from Arc of Birth", caption: "Untitled, 2022. Colour pencil on paper, 22 × 22 cm." },
        ],
      },
    ],
  },

  {
    slug: "interrelation",
    title: "Interrelation",
    medium: "Photography, sculpture, video",
    blurb: "A city, a set of chairs, a dance — three studies in connection.",
    accent: "skyblue",
    cover: tehran01,
    sections: [
      {
        type: "intro",
        body: [
          "Three works made separately, in different materials, at different times.",
          "All of them are about being in relation to something. To another person, to a city, to a dance.",
          "I made them to find out where I stand. I am still looking.",
        ],
      },
      {
        type: "heading",
        title: "Chairs",
        boxed: false,
        titleColor: "var(--lavender)",
        lineColor: "#1c05a1",
        body: [
          "Four chairs. Two face each other. Two sit back to back.",
          "Nothing else happens. The position is the relation.",
        ],
      },
      {
        type: "gallery",
        captionColor: "var(--lavender)",
        caption: "Chairs, 2020. Metal and bolts, 27 × 12 × 15 cm each.",
        size: "lg",
        images: [
          { src: chairs01, alt: "Sculpture of a set of chairs" },
        ],
      },
      {
        type: "heading",
        title: "Tehran",
        body: [
          "Tehran.",
          "Fridays I drove around the city with no destination and a compact camera.",
          "Friday is the weekend there.",
          "Empty enough to drive without stopping.",
          "Tehran, you are toxic. I love you.",
        ],
        panelBg: "#1c05a1",
        panelText: "#fcd7e0",
        lineColor: "#1c05a1",
      },
      {
        type: "gallery",
        columns: 2,
        captionColor: "var(--pink)",
        gap: "loose",
        images: [
          { src: tehran01, alt: "Milad Tower seen through a car window, Tehran", caption: "Milad, 2023.\n3648 × 2736 px." },
          { src: tehran02, alt: "Night street in Tehran", caption: "Sohrevardi, 2023.\n3648 × 2736 px." },
          { src: tehran03, alt: "Street scene, Tehran", caption: "Bookan, 2022.\n3648 × 2736 px." },
          { src: tehran04, alt: "Street scene, Tehran", caption: "Tajrish Square, 2022.\n3648 × 2736 px." },
          { src: tehran05, alt: "Alley with graffiti and a painted door, Tehran", caption: "Fereshteh, 2022.\n3648 × 2736 px." },
          { src: tehran06, alt: "Skyscrapers and a busy intersection, Tehran", caption: "Arjantin, 2023.\n3648 × 2736 px." },
        ],
      },
      {
        type: "heading",
        title: "Hand to Hand",
        boxed: false,
        titleColor: "var(--skyblue)",
        lineColor: "#1c05a1",
        body: [
          "Footage of a dance at a wedding, processed until only the movement is left.",
          "Lines only. The dancers are gone.",
          "What is left is not people. So what holds people together?",
        ],
      },
      {
        type: "video",
        still: dance01,
        alt: "Still from Hand to Hand",
        href: "https://youtu.be/E0AF2MbaBZY?si=94SfgSS492nNGuJQ",
        linkLabel: "Watch Hand to Hand",
        showPlayIcon: false,
        caption: "Hand to Hand, 2023. Video still.",
      },
    ],
  },

  {
    slug: "people-places-time",
    title: "People, Places, Time",
    medium: "Photography",
    blurb: "A photo series on holding and keeping, made during the pandemic.",
    accent: "lavender",
    cover: ppt02,
    animateTitle: true,
    theme: {
      bg: "#1c05a1",
      text: "#fcd7e0",
      textSoft: "#d6c9f2",
      cardBg: "#2a0fc4",
    },
    sections: [
      {
        type: "intro",
        body: [
          "In 2020 I photographed my friends with a Zenit. Birthdays, weekends, kitchens.",
          "I never waited for anything to happen. I just took photos.",
          "The camera was older than all of us. It missed focus. It let in too much light, or not enough. Whatever it gave back, I held onto.",
          "What is left is ordinary life, half visible, and it does not sit still.",
        ],
      },
      {
        type: "gallery",
        layout: "slideshow",
        treatment: "grain",
        captionColor: "var(--pink)",
        images: [
          { src: ppt01, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt02, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt03, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt04, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt05, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt06, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt07, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt08, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt09, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
          { src: ppt10, alt: "Photograph from People, Places, Time", caption: "Untitled, 2020. Archival film scan from 35mm negative." },
        ],
      },
    ],
  },

];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
