import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const STEPS = [
  { n: "01", title: "측정", body: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 일상에서 확인합니다" },
  { n: "02", title: "이해", body: "숫자를 쉬운 언어로 바꿔, 지금 내 상태가 어떤 의미인지 알려줍니다" },
  { n: "03", title: "행동", body: "상태에 맞는 건강 루틴과 프로그램으로 다음 행동을 제안합니다" },
  { n: "04", title: "지속", body: "기록이 쌓이고 리마인드가 이어져 습관이 유지됩니다" },
  { n: "05", title: "변화 확인", body: "다시 측정해 나아졌는지 확인하고, 그 변화가 다음 행동의 이유가 됩니다" },
];

export default function HowWeWork() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            HOW WE WORK
          </p>
          <h2 className="mt-4 max-w-2xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            건강정보를 제공하는 것에서 끝내지 않습니다
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white">
                {step.n}
              </div>
              <h3 className="mt-4 text-[17px] font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">{step.body}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-[-14px] top-6 hidden text-primary/30 md:block"
                >
                  →
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 rounded-full bg-accent-light px-6 py-3 text-[14px] font-medium text-accent-dark w-fit">
          <span aria-hidden>↻</span>
          변화 확인은 다시 측정으로 이어지며 순환합니다
        </div>
      </Container>
    </section>
  );
}
