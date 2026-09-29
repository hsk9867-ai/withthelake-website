"use client";

import { useEffect, useRef, useState } from "react";
import type { HealingAudioItem, HealingContent, HealingTrailItem } from "@/lib/cms/types";

type Category = { key: "walkGuides" | "affirmations" | "trailGuides"; label: string; description: string; items: (HealingAudioItem | HealingTrailItem)[] };

function fmt(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * 힐링로드 ON 오디오 플레이어: 카테고리 탭 → 항목 목록 → 하단 고정 플레이어.
 * 오디오 주소(src)가 비어 있는 항목은 '준비 중'으로 표시합니다.
 */
export default function AudioGuide({ audio }: { audio: HealingContent["audio"] }) {
  const categories: Category[] = [
    { key: "walkGuides", ...audio.walkGuides },
    { key: "affirmations", ...audio.affirmations },
    { key: "trailGuides", ...audio.trailGuides },
  ];
  const [cat, setCat] = useState<Category["key"]>("walkGuides");
  const [current, setCurrent] = useState<{ cat: Category["key"]; index: number } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const ref = useRef<HTMLAudioElement>(null);

  const active = categories.find((c) => c.key === cat)!;
  const track = current ? categories.find((c) => c.key === current.cat)?.items[current.index] ?? null : null;

  useEffect(() => {
    const el = ref.current;
    if (!el || !track?.src) return;
    setError("");
    setTime(0);
    setDuration(0);
    el.src = track.src;
    el.load();
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [track]);

  function select(catKey: Category["key"], index: number) {
    const item = categories.find((c) => c.key === catKey)!.items[index];
    if (!item.src) return;
    if (current && current.cat === catKey && current.index === index) {
      toggle();
      return;
    }
    setCurrent({ cat: catKey, index });
  }

  function toggle() {
    const el = ref.current;
    if (!el || !track?.src) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      el.pause();
      setPlaying(false);
    }
  }

  function step(delta: number) {
    if (!current) return;
    const items = categories.find((c) => c.key === current.cat)!.items;
    let i = current.index;
    for (let n = 0; n < items.length; n++) {
      i = (i + delta + items.length) % items.length;
      if (items[i].src) {
        setCurrent({ cat: current.cat, index: i });
        return;
      }
    }
  }

  return (
    <div>
      {/* 카테고리 탭 */}
      <div role="tablist" aria-label="오디오 카테고리" className="grid gap-3 sm:grid-cols-3">
        {categories.map((c) => {
          const on = c.key === cat;
          const ready = c.items.filter((i) => i.src).length;
          return (
            <button
              key={c.key}
              role="tab"
              aria-selected={on}
              onClick={() => setCat(c.key)}
              className={`rounded-[18px] border p-5 text-left transition-colors ${on ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-primary/60"}`}
            >
              <p className="text-[17px] font-bold">{c.label}</p>
              <p className={`mt-1 text-[14px] ${on ? "text-white/80" : "text-muted"}`}>{c.description}</p>
              <p className={`mt-3 text-[12px] font-semibold ${on ? "text-white/70" : "text-accent-deep"}`}>
                {c.items.length}개 {ready < c.items.length && `· 준비 중 ${c.items.length - ready}개`}
              </p>
            </button>
          );
        })}
      </div>

      {/* 항목 목록 */}
      <ul className="mt-6 divide-y divide-line rounded-[20px] border border-line bg-white">
        {active.items.map((item, i) => {
          const isCurrent = current?.cat === active.key && current.index === i;
          const trail = "distance" in item ? (item as HealingTrailItem) : null;
          return (
            <li key={`${item.title}-${i}`}>
              <button
                type="button"
                onClick={() => select(active.key, i)}
                disabled={!item.src}
                aria-pressed={isCurrent}
                className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors ${isCurrent ? "bg-primary-light" : "hover:bg-cream"} disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-[22px]">
                  {item.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold text-ink">{item.title}</span>
                  <span className="mt-0.5 block text-[14px] text-muted">{item.description}</span>
                  {trail && (
                    <span className="mt-1.5 flex flex-wrap gap-x-3 text-[12px] font-semibold text-accent-deep">
                      {[trail.region, trail.distance, trail.walkingTime, trail.difficulty && `난이도 ${trail.difficulty}`]
                        .filter(Boolean)
                        .map((v, k) => (
                          <span key={k}>{v}</span>
                        ))}
                    </span>
                  )}
                </span>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold ${item.src ? (isCurrent && playing ? "bg-primary text-white" : "bg-white text-primary ring-1 ring-primary/40") : "bg-cream text-muted"}`}>
                  {item.src ? (isCurrent && playing ? "재생 중" : "듣기") : "준비 중"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* 플레이어 */}
      <div className="mt-6 rounded-[20px] bg-navy p-5 text-white">
        <audio
          ref={ref}
          preload="none"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => step(1)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onError={() => setError("오디오를 불러오지 못했습니다.")}
        />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            disabled={!track?.src}
            aria-label={playing ? "일시정지" : "재생"}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-transform hover:scale-105 disabled:opacity-40"
          >
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><rect x="4" y="3" width="4" height="14" rx="1" fill="currentColor" /><rect x="12" y="3" width="4" height="14" rx="1" fill="currentColor" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M6 3.5v13l11-6.5-11-6.5z" fill="currentColor" /></svg>
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-bold">{track ? `${track.emoji} ${track.title}` : "🎵 오디오를 선택해주세요"}</p>
            <p className="truncate text-[13px] text-white/70">{track ? track.description : "위 목록에서 듣고 싶은 항목을 누르세요"}</p>
            <div className="mt-2 flex items-center gap-2 text-[12px] text-white/70">
              <span>{fmt(time)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.5}
                value={Math.min(time, duration || 0)}
                onChange={(e) => {
                  if (ref.current) ref.current.currentTime = Number(e.target.value);
                }}
                aria-label="재생 위치"
                className="h-1 flex-1 accent-white"
              />
              <span>{fmt(duration)}</span>
            </div>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button type="button" onClick={() => step(-1)} disabled={!current} aria-label="이전" className="rounded-full border border-white/40 px-3 py-1.5 text-[13px] font-semibold hover:bg-white/10 disabled:opacity-40">이전</button>
            <button type="button" onClick={() => step(1)} disabled={!current} aria-label="다음" className="rounded-full border border-white/40 px-3 py-1.5 text-[13px] font-semibold hover:bg-white/10 disabled:opacity-40">다음</button>
          </div>
        </div>
        {error && <p className="mt-3 text-[13px] text-orange-200">{error}</p>}
      </div>
    </div>
  );
}
