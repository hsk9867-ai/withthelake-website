import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconGlucose, IconKidney, IconLiver } from "@/components/Icons";

/** 소변 7종 지표 — 기기 화면과 앱 화면 기준 */
const INDICATORS = [
  { group: "당뇨", icon: IconGlucose, items: ["포도당", "케톤"] },
  { group: "간기능", icon: IconLiver, items: ["빌리루빈", "유로빌리노겐"] },
  { group: "신장", icon: IconKidney, items: ["크레아티닌", "미세알부민", "산성도"] },
];

export default function SenioProducts() {
  return (
    <section className="section bg-cream">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Strip + Lens + Care"
          title="측정부터 관리까지 하나로 연결됩니다."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Strip */}
          <Reveal className="card card-hover flex flex-col p-8">
            <p className="eyebrow text-accent-deep">SENIO Strip</p>
            <h3 className="t-h3 mt-3 text-ink">소변 7종 지표 스트립</h3>
            <p className="t-body mt-3 text-muted">
              채혈 없이, 한 장으로 당뇨·간기능·신장 관련 7종 지표를 확인합니다.
            </p>
            <ul className="mt-6 space-y-3">
              {INDICATORS.map((g) => {
                const Icon = g.icon;
                return (
                  <li key={g.group} className="flex items-center gap-4 rounded-xl bg-cream p-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{g.group}</p>
                      <p className="text-[14px] text-muted">{g.items.join(" · ")}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Lens */}
          <Reveal delay={110} className="card card-hover flex flex-col p-8">
            <div className="relative mb-6 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-primary-light">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
              <Image
                src="/assets/senio/device-side.png"
                alt="SENIO Lens 광학 측정기"
                width={1200}
                height={575}
                sizes="320px"
                className="relative h-28 w-auto object-contain"
              />
            </div>
            <p className="eyebrow text-accent-deep">SENIO Lens</p>
            <h3 className="t-h3 mt-3 text-ink">광학 측정기</h3>
            <p className="t-body mt-3 text-muted">
              사람의 눈이 아니라 광학 센서가 읽습니다. 3분 만에 결과를 확인하고, 좋음·적절·주의·위험
              네 단계로 내 상태를 쉽게 이해할 수 있습니다.
            </p>
          </Reveal>

          {/* Care */}
          <Reveal delay={220} className="card card-hover flex flex-col p-8">
            <div className="relative mb-6 flex h-44 items-end justify-center overflow-hidden rounded-xl bg-primary-light">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
              <Image
                src="/assets/senio/app-mockup.png"
                alt="SENIO 앱 측정 결과 화면"
                width={433}
                height={881}
                sizes="200px"
                className="relative h-40 w-auto translate-y-4 object-contain object-top"
              />
            </div>
            <p className="eyebrow text-accent-deep">SENIO Care</p>
            <h3 className="t-h3 mt-3 text-ink">앱과 기관 대시보드</h3>
            <p className="t-body mt-3 text-muted">꾸준한 측정으로 내 변화를 확인합니다.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["나의 추세", "기관 현황", "보호자 리포트"].map((pill) => (
                <li key={pill} className="rounded-full bg-accent-light px-3.5 py-1 text-[14px] font-semibold text-accent-deep">
                  {pill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
