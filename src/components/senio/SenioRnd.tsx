import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IP, PILOTS, RND, ROADMAP } from "@/content/impact";

export default function SenioRnd() {
  return (
    <section className="section bg-surface">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="R&D · 실증 현황"
          title="현장에서 검증하며 만들어가고 있습니다"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* 연구개발 */}
          <Reveal className="card p-8">
            <p className="eyebrow text-accent-deep">연구개발</p>
            <p className="t-stat mt-4 text-primary">4억원+</p>
            <p className="mt-1 text-[16px] font-semibold text-ink">{RND.summary}</p>
            <p className="t-body mt-3 text-muted">{RND.body}</p>
          </Reveal>

          {/* 지식재산 */}
          <Reveal delay={90} className="card p-8">
            <p className="eyebrow text-accent-deep">지식재산</p>
            <ul className="mt-4 divide-y divide-line">
              {IP.map((ip) => (
                <li key={ip.label} className="py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[16px] font-medium text-ink">{ip.label}</span>
                    <span className="t-meta font-semibold text-primary">{ip.value}</span>
                  </div>
                  {ip.detail && <p className="mt-0.5 text-[14px] text-muted">{ip.detail}</p>}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 검증 */}
          <Reveal delay={180} className="card p-8">
            <p className="eyebrow text-accent-deep">검증</p>
            <p className="t-body mt-4 text-ink-2">
              공인시험 성적서 확보 절차를 진행 중이며, 2026년 강원 거점 실증에서 병원 사용 검사
              장비와 결과를 비교하는 데이터를 확보할 계획입니다.
            </p>
          </Reveal>
        </div>

        {/* 인허가 로드맵 */}
        <Reveal className="mt-5 card p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="eyebrow text-accent-deep">인허가 로드맵</p>
            <p className="text-[15px] text-muted">현재 웰니스 기기로 운영 · 의료기기 인증은 추진 중</p>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-4 md:gap-0">
            {ROADMAP.map((r, i) => {
              const current = i === 0;
              return (
                <li key={r.period} className="relative md:pr-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ring-4 ${
                        current ? "bg-primary ring-primary-soft" : "bg-line-strong ring-cream"
                      }`}
                    />
                    <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
                  </div>
                  <p className={`t-meta mt-4 font-semibold ${current ? "text-primary" : "text-accent-deep"}`}>
                    {r.period}
                  </p>
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
              <p className="eyebrow text-accent-deep">현장 실증</p>
              <p className="t-meta text-muted">{PILOTS.year}년</p>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <p className="t-stat text-primary">{PILOTS.confirmed.length}곳</p>
              <p className="mb-1.5 text-[16px] text-muted">확정 · 목표 {PILOTS.target}개 기관</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream-deep" aria-hidden>
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.round((PILOTS.confirmed.length / PILOTS.target) * 100)}%` }}
              />
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {PILOTS.confirmed.map((c) => (
                <li key={c} className="rounded-full border border-line px-3.5 py-1 text-[15px] text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 한계 고지 (박스 처리) */}
          <Reveal delay={90} className="rounded-[20px] border border-primary/20 bg-primary-light p-8">
            <p className="eyebrow text-primary">이용 안내</p>
            <p className="t-body mt-4 text-ink">
              현재 SENIO는 웰니스 기기로, 의료 진단이 아닌 일상 모니터링과 이상 징후 확인을 목적으로
              합니다. 의료적 판단은 병원 검사를 통해 이루어지며, SENIO는 병원에 가기 전 단계를
              담당합니다.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
