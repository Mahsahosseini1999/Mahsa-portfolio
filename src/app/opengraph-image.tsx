import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const pixelFont = await readFile(
    join(process.cwd(), "src/assets/fonts/PixelifySans-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d6c9f2",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Pixelify Sans",
              fontSize: 72,
              color: "#013961",
            }}
          >
            Mahsa Hosseini
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0405a",
              border: "4px solid #013961",
              borderRadius: 8,
              padding: "18px 48px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Pixelify Sans",
                fontSize: 40,
                color: "#ffffff",
              }}
            >
              Loading...
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pixelify Sans",
          data: pixelFont,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
