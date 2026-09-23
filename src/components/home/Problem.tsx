import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const CARDS = [
  {
    n: "01",
    title: "알아도 지속하기 어렵다",
    body: "건강에 좋은 것은 이미 알고 있습니다. 하지만 변화가 눈에 보이지 않으면 행동은 오래 이어지지 않습니다.",
  },
  {
    n: "02",
    title: "데이터가 흩어져 있다",
    body: "생체 정보, 걷기, 운동, 생활 습관이 각각 다른 곳에 남습니다. 하나로 이어지지 않으면 의미를 읽을 수 없습니다.",
  },
  {
    n: "03",
    title: "기관이 개인별로 관리하기 어렵다",
    body: "담당자 한 사람이 여러 사람을 돌봅니다. 개인별 건강 변화를 지속적으로 기록하고 추적할 수단이 필요합니다.",
  },
];

export default function Problem() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            건강관리는 왜 지속되기 어려울까요?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delay={i * 120}>
              <div className="rounded-2xl border border-line bg-white p-8">
                <span className="text-[28px] font-extrabold text-primary/25">
                  {card.n}
                </span>
                <h3 className="mt-4 text-[18px] font-bold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-muted">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
