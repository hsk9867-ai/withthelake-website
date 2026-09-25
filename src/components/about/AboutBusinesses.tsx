import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconArrow } from "@/components/Icons";
import { SITE } from "@/content/site";

const BUSINESSES = [
  {
    name: "SENIO",
    kind: "디지털 헬스케어",
    desc: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결해 건강 상태를 확인하는 솔루션",
    href: "/senio",
    show: true,
  },
  {
    name: "WITH WELL ME",
    kind: "웰니스 브랜드",
    desc: "강원도 자연원료 기반 셀프케어 제품과 건강 루틴·콘텐츠",
    href: "/what-we-do/with-well-me",
    show: SITE.publish.withWellMe,
  },
  {
    name: "COMMUNITY HEALTH",
    kind: "오프라인 프로그램",
    desc: "지자체·복지기관·기업과 함께 운영하는 예방건강관리 프로그램",
    href: "/what-we-do/community-health",
    show: SITE.publish.communityHealth,
  },
];

export default function AboutBusinesses() {
  return (
    <section className="section bg-surface">
      <Container>
        <SectionHeading eyebrow="사업 구성" title="현재 세 개의 사업을 운영합니다" />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BUSINESSES.map((b, i) => {
            const inner = (
              <>
                <p className="t-meta font-semibold text-accent-deep">{b.kind}</p>
                <h3 className="font-display mt-3 text-[22px] font-bold tracking-tight text-primary">{b.name}</h3>
                <p className="t-body mt-3 flex-1 text-muted">{b.desc}</p>
                {b.show && (
                  <span className="t-meta mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                    자세히 보기 <IconArrow size={16} />
                  </span>
                )}
              </>
            );
            return (
              <Reveal key={b.name} delay={i * 110}>
                {b.show ? (
                  <Link href={b.href} className="card card-hover flex h-full flex-col p-8">
                    {inner}
                  </Link>
                ) : (
                  <div className="card flex h-full flex-col p-8">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
