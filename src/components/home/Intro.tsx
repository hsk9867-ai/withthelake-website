import Image from "next/image";
import Link from "next/link";
import Lines from "@/components/Lines";
import { asset } from "@/lib/asset";
import type { HomeContent, SiteSettings } from "@/lib/cms/types";

/**
 * 인트로 → 히어로 자동 전환 (스크롤과 무관, CSS 키프레임).
 * 브랜드 컬러 인트로(로고 마스크 + 슬로건)가 약 2초 뒤 걷히며 사진/영상과 헤드라인이 드러납니다.
 * prefers-reduced-motion 이면 바로 최종 상태를 보여줍니다.
 */
export default function Intro({ site, data }: { site: SiteSettings; data: HomeContent["intro"] }) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black text-white" aria-label="인트로">
      {/* 배경 사진/영상 */}
      <div className="absolute inset-0">
        {site.heroVideo ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={asset(site.heroPoster)} aria-hidden>
            <source src={asset(site.heroVideo)} />
          </video>
        ) : (
          <Image src={site.heroPoster} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      </div>

      {/* 헤드라인 (기획서 01 HERO) */}
      <div className="intro-headline absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 md:px-10 md:pb-20">
          <h1 className="t-display max-w-[18ch] text-white">
            <Lines text={data.headline} />
          </h1>
          <p className="t-lead mt-6 max-w-2xl text-white/85">{data.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={data.primaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 text-[16px] font-bold text-white transition-colors hover:bg-primary-dark">
              {data.primaryCta.label}
            </Link>
            <Link href={data.secondaryCta.href} className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 px-7 text-[16px] font-bold text-white transition-colors hover:bg-white/10">
              {data.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* 브랜드 컬러 인트로 오버레이 — 자동으로 걷힘 */}
      <div aria-hidden className="intro-overlay absolute inset-0 flex flex-col items-center justify-center bg-primary">
        <div className="intro-mask relative h-[220px] w-[260px] sm:h-[300px] sm:w-[360px]">
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: `url(${asset("/assets/logo/with-the-lake-icon.png")})`,
              maskImage: `url(${asset("/assets/logo/with-the-lake-icon.png")})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          >
            <Image src={site.heroPoster} alt="" fill sizes="360px" className="object-cover" />
            <div className="absolute inset-0 bg-white/35" />
          </div>
        </div>
        <p className="t-en mt-12 text-center text-[clamp(26px,3.6vw,44px)] font-semibold tracking-tight text-white">
          <span className="mr-2 text-accent">&ldquo;</span>
          {data.slogan}
          <span className="ml-2 text-accent">&rdquo;</span>
        </p>
        <p className="mt-3 text-[17px] text-white/80">{site.nameEn}</p>
      </div>

      {/* 스크롤 힌트 */}
      <div className="intro-hint absolute bottom-8 right-8 hidden md:block">
        <div className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/80 p-1.5">
          <span className="animate-bounce-y h-2 w-1 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
