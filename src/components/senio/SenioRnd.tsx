import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { ImpactContent, SenioContent } from "@/lib/cms/types";

export default function SenioRnd({ data, impact }: { data: SenioContent["rnd"]; impact: ImpactContent }) {
  const { pilots, rnd, ip, roadmap } = impact;
  const progress = pilots.target > 0 ? Math.min(100, Math.round((pilots.confirmed.length / pilots.target) * 100)) : 0;

  return (
    <section className="section bg-surface">
      <Container>
        <SectionHeading index="03" eyebrow={data.eyebrow} title={data.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* 연구개발 */}
          <Reveal className="card p-8">
            <p className="eyebrow text-accent-deep">{data.rndEyebrow}</p>
            <p className="t-stat mt-4 text-primary">{rnd.headline}</p>
            <p className="mt-1 text-[16px] font-semibold text-ink">{rnd.summary}</p>
            <p className="t-body mt-3 text-muted">{rnd.body}</p>
          </Reveal>

          {/* 지식재산 */}
          <Reveal delay={90} className="card p-8">
            <p className="eyebrow text-accent-deep">{data.ipEyebrow}</p>
            <ul className="mt-4 divide-y divide-line">
              {ip.map((item, i) => (
                <li key={`${item.label}-${i}`} className="py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[16px] font-medium text-ink">{item.label}</span>
                    <span className="t-meta font-semibold text-primary">{item.value}</span>
                  </div>
                  {item.detail && <p className="mt-0.5 text-[14px] text-muted">{item.detail}</p>}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 검증 */}
          <Reveal delay={180} className="card p-8">
            <p className="eyebrow text-accent-deep">{data.verifyEyebrow}</p>
            <p className="t-body mt-4 text-ink-2">{data.verifyBody}</p>
          </Reveal>
        </div>

        {/* 인허가 로드맵 */}
        <Reveal className="mt-5 card p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="eyebrow text-accent-deep">{data.roadmapEyebrow}</p>
            <p className="text-[15px] text-muted">{data.roadmapNote}</p>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-4 md:gap-0">
            {roadmap.map((r, i) => {
              const current = i === 0;
              return (
                <li key={`${r.period}-${i}`} className="relative md:pr-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ring-4 ${
                        current ? "bg-primary ring-primary-soft" : "bg-line-strong ring-cream"
                      }`}
                    />
                    <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
                  </div>
                  <p className={`t-meta mt-4 font-semibold ${current ? "text-primary" : "text-accent-deep"}`}>{r.period}</p>
                  <p className="mt-1 text-[17px] font-bold text-ink">{r.title}</p>
                  <p className="t-body mt-1 text-muted">{r.body}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* 현장 실증 */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal className="card p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="eyebrow text-accent-deep">{data.pilotEyebrow}</p>
              <p className="t-meta text-muted">{pilots.year}년</p>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <p className="t-stat text-primary">{pilots.confirmed.length}곳</p>
              <p className="mb-1.5 text-[16px] text-muted">확정 · 목표 {pilots.target}개 기관</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream-deep" aria-hidden>
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {pilots.confirmed.map((c, i) => (
                <li key={`${c}-${i}`} className="rounded-full border border-line px-3.5 py-1 text-[15px] text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 한계 고지 (박스 처리) */}
          <Reveal delay={90} className="rounded-[20px] border border-primary/20 bg-primary-light p-8">
            <p className="eyebrow text-primary">{data.noticeEyebrow}</p>
            <p className="t-body mt-4 text-ink">{data.noticeBody}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
