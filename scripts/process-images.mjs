import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT = path.resolve(import.meta.dirname, "../src/assets/work");

const jobs = [
  {
    slug: "arc-of-birth",
    dir: path.join(ROOT, "arc of birth"),
    files: [
      "#2.png", "#3.png", "#6.png", "#9.png", "#10.png", "21.png", "26.png",
      "img5.jpg", "img11.jpg", "img15.jpg", "img19.jpg",
      "vagina-1.png", "vagina-2.png", "vagina-3a.png", "vagina-3b.png",
    ],
  },
  {
    slug: "interrelation-tehran",
    dir: path.join(ROOT, "interrelation", "tehran "),
    files: ["4.jpg", "A.png", "B.png", "D.png"].concat(
      fs
        .readdirSync(path.join(ROOT, "interrelation", "tehran "))
        .filter((f) => f.toLowerCase().endsWith("e.png"))
    ).concat(["SDC12652.JPG"]),
  },
  {
    slug: "interrelation-chairs",
    dir: path.join(ROOT, "interrelation"),
    files: ["Untitled.png"],
  },
  {
    slug: "interrelation-dance",
    dir: path.join(ROOT, "interrelation"),
    files: fs
      .readdirSync(path.join(ROOT, "interrelation"))
      .filter((f) => f.toLowerCase().startsWith("screenshot")),
  },
  {
    slug: "people-places-time",
    dir: path.join(ROOT, "people places time "),
    files: [
      "000000010001.jpg",
      "000000010007.jpg",
      "000000010008.jpg",
      "000000010012.jpg",
      "000000010014.jpg",
      "000000010016.jpg",
      "000000010017.jpg",
      "000000010019.jpg",
      "000000010027.jpg",
      "000000010025.jpg",
    ],
  },
  {
    slug: "brick-ballet",
    dir: ROOT,
    files: ["brick ballet.png"],
  },
  {
    slug: "where-it-ends-up",
    dir: ROOT,
    files: ["Mahsa_Where it Ends up 2.png"],
  },
  {
    slug: "cable-man",
    dir: path.join(ROOT, "cable man"),
    files: (() => {
      const dir = path.join(ROOT, "cable man");
      const shots = fs
        .readdirSync(dir)
        .filter((f) => f.toLowerCase().startsWith("screenshot"))
        .map((f) => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
        .sort((a, b) => b.mtime - a.mtime)
        .map((x) => x.f);
      return ["IMG_3474.jpeg", ...shots];
    })(),
  },
  {
    slug: "the-g-word",
    dir: path.join(ROOT, "guns"),
    files: [
      "img5.jpg", "img11.jpg", "img15.jpg", "img19.jpg", "img23.jpg",
      "img27.jpg", "img31.jpg", "img35.jpg", "img40.jpg", "img44.jpg",
      "img48.jpg", "img52.jpg", "img56.jpg", "Untitled design.png",
    ],
  },
  {
    slug: "becoming-soil-cover",
    dir: path.join(ROOT, "Becoming Soil ", "lutous "),
    files: ["cover .jpg"],
  },
  {
    slug: "becoming-soil-wind-will-carry",
    dir: path.join(ROOT, "Becoming Soil "),
    files: ["DSCF1520.jpg"],
  },
  {
    slug: "becoming-soil-decompost",
    dir: path.join(ROOT, "Becoming Soil ", "under the microscope "),
    files: ["process photo.png"].concat(
      fs
        .readdirSync(path.join(ROOT, "Becoming Soil ", "under the microscope "))
        .filter((f) => f.toLowerCase().startsWith("screenshot"))
    ),
  },
  {
    slug: "becoming-soil-radaye-siah-whole",
    dir: path.join(ROOT, "Becoming Soil ", "turbah drawings "),
    files: ["whole.jpg"],
  },
  {
    slug: "becoming-soil-radaye-siah-turbah",
    dir: path.join(ROOT, "Becoming Soil ", "turbah drawings "),
    files: ["img7 2.png"],
  },
  {
    slug: "becoming-soil-radaye-siah-drawings",
    dir: path.join(ROOT, "Becoming Soil ", "turbah drawings "),
    files: [
      "img5.png", "img11.png", "img15.png", "img19.png", "img23.png",
      "img27.png", "img31.png", "img35.png",
      "IMG_5060-removebg-preview.png", "IMG_5061-removebg-preview.png",
    ],
  },
  {
    slug: "becoming-soil-storylines-woven",
    dir: path.join(ROOT, "Becoming Soil ", "stripe drawings "),
    files: ["woven.jpg"],
  },
  {
    slug: "becoming-soil-storylines-stripes",
    dir: path.join(ROOT, "Becoming Soil ", "stripe drawings "),
    files: Array.from({ length: 16 }, (_, i) => `${i + 1}.png`),
  },
  {
    slug: "becoming-soil-lotus-process1",
    dir: path.join(ROOT, "Becoming Soil ", "lutous "),
    files: ["process1.jpg", "process.jpg"],
  },
  {
    slug: "becoming-soil-lotus-not-preserved",
    dir: path.join(ROOT, "Becoming Soil ", "lutous ", "lotus : not preserved "),
    files: [
      "img5.png", "img11.png", "img15.png", "img19.png", "img23.png",
      "img27.png", "img31.png", "img35.png", "img40.png", "img44.png",
    ],
  },
  {
    slug: "becoming-soil-lotus-glycerin",
    dir: path.join(ROOT, "Becoming Soil ", "lutous ", "glycerin"),
    files: [
      "img5.png", "img11.png", "img15.png", "img19.png", "img23.png",
      "img27.png", "img31.png", "img35.png",
    ],
  },
  {
    slug: "becoming-soil-lotus-whole-process",
    dir: path.join(ROOT, "Becoming Soil ", "lutous "),
    files: ["whole lotus process .png"],
  },
  {
    slug: "becoming-soil-lotus-graduation",
    dir: path.join(ROOT, "Becoming Soil ", "lutous ", "i myself grew from this murky soil"),
    files: [
      "IMG_2596.jpg", "IMG_2724.jpg", "IMG_2759.jpg",
      "IMG_2770.jpg", "IMG_2783.jpg", "IMG_2795.jpg",
    ],
  },
  {
    slug: "one-piece",
    dir: path.join(ROOT, "one piece darwings "),
    files: ["img5.jpg", "img11.jpg", "img15.jpg", "img19.jpg", "img23.jpg"],
  },
];

async function run() {
  for (const job of jobs) {
    const outDir = path.join(OUT, job.slug);
    fs.mkdirSync(outDir, { recursive: true });
    let i = 0;
    for (const file of job.files) {
      i += 1;
      const src = path.join(job.dir, file);
      if (!fs.existsSync(src)) {
        console.warn(`MISSING: ${src}`);
        continue;
      }
      const outPath = path.join(outDir, `${String(i).padStart(2, "0")}.jpg`);
      await sharp(src)
        .rotate()
        .resize({ width: 2200, withoutEnlargement: true })
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(outPath);
      const stat = fs.statSync(outPath);
      console.log(`${job.slug}/${path.basename(outPath)} <- ${file} (${(stat.size / 1024).toFixed(0)}kb)`);
    }
  }
}

run();
