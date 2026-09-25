import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WhatWeDo from "@/components/home/WhatWeDo";
import ForOrganizations from "@/components/home/ForOrganizations";

export const metadata: Metadata = {
  title: "WHAT WE DO — SENIO · WITH WELL ME · COMMUNITY HEALTH",
  description: "세 가지 방식으로 건강을 연결합니다. SENIO(디지털 헬스케어), WITH WELL ME(웰니스 브랜드), COMMUNITY HEALTH(오프라인 프로그램).",
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        crumbs={[{ label: "WHAT WE DO" }]}
        title="세 가지 방식으로 건강을 연결합니다"
        lead="기술(SENIO), 웰니스(WITH WELL ME), 지역사회 프로그램(COMMUNITY HEALTH)이 측정 → 이해 → 행동 → 지속 → 변화 확인의 순환 안에서 하나로 이어집니다."
      />
      <WhatWeDo withHeading={false} />
      <ForOrganizations />
    </>
  );
}
