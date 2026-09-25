import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

/**
 * 레퍼런스의 제품 영상 블록 — 밝은 회색 배경 위 다크 라운드 박스에 기기.
 * 기획서 SENIO 핵심 숫자(7종 · 3분 · 4단계)를 함께 둡니다.
 */
const STATS = [
  { value: "7종", label: "한 번에 확인하는 지표" },
  { value: "3분", label: "측정부터 결과 확인까지" },
  { value: "4단계", label: "좋음 · 적절 · 주의 · 위험" },
];

export default function SenioFeature() {
  return (
    <section className="section bg-cream">
      <Container size="wide">
        <Reveal className="relative overflow-hidden rounded-[20px] bg-[radial-gradient(120%_90%_at_50%_0%,#2b1a55_0%,#0b0620_60%,#000_100%)] text-white">
          <div className="grid gap-10 px-8 py-12 md:px-14 md:py-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="t-en text-white">SENIO</p>
              <p className="mt-2 text-[16px] text-white/60">Senior Preventive Health Solution · Made by WITH THE LAKE</p>
              <h2 className="t-h2 mt-8">건강관리, 확인할 수 있으면 습관이 될 수 있습니다.</h2>
              <p className="t-body-lg mt-5 max-w-xl text-white/80">
                스트립을 측정기에 넣으면 3분 안에 7종 지표가 네 단계로 표시되고, 그 기록은 앱과 기관 대시보드에
                자동으로 쌓입니다.
              </p>
              <dl className="mt-8 flex max-w-md flex-wrap gap-x-8 gap-y-5">
                {STATS.map((s) => (
                  <div key={s.label} className="min-w-[120px] border-l border-white/20 pl-4">
                    <dd className="t-stat text-accent">{s.value}</dd>
                    <dt className="mt-1 text-[14px] text-white/70">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/senio" variant="white" arrow>
                  SENIO 자세히 보기
                </Button>
                <Button href="/contact?type=senio" variant="outline-white">
                  실증 · 도입 문의
                </Button>
              </div>
            </div>
            <div className="relative mx-auto flex h-[340px] w-full max-w-md items-end justify-center md:h-[460px]">
              <div aria-hidden className="absolute bottom-0 h-[70%] w-[90%] rounded-full bg-accent/20 blur-3xl" />
              <Image
                src="/assets/senio/device-screen-1.png"
                alt="SENIO Lens 측정기 화면: 당뇨·간·신장 기능 결과가 네 단계로 표시된다"
                width={930}
                height={986}
                sizes="(min-width:768px) 460px, 90vw"
                className="relative h-full w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
