import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";

const STATS = [
  { value: "7종", label: "한 번에 확인하는 지표" },
  { value: "3분", label: "측정부터 결과 확인까지" },
  { value: "4단계", label: "좋음 · 적절 · 주의 · 위험" },
];

export default function SenioHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-[72px] text-white">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)" }} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[560px] w-[560px] animate-float-slow rounded-full bg-accent/25 blur-3xl"
      />
      <Container className="relative">
        <nav aria-label="breadcrumb" className="t-meta flex items-center gap-2 pt-8 text-white/60">
          <Link href="/" className="hover:text-white">HOME</Link>
          <span aria-hidden>/</span>
          <Link href="/what-we-do" className="hover:text-white">WHAT WE DO</Link>
          <span aria-hidden>/</span>
          <span className="text-white">SENIO</span>
        </nav>

        <div className="grid gap-14 py-16 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow animate-fade-up text-accent">SENIO · Digital Healthcare</p>
            <h1 className="t-display mt-5 max-w-[15ch] animate-fade-up" style={{ animationDelay: "120ms" }}>
              건강관리, 확인할 수 있으면 습관이 될 수 있습니다.
            </h1>
            <p className="t-lead mt-7 max-w-xl animate-fade-up text-white/85" style={{ animationDelay: "220ms" }}>
              세니오(SENIO)는 소변 기반 생체데이터와 걷기·운동 등 생활데이터를 연결하는 시니어
              예방건강관리 솔루션입니다.
            </p>
            <p className="t-body mt-5 max-w-xl animate-fade-up text-white/70" style={{ animationDelay: "320ms" }}>
              스트립을 측정기에 넣으면 3분 안에 7종 지표가 네 단계로 표시되고, 그 기록은 앱과 기관
              대시보드에 자동으로 쌓입니다. 한 번의 검사로 끝나지 않습니다. 결과를 이해할 수 있는
              말로 바꾸고, 다음 행동으로 이어지게 하고, 그 변화를 다시 확인하는 것까지를 하나의
              흐름으로 설계했습니다.
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
              <Button href="/contact?type=senio" variant="white" size="lg" arrow>
                실증 · 도입 문의
              </Button>
              <Button href="#senio-flow" variant="outline-white" size="lg">
                측정 흐름 보기
              </Button>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-1 gap-px animate-fade-up overflow-hidden rounded-[10px] border border-white/15 bg-white/15 sm:grid-cols-3" style={{ animationDelay: "480ms" }}>
              {STATS.map((s) => (
                <div key={s.label} className="bg-primary-dark/80 px-5 py-5">
                  <dd className="t-stat text-accent">{s.value}</dd>
                  <dt className="mt-2 text-[14px] leading-5 text-white/75">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex h-[380px] w-full max-w-md animate-fade-up items-end justify-center md:h-[500px]" style={{ animationDelay: "200ms" }}>
            <div aria-hidden className="absolute bottom-10 h-[300px] w-[300px] rounded-full bg-white/10 blur-2xl md:h-[380px] md:w-[380px]" />
            <Image
              src="/assets/senio/device-screen-1.png"
              alt="SENIO Lens 측정기 화면: 당뇨·간·신장 기능 결과가 위험·주의·좋음 네 단계로 표시된다"
              width={930}
              height={986}
              priority
              sizes="(min-width:768px) 480px, 90vw"
              className="relative h-full w-auto animate-float-slow object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
