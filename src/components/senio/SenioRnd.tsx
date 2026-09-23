import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const ITEMS = [
  {
    title: "연구개발",
    body: "누적 수주 4억원 이상. 중소벤처기업부 디딤돌 R&D, Pre-TIPS, 강원 초기창업 등 정부 R&D 과제를 수행하며 개발을 진행해왔습니다.",
  },
  {
    title: "지식재산",
    body: "핵심 알고리즘 특허 출원 완료 (2026.08.19, 출원번호 10-2026-0155385) · 상표 출원 4건 · 기기 외관 디자인 출원 1건",
  },
  {
    title: "검증",
    body: "공인시험 성적서 확보 절차를 진행 중이며, 2026년 강원 거점 실증에서 병원 사용 검사 장비와 결과를 비교하는 데이터를 확보할 계획입니다.",
  },
  {
    title: "인허가 로드맵",
    body: "현재는 웰니스 기기로 운영하며, 2027년 식약처 의료기기 2등급 인허가 신청, 2028년 취득을 목표로 준비하고 있습니다.",
  },
  {
    title: "현장 실증",
    body: "2026년 10개 기관 실증을 목표로 하며, 현재 춘천 희망요양원·희망복지관, 춘천미래동행재단 프로그램, MG함께자람 사업 등 4곳이 확정되었습니다.",
  },
];

export default function SenioRnd() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            R&D · 실증 현황
          </p>
          <h2 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            현장에서 검증하며 만들어가고 있습니다
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="rounded-2xl border border-line bg-white p-7">
              <h3 className="text-[16px] font-bold text-ink">{item.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-7 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 rounded-2xl border border-primary/20 bg-primary-light p-7">
          <p className="text-[14px] font-bold text-primary">이용 안내</p>
          <p className="mt-2 text-[14.5px] leading-7 text-ink">
            현재 SENIO는 웰니스 기기로, 의료 진단이 아닌 일상 모니터링과 이상
            징후 확인을 목적으로 합니다. 의료적 판단은 병원 검사를 통해
            이루어지며, SENIO는 병원에 가기 전 단계를 담당합니다.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
