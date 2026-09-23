import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutIdentity from "@/components/about/AboutIdentity";
import AboutBusinesses from "@/components/about/AboutBusinesses";
import AboutInfo from "@/components/about/AboutInfo";

export const metadata: Metadata = {
  title: "ABOUT",
  description:
    "㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한 자립생활이 더 오래 지속되도록 돕는 지역사회 기반 예방건강관리 기업입니다.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIdentity />
      <AboutBusinesses />
      <AboutInfo />
    </>
  );
}
