"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 블랙 타이포 섹션 (기획서 02 OUR BEGINNING).
 * 큰 세 줄이 계단식으로 놓이고, 화면에 보이는 동안 3초마다 자동으로 다음 줄이 강조되며
 * 우측 하단 설명이 바뀝니다. 스크롤과 무관합니다.
 */
const LINES = [
  { title: "함께 걷는 현장", desc: "㈜위드더레이크는 지역사회 시니어 건강 현장에서 출발한 예방건강관리 기업입니다." },
  { title: "확인할 수 있는 변화", desc: "건강한 습관을 이어가도 그 변화를 확인할 방법이 없다는 것이 현장의 과제였습니다. 기술과 데이터는 그 변화를 확인하고 지속하게 하는 도구입니다." },
  { title: "스스로 돌보는 건강", desc: "누구나 자신의 건강을 스스로 돌볼 기회를 가져야 한다는 원칙에서 사업을 설계합니다." },
];

const INTERVAL = 3200;

export default function Beginning() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % LINES.length), INTERVAL);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section ref={ref} className="bg-black text-white" aria-label="우리의 시작">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-[1400px] flex-col justify-between px-5 py-24 sm:px-8 md:px-10 md:py-32">
        <div>
          <p className="eyebrow text-accent">Our Beginning</p>
          <h2 className="sr-only">우리는 함께 걷는 현장에서 시작했습니다.</h2>
          <ul className="mt-6 space-y-3 md:space-y-4">
            {LINES.map((l, i) => (
              <li key={l.title} className="t-display" style={{ paddingLeft: `${i * 6}%` }}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-block border-b-4 pb-1 text-left transition-[color,border-color] duration-500 ${
                    i === active ? "border-accent text-white" : "border-transparent text-white/35 hover:text-white/70"
                  }`}
                  aria-pressed={i === active}
                >
                  {l.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-16 ml-auto min-h-[6rem] max-w-xl md:text-right">
          {LINES.map((l, i) => (
            <p
              key={l.title}
              aria-hidden={i !== active}
              className={`t-lead text-white/90 transition-opacity duration-500 ${i === active ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}
            >
              {l.desc}
            </p>
          ))}
          <div className="mt-6 flex gap-2 md:justify-end" aria-hidden>
            {LINES.map((l, i) => (
              <span key={l.title} className={`h-1 rounded-full transition-[width,background-color] duration-500 ${i === active ? "w-8 bg-accent" : "w-3 bg-white/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
