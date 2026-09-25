import type { Metadata } from "next";
import SenioHero from "@/components/senio/SenioHero";
import SenioFlow from "@/components/senio/SenioFlow";
import SenioProducts from "@/components/senio/SenioProducts";
import SenioRnd from "@/components/senio/SenioRnd";
import SenioOrgs from "@/components/senio/SenioOrgs";
import SenioCta from "@/components/senio/SenioCta";

export const metadata: Metadata = {
  title: "SENIO — 시니어 예방건강관리 솔루션",
  description:
    "세니오(SENIO)는 소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결하는 시니어 예방건강관리 솔루션입니다. 3분 안에 7종 지표를 네 단계로 확인합니다.",
  openGraph: {
    title: "SENIO — 건강관리, 확인할 수 있으면 습관이 될 수 있습니다",
    description: "소변 기반 생체데이터와 생활데이터를 연결하는 시니어 예방건강관리 솔루션",
  },
};

export default function SenioPage() {
  return (
    <>
      <SenioHero />
      <SenioFlow />
      <SenioProducts />
      <SenioRnd />
      <SenioOrgs />
      <SenioCta />
    </>
  );
}
