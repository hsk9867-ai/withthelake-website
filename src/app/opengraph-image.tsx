import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "㈜위드더레이크 — 건강한 삶은 병원 밖, 일상에서 시작됩니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = "건강한 삶은 병원 밖,\n일상에서 시작됩니다";
const SUB = "데이터와 건강행동을 연결하는 지역사회 기반 예방건강관리 기업";

/** Google Fonts에서 사용 글자만 담긴 TTF 서브셋을 받아옵니다 (satori는 woff2 미지원). */
async function loadKoreanFont(text: string, weight: 400 | 700) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0" } })).text();
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!m) return null;
    const res = await fetch(m[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const [logo, bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "public/assets/logo/with-the-lake-white.png")),
    loadKoreanFont(TITLE + "WITH THE LAKE", 700),
    loadKoreanFont(SUB, 400),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const fonts = [
    bold ? { name: "NotoKR", data: bold, weight: 700 as const, style: "normal" as const } : null,
    regular ? { name: "NotoKR", data: regular, weight: 400 as const, style: "normal" as const } : null,
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(115deg, #2d006b 0%, #410099 55%, #4a1aa8 100%)",
          color: "#fff",
          fontFamily: "NotoKR, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(95,179,228,0.35)",
            filter: "blur(80px)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={300} height={98} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.25, whiteSpace: "pre-wrap", letterSpacing: -1 }}>
            {TITLE}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.82)" }}>{SUB}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#8ecdf0", letterSpacing: 4 }}>
          <div style={{ width: 28, height: 2, background: "#5fb3e4" }} />
          WITH THE LAKE · NATURE × HUMAN × SCIENCE
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
