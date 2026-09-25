import Image from "next/image";
import Link from "next/link";
import { SITE, asset } from "@/content/site";

/**
 * 인트로 → 히어로 자동 전환 (스크롤과 무관, CSS 키프레임).
 * 브랜드 컬러 인트로(로고 마스크 + 슬로건)가 약 2초 뒤 걷히며 사진/영상과 헤드라인이 드러납니다.
 * prefers-reduced-motion 이면 바로 최종 상태를 보여줍니다.
 */
export default function Intro() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-black text-white" aria-label="인트로">
      {/* 배경 사진/영상 */}
      <div className="absolute inset-0">
        {SITE.heroVideo ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={asset(SITE.heroPoster)} aria-hidden>
            <source src={asset(SITE.heroVideo)} />
          </video>
        ) : (
          <Image src={SITE.heroPoster} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      </div>

      {/* 헤드라인 (기획서 01 HERO) */}
      <div className="intro-headline absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 md:px-10 md:pb-20">
          <h1 className="t-display max-w-[18ch] text-white">
            건강한 삶은 병원 밖,
            <br />
            일상에서 시작됩니다
          </h1>
          <p className="t-lead mt-6 max-w-2xl text-white/85">
            ㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한 자립생활을 돕는 지역사회 기반
            예방건강관리 기업입니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 text-[16px] font-bold text-white transition-colors hover:bg-primary-dark">
              사업·협력 문의
            </Link>
            <Link href="/about" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 px-7 text-[16px] font-bold text-white transition-colors hover:bg-white/10">
              위드더레이크 알아보기
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
            <Image src={SITE.heroPoster} alt="" fill sizes="360px" className="object-cover" />
            <div className="absolute inset-0 bg-white/35" />
          </div>
        </div>
        <p className="t-en mt-12 text-center text-[clamp(26px,3.6vw,44px)] font-semibold tracking-tight text-white">
          <span className="mr-2 text-accent">&ldquo;</span>
          Good life, good people
          <span className="ml-2 text-accent">&rdquo;</span>
        </p>
        <p className="mt-3 text-[17px] text-white/80">WITH THE LAKE</p>
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
