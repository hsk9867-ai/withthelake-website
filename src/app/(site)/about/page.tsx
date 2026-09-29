import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import AboutBusinesses from "@/components/about/AboutBusinesses";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getContent();
  return { title: about.meta.title, description: about.meta.description };
}

export default async function AboutPage() {
  const { about, site, impact } = await getContent();
  const axes = about.identity.axes;

  return (
    <>
      <PageHeader
        eyebrow={about.header.eyebrow}
        crumbs={[{ label: "ABOUT" }]}
        title={about.header.title}
        lead={about.header.lead}
        image={about.header.image}
        imageAlt={about.header.imageAlt}
      />

      {/* 인식 · 핵심 메시지 */}
      <section className="section bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-accent-deep">{about.perception.eyebrow}</p>
              <p className="t-h2 mt-5 text-ink">{about.perception.title}</p>
              <p className="t-lead mt-5 text-ink-2">
                {about.perception.leadBefore}
                <span className="font-semibold text-primary"> {about.perception.leadHighlight}</span>
                {about.perception.leadAfter}
              </p>
            </Reveal>
            <Reveal delay={120} className="rounded-[24px] bg-cream p-8 md:p-10">
              <p className="eyebrow text-accent-deep">{about.message.eyebrow}</p>
              <p className="t-h3 mt-5 text-ink">{about.message.title}</p>
              <p className="t-body mt-4 text-muted">{about.message.body}</p>
              <ol className="mt-6 flex flex-wrap items-center gap-2">
                {about.message.steps.map((s, i, arr) => (
                  <li key={`${s}-${i}`} className="flex items-center gap-2">
                    <span className="rounded-full border border-primary/30 bg-white px-3.5 py-1 text-[15px] font-semibold text-primary">
                      {s}
                    </span>
                    {i < arr.length - 1 && (
                      <span aria-hidden className="text-line-strong">→</span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* NATURE × HUMAN × SCIENCE */}
      <section id="identity" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading
            eyebrow={about.identity.eyebrow}
            title={
              <>
                {axes.map((a, i) => (
                  <span key={`${a.key}-${i}`}>
                    {i > 0 && <span className="text-accent-dark"> × </span>}
                    {a.key}
                  </span>
                ))}
              </>
            }
            lead={about.identity.lead}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {axes.map((a, i) => (
              <Reveal key={`${a.key}-${i}`} delay={i * 100} className="card card-hover group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(min-width:768px) 380px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-7">
                  <p className="font-display text-[24px] font-bold tracking-tight text-primary">
                    {a.key}
                    <span className="ml-2 text-[16px] font-medium text-muted">{a.ko}</span>
                  </p>
                  <p className="t-body mt-2 text-ink-2">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AboutBusinesses data={about.businesses} site={site} />

      {/* 인증 · 회사 정보 */}
      <section className="section bg-surface">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <Reveal className="card p-8 md:p-10">
              <p className="eyebrow text-accent-deep">{about.info.certsEyebrow}</p>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {impact.certs.map((c, i) => (
                  <li key={`${c.name}-${i}`} className="rounded-xl bg-cream px-4 py-3">
                    <p className="text-[16px] font-semibold text-ink">{c.name}</p>
                    <p className="t-meta text-[12px] text-muted">{c.short}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className="card flex flex-col p-8 md:p-10">
              <p className="eyebrow text-accent-deep">{about.info.infoEyebrow}</p>
              <dl className="mt-5 divide-y divide-line">
                {[
                  { label: "상호", value: `${site.name} (WITH THE LAKE Co., Ltd.)` },
                  { label: "주소", value: `(${site.contact.postalCode}) ${site.contact.address}` },
                  { label: "담당", value: `${site.contact.team} ${site.contact.person}` },
                  { label: "전화", value: site.contact.phone },
                  { label: "이메일", value: site.contact.email },
                ].map((row) => (
                  <div key={row.label} className="flex gap-6 py-3">
                    <dt className="w-16 shrink-0 text-[15px] font-semibold text-primary">{row.label}</dt>
                    <dd className="text-[16px] text-ink-2">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto pt-6">
                <Button href="/contact" variant="primary" arrow>
                  {about.info.ctaLabel}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
