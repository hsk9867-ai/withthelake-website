import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { SITE } from "@/content/site";

const APP_SCREENS = [
  { src: "/assets/senio/app-1.png", w: 508, h: 1061 },
  { src: "/assets/senio/app-3.png", w: 390, h: 958 },
  { src: "/assets/senio/app-4.png", w: 390, h: 983 },
];

export default function SenioCta() {
  const hasApp = Boolean(SITE.links.appIos || SITE.links.appAndroid);

  return (
    <section className="section bg-surface">
      <Container>
        <Reveal className="text-center">
          <p className="eyebrow text-accent-deep">05 · Contact</p>
          <h2 className="t-h1 mt-4 text-ink">SENIO를 현장에서 확인해 보세요</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="relative flex flex-col overflow-hidden rounded-[24px] bg-primary p-9 text-white md:p-11">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <p className="eyebrow text-accent">기관 · 기업 도입 문의</p>
            <h3 className="t-h2 mt-4">기관 도입과 실증 참여를 상담해 드립니다</h3>
            <p className="t-body mt-4 text-white/80">
              2026년 강원 거점 실증에 함께할 기관을 모집하고 있습니다. 기관 규모와 운영 방식에 맞춰
              도입 구성을 제안드립니다.
            </p>
            <div className="mt-auto pt-8">
              <Button href="/contact?type=senio" variant="white" size="lg" arrow>
                실증 · 도입 문의
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="card flex flex-col overflow-hidden p-9 md:p-11">
            <p className="eyebrow text-accent-deep">개인 · 보호자</p>
            <h3 className="t-h2 mt-4 text-ink">SENIO 앱으로 측정 기록과 건강 가이드를 확인하세요</h3>
            <div className="mt-6 flex gap-3">
              {APP_SCREENS.map((s) => (
                <div key={s.src} className="relative h-36 w-[4.4rem] overflow-hidden rounded-xl border border-line bg-cream">
                  <Image src={s.src} alt="SENIO 앱 화면" fill sizes="80px" className="object-cover object-top" />
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {hasApp ? (
                <>
                  {SITE.links.appIos && (
                    <Button href={SITE.links.appIos} variant="primary" external>
                      App Store
                    </Button>
                  )}
                  {SITE.links.appAndroid && (
                    <Button href={SITE.links.appAndroid} variant="secondary" external>
                      Google Play
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button href="/contact?type=other" variant="primary" arrow>
                    앱 출시 안내 받기
                  </Button>
                  <p className="w-full text-[14px] text-muted">앱 스토어 링크는 출시와 함께 연결됩니다.</p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
