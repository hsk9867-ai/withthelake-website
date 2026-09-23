import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const PRODUCTS = [
  {
    name: "SENIO Strip",
    tag: "소변 7종 지표 스트립",
    body: "채혈 없이, 한 장으로 당뇨·간기능·신장 관련 7종 지표를 확인합니다.",
    image: null,
  },
  {
    name: "SENIO Lens",
    tag: "광학 측정기",
    body: "사람의 눈이 아니라 광학 센서가 읽습니다. 3분 만에 결과를 확인하고, 좋음·적절·주의·위험 네 단계로 내 상태를 쉽게 이해할 수 있습니다.",
    image: "/assets/senio/device-side.png",
  },
  {
    name: "SENIO Care",
    tag: "앱과 기관 대시보드",
    body: "꾸준한 측정으로 내 변화를 확인합니다.",
    pills: ["나의 추세", "기관 현황", "보호자 리포트"],
    image: "/assets/senio/app-mockup.png",
  },
];

export default function SenioProducts() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            STRIP + LENS + CARE
          </p>
          <h2 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            측정부터 관리까지 하나로 연결됩니다.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120} className="rounded-2xl border border-line bg-white p-8">
              {p.image && (
                <div className="mb-6 flex h-40 items-center justify-center rounded-xl bg-cream">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={220}
                    height={160}
                    className="h-32 w-auto object-contain"
                  />
                </div>
              )}
              <h3 className="text-[19px] font-extrabold text-primary">{p.name}</h3>
              <p className="mt-1 text-[14px] font-semibold text-ink">{p.tag}</p>
              <p className="mt-4 text-[15px] leading-7 text-muted">{p.body}</p>
              {p.pills && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-accent-light px-3 py-1 text-[12px] font-semibold text-accent-dark"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
