import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { info } = await getContent();
  return { title: info.meta.title, description: info.meta.description };
}

const NAV = [
  { id: "what", label: "맨발걷기란" },
  { id: "benefits", label: "효과" },
  { id: "method", label: "올바른 방법" },
  { id: "safety", label: "주의사항" },
  { id: "research", label: "연구자료" },
];

export default async function InfoPage() {
  const { info } = await getContent();

  return (
    <>
      <PageHeader eyebrow={info.header.eyebrow} crumbs={[{ label: "맨발걷기 정보" }]} title={info.header.title} lead={info.header.lead}>
        <nav aria-label="페이지 내 이동" className="flex flex-wrap gap-2">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold text-ink-2 hover:border-primary hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* 맨발걷기란 */}
      <section id="what" className="section scroll-mt-20 bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-accent-deep">{info.what.eyebrow}</p>
              <h2 className="t-h2 mt-5 text-ink">{info.what.title}</h2>
            </Reveal>
            <Reveal delay={120}>
              {info.what.body.map((p, i) => (
                <p key={i} className={`t-body-lg text-ink-2 ${i > 0 ? "mt-5" : ""}`}>
                  {p}
                </p>
              ))}
              {info.what.linkUrl && (
                <a href={info.what.linkUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block text-[15px] font-semibold text-primary hover:underline">
                  {info.what.linkLabel} ↗
                </a>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 효과 */}
      <section id="benefits" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading eyebrow={info.benefits.eyebrow} title={info.benefits.title} lead={info.benefits.lead} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info.benefits.items.map((b, i) => (
              <Reveal key={`${b.title}-${i}`} as="li" delay={i * 80} className="flex flex-col rounded-[20px] bg-white p-6">
                <p className="text-[18px] font-bold text-ink">{b.title}</p>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{b.body}</p>
                {b.url && (
                  <a href={b.url} target="_blank" rel="noreferrer" className="mt-4 text-[13px] font-semibold text-accent-deep hover:underline">
                    {b.source} ↗
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 올바른 방법 */}
      <section id="method" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow={info.method.eyebrow} title={info.method.title} />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info.method.steps.map((s, i) => (
              <Reveal key={`${s.title}-${i}`} as="li" delay={i * 80} className="rounded-[20px] border border-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white">{i + 1}</span>
                  <span aria-hidden className="text-[26px]">{s.emoji}</span>
                </div>
                <p className="mt-4 text-[18px] font-bold text-ink">{s.title}</p>
                <p className="mt-2 text-[15px] leading-6 text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 주의사항 */}
      <section id="safety" className="section scroll-mt-20 bg-navy text-white">
        <Container>
          <SectionHeading eyebrow={info.safety.eyebrow} title={info.safety.title} tone="dark" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {info.safety.items.map((s, i) => (
              <Reveal key={`${s.title}-${i}`} as="li" delay={i * 80} className="rounded-[20px] border border-white/15 bg-white/5 p-6">
                <p className="text-[18px] font-bold">{s.title}</p>
                <p className="mt-2 text-[15px] leading-6 text-white/75">{s.body}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-[13px] leading-6 text-white/60">{info.safety.disclaimer}</p>
        </Container>
      </section>

      {/* 연구자료 */}
      <section id="research" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading
            eyebrow={info.research.eyebrow}
            title={info.research.title}
            lead={info.research.lead}
            action={
              info.research.moreUrl ? (
                <Button href={info.research.moreUrl} variant="secondary" arrow>
                  {info.research.moreLabel}
                </Button>
              ) : undefined
            }
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {info.research.items.map((r, i) => (
              <Reveal key={`${r.title}-${i}`} as="li" delay={i * 60}>
                <a href={r.url} target="_blank" rel="noreferrer" className="card card-hover flex h-full flex-col rounded-[20px] border border-line bg-white p-6">
                  <span className="self-start rounded-full bg-cream px-3 py-1 text-[12px] font-bold text-accent-deep">{r.tag}</span>
                  <p className="t-en mt-4 text-[17px] font-bold leading-snug text-ink">{r.title}</p>
                  <p className="mt-2 flex-1 text-[14px] leading-6 text-muted">{r.body}</p>
                  <p className="mt-4 text-[13px] font-semibold text-primary">{r.source} ↗</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-cream">
        <Container size="narrow">
          <Reveal className="rounded-[24px] bg-white p-8 text-center md:p-12">
            <h2 className="t-h2 text-ink">{info.cta.title}</h2>
            <p className="t-body-lg mt-4 text-ink-2">{info.cta.body}</p>
            <div className="mt-7">
              <Button href={info.cta.buttonUrl} variant="primary" size="lg" arrow>
                {info.cta.buttonLabel}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
