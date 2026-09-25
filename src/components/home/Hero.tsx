import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { SITE } from "@/content/site";
import { KPIS } from "@/content/impact";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Visual: 영상이 지정되면 영상, 아니면 사진 */}
      <div className="absolute inset-0">
        {SITE.heroVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={SITE.heroPoster}
            aria-hidden
          >
            <source src={SITE.heroVideo} />
          </video>
        ) : (
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={SITE.heroPoster}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(45,0,107,0.94)_0%,rgba(65,0,153,0.82)_42%,rgba(65,0,153,0.35)_75%,rgba(65,0,153,0.15)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary-dark/90 to-transparent"
      />

      <Container className="relative">
        <div className="flex min-h-[620px] flex-col justify-center py-24 lg:min-h-[min(calc(100vh-76px),800px)]">
          <p className="eyebrow animate-fade-up text-accent">
            {SITE.nameEn} · Preventive Health Management
          </p>
          <h1
            className="t-display mt-6 max-w-[16ch] animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            건강한 삶은 병원 밖,
            <br />
            일상에서 시작됩니다
          </h1>
          <p
            className="t-lead mt-7 max-w-xl animate-fade-up text-white/85"
            style={{ animationDelay: "240ms" }}
          >
            ㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한 자립생활을 돕는
            지역사회 기반 예방건강관리 기업입니다.
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Button href="/contact" variant="white" size="lg" arrow>
              사업·협력 문의
            </Button>
            <Button href="/about" variant="outline-white" size="lg">
              위드더레이크 알아보기
            </Button>
          </div>
        </div>

        {/* KPI strip — 성과는 수치로 (기획서 6-3) */}
        <dl
          className="relative -mx-5 grid animate-fade-up grid-cols-2 border-t border-white/15 sm:-mx-8 md:mx-0 md:grid-cols-4 md:rounded-t-[24px] md:border md:border-b-0 md:border-white/15 md:bg-white/[0.06] md:backdrop-blur-sm"
          style={{ animationDelay: "480ms" }}
        >
          {KPIS.map((k, i) => (
            <div
              key={k.label}
              className={`px-5 py-6 sm:px-8 md:px-8 md:py-7 ${
                i % 2 === 1 ? "border-l border-white/15" : ""
              } ${i >= 2 ? "border-t border-white/15 md:border-t-0 md:border-l" : ""}`}
            >
              <dd className="t-stat text-white">{k.value}</dd>
              <dt className="mt-2 text-[15px] font-medium text-white/85">{k.label}</dt>
              <p className="mt-0.5 text-[14px] text-white/55">{k.note}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
