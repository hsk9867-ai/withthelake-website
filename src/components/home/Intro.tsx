"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE, asset } from "@/content/site";

/**
 * 레퍼런스의 인트로 → 풀블리드 영상 전환.
 * 200vh 트랙 위에 sticky 뷰포트를 두고, 스크롤 진행도(0~1)에 따라
 * 브랜드 컬러 인트로(로고 마스크 + 슬로건)가 걷히며 사진/영상과 헤드라인이 드러납니다.
 */
export default function Intro() {
  const track = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = reduced ? 1 : Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const intro = Math.max(0, 1 - p / 0.55); // 0~55%: 인트로가 걷힘
      const text = Math.min(1, Math.max(0, (p - 0.45) / 0.35)); // 45~80%: 헤드라인 등장
      if (overlay.current) {
        overlay.current.style.opacity = String(intro);
        overlay.current.style.visibility = intro <= 0.001 ? "hidden" : "visible";
      }
      if (mask.current) mask.current.style.transform = `scale(${1 + p * 6})`;
      if (headline.current) {
        headline.current.style.opacity = String(text);
        headline.current.style.transform = `translateY(${(1 - text) * 24}px)`;
      }
      if (hint.current) hint.current.style.opacity = String(p > 0.9 ? 0 : 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={track} className="relative h-[220vh] bg-black text-white" aria-label="인트로">
      <div className="sticky top-0 h-screen overflow-hidden">
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
        <div ref={headline} className="absolute inset-x-0 bottom-0 opacity-0" style={{ transform: "translateY(24px)" }}>
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

        {/* 브랜드 컬러 인트로 오버레이 */}
        <div ref={overlay} className="absolute inset-0 flex flex-col items-center justify-center bg-primary">
          <div ref={mask} className="relative h-[220px] w-[260px] will-change-transform sm:h-[300px] sm:w-[360px]">
            {/* 로고 마크를 마스크로 써서 사진이 비치게 */}
            <div
              aria-hidden
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
              <div className="absolute inset-0 bg-white/35 mix-blend-screen" />
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
        <div ref={hint} className="absolute bottom-8 right-8 hidden md:block">
          <div className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/80 p-1.5">
            <span className="animate-bounce-y h-2 w-1 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
