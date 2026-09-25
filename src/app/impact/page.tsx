import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import {
  AWARDS,
  CERTS,
  HISTORY,
  IP,
  KPIS,
  LEADER_TRAINING,
  PARTNERS,
  PILOTS,
  PROGRAMS,
  PROJECTS,
  RND,
  SOCIAL_VALUE,
} from "@/content/impact";

export const metadata: Metadata = {
  title: "IMPACT — 성과와 파트너",
  description: "주요 프로젝트 · 실증 현황 · R&D · 지식재산 · 인증 · 수상 · 선정 사업 · 사회적 가치 · 협력기관 · 연혁",
};

const SECTIONS = [
  { id: "projects", label: "주요 프로젝트" },
  { id: "pilots", label: "실증 현황" },
  { id: "rnd", label: "R&D · 지식재산" },
  { id: "awards", label: "인증 · 수상 · 선정" },
  { id: "social", label: "사회적 가치" },
  { id: "partners", label: "파트너" },
  { id: "history", label: "연혁" },
];

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact & Proof"
        crumbs={[{ label: "IMPACT" }]}
        title="성과"
        lead="프로젝트, 실증, 연구개발, 인증과 수상, 협력기관과 연혁을 사실 그대로 기록합니다. 성과와 인증은 수치로, 현장의 이야기는 사람 중심으로 전합니다."
      >
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
      <section className="border-b border-line bg-surface">
        <Container>
          <dl className="grid grid-cols-2 divide-x divide-line md:grid-cols-4">
            {KPIS.map((k, i) => (
              <div key={k.label} className={`px-4 py-8 md:px-8 md:py-10 ${i % 2 === 0 ? "pl-0" : ""}`}>
                <dd className="t-stat text-primary">{k.value}</dd>
                <dt className="mt-2 text-[16px] font-medium text-ink">{k.label}</dt>
                <p className="mt-0.5 text-[14px] text-muted">{k.note}</p>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 주요 프로젝트 */}
      <section id="projects" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow="Projects" title="주요 프로젝트" lead="현장 조사, 협의체 참여, 교육 등 지역사회와 함께 진행한 활동입니다." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.src} delay={(i % 3) * 90} className="card card-hover group overflow-hidden">
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
                {LEADER_TRAINING.photos.map((src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden">
                    <Image src={src} alt="맨발걷기 지도자 양성과정 교육 현장" fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </div>
                ))}
              </div>
              <div className="p-6">
                <h3 className="t-h3 text-ink">{LEADER_TRAINING.title}</h3>
                <p className="t-body mt-2 text-muted">{LEADER_TRAINING.body}</p>
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
              title="SENIO 실증 현황"
              lead={`${PILOTS.year}년 강원 거점 실증에서 병원 사용 검사 장비와 결과를 비교하는 데이터를 확보합니다. 연내 ${PILOTS.target}개 기관 실증을 목표로 합니다.`}
            />
            <Reveal delay={100} className="card p-8 md:p-10">
              <div className="flex items-end gap-3">
                <p className="t-stat text-primary">{PILOTS.confirmed.length}곳</p>
                <p className="mb-1.5 text-[16px] text-muted">확정 · 목표 {PILOTS.target}개 기관</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream-deep" aria-hidden>
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((PILOTS.confirmed.length / PILOTS.target) * 100)}%` }} />
              </div>
              <ul className="mt-6 divide-y divide-line">
                {PILOTS.confirmed.map((c, i) => (
                  <li key={c} className="flex items-center gap-4 py-3">
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
          <SectionHeading eyebrow="R&D · IP" title="연구개발과 지식재산" />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal className="card p-8 md:p-10">
              <p className="eyebrow text-accent-deep">연구개발 수행 이력</p>
              <p className="t-stat mt-4 text-primary">4억원+</p>
              <p className="mt-1 text-[16px] font-semibold text-ink">{RND.summary}</p>
              <p className="t-body mt-3 text-muted">{RND.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {RND.programs.map((p) => (
                  <li key={p} className="rounded-full border border-line px-3.5 py-1 text-[15px] text-ink-2">{p}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className="card p-8 md:p-10">
              <p className="eyebrow text-accent-deep">지식재산</p>
              <ul className="mt-4 divide-y divide-line">
                {IP.map((ip) => (
                  <li key={ip.label} className="py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[17px] font-semibold text-ink">{ip.label}</span>
                      <span className="t-meta font-semibold text-primary">{ip.value}</span>
                    </div>
                    {ip.detail && <p className="mt-1 text-[15px] text-muted">{ip.detail}</p>}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-muted">특허·상표·디자인은 출원 완료 상태이며, 등록 절차를 진행하고 있습니다.</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 인증 · 수상 · 선정 */}
      <section id="awards" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading eyebrow="Recognition" title="인증 · 수상 · 선정 사업" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal className="card p-8">
              <p className="eyebrow text-accent-deep">인증</p>
              <ul className="mt-5 space-y-3">
                {CERTS.map((c) => (
                  <li key={c.name} className="rounded-xl bg-cream px-4 py-3">
                    <p className="text-[16px] font-semibold text-ink">{c.name}</p>
                    <p className="t-meta text-[12px] text-muted">{c.short}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90} className="card p-8">
              <p className="eyebrow text-accent-deep">수상</p>
              <ul className="mt-5 divide-y divide-line">
                {AWARDS.map((a) => (
                  <li key={a} className="py-3 text-[16px] font-medium text-ink">{a}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180} className="card p-8">
              <p className="eyebrow text-accent-deep">선정 사업</p>
              <ul className="mt-5 divide-y divide-line">
                {PROGRAMS.map((p) => (
                  <li key={p} className="py-3 text-[16px] font-medium text-ink">{p}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 사회적 가치 */}
      <section id="social" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Social Value"
            title="사회적 가치"
            lead="강원도 예비사회적기업이자 소셜벤처로서, 사업의 성과가 지역사회의 건강으로 이어지도록 설계합니다."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
            {SOCIAL_VALUE.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="bg-white p-8">
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
          <SectionHeading eyebrow="Partners" title="협력기관" lead="업무협약(MOU)을 체결한 기관과 함께 프로그램 운영과 실증을 진행합니다." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.src} delay={i * 90} className="card card-hover group overflow-hidden">
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
          <SectionHeading eyebrow="History" title="연혁" lead="확정된 이정표와 앞으로의 목표를 연도별로 기록합니다." />
          <ol className="mt-12 border-l-2 border-line pl-8 md:ml-10">
            {HISTORY.map((h, i) => (
              <Reveal as="li" key={h.year} delay={i * 80} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full ring-4 ring-white ${i === 0 ? "bg-primary" : "bg-line-strong"}`}
                />
                <p className="font-display text-[26px] font-bold tracking-tight text-primary">{h.year}</p>
                <ul className="mt-3 space-y-2">
                  {h.items.map((it) => (
                    <li key={it.text} className="flex gap-4 text-[16px] text-ink-2">
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
