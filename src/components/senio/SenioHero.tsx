import Image from "next/image";
import Container from "@/components/Container";

const STATS = [
  { value: "7종", label: "한 번에 확인하는 지표" },
  { value: "3분", label: "측정부터 결과 확인까지" },
  { value: "4단계", label: "좋음 · 적절 · 주의 · 위험" },
];

export default function SenioHero() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-white md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] animate-float-slow rounded-full bg-accent/25 blur-3xl"
      />
      <Container className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="animate-fade-up text-[13px] font-semibold tracking-[0.2em] text-accent">
            SENIO
          </p>
          <h1
            className="mt-4 max-w-2xl animate-fade-up text-[28px] font-extrabold leading-snug tracking-tight md:text-[40px]"
            style={{ animationDelay: "120ms" }}
          >
            건강관리, 확인할 수 있으면
            <br />
            습관이 될 수 있습니다.
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-[16px] leading-8 text-white/85"
            style={{ animationDelay: "220ms" }}
          >
            세니오(SENIO)는 소변 기반 생체데이터와 걷기·운동 등 생활데이터를
            연결하는 시니어 예방건강관리 솔루션입니다.
          </p>
          <p
            className="mt-6 max-w-xl animate-fade-up text-[15px] leading-8 text-white/70"
            style={{ animationDelay: "320ms" }}
          >
            스트립을 측정기에 넣으면 3분 안에 7종 지표가 네 단계로 표시되고,
            그 기록은 앱과 기관 대시보드에 자동으로 쌓입니다. 한 번의 검사로
            끝나지 않습니다. 결과를 이해할 수 있는 말로 바꾸고, 다음 행동으로
            이어지게 하고, 그 변화를 다시 확인하는 것까지를 하나의 흐름으로
            설계했습니다.
          </p>

          <div
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: "420ms" }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 p-5">
                <p className="text-[24px] font-extrabold text-accent md:text-[28px]">
                  {s.value}
                </p>
                <p className="mt-1 text-[13px] leading-5 text-white/75">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto flex h-[360px] w-full max-w-sm animate-fade-up items-center justify-center md:h-[440px]"
          style={{ animationDelay: "200ms" }}
        >
          <div
            aria-hidden
            className="absolute h-[280px] w-[280px] rounded-full bg-white/10 blur-2xl md:h-[340px] md:w-[340px]"
          />
          <Image
            src="/assets/senio/device-front.png"
            alt="SENIO Lens 측정기"
            width={372}
            height={923}
            priority
            className="relative h-full w-auto animate-float-slow object-contain drop-shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
