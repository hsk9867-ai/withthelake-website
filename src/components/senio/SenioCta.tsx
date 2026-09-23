import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const APP_SCREENS = ["/assets/senio/app-1.png", "/assets/senio/app-3.png", "/assets/senio/app-4.png"];

export default function SenioCta() {
  return (
    <section className="bg-cream py-24 md:py-28">
      <Container>
        <Reveal>
          <h2 className="text-center text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
            SENIO를 현장에서 확인해 보세요
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl bg-primary p-9 text-white">
            <p className="text-[13px] font-semibold tracking-[0.15em] text-accent">
              기관 · 기업
            </p>
            <h3 className="mt-3 text-[19px] font-bold">도입 문의</h3>
            <p className="mt-2 text-[14.5px] leading-7 text-white/80">
              기관 도입과 실증 참여를 상담해 드립니다
            </p>
            <Button href="/contact" variant="secondary" className="mt-6">
              실증 · 도입 문의
            </Button>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl border border-line bg-white p-9">
            <p className="text-[13px] font-semibold tracking-[0.15em] text-accent-dark">
              개인 · 보호자
            </p>
            <h3 className="mt-3 text-[19px] font-bold text-ink">앱으로 시작하기</h3>
            <p className="mt-2 text-[14.5px] leading-7 text-muted">
              SENIO 앱으로 측정 기록과 건강 가이드를 확인하세요
            </p>
            <div className="mt-5 flex gap-3">
              {APP_SCREENS.map((src) => (
                <div
                  key={src}
                  className="relative h-28 w-20 overflow-hidden rounded-lg border border-line"
                >
                  <Image src={src} alt="SENIO 앱 화면" fill className="object-cover" />
                </div>
              ))}
            </div>
            <Button href="/contact" variant="primary" className="mt-6">
              앱 다운로드
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
