import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/content/site";
import { IconArrow } from "@/components/Icons";

type Biz = {
  name: string;
  kind: string;
  tag: string;
  body: string;
  pills: string[];
  image: string;
  imageAlt: string;
  imageFit: "contain" | "cover";
  href?: string;
  actions: { label: string; href: string; variant: "primary" | "secondary"; external?: boolean }[];
};

const BUSINESSES: Biz[] = [
  {
    name: "SENIO",
    kind: "디지털 헬스케어",
    tag: "건강을 이해하는 기술",
    body: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결하는 디지털 헬스케어 솔루션입니다. 비의료 인력도 3분 안에 7종 지표를 측정하고 기록할 수 있습니다.",
    pills: ["Strip", "Lens", "Care"],
    image: "/assets/senio/device-front.png",
    imageAlt: "SENIO Lens 측정기",
    imageFit: "contain",
    href: "/senio",
    actions: [
      { label: "자세히 보기", href: "/senio", variant: "primary" },
      { label: "실증·협력 문의", href: "/contact?type=senio", variant: "secondary" },
    ],
  },
  {
    name: "WITH WELL ME",
    kind: "웰니스 브랜드",
    tag: "건강한 행동을 일상으로",
    body: "걷기, 운동, 건강 루틴, 콘텐츠, 셀프케어 제품을 통해 건강한 생활습관이 지속되도록 돕는 웰니스 브랜드입니다.",
    pills: ["EAT", "MOVE", "WALK", "CARE", "RECOVER"],
    image: "/assets/stock/barefoot-trail.jpg",
    imageAlt: "숲길을 맨발로 걷는 모습",
    imageFit: "cover",
    href: SITE.publish.withWellMe ? "/what-we-do/with-well-me" : undefined,
    actions: [
      { label: "스토어 바로가기", href: SITE.links.store, variant: "primary", external: true },
      ...(SITE.publish.withWellMe
        ? [{ label: "자세히 보기", href: "/what-we-do/with-well-me", variant: "secondary" as const }]
        : []),
    ],
  },
  {
    name: "COMMUNITY HEALTH",
    kind: "오프라인 프로그램",
    tag: "현장에서 함께 만드는 예방건강관리",
    body: "지자체·복지기관·기업과 함께 걷기, 운동, 노쇠 예방, 생활습관, 마음건강 프로그램을 운영합니다.",
    pills: ["걷기", "운동", "노쇠 예방", "생활습관", "마음건강"],
    image: "/assets/activities/barefoot-7.jpg",
    imageAlt: "지역 주민과 함께하는 맨발걷기 프로그램",
    imageFit: "cover",
    href: SITE.publish.communityHealth ? "/what-we-do/community-health" : undefined,
    actions: [
      { label: "프로그램 문의", href: "/contact?type=program", variant: "primary" },
      ...(SITE.publish.communityHealth
        ? [{ label: "자세히 보기", href: "/what-we-do/community-health", variant: "secondary" as const }]
        : []),
    ],
  },
];

export default function WhatWeDo({ index = "05", withHeading = true }: { index?: string; withHeading?: boolean }) {
  return (
    <section className="section bg-cream">
      <Container>
        {withHeading && (
          <SectionHeading
            index={index}
            eyebrow="What We Do"
            title="세 가지 방식으로 건강을 연결합니다"
            lead="기술·데이터·웰니스·지역사회를 하나의 흐름으로 연결해, 시니어가 자신의 건강을 이해하고 건강한 행동을 지속하도록 돕습니다."
          />
        )}

        <div className={`grid gap-6 lg:grid-cols-3 ${withHeading ? "mt-14" : ""}`}>
          {BUSINESSES.map((biz, i) => (
            <Reveal
              key={biz.name}
              delay={i * 120}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              <div
                className={`relative h-56 overflow-hidden ${
                  biz.imageFit === "contain" ? "bg-grid bg-primary-light" : ""
                }`}
              >
                <Image
                  src={biz.image}
                  alt={biz.imageAlt}
                  fill
                  sizes="(min-width:1024px) 400px, 100vw"
                  className={
                    biz.imageFit === "contain"
                      ? "object-contain p-7 transition-transform duration-700 group-hover:scale-[1.04]"
                      : "object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  }
                />
                <span className="t-meta absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[13px] font-semibold text-primary backdrop-blur">
                  {biz.kind}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-[22px] font-bold tracking-tight text-primary">
                  {biz.href ? (
                    <Link href={biz.href} className="inline-flex items-center gap-2 hover:underline">
                      {biz.name}
                      <IconArrow size={18} className="text-accent-dark opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ) : (
                    biz.name
                  )}
                </h3>
                <p className="mt-1 text-[16px] font-semibold text-ink">{biz.tag}</p>
                <p className="t-body mt-4 flex-1 text-muted">{biz.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {biz.pills.map((pill) => (
                    <span
                      key={pill}
                      className="t-meta rounded-full bg-accent-light px-3 py-1 text-[13px] font-semibold text-accent-deep"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {biz.actions.map((action) => (
                    <Button
                      key={action.label}
                      href={action.href}
                      variant={action.variant}
                      size="sm"
                      external={action.external}
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
