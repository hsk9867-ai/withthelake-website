import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconBuilding, IconTrend, IconUnderstand } from "@/components/Icons";

const CARDS = [
  {
    n: "01",
    icon: IconTrend,
    title: "알아도 지속하기 어렵다",
    body: "건강에 좋은 것은 이미 알고 있습니다. 하지만 변화가 눈에 보이지 않으면 행동은 오래 이어지지 않습니다.",
  },
  {
    n: "02",
    icon: IconUnderstand,
    title: "데이터가 흩어져 있다",
    body: "생체 정보, 걷기, 운동, 생활 습관이 각각 다른 곳에 남습니다. 하나로 이어지지 않으면 의미를 읽을 수 없습니다.",
  },
  {
    n: "03",
    icon: IconBuilding,
    title: "기관이 개인별로 관리하기 어렵다",
    body: "담당자 한 사람이 여러 사람을 돌봅니다. 개인별 건강 변화를 지속적으로 기록하고 추적할 수단이 필요합니다.",
  },
];

export default function Problem() {
  return (
    <section className="section bg-cream">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Problem"
          title="건강관리는 왜 지속되기 어려울까요?"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.n} delay={i * 120} className="card card-hover flex flex-col p-8 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon size={24} />
                  </span>
                  <span className="t-meta text-line-strong">{card.n}</span>
                </div>
                <h3 className="t-h3 mt-8 text-ink">{card.title}</h3>
                <p className="t-body mt-3 text-muted">{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
