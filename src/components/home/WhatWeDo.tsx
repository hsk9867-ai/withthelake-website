import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const BUSINESSES = [
  {
    name: "SENIO",
    tag: "건강을 이해하는 기술",
    body: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결하는 디지털 헬스케어 솔루션입니다. 비의료 인력도 3분 안에 7종 지표를 측정하고 기록할 수 있습니다.",
    pills: ["Strip", "Lens", "Care"],
    image: "/assets/senio/device-front.png",
    imageFit: "contain" as const,
    actions: [
      { label: "자세히 보기", href: "/senio", variant: "primary" as const },
      { label: "실증·협력 문의", href: "/contact", variant: "secondary" as const },
    ],
  },
  {
    name: "WITH WELL ME",
    tag: "건강한 행동을 일상으로",
    body: "걷기, 운동, 건강 루틴, 콘텐츠, 셀프케어 제품을 통해 건강한 생활습관이 지속되도록 돕는 웰니스 브랜드입니다.",
    pills: ["EAT", "MOVE", "WALK", "CARE", "RECOVER"],
    image: "/assets/stock/barefoot-trail.jpg",
    imageFit: "cover" as const,
    actions: [
      { label: "스토어 바로가기", href: "/store", variant: "primary" as const },
      { label: "자세히 보기", href: "/what-we-do/with-well-me", variant: "secondary" as const },
    ],
  },
  {
    name: "COMMUNITY HEALTH",
    tag: "현장에서 함께 만드는 예방건강관리",
    body: "지자체·복지기관·기업과 함께 걷기, 운동, 노쇠 예방, 생활습관, 마음건강 프로그램을 운영합니다.",
    pills: [],
    image: "/assets/activities/barefoot-2.jpg",
    imageFit: "cover" as const,
    actions: [
      { label: "프로그램 문의", href: "/contact", variant: "primary" as const },
      { label: "자세히 보기", href: "/what-we-do/community-health", variant: "secondary" as const },
    ],
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            WHAT WE DO
          </p>
          <h2 className="mt-4 max-w-2xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            세 가지 방식으로 건강을 연결합니다
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {BUSINESSES.map((biz, i) => (
            <Reveal
              key={biz.name}
              delay={i * 120}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div
                className={`relative h-44 ${
                  biz.imageFit === "contain" ? "bg-primary-light" : ""
                }`}
              >
                <Image
                  src={biz.image}
                  alt={biz.name}
                  fill
                  className={
                    biz.imageFit === "contain"
                      ? "object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      : "object-cover transition-transform duration-500 group-hover:scale-110"
                  }
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
              <h3 className="text-[20px] font-extrabold tracking-tight text-primary">
                {biz.name}
              </h3>
              <p className="mt-1 text-[14px] font-semibold text-ink">{biz.tag}</p>
              <p className="mt-4 flex-1 text-[15px] leading-7 text-muted">
                {biz.body}
              </p>
              {biz.pills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {biz.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-accent-light px-3 py-1 text-[12px] font-semibold text-accent-dark"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {biz.actions.map((action) => (
                  <Button
                    key={action.label}
                    href={action.href}
                    variant={action.variant}
                    className="px-5 py-2.5 text-[14px]"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
