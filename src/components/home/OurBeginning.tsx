import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const LINES = [
  "㈜위드더레이크는 지역사회 시니어 건강 현장에서 출발한 예방건강관리 기업입니다.",
  "건강한 습관을 이어가도 그 변화를 확인할 방법이 없다는 것이 현장의 과제였습니다.",
  "기술과 데이터는 그 변화를 확인하고 지속하게 하는 도구입니다.",
  "누구나 자신의 건강을 스스로 돌볼 기회를 가져야 한다는 원칙에서 사업을 설계합니다.",
];

export default function OurBeginning() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            OUR BEGINNING
          </p>
          <h2 className="mt-4 max-w-2xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            우리는 함께 걷는 현장에서 시작했습니다.
          </h2>
        </Reveal>
        <div className="mt-10 max-w-2xl space-y-5 border-l-2 border-primary/20 pl-6">
          {LINES.map((line, i) => (
            <Reveal key={line} delay={i * 90}>
              <p className="text-[16px] leading-8 text-muted md:text-[17px]">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
