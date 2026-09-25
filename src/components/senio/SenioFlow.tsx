import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconDashboard, IconDevice, IconStrip } from "@/components/Icons";

const FLOW = [
  {
    n: "01",
    icon: IconStrip,
    title: "스트립에 소변을 묻힙니다",
    body: "채혈 없이 한 장의 스트립으로 준비합니다. 비의료 인력도 어렵지 않게 진행할 수 있습니다.",
  },
  {
    n: "02",
    icon: IconDevice,
    title: "측정기에 넣고 3분을 기다립니다",
    body: "광학 센서가 스트립을 읽어 7종 지표를 좋음·적절·주의·위험 네 단계로 표시합니다.",
  },
  {
    n: "03",
    icon: IconDashboard,
    title: "앱과 대시보드에 기록이 쌓입니다",
    body: "결과는 자동으로 앱과 기관 대시보드에 저장되고, 추세와 다음 행동 제안으로 이어집니다.",
  },
];

const LEVELS = [
  { label: "좋음", color: "bg-success" },
  { label: "적절", color: "bg-accent-dark" },
  { label: "주의", color: "bg-warn" },
  { label: "위험", color: "bg-danger" },
];

export default function SenioFlow() {
  return (
    <section id="senio-flow" className="section scroll-mt-20 bg-surface">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="How It Works"
          title="스트립 한 장, 3분이면 오늘의 상태를 확인합니다"
          lead="측정 결과는 숫자 대신 네 단계 색으로 표시되어 시니어도 담당자도 한눈에 이해할 수 있습니다."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <ol className="space-y-4">
            {FLOW.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal as="li" key={f.n} delay={i * 100} className="card flex gap-5 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon size={24} />
                  </span>
                  <div>
                    <p className="t-meta text-accent-deep">STEP {f.n}</p>
                    <h3 className="t-h3 mt-1 text-ink">{f.title}</h3>
                    <p className="t-body mt-2 text-muted">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal as="li" delay={320} className="flex flex-wrap items-center gap-x-6 gap-y-3 px-2 pt-2">
              <span className="t-meta font-semibold text-ink">결과 표시 4단계</span>
              <ul className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <li key={l.label} className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[15px] font-medium text-ink">
                    <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                    {l.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </ol>

          <Reveal delay={150} className="relative overflow-hidden rounded-[24px] bg-primary-light">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
            <Image
              src="/assets/senio/device-styled.jpg"
              alt="SENIO 앱 화면: 종합 점수와 당뇨·간기능·신장 기능 항목별 결과"
              width={1800}
              height={1326}
              sizes="(min-width:1024px) 600px, 100vw"
              className="relative h-auto w-full"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
