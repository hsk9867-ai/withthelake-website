import Hero from "@/components/home/Hero";
import OurBeginning from "@/components/home/OurBeginning";
import Problem from "@/components/home/Problem";
import HowWeWork from "@/components/home/HowWeWork";
import WhatWeDo from "@/components/home/WhatWeDo";
import ForOrganizations from "@/components/home/ForOrganizations";
import ImpactProof from "@/components/home/ImpactProof";
import Story from "@/components/home/Story";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <OurBeginning />
      <Problem />
      <HowWeWork />
      <WhatWeDo />
      <ForOrganizations />
      <ImpactProof />
      <Story />
      <FinalCta />
    </>
  );
}
