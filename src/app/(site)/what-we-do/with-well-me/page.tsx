import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ProductCard from "@/components/store/ProductCard";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { withWellMe, site } = await getContent();
  return {
    title: withWellMe.meta.title,
    description: withWellMe.meta.description,
    robots: site.publish.withWellMe ? undefined : { index: false, follow: false },
  };
}

export default async function WithWellMePage() {
  const { withWellMe, site, store } = await getContent();
  if (!site.publish.withWellMe) notFound();

  return (
    <>
      <PageHeader
        eyebrow={withWellMe.header.eyebrow}
        crumbs={[{ label: "WHAT WE DO", href: "/what-we-do" }, { label: "WITH WELL ME" }]}
        title={withWellMe.header.title}
        lead={withWellMe.header.lead}
        image={withWellMe.header.image}
        imageAlt={withWellMe.header.imageAlt}
      >
        {withWellMe.header.logo && (
          <Image src={withWellMe.header.logo} alt="WITH WELL ME" width={2000} height={500} className="h-9 w-auto" />
        )}
      </PageHeader>

      <section className="section bg-surface">
        <Container>
          <SectionHeading eyebrow={withWellMe.axes.eyebrow} title={withWellMe.axes.title} lead={withWellMe.axes.lead} />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {withWellMe.axes.items.map((axis, i) => (
              <Reveal as="li" key={`${axis.name}-${i}`} delay={i * 80} className="group bg-white p-7 transition-colors hover:bg-primary-light">
                <p className="t-meta text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <p className="font-display mt-6 text-[24px] font-bold tracking-tight text-primary">{axis.name}</p>
                <p className="text-[15px] font-semibold text-ink">{axis.ko}</p>
                <p className="t-body mt-3 text-muted">{axis.desc}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section bg-cream">
        <Container>
          <SectionHeading eyebrow={withWellMe.products.eyebrow} title={withWellMe.products.title} lead={withWellMe.products.lead} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {store.products.map((p, i) => (
              <Reveal key={`${p.url}-${i}`} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-white p-7">
            <p className="t-body text-ink-2">{withWellMe.products.note}</p>
            <Button href={site.links.store} variant="primary" external arrow>
              {withWellMe.products.ctaLabel}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
