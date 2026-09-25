import type { Metadata } from "next";
import { Noto_Sans_KR, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { SITE } from "@/content/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.nameEn}`,
    template: `%s | 위드더레이크`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | ${SITE.nameEn}`,
    description: "데이터와 건강행동을 연결해 시니어의 건강한 자립생활을 돕는 지역사회 기반 예방건강관리 기업",
    siteName: SITE.nameEn,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-5 focus:py-3 focus:text-white"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
