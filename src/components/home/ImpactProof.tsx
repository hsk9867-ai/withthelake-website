import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { AWARDS, CERTS, IP, LEADER_TRAINING, PARTNERS, PROGRAMS } from "@/content/impact";

export default function ImpactProof() {
  return (
    <section className="section relative overflow-hidden bg-primary text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          index="07"
          eyebrow="Impact & Proof"
          tone="dark"
          title="현장에서 검증하며 쌓아온 신뢰"
          lead="협력기관, 건강리더 양성, 지식재산, 인증과 수상 이력을 사실 그대로 기록합니다."
          action={
            <Button href="/impact" variant="ghost" arrow>
              전체 성과 보기
            </Button>
          }
        />

        {/* 협력기관 */}
        <div className="mt-14">
          <p className="eyebrow text-accent">MOU 협력기관</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <Reveal
                key={p.src}
                delay={i * 90}
                className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={`${p.name} 업무협약식`}
                    fill
                    sizes="(min-width:1024px) 280px, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-[16px] font-semibold">{p.name}</p>
                  <p className="text-[14px] text-white/60">{p.kind}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 건강리더 · 지식재산 */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal className="grid gap-6 rounded-2xl border border-white/12 bg-white/[0.06] p-7 sm:grid-cols-[1fr_180px] sm:items-center">
            <div>
              <p className="eyebrow text-accent">{LEADER_TRAINING.title}</p>
              <p className="t-body mt-3 text-white/85">{LEADER_TRAINING.body}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={LEADER_TRAINING.photos[0]}
                alt="맨발걷기 지도자 양성과정 교육 현장"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="rounded-2xl border border-white/12 bg-white/[0.06] p-7">
            <p className="eyebrow text-accent">지식재산</p>
            <ul className="mt-4 divide-y divide-white/10">
              {IP.map((ip) => (
                <li key={ip.label} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                  <span className="text-[16px] font-medium text-white/90">{ip.label}</span>
                  <span className="t-meta text-accent">
                    {ip.value}
                    {ip.detail && <span className="ml-2 text-white/55">{ip.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* 인증 · 수상 · 선정 */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal className="rounded-2xl border border-white/12 p-7">
            <p className="eyebrow text-accent">인증</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {CERTS.map((c) => (
                <li key={c.name} className="rounded-full border border-white/25 px-4 py-1.5 text-[15px] text-white/90">
                  {c.name}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="rounded-2xl border border-white/12 p-7">
            <p className="eyebrow text-accent">수상</p>
            <ul className="mt-4 space-y-2">
              {AWARDS.map((a) => (
                <li key={a} className="flex gap-3 text-[16px] text-white/90">
                  <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160} className="rounded-2xl border border-white/12 p-7">
            <p className="eyebrow text-accent">선정 사업</p>
            <ul className="mt-4 space-y-2">
              {PROGRAMS.map((p) => (
                <li key={p} className="flex gap-3 text-[16px] text-white/90">
                  <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
