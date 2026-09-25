import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import AboutBusinesses from "@/components/about/AboutBusinesses";
import { SITE } from "@/content/site";
import { CERTS } from "@/content/impact";

export const metadata: Metadata = {
  title: "ABOUT — 회사소개",
  description: SITE.description,
};

const AXES = [
  {
    key: "Nature",
    ko: "자연",
    body: "자연 · 걷기 · 위드더레이크의 시작",
    image: "/assets/stock/barefoot-trail.jpg",
    alt: "숲길을 맨발로 걷는 모습",
  },
  {
    key: "Human",
    ko: "사람",
    body: "시니어 · 현장 · 커뮤니티",
    image: "/assets/stock/senior-hands.jpg",
    alt: "시니어의 손을 맞잡은 돌봄 현장",
  },
  {
    key: "Science",
    ko: "과학",
    body: "SENIO · 데이터 · R&D",
    image: "/assets/senio/device-styled.jpg",
    alt: "SENIO 앱 측정 결과 화면",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About · 회사소개"
        crumbs={[{ label: "ABOUT" }]}
        title="데이터와 건강행동을 연결해, 시니어의 건강한 자립생활이 더 오래 지속되도록 돕습니다"
        lead="㈜위드더레이크는 지역사회 기반 예방건강관리 기업입니다. 병원 밖 일상에서 건강을 측정하고 이해하고 행동으로 잇는 구조를 만듭니다."
        image="/assets/stock/senior-care-visit.jpg"
        imageAlt="시니어 부부와 상담하는 건강관리 담당자"
      />

      {/* 인식 · 핵심 메시지 */}
      <section className="section bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-accent-deep">우리가 전하려는 인식</p>
              <p className="t-h2 mt-5 text-ink">
                맨발걷기, 제품, 프로그램, SENIO를 각각 하는 회사가 아니라
              </p>
              <p className="t-lead mt-5 text-ink-2">
                시니어가 자신의 건강을 이해하고 건강한 행동을 지속하도록
                <span className="font-semibold text-primary"> 기술·데이터·웰니스·지역사회를 연결하는 회사</span>
                입니다.
              </p>
            </Reveal>
            <Reveal delay={120} className="rounded-[24px] bg-cream p-8 md:p-10">
              <p className="eyebrow text-accent-deep">핵심 메시지</p>
              <p className="t-h3 mt-5 text-ink">건강한 삶은 병원 밖, 일상에서 시작됩니다.</p>
              <p className="t-body mt-4 text-muted">
                건강정보를 제공하는 것에서 끝나지 않고, 측정 → 이해 → 건강행동 → 지속 → 변화 확인까지
                연결되는 예방건강관리 구조를 만들어갑니다.
              </p>
              <ol className="mt-6 flex flex-wrap items-center gap-2">
                {["측정", "이해", "행동", "지속", "변화 확인"].map((s, i, arr) => (
                  <li key={s} className="flex items-center gap-2">
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
      <section className="section bg-cream">
        <Container>
          <SectionHeading
            eyebrow="Identity"
            title={
              <>
                Nature <span className="text-accent-dark">×</span> Human{" "}
                <span className="text-accent-dark">×</span> Science
              </>
            }
            lead="따뜻하지만 전문적이고, 자연친화적이지만 기술적이며, 사회적 가치를 추구하면서도 사업성이 있는 기업으로 나아갑니다."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {AXES.map((a, i) => (
              <Reveal key={a.key} delay={i * 100} className="card card-hover group overflow-hidden">
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

      <AboutBusinesses />

      {/* 인증 · 회사 정보 */}
      <section className="section bg-surface">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <Reveal className="card p-8 md:p-10">
              <p className="eyebrow text-accent-deep">인증</p>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {CERTS.map((c) => (
                  <li key={c.name} className="rounded-xl bg-cream px-4 py-3">
                    <p className="text-[16px] font-semibold text-ink">{c.name}</p>
                    <p className="t-meta text-[12px] text-muted">{c.short}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className="card flex flex-col p-8 md:p-10">
              <p className="eyebrow text-accent-deep">회사 정보</p>
              <dl className="mt-5 divide-y divide-line">
                {[
                  { label: "상호", value: `${SITE.name} (WITH THE LAKE Co., Ltd.)` },
                  { label: "담당", value: `${SITE.contact.team} ${SITE.contact.person}` },
                  { label: "전화", value: SITE.contact.phone },
                  { label: "이메일", value: SITE.contact.email },
                ].map((row) => (
                  <div key={row.label} className="flex gap-6 py-3">
                    <dt className="w-16 shrink-0 text-[15px] font-semibold text-primary">{row.label}</dt>
                    <dd className="text-[16px] text-ink-2">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto pt-6">
                <Button href="/contact" variant="primary" arrow>
                  사업·협력 문의하기
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
