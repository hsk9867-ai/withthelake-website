import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const TARGETS = [
  {
    audience: "지자체 · 공공기관",
    headline: "지역사회 예방건강관리",
    body: "통합돌봄 사업과 연계한 주민 건강관리 프로그램",
  },
  {
    audience: "복지 · 시니어 기관",
    headline: "시니어 건강 프로그램과 SENIO",
    body: "이용자 건강 모니터링과 담당자 업무 효율화",
  },
  {
    audience: "기업 · 금융기관",
    headline: "ESG·사회공헌 건강사업",
    body: "지역사회 기여와 연결되는 건강 프로그램 설계",
  },
  {
    audience: "웰니스 · 시니어 주거",
    headline: "건강관리와 웰니스 프로그램",
    body: "입주자 대상 건강관리 서비스",
  },
];

export default function ForOrganizations() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            한 사람의 건강부터 지역사회의 건강까지
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TARGETS.map((t, i) => (
            <Reveal key={t.audience} delay={i * 100} className="rounded-2xl bg-primary-light p-7">
              <p className="text-[13px] font-semibold text-primary">{t.audience}</p>
              <h3 className="mt-3 text-[17px] font-bold leading-snug text-ink">
                {t.headline}
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">{t.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
