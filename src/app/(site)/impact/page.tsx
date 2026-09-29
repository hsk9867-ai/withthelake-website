import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getContent } from "@/lib/cms/store";
import { fill } from "@/lib/cms/merge";

export async function generateMetadata(): Promise<Metadata> {
  const { impact } = await getContent();
  return { title: impact.meta.title, description: impact.meta.description };
}

export default async function ImpactPage() {
  const { impact } = await getContent();
  const S = impact.sections;
  const SECTIONS = [
    { id: "projects", label: S.projects.title },
    { id: "pilots", label: "실증 현황" },
    { id: "rnd", label: S.rnd.title },
    { id: "awards", label: S.awards.title },
    { id: "social", label: S.social.title },
    { id: "partners", label: S.partners.title },
    { id: "history", label: S.history.title },
  ];
  const progress = impact.pilots.target > 0 ? Math.min(100, Math.round((impact.pilots.confirmed.length / impact.pilots.target) * 100)) : 0;

  return (
    <>
      <PageHeader eyebrow={impact.header.eyebrow} crumbs={[{ label: "IMPACT" }]} title={impact.header.title} lead={impact.header.lead}>
        <nav aria-label="IMPACT 섹션" className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="t-meta rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-ink-2 transition-colors hover:border-primary hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* KPI */}
      {impact.kpis.length > 0 && (
        <section className="border-b border-line bg-surface">
          <Container>
            <dl className="grid grid-cols-2 divide-x divide-line md:grid-cols-4">
              {impact.kpis.map((k, i) => (
                <div key={`${k.label}-${i}`} className={`px-4 py-8 md:px-8 md:py-10 ${i % 2 === 0 ? "pl-0" : ""}`}>
                  <dd className="t-stat text-primary">{k.value}</dd>
                  <dt className="mt-2 text-[16px] font-medium text-ink">{k.label}</dt>
                  <p className="mt-0.5 text-[14px] text-muted">{k.note}</p>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {/* 주요 프로젝트 */}
      <section id="projects" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow="Projects" title={S.projects.title} lead={S.projects.lead} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {impact.projects.map((p, i) => (
              <Reveal key={`${p.src}-${i}`} delay={(i % 3) * 90} className="card card-hover group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="t-h3 text-ink">{p.title}</h3>
                  <p className="t-body mt-2 text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={180} className="card card-hover group overflow-hidden">
              <div className="grid grid-cols-2">
                {impact.leaderTraining.photos.slice(0, 2).map((src, i) => (
                  <div key={`${src}-${i}`} className="relative aspect-[4/3] overflow-hidden">
                    <Image src={src} alt="맨발걷기 지도자 양성과정 교육 현장" fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </div>
                ))}
              </div>
              <div className="p-6">
                <h3 className="t-h3 text-ink">{impact.leaderTraining.title}</h3>
                <p className="t-body mt-2 text-muted">{impact.leaderTraining.body}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 실증 현황 */}
      <section id="pilots" className="section scroll-mt-20 bg-cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              eyebrow="Pilots"
              title={S.pilots.title}
              lead={fill(S.pilots.lead, { year: impact.pilots.year, target: impact.pilots.target })}
            />
            <Reveal delay={100} className="card p-8 md:p-10">
              <div className="flex items-end gap-3">
                <p className="t-stat text-primary">{impact.pilots.confirmed.length}곳</p>
                <p className="mb-1.5 text-[16px] text-muted">확정 · 목표 {impact.pilots.target}개 기관</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream-deep" aria-hidden>
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <ul className="mt-6 divide-y divide-line">
                {impact.pilots.confirmed.map((c, i) => (
                  <li key={`${c}-${i}`} className="flex items-center gap-4 py-3">
                    <span className="t-meta w-8 text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[16px] font-medium text-ink">{c}</span>
                    <span className="ml-auto rounded-full bg-primary-soft px-3 py-0.5 text-[13px] font-semibold text-primary">확정</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button href="/contact?type=senio" variant="secondary" size="sm" arrow>
                  실증 참여 문의
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* R&D · 지식재산 */}
      <section id="rnd" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow="R&D · IP" title={S.rnd.title} />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal className="card p-8 md:p-10">
              <p className="eyebrow text-accent-deep">연구개발 수행 이력</p>
              <p className="t-stat mt-4 text-primary">{impact.rnd.headline}</p>
              <p className="mt-1 text-[16px] font-semibold text-ink">{impact.rnd.summary}</p>
              <p className="t-body mt-3 text-muted">{impact.rnd.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {impact.rnd.programs.map((p, i) => (
                  <li key={`${p}-${i}`} className="rounded-full border border-line px-3.5 py-1 text-[15px] text-ink-2">{p}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className="card p-8 md:p-10">
              <p className="eyebrow text-accent-deep">지식재산</p>
              <ul className="mt-4 divide-y divide-line">
                {impact.ip.map((ip, i) => (
                  <li key={`${ip.label}-${i}`} className="py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[17px] font-semibold text-ink">{ip.label}</span>
                      <span className="t-meta font-semibold text-primary">{ip.value}</span>
                    </div>
                    {ip.detail && <p className="mt-1 text-[15px] text-muted">{ip.detail}</p>}
                  </li>
                ))}
              </ul>
              {impact.ipNote && <p className="mt-4 text-[14px] text-muted">{impact.ipNote}</p>}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 인증 · 수상 · 선정 */}
      <section id="awards" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading eyebrow="Recognition" title={S.awards.title} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal className="card p-8">
              <p className="eyebrow text-accent-deep">인증</p>
              <ul className="mt-5 space-y-3">
                {impact.certs.map((c, i) => (
                  <li key={`${c.name}-${i}`} className="rounded-xl bg-cream px-4 py-3">
                    <p className="text-[16px] font-semibold text-ink">{c.name}</p>
                    <p className="t-meta text-[12px] text-muted">{c.short}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90} className="card p-8">
              <p className="eyebrow text-accent-deep">수상</p>
              <ul className="mt-5 divide-y divide-line">
                {impact.awards.map((a, i) => (
                  <li key={`${a}-${i}`} className="py-3 text-[16px] font-medium text-ink">{a}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180} className="card p-8">
              <p className="eyebrow text-accent-deep">선정 사업</p>
              <ul className="mt-5 divide-y divide-line">
                {impact.programs.map((p, i) => (
                  <li key={`${p}-${i}`} className="py-3 text-[16px] font-medium text-ink">{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 사회적 가치 */}
      <section id="social" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow="Social Value" title={S.social.title} lead={S.social.lead} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
            {impact.socialValue.map((v, i) => (
              <Reveal key={`${v.title}-${i}`} delay={i * 80} className="bg-white p-8">
                <p className="t-meta text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-2 text-ink">{v.title}</h3>
                <p className="t-body mt-3 text-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 파트너 */}
      <section id="partners" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading eyebrow="Partners" title={S.partners.title} lead={S.partners.lead} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impact.partners.map((p, i) => (
              <Reveal key={`${p.src}-${i}`} delay={i * 90} className="card card-hover group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.src} alt={`${p.name} 업무협약식`} fill sizes="(min-width:1024px) 280px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <div className="p-5">
                  <p className="text-[16px] font-semibold text-ink">{p.name}</p>
                  <p className="text-[14px] text-muted">{p.kind}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 연혁 */}
      <section id="history" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow="History" title={S.history.title} lead={S.history.lead} />
          <ol className="mt-12 border-l-2 border-line pl-8 md:ml-10">
            {impact.history.map((h, i) => (
              <Reveal as="li" key={`${h.year}-${i}`} delay={i * 80} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full ring-4 ring-white ${i === 0 ? "bg-primary" : "bg-line-strong"}`}
                />
                <p className="font-display text-[26px] font-bold tracking-tight text-primary">{h.year}</p>
                <ul className="mt-3 space-y-2">
                  {h.items.map((it, j) => (
                    <li key={`${it.text}-${j}`} className="flex gap-4 text-[16px] text-ink-2">
                      <span className="t-meta w-8 shrink-0 text-muted">{it.month ? `${it.month}월` : ""}</span>
                      <span>{it.text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
