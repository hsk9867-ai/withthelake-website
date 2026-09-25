import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconBadge, IconBuilding, IconCare, IconHome } from "@/components/Icons";

const ROWS = [
  { icon: IconBuilding, target: "지자체 · 보건소", usage: "통합돌봄 사업 연계, 지역 주민 예방건강관리" },
  { icon: IconCare, target: "요양 · 재가복지 기관", usage: "이용자 건강 모니터링, 담당자 업무 효율화, 보호자 소통" },
  { icon: IconHome, target: "시니어 주거 · 프리미엄 시설", usage: "입주자 건강관리 서비스, 차별화된 케어 제공" },
  { icon: IconBadge, target: "기업 · 금융기관", usage: "ESG·사회공헌 사업, 시니어 고객 건강 프로그램" },
];

export default function SenioOrgs() {
  return (
    <section className="section bg-cream">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="적용 가능 기관"
          title="한 사람의 건강부터 지역사회의 건강까지"
        />

        <Reveal delay={100} className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white">
          <table className="w-full border-collapse text-left">
            <thead className="sr-only">
              <tr>
                <th>대상</th>
                <th>활용 방식</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <tr key={row.target} className="grid grid-cols-1 gap-2 px-6 py-5 sm:table-row sm:px-0 sm:py-0">
                    <td className="sm:w-[320px] sm:px-7 sm:py-6">
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                          <Icon size={20} />
                        </span>
                        <span className="text-[17px] font-bold text-ink">{row.target}</span>
                      </span>
                    </td>
                    <td className="t-body text-muted sm:px-7 sm:py-6">{row.usage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>

        <p className="t-body mt-6 max-w-2xl text-muted">
          기관 규모와 운영 방식에 따라 도입 구성을 조정할 수 있습니다. 실증 참여나 도입 상담은
          아래로 문의해 주세요.
        </p>
      </Container>
    </section>
  );
}
