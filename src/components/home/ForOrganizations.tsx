import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Lines from "@/components/Lines";
import { IconByName } from "@/components/Icons";
import type { HomeContent } from "@/lib/cms/types";

/**
 * 기획서 06 FOR ORGANIZATIONS + 09 FINAL CTA.
 * 가운데 타이틀 + 문장 → 네이비 풀폭 카드(기관별 구성 + 문의 버튼).
 */
export default function ForOrganizations({ data }: { data: HomeContent["forOrganizations"] }) {
  return (
    <section className="bg-surface pt-24 md:pt-32">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="t-en text-ink">{data.title}</h2>
        <p className="t-statement mt-6 text-ink">
          <Lines text={data.statement} />
        </p>
        <p className="t-lead mt-4 text-muted">{data.lead}</p>
      </Reveal>

      <Reveal delay={120} className="mt-14 bg-navy text-white md:mt-20">
        <Container size="wide" className="py-16 md:py-24">
          <p className="eyebrow text-accent">{data.cardEyebrow}</p>
          <p className="t-h1 mt-4 max-w-3xl text-white">
            <Lines text={data.cardTitle} />
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {data.targets.map((t, i) => (
              <li key={`${t.audience}-${i}`} className="bg-navy p-6 md:p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  <IconByName name={t.icon} size={20} />
                </span>
                <p className="t-meta mt-5 text-accent">{t.audience}</p>
                <p className="mt-1 text-[17px] font-bold">{t.headline}</p>
                <p className="mt-1 text-[15px] text-white/70">{t.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
            <div>
              <p className="t-h3 text-white">{data.ctaTitle}</p>
              <p className="t-body mt-2 max-w-xl text-white/75">{data.ctaBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={data.primaryCta.href} variant="white" arrow>
                {data.primaryCta.label}
              </Button>
              <Button href={data.secondaryCta.href} variant="outline-white">
                {data.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
