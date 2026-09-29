import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconArrow } from "@/components/Icons";
import { isPublished } from "@/lib/cms/helpers";
import type { AboutContent, SiteSettings } from "@/lib/cms/types";

export default function AboutBusinesses({ data, site }: { data: AboutContent["businesses"]; site: SiteSettings }) {
  return (
    <section className="section bg-surface">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {data.items.map((b, i) => {
            const show = isPublished(site, b.key) && Boolean(b.href);
            const inner = (
              <>
                <p className="t-meta font-semibold text-accent-deep">{b.kind}</p>
                <h3 className="font-display mt-3 text-[22px] font-bold tracking-tight text-primary">{b.name}</h3>
                <p className="t-body mt-3 flex-1 text-muted">{b.desc}</p>
                {show && (
                  <span className="t-meta mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                    자세히 보기 <IconArrow size={16} />
                  </span>
                )}
              </>
            );
            return (
              <Reveal key={`${b.name}-${i}`} delay={i * 110}>
                {show ? (
                  <Link href={b.href} className="card card-hover flex h-full flex-col p-8">
                    {inner}
                  </Link>
                ) : (
                  <div className="card flex h-full flex-col p-8">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
