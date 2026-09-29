import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WhatWeDo from "@/components/home/WhatWeDo";
import ForOrganizations from "@/components/home/ForOrganizations";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { whatWeDo } = await getContent();
  return { title: whatWeDo.meta.title, description: whatWeDo.meta.description };
}

export default async function WhatWeDoPage() {
  const { whatWeDo, home, site } = await getContent();
  return (
    <>
      <PageHeader eyebrow={whatWeDo.header.eyebrow} crumbs={[{ label: "WHAT WE DO" }]} title={whatWeDo.header.title} lead={whatWeDo.header.lead} />
      <WhatWeDo data={home.whatWeDo} site={site} withHeading={false} />
      <ForOrganizations data={home.forOrganizations} />
    </>
  );
}
