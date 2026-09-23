import type { Metadata } from "next";
import SenioHero from "@/components/senio/SenioHero";
import SenioShowcase from "@/components/senio/SenioShowcase";
import SenioProducts from "@/components/senio/SenioProducts";
import SenioRnd from "@/components/senio/SenioRnd";
import SenioOrgs from "@/components/senio/SenioOrgs";
import SenioCta from "@/components/senio/SenioCta";

export const metadata: Metadata = {
  title: "SENIO",
  description:
    "세니오(SENIO)는 소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결하는 시니어 예방건강관리 솔루션입니다.",
};

export default function SenioPage() {
  return (
    <>
      <SenioHero />
      <SenioShowcase />
      <SenioProducts />
      <SenioRnd />
      <SenioOrgs />
      <SenioCta />
    </>
  );
}
