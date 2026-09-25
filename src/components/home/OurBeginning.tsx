import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const LINES = [
  "㈜위드더레이크는 지역사회 시니어 건강 현장에서 출발한 예방건강관리 기업입니다.",
  "건강한 습관을 이어가도 그 변화를 확인할 방법이 없다는 것이 현장의 과제였습니다.",
  "기술과 데이터는 그 변화를 확인하고 지속하게 하는 도구입니다.",
  "누구나 자신의 건강을 스스로 돌볼 기회를 가져야 한다는 원칙에서 사업을 설계합니다.",
];

export default function OurBeginning() {
  return (
    <section className="section bg-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              index="02"
              eyebrow="Our Beginning"
              title="우리는 함께 걷는 현장에서 시작했습니다."
            />
            <div className="mt-10 space-y-6">
              {LINES.map((line, i) => (
                <Reveal key={line} delay={i * 90}>
                  <p className="t-body-lg flex gap-5 text-ink-2">
                    <span
                      aria-hidden
                      className="mt-[13px] h-px w-6 shrink-0 bg-accent-dark"
                    />
                    <span>{line}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={150} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] lg:aspect-[5/6]">
              <Image
                src="/assets/activities/barefoot-2.jpg"
                alt="지역 주민과 함께하는 맨발걷기 프로그램 현장"
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-line bg-white p-5 shadow-[0_24px_50px_-24px_rgba(23,22,28,0.35)] sm:block">
              <p className="eyebrow text-accent-deep">Nature × Human × Science</p>
              <p className="mt-2 text-[16px] font-semibold text-ink">
                자연과 걷기에서 시작해, 데이터로 변화를 확인합니다
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
