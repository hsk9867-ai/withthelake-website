"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import { IconBadge, IconBuilding, IconCare, IconHome } from "@/components/Icons";

/**
 * 레퍼런스 "Sustainable Lifestyle": 가운데 타이틀 + 문장 → 스크롤하면
 * 네이비 카드가 화면 전체로 확장되며 내용이 나타납니다.
 *
 * 성능: 카드는 처음부터 최종 크기(100vw × 100vh)로 두고 transform: scale 만 바꿉니다.
 * width/height 를 매 프레임 바꾸면 레이아웃이 다시 계산되어 버벅이지만,
 * transform/opacity 는 GPU 합성만 일어나 부드럽습니다.
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
    let last = -1;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = reduced ? 1 : Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      // 1/100 단위로만 갱신해 불필요한 스타일 쓰기를 줄임
      const q = Math.round(p * 100) / 100;
      if (q === last) return;
      last = q;

      const grow = Math.min(1, q / 0.5); // 0~50%: 카드 확장
      const show = Math.min(1, Math.max(0, (q - 0.35) / 0.3)); // 35~65%: 내용 등장
      const base = window.innerWidth < 768 ? 0.86 : 0.42;
      const scale = base + grow * (1 - base);
      if (card.current) {
        card.current.style.transform = `translate3d(0,0,0) scale(${scale.toFixed(3)})`;
        card.current.style.borderRadius = `${Math.round((1 - grow) * 24)}px`;
      }
      if (inner.current) {
        inner.current.style.opacity = show.toFixed(2);
        inner.current.style.transform = `translate3d(0,${Math.round((1 - show) * 20)}px,0)`;
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
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 최종 크기로 고정된 카드 — scale 만 변함 */}
          <div
            ref={card}
            className="absolute inset-0 origin-bottom overflow-hidden bg-navy text-white will-change-transform"
            style={{ transform: "translate3d(0,0,0) scale(0.42)", borderRadius: 24 }}
          >
            <div ref={inner} className="absolute inset-0 flex flex-col justify-between p-7 opacity-0 will-change-[opacity,transform] md:p-14">
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
