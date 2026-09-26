import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * 블랙 섹션 (기획서 02 OUR BEGINNING).
 * 좌: 문장형 헤드라인 + 소개 문장 + 현장 사진 / 우: 세 키워드를 원고 문장과 짝지은 3단계 목록.
 * 기획서 원고 네 문장은 그대로 쓰고 배치만 재구성했습니다.
 */
const STEPS = [
  {
    no: "01",
    title: "함께 걷는 현장",
    body: "건강한 습관을 이어가도 그 변화를 확인할 방법이 없다는 것이 현장의 과제였습니다.",
  },
  {
    no: "02",
    title: "확인할 수 있는 변화",
    body: "기술과 데이터는 그 변화를 확인하고 지속하게 하는 도구입니다.",
  },
  {
    no: "03",
    title: "스스로 돌보는 건강",
    body: "누구나 자신의 건강을 스스로 돌볼 기회를 가져야 한다는 원칙에서 사업을 설계합니다.",
  },
];

export default function Beginning() {
  return (
    <section className="bg-black text-white" aria-label="우리의 시작">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
          {/* 좌: 헤드라인 + 소개 + 사진 */}
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-accent">Our Beginning</p>
            <h2 className="t-h1 mt-5 text-white">
              우리는 함께 걷는
              <br />
              현장에서 시작했습니다
            </h2>
            <p className="t-lead mt-6 max-w-md text-white/75">
              ㈜위드더레이크는 지역사회 시니어 건강 현장에서 출발한 예방건강관리 기업입니다.
            </p>
            <div className="relative mt-8 aspect-[3/2] max-w-sm overflow-hidden rounded-[14px] md:mt-10">
              <Image
                src="/assets/activities/barefoot-3.jpg"
                alt="맨발걷기 프로그램 참가자들이 둥글게 모여 발을 맞댄 모습"
                fill
                sizes="(min-width:768px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* 우: 3단계 목록 */}
          <ol className="md:col-span-7 md:self-center">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.no} delay={120 + i * 120} className="border-t border-white/15 py-7 md:py-9">
                <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                  <span className="t-meta pt-2 font-bold text-accent">{s.no}</span>
                  <div>
                    <p className="text-[clamp(26px,2.8vw,38px)] font-extrabold leading-[1.2] tracking-[-0.03em] text-white">
                      {s.title}
                    </p>
                    <p className="t-body-lg mt-3 max-w-xl text-white/70">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <li aria-hidden className="border-t border-white/15" />
          </ol>
        </div>
      </div>
    </section>
  );
}
