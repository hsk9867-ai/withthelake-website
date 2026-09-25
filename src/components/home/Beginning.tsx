import Reveal from "@/components/Reveal";

/**
 * 블랙 타이포 섹션 (기획서 02 OUR BEGINNING) — 스크롤 연동 없이 고정.
 * 큰 세 줄이 계단식으로 놓이고, 우측 하단에 기획서 원고 네 문장을 둡니다.
 */
const LINES = ["함께 걷는 현장", "확인할 수 있는 변화", "스스로 돌보는 건강"];

const COPY = [
  "㈜위드더레이크는 지역사회 시니어 건강 현장에서 출발한 예방건강관리 기업입니다.",
  "건강한 습관을 이어가도 그 변화를 확인할 방법이 없다는 것이 현장의 과제였습니다.",
  "기술과 데이터는 그 변화를 확인하고 지속하게 하는 도구입니다.",
  "누구나 자신의 건강을 스스로 돌볼 기회를 가져야 한다는 원칙에서 사업을 설계합니다.",
];

export default function Beginning() {
  return (
    <section className="bg-black text-white" aria-label="우리의 시작">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-8 md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow text-accent">Our Beginning</p>
          <h2 className="sr-only">우리는 함께 걷는 현장에서 시작했습니다.</h2>
          <ul className="mt-6 space-y-3 md:space-y-4">
            {LINES.map((line, i) => (
              <li key={line} className="t-display" style={{ paddingLeft: `${i * 6}%` }}>
                <span className={`inline-block border-b-4 pb-1 ${i === 0 ? "border-accent" : "border-transparent"}`}>
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="mt-16 ml-auto max-w-xl md:mt-24 md:text-right">
          <ul className="space-y-4">
            {COPY.map((c) => (
              <li key={c} className="t-lead text-white/85">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
