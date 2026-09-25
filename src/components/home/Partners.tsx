import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { AWARDS, CERTS, PARTNERS, PROGRAMS } from "@/content/impact";

/**
 * 레퍼런스 "Our Partners" — 가운데 영문 타이틀 + 로고 마키.
 * 인증·수상·선정 사업 명칭을 이어 붙인 텍스트 마키와 MOU 협약 사진을 둡니다.
 */
const STRIP = [
  ...CERTS.map((c) => c.name),
  ...AWARDS,
  ...PROGRAMS,
  ...PARTNERS.map((p) => p.name),
];

export default function Partners() {
  return (
    <section className="section bg-surface">
      <Container size="wide">
        <Reveal className="text-center">
          <h2 className="t-en text-ink">Our Partners</h2>
          <p className="t-lead mx-auto mt-4 max-w-2xl text-muted">
            업무협약을 맺은 기관, 인증과 수상, 선정 사업을 사실 그대로 기록합니다.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.src} delay={i * 80} className="card card-hover group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.src} alt={`${p.name} 업무협약식`} fill sizes="(min-width:1024px) 320px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[16px] font-bold text-ink">{p.name}</p>
                  <p className="text-[14px] text-muted">{p.kind}</p>
                </div>
                <span className="t-meta rounded-md bg-primary-soft px-2.5 py-1 text-[12px] font-bold text-primary">MOU</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* 텍스트 마키 */}
      <div className="mt-14 overflow-hidden border-y border-line py-5" aria-label="인증 · 수상 · 선정 사업 · 협력기관">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...STRIP, ...STRIP].map((s, i) => (
            <span key={i} className="flex items-center gap-10 text-[18px] font-semibold text-ink-2">
              {s}
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <Container className="mt-10 flex justify-center">
        <Button href="/impact" variant="secondary" arrow>
          전체 성과 보기
        </Button>
      </Container>
    </section>
  );
}
