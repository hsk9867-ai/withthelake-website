import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "㈜위드더레이크 | WITH THE LAKE",
    template: "%s | 위드더레이크",
  },
  description:
    "㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한 자립생활이 더 오래 지속되도록 돕는 지역사회 기반 예방건강관리 기업입니다.",
  openGraph: {
    title: "㈜위드더레이크 | WITH THE LAKE",
    description:
      "데이터와 건강행동을 연결해 시니어의 건강한 자립생활을 돕는 지역사회 기반 예방건강관리 기업",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
