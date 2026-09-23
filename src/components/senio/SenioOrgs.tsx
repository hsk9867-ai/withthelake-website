import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const ROWS = [
  { target: "지자체 · 보건소", usage: "통합돌봄 사업 연계, 지역 주민 예방건강관리" },
  { target: "요양 · 재가복지 기관", usage: "이용자 건강 모니터링, 담당자 업무 효율화, 보호자 소통" },
  { target: "시니어 주거 · 프리미엄 시설", usage: "입주자 건강관리 서비스, 차별화된 케어 제공" },
  { target: "기업 · 금융기관", usage: "ESG·사회공헌 사업, 시니어 고객 건강 프로그램" },
];

export default function SenioOrgs() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            한 사람의 건강부터 지역사회의 건강까지
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-cream">
                <th className="px-6 py-4 text-[14px] font-bold text-ink">대상</th>
                <th className="px-6 py-4 text-[14px] font-bold text-ink">활용 방식</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.target} className="border-t border-line">
                  <td className="px-6 py-5 align-top text-[14.5px] font-semibold text-primary">
                    {row.target}
                  </td>
                  <td className="px-6 py-5 align-top text-[14.5px] leading-7 text-muted">
                    {row.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-6 text-[14.5px] leading-7 text-muted">
          기관 규모와 운영 방식에 따라 도입 구성을 조정할 수 있습니다.
          실증 참여나 도입 상담은 아래로 문의해 주세요.
        </p>
      </Container>
    </section>
  );
}
