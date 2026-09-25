"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 레퍼런스의 블랙 타이포 섹션 (기획서 02 OUR BEGINNING).
 * 큰 세 줄이 계단식으로 놓이고, 스크롤에 따라 한 줄씩 밑줄이 옮겨가며
 * 우측 하단에 해당 줄의 설명이 바뀝니다.
 */
const LINES = [
  { title: "함께 걷는 현장", desc: "㈜위드더레이크는 지역사회 시니어 건강 현장에서 출발한 예방건강관리 기업입니다." },
  { title: "확인할 수 있는 변화", desc: "건강한 습관을 이어가도 그 변화를 확인할 방법이 없다는 것이 현장의 과제였습니다. 기술과 데이터는 그 변화를 확인하고 지속하게 하는 도구입니다." },
  { title: "스스로 돌보는 건강", desc: "누구나 자신의 건강을 스스로 돌볼 기회를 가져야 한다는 원칙에서 사업을 설계합니다." },
];

export default function Beginning() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setActive(Math.min(LINES.length - 1, Math.floor(p * LINES.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={track} className="relative h-[240vh] bg-black text-white" aria-label="우리의 시작">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-5 pt-[120px] sm:px-8 md:px-10 md:pt-[150px]">
          <p className="eyebrow text-accent">Our Beginning</p>
          <h2 className="sr-only">우리는 함께 걷는 현장에서 시작했습니다.</h2>
          <ul className="mt-6 space-y-3 md:space-y-4">
            {LINES.map((l, i) => (
              <li
                key={l.title}
                className={`t-display transition-[opacity,transform] duration-500 ${
                  i === active ? "opacity-100" : "opacity-40"
                }`}
                style={{ paddingLeft: `${i * 6}%`, transform: i === active ? "translateX(0)" : "translateX(-4px)" }}
              >
                <span
                  className={`inline-block border-b-4 pb-1 transition-colors duration-500 ${
                    i === active ? "border-accent" : "border-transparent"
                  }`}
                >
                  {l.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 md:px-10 md:pb-24">
          <div className="ml-auto max-w-xl md:text-right">
            {LINES.map((l, i) => (
              <p
                key={l.title}
                aria-hidden={i !== active}
                className={`t-lead text-white/90 transition-opacity duration-500 ${i === active ? "opacity-100" : "absolute opacity-0"}`}
              >
                {l.desc}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
