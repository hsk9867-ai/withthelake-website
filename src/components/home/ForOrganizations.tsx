import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { IconBadge, IconBuilding, IconCare, IconHome } from "@/components/Icons";

const TARGETS = [
  {
    icon: IconBuilding,
    audience: "지자체 · 공공기관",
    headline: "지역사회 예방건강관리",
    body: "통합돌봄 사업과 연계한 주민 건강관리 프로그램",
  },
  {
    icon: IconCare,
    audience: "복지 · 시니어 기관",
    headline: "시니어 건강 프로그램과 SENIO",
    body: "이용자 건강 모니터링과 담당자 업무 효율화",
  },
  {
    icon: IconBadge,
    audience: "기업 · 금융기관",
    headline: "ESG·사회공헌 건강사업",
    body: "지역사회 기여와 연결되는 건강 프로그램 설계",
  },
  {
    icon: IconHome,
    audience: "웰니스 · 시니어 주거",
    headline: "건강관리와 웰니스 프로그램",
    body: "입주자 대상 건강관리 서비스",
  },
];

export default function ForOrganizations() {
  return (
    <section className="section bg-surface">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="For Organizations"
          title="한 사람의 건강부터 지역사회의 건강까지"
          lead="기관의 목적과 운영 방식에 맞춰 프로그램과 SENIO 도입 구성을 조정합니다."
          action={
            <Button href="/contact" variant="secondary" arrow>
              기관 도입 상담
            </Button>
          }
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {TARGETS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal
                key={t.audience}
                delay={i * 90}
                className="group flex flex-col bg-white p-8 transition-colors hover:bg-primary-light"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-accent-deep transition-colors group-hover:bg-white">
                  <Icon size={24} />
                </span>
                <p className="t-meta mt-8 font-semibold text-accent-deep">{t.audience}</p>
                <h3 className="t-h3 mt-2 text-ink">{t.headline}</h3>
                <p className="t-body mt-3 text-muted">{t.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
