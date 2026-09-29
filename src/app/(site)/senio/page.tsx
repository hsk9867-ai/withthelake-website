import type { Metadata } from "next";
import SenioHero from "@/components/senio/SenioHero";
import SenioFlow from "@/components/senio/SenioFlow";
import SenioProducts from "@/components/senio/SenioProducts";
import SenioRnd from "@/components/senio/SenioRnd";
import SenioOrgs from "@/components/senio/SenioOrgs";
import SenioCta from "@/components/senio/SenioCta";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { senio } = await getContent();
  return {
    title: senio.meta.title,
    description: senio.meta.description,
    openGraph: { title: senio.hero.title, description: senio.hero.lead },
  };
}

export default async function SenioPage() {
  const { senio, impact, site } = await getContent();
  return (
    <>
      <SenioHero data={senio.hero} />
      <SenioFlow data={senio.flow} />
      <SenioProducts data={senio.products} />
      <SenioRnd data={senio.rnd} impact={impact} />
      <SenioOrgs data={senio.orgs} />
      <SenioCta data={senio.cta} site={site} />
    </>
  );
}
