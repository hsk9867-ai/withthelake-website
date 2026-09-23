import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const BUSINESSES = [
  {
    name: "SENIO",
    kind: "디지털 헬스케어",
    desc: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결해 건강 상태를 확인하는 솔루션",
    href: "/senio",
  },
  {
    name: "WITH WELL ME",
    kind: "웰니스 브랜드",
    desc: "강원도 자연원료 기반 셀프케어 제품과 건강 루틴·콘텐츠",
    href: "/what-we-do/with-well-me",
  },
  {
    name: "COMMUNITY HEALTH",
    kind: "오프라인 프로그램",
    desc: "지자체·복지기관·기업과 함께 운영하는 예방건강관리 프로그램",
    href: "/what-we-do/community-health",
  },
];

export default function AboutBusinesses() {
  return (
    <section className="bg-cream py-24 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            사업 구성
          </p>
          <h2 className="mt-4 max-w-xl text-[24px] font-extrabold leading-snug tracking-tight text-ink md:text-[30px]">
            현재 세 개의 사업을 운영합니다
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BUSINESSES.map((b, i) => (
            <Reveal key={b.name} delay={i * 110}>
              <a
                href={b.href}
                className="block rounded-2xl border border-line bg-white p-7 transition-colors hover:border-primary/40"
              >
                <p className="text-[12px] font-semibold text-accent-dark">{b.kind}</p>
                <h3 className="mt-2 text-[19px] font-extrabold text-primary">{b.name}</h3>
                <p className="mt-3 text-[14.5px] leading-7 text-muted">{b.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
