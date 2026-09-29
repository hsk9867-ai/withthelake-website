"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { HealingAudioItem, HealingContent, HealingTrailItem } from "@/lib/cms/types";
import MoodLog from "./MoodLog";

type CatKey = "walkGuides" | "affirmations" | "trailGuides";
type Item = HealingAudioItem | HealingTrailItem;
type Sheet = { kind: "list"; cat: CatKey } | { kind: "map" } | { kind: "mood" } | null;

function fmt(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
}

/** 화면 아래에서 올라오는 선택 창 */
function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const id = useId();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/50 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-t-[24px] bg-white p-5 shadow-xl sm:rounded-[24px] sm:p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 id={id} className="text-[19px] font-bold text-ink">{title}</h3>
          <button type="button" onClick={onClose} aria-label="닫기" className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-[18px] text-ink-2 hover:bg-line">
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

/**
 * 힐링로드 ON 앱 화면 (옛 서비스 화면과 같은 구성):
 * 플레이어 박스 → 오디오 듣기(걷기 안내 · 긍정확언 · 길 안내 · 지도로 선택) → 기록하기(오늘 감정 · 설문조사)
 */
export default function HealingApp({ audio, record, survey }: { audio: HealingContent["audio"]; record: HealingContent["record"]; survey: HealingContent["survey"] }) {
  const cats: { key: CatKey; label: string; emoji: string; description: string; items: Item[] }[] = [
    { key: "walkGuides", ...audio.walkGuides },
    { key: "affirmations", ...audio.affirmations },
    { key: "trailGuides", ...audio.trailGuides },
  ];
  const [sheet, setSheet] = useState<Sheet>(null);
  const [current, setCurrent] = useState<{ cat: CatKey; index: number } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const ref = useRef<HTMLAudioElement>(null);

  const track = current ? cats.find((c) => c.key === current.cat)!.items[current.index] : null;

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

  function pick(cat: CatKey, index: number) {
    setCurrent({ cat, index });
    setSheet(null);
  }

  function toggle() {
    const el = ref.current;
    if (!el || !track?.src) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else el.pause();
  }

  function step(delta: number) {
    if (!current) return;
    const items = cats.find((c) => c.key === current.cat)!.items;
    let i = current.index;
    for (let n = 0; n < items.length; n++) {
      i = (i + delta + items.length) % items.length;
      if (items[i].src) return setCurrent({ cat: current.cat, index: i });
    }
  }

  const trailsByRegion = audio.trailGuides.items.reduce<Record<string, { item: HealingTrailItem; index: number }[]>>((acc, item, index) => {
    const key = item.region || "기타";
    (acc[key] ??= []).push({ item, index });
    return acc;
  }, {});

  // 색상은 변형별로 따로 붙입니다 (같은 속성의 유틸리티가 겹치면 뒤에 정의된 쪽이 이겨서 글자가 사라질 수 있음)
  const btnBase = "flex min-h-[72px] items-center justify-center gap-2.5 rounded-[18px] border text-[19px] font-bold shadow-sm transition-colors";
  const catBtn = `${btnBase} border-line bg-white text-ink hover:border-primary/60 active:bg-cream`;

  return (
    <div className="space-y-9">
      {/* 플레이어 */}
      <div className={`rounded-[22px] ${track ? "bg-white p-5 shadow-sm ring-1 ring-line" : "border-2 border-dashed border-line-strong bg-cream/60 px-5 py-14 text-center"}`}>
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
        {track ? (
          <>
            <div className="flex items-start gap-3">
              <span aria-hidden className="text-[30px] leading-none">{track.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[18px] font-bold text-ink">{track.title}</p>
                <p className="mt-1 text-[14px] leading-6 text-muted">{track.description}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="이전" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink-2 hover:bg-line">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M11 2v12L4 8l7-6z" fill="currentColor" /></svg>
              </button>
              <button type="button" onClick={toggle} aria-label={playing ? "일시정지" : "재생"} className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary-dark">
                {playing ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><rect x="4" y="3" width="4" height="14" rx="1" fill="currentColor" /><rect x="12" y="3" width="4" height="14" rx="1" fill="currentColor" /></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M6 3.5v13l11-6.5-11-6.5z" fill="currentColor" /></svg>
                )}
              </button>
              <button type="button" onClick={() => step(1)} aria-label="다음" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink-2 hover:bg-line">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M5 2v12l7-6-7-6z" fill="currentColor" /></svg>
              </button>
              <div className="ml-1 flex flex-1 items-center gap-2 text-[12px] text-muted">
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
                  className="h-1 flex-1 accent-primary"
                />
                <span>{fmt(duration)}</span>
              </div>
            </div>
            {error && <p className="mt-3 text-[13px] font-medium text-danger">{error}</p>}
          </>
        ) : (
          <>
            <span aria-hidden className="text-[56px] leading-none">🎵</span>
            <p className="mt-4 text-[17px] font-semibold text-ink-2">{audio.placeholder}</p>
            <p className="mt-1 text-[13px] text-muted">{audio.placeholderHint}</p>
          </>
        )}
      </div>

      {/* 오디오 듣기 */}
      <section aria-labelledby="healing-audio">
        <h2 id="healing-audio" className="flex flex-wrap items-baseline gap-x-3 text-[24px] font-bold text-ink">
          <span>🎧 {audio.title}</span>
          <span className="text-[16px] font-medium text-muted">{audio.lead}</span>
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {cats.map((c) => (
            <button key={c.key} type="button" onClick={() => setSheet({ kind: "list", cat: c.key })} className={catBtn}>
              <span aria-hidden className="text-[22px]">{c.emoji}</span>
              {c.label}
            </button>
          ))}
          <button type="button" onClick={() => setSheet({ kind: "map" })} className={`${btnBase} border-primary bg-primary text-white hover:bg-primary-dark active:bg-primary-dark`}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor" /></svg>
            {audio.mapLabel}
          </button>
        </div>
        <div aria-hidden className="mx-auto mt-6 h-1.5 w-36 rounded-full bg-success/40" />
      </section>

      {/* 기록하기 */}
      <section aria-labelledby="healing-record">
        <h2 id="healing-record" className="flex flex-wrap items-baseline gap-x-3 text-[24px] font-bold text-ink">
          <span>📝 {record.title}</span>
          <span className="text-[16px] font-medium text-muted">{record.lead}</span>
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setSheet({ kind: "mood" })} className={`${btnBase} border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-300 active:bg-rose-100`}>
            <span aria-hidden className="text-[22px]">😊</span>
            {record.buttonLabel}
          </button>
          {survey.url && (
            <a href={survey.url} target="_blank" rel="noreferrer" className={`${btnBase} border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 active:bg-sky-100`}>
              <span aria-hidden className="text-[22px]">📋</span>
              {survey.buttonLabel}
            </a>
          )}
        </div>
      </section>

      {/* 선택 창 */}
      {sheet?.kind === "list" && (() => {
        const c = cats.find((x) => x.key === sheet.cat)!;
        return (
          <Sheet title={`${c.emoji} ${c.label}`} onClose={() => setSheet(null)}>
            <p className="text-[14px] text-muted">{c.description}</p>
            <ul className="mt-3 divide-y divide-line">
              {c.items.map((item, i) => {
                const on = current?.cat === c.key && current.index === i;
                const trail = "distance" in item ? (item as HealingTrailItem) : null;
                return (
                  <li key={`${item.title}-${i}`}>
                    <button
                      type="button"
                      disabled={!item.src}
                      onClick={() => pick(c.key, i)}
                      className={`flex w-full items-center gap-3 py-3.5 text-left ${on ? "text-primary" : "text-ink"} disabled:opacity-50`}
                    >
                      <span aria-hidden className="text-[24px]">{item.emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[16px] font-semibold">{item.title}</span>
                        <span className="block text-[13px] text-muted">{item.description}</span>
                        {trail && (
                          <span className="mt-1 block text-[12px] font-semibold text-accent-deep">
                            {[trail.region, trail.distance, trail.walkingTime].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-[12px] font-bold text-muted">{item.src ? (on ? "재생 중" : "듣기") : "준비 중"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Sheet>
        );
      })()}

      {sheet?.kind === "map" && (
        <Sheet title={`📍 ${audio.mapLabel}`} onClose={() => setSheet(null)}>
          <p className="text-[14px] text-muted">지역을 고르고 산책로를 선택하면 길 안내 음성이 재생됩니다.</p>
          <div className="mt-4 space-y-5">
            {Object.entries(trailsByRegion).map(([region, list]) => (
              <div key={region}>
                <p className="text-[13px] font-bold uppercase tracking-wide text-accent-deep">{region}</p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {list.map(({ item, index }) => (
                    <li key={`${item.title}-${index}`}>
                      <button
                        type="button"
                        disabled={!item.src}
                        onClick={() => pick("trailGuides", index)}
                        className="flex w-full items-center gap-3 rounded-[14px] border border-line px-4 py-3 text-left hover:border-primary/60 disabled:opacity-50"
                      >
                        <span aria-hidden className="text-[22px]">{item.emoji}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold text-ink">{item.title}</span>
                          <span className="block text-[12px] text-muted">{[item.distance, item.walkingTime, item.difficulty && `난이도 ${item.difficulty}`].filter(Boolean).join(" · ") || item.description}</span>
                        </span>
                        {!item.src && <span className="text-[12px] font-bold text-muted">준비 중</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Sheet>
      )}

      {sheet?.kind === "mood" && (
        <Sheet title={`😊 ${record.buttonLabel}`} onClose={() => setSheet(null)}>
          <MoodLog record={record} />
        </Sheet>
      )}
    </div>
  );
}
