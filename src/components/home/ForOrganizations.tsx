"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { IconBadge, IconBuilding, IconCare, IconHome } from "@/components/Icons";

/**
 * 레퍼런스 "Sustainable Lifestyle": 가운데 타이틀 + 문장 → 스크롤하면
 * 네이비 카드가 화면 전체로 확장되며 큰 문장과 우측 하단 설명이 나타납니다.
 * 기획서 06 FOR ORGANIZATIONS 원고를 사용합니다.
 */
const TARGETS = [
  { icon: IconBuilding, audience: "지자체 · 공공기관", headline: "지역사회 예방건강관리", body: "통합돌봄 사업과 연계한 주민 건강관리 프로그램" },
  { icon: IconCare, audience: "복지 · 시니어 기관", headline: "시니어 건강 프로그램과 SENIO", body: "이용자 건강 모니터링과 담당자 업무 효율화" },
  { icon: IconBadge, audience: "기업 · 금융기관", headline: "ESG·사회공헌 건강사업", body: "지역사회 기여와 연결되는 건강 프로그램 설계" },
  { icon: IconHome, audience: "웰니스 · 시니어 주거", headline: "건강관리와 웰니스 프로그램", body: "입주자 대상 건강관리 서비스" },
];

export default function ForOrganizations() {
  const track = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

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
      const grow = Math.min(1, p / 0.5); // 0~50%: 카드 확장
      const show = Math.min(1, Math.max(0, (p - 0.35) / 0.3)); // 35~65%: 내용 등장
      if (card.current) {
        const base = window.innerWidth < 768 ? 86 : 42;
        const w = base + grow * (100 - base); // base vw → 100vw
        card.current.style.width = `${w}vw`;
        card.current.style.borderRadius = `${(1 - grow) * 20}px`;
        card.current.style.height = `${58 + grow * 42}vh`;
      }
      if (inner.current) {
        inner.current.style.opacity = String(show);
        inner.current.style.transform = `translateY(${(1 - show) * 20}px)`;
      }
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
    <section className="bg-surface">
      <div className="mx-auto max-w-3xl px-5 pt-24 text-center md:pt-32">
        <h2 className="t-en text-ink">For Organizations</h2>
        <p className="t-statement mt-6 text-ink">
          한 사람의 건강부터
          <br />
          지역사회의 건강까지
        </p>
        <p className="t-lead mt-4 text-muted">기관의 목적과 운영 방식에 맞춰 프로그램과 SENIO 도입 구성을 조정합니다.</p>
      </div>

      <div ref={track} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-end justify-center overflow-hidden">
          <div
            ref={card}
            className="relative overflow-hidden bg-navy text-white will-change-[width,height] md:w-[42vw]"
            style={{ width: "86vw", height: "58vh", borderRadius: 20 }}
          >
            <div ref={inner} className="absolute inset-0 flex flex-col justify-between p-7 opacity-0 md:p-14">
              <div className="mx-auto w-full max-w-[1320px]">
                <p className="eyebrow text-accent">For Organizations</p>
                <p className="t-h1 mt-4 max-w-3xl text-white">
                  기관과 함께 설계하는
                  <br />
                  지역사회 예방건강관리
                </p>
              </div>
              <div className="mx-auto w-full max-w-[1320px]">
                <ul className="grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                  {TARGETS.map((t) => {
                    const Icon = t.icon;
                    return (
                      <li key={t.audience} className="bg-navy p-5 md:p-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                          <Icon size={20} />
                        </span>
                        <p className="t-meta mt-5 text-accent">{t.audience}</p>
                        <p className="mt-1 text-[17px] font-bold">{t.headline}</p>
                        <p className="mt-1 text-[15px] text-white/70">{t.body}</p>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="t-body max-w-xl text-white/75">
                    사업·협력, SENIO 실증·도입, 프로그램 운영에 관한 문의를 남겨 주시면 담당자가 확인 후 연락드립니다.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button href="/contact" variant="white" arrow>
                      사업·협력 문의
                    </Button>
                    <Button href="/contact?type=senio" variant="outline-white">
                      SENIO 실증·도입 문의
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
