import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { IconBadge, IconBuilding, IconCare, IconHome } from "@/components/Icons";

/**
 * 기획서 06 FOR ORGANIZATIONS + 09 FINAL CTA.
 * 가운데 타이틀 + 문장 → 네이비 풀폭 카드(기관별 구성 + 문의 버튼). 스크롤 연동 없이 등장만 합니다.
 */
const TARGETS = [
  { icon: IconBuilding, audience: "지자체 · 공공기관", headline: "지역사회 예방건강관리", body: "통합돌봄 사업과 연계한 주민 건강관리 프로그램" },
  { icon: IconCare, audience: "복지 · 시니어 기관", headline: "시니어 건강 프로그램과 SENIO", body: "이용자 건강 모니터링과 담당자 업무 효율화" },
  { icon: IconBadge, audience: "기업 · 금융기관", headline: "ESG·사회공헌 건강사업", body: "지역사회 기여와 연결되는 건강 프로그램 설계" },
  { icon: IconHome, audience: "웰니스 · 시니어 주거", headline: "건강관리와 웰니스 프로그램", body: "입주자 대상 건강관리 서비스" },
];

export default function ForOrganizations() {
  return (
    <section className="bg-surface pt-24 md:pt-32">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="t-en text-ink">For Organizations</h2>
        <p className="t-statement mt-6 text-ink">
          한 사람의 건강부터
          <br />
          지역사회의 건강까지
        </p>
        <p className="t-lead mt-4 text-muted">기관의 목적과 운영 방식에 맞춰 프로그램과 SENIO 도입 구성을 조정합니다.</p>
      </Reveal>

      <Reveal delay={120} className="mt-14 bg-navy text-white md:mt-20">
        <Container size="wide" className="py-16 md:py-24">
          <p className="eyebrow text-accent">For Organizations</p>
          <p className="t-h1 mt-4 max-w-3xl text-white">
            기관과 함께 설계하는
            <br />
            지역사회 예방건강관리
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {TARGETS.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.audience} className="bg-navy p-6 md:p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <Icon size={20} />
                  </span>
                  <p className="t-meta mt-5 text-accent">{t.audience}</p>
                  <p className="mt-1 text-[17px] font-bold">{t.headline}</p>
                  <p className="mt-1 text-[15px] text-white/70">{t.body}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
            <div>
              <p className="t-h3 text-white">더 건강한 일상을, 더 많은 사람에게</p>
              <p className="t-body mt-2 max-w-xl text-white/75">
                사업·협력, SENIO 실증·도입, 프로그램 운영에 관한 문의를 남겨 주시면 담당자가 확인 후 연락드립니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="white" arrow>
                사업·협력 문의
              </Button>
              <Button href="/contact?type=senio" variant="outline-white">
                SENIO 실증·도입 문의
              </Button>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
