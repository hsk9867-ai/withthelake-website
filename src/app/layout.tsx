import type { Metadata } from "next";
import { Noto_Sans_KR, Manrope } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/cms/store";
import { SITE_URL } from "@/lib/asset";

/* 본문: Pretendard(CDN, 레퍼런스와 동일) → 실패 시 Noto Sans KR */
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

/* 영문 제목·숫자: Manrope (레퍼런스와 동일) */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} | ${site.nameEn}`,
      template: `%s | 위드더레이크`,
    },
    description: site.description,
    openGraph: {
      title: `${site.name} | ${site.nameEn}`,
      description: site.description,
      siteName: site.nameEn,
      locale: "ko_KR",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
