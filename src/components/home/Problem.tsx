import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

/**
 * 레퍼런스의 흰 배경 섹션: 둥근 풀폭 배너 이미지 + 도형 불릿이 붙은 큰 문장 + 인용 문단.
 * 기획서 03 PROBLEM 원고를 그대로 사용합니다.
 */
const CARDS = [
  {
    shape: <span aria-hidden className="inline-block h-4 w-4 rounded-full bg-primary" />,
    title: "알아도 지속하기 어렵다",
    body: "건강에 좋은 것은 이미 알고 있습니다. 하지만 변화가 눈에 보이지 않으면 행동은 오래 이어지지 않습니다.",
  },
  {
    shape: <span aria-hidden className="inline-block h-4 w-4 rounded-[3px] bg-accent" />,
    title: "데이터가 흩어져 있다",
    body: "생체 정보, 걷기, 운동, 생활 습관이 각각 다른 곳에 남습니다. 하나로 이어지지 않으면 의미를 읽을 수 없습니다.",
  },
  {
    shape: (
      <span aria-hidden className="inline-block h-4 w-4 bg-primary" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
    ),
    title: "기관이 개인별로 관리하기 어렵다",
    body: "담당자 한 사람이 여러 사람을 돌봅니다. 개인별 건강 변화를 지속적으로 기록하고 추적할 수단이 필요합니다.",
  },
];

export default function Problem() {
  return (
    <section className="section bg-surface">
      <Container size="wide">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[20px] sm:aspect-[16/9] md:aspect-[21/9]">
          <Image
            src="/assets/activities/barefoot-2.jpg"
            alt="지역 주민과 함께 숲길을 걷는 맨발걷기 프로그램"
            fill
            sizes="(min-width:1400px) 1320px, 100vw"
            className="object-cover object-[50%_35%]"
          />
          <div aria-hidden className="absolute inset-0 bg-black/25" />
          <p className="t-en absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white md:flex-row md:gap-0">
            <span>Health in Daily Life</span>
            <span aria-hidden className="hidden h-7 w-px bg-white/60 md:mx-5 md:block" />
            <span className="text-[clamp(18px,2.4vw,30px)] font-medium">병원 밖, 일상에서 시작하는 예방건강관리</span>
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-4xl text-center md:mt-28">
          <h2 className="t-h2 text-ink">건강관리는 왜 지속되기 어려울까요?</h2>
        </Reveal>

        <ul className="mx-auto mt-12 max-w-4xl space-y-8 md:mt-16 md:space-y-10">
          {CARDS.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 120} className="text-center">
              <p className="t-statement flex flex-wrap items-center justify-center gap-4 text-ink">
                {i % 2 === 0 && c.shape}
                {c.title}
                {i % 2 === 1 && c.shape}
              </p>
              <p className="t-body-lg mx-auto mt-3 max-w-2xl text-muted">{c.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
          <p className="t-lead text-ink-2">
            &ldquo;건강정보를 제공하는 것에서 끝나지 않고,
            <br className="hidden md:block" />
            측정 → 이해 → 건강행동 → 지속 → 변화 확인까지 연결되는 예방건강관리 구조를 만들어갑니다.&rdquo;
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
