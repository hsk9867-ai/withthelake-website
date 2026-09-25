import Intro from "@/components/home/Intro";
import Beginning from "@/components/home/Beginning";
import Problem from "@/components/home/Problem";
import HowWeWork from "@/components/home/HowWeWork";
import WhatWeDo, { WhatWeDoPanels } from "@/components/home/WhatWeDo";
import SenioFeature from "@/components/home/SenioFeature";
import Partners from "@/components/home/Partners";
import Story from "@/components/home/Story";
import ForOrganizations from "@/components/home/ForOrganizations";

/**
 * HOME — 기획서 3장 구성 순서를 유지하되 레퍼런스의 섹션 리듬으로 배치
 * 01 HERO(Intro) → 02 OUR BEGINNING → 03 PROBLEM → 04 HOW WE WORK → 05 WHAT WE DO
 * → SENIO 하이라이트 → 07 IMPACT & PROOF(Partners) → 08 STORY → 06 FOR ORGANIZATIONS + 09 FINAL CTA
 */
export default function Home() {
  return (
    <>
      <Intro />
      <Beginning />
      <Problem />
      <HowWeWork />
      <WhatWeDoPanels />
      <WhatWeDo withHeading={false} />
      <SenioFeature />
      <Partners />
      <Story />
      <ForOrganizations />
    </>
  );
}
