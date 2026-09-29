import Intro from "@/components/home/Intro";
import Beginning from "@/components/home/Beginning";
import Problem from "@/components/home/Problem";
import HowWeWork from "@/components/home/HowWeWork";
import WhatWeDo, { WhatWeDoPanels } from "@/components/home/WhatWeDo";
import SenioFeature from "@/components/home/SenioFeature";
import Partners from "@/components/home/Partners";
import Story from "@/components/home/Story";
import ForOrganizations from "@/components/home/ForOrganizations";
import { getContent } from "@/lib/cms/store";
import { getFeaturedStories } from "@/lib/cms/helpers";

/**
 * HOME — 기획서 3장 구성 순서를 유지하되 레퍼런스의 섹션 리듬으로 배치
 * 01 HERO(Intro) → 02 OUR BEGINNING → 03 PROBLEM → 04 HOW WE WORK → 05 WHAT WE DO
 * → SENIO 하이라이트 → 07 IMPACT & PROOF(Partners) → 08 STORY → 06 FOR ORGANIZATIONS + 09 FINAL CTA
 */
export default async function Home() {
  const content = await getContent();
  const { site, home, impact } = content;
  return (
    <>
      <Intro site={site} data={home.intro} />
      <Beginning data={home.beginning} />
      <Problem data={home.problem} />
      <HowWeWork data={home.howWeWork} />
      <WhatWeDoPanels data={home.whatWeDo} site={site} />
      <WhatWeDo data={home.whatWeDo} site={site} withHeading={false} />
      <SenioFeature data={home.senio} />
      <Partners data={home.partners} impact={impact} />
      <Story data={home.story} stories={getFeaturedStories(content, 3)} />
      <ForOrganizations data={home.forOrganizations} />
    </>
  );
}
