"use client";

import { useState, useSyncExternalStore } from "react";
import type { HealingContent } from "@/lib/cms/types";

type Entry = { date: string; emoji: string; label: string; memo: string };
const KEY = "wtl_healing_mood_log";
const EMPTY: Entry[] = [];

/* localStorage 를 외부 저장소로 구독합니다 (서버 렌더링 시에는 빈 목록). */
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedEntries: Entry[] = EMPTY;

function readRaw() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): Entry[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed = raw ? (JSON.parse(raw) as Entry[]) : EMPTY;
      cachedEntries = Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      cachedEntries = EMPTY;
    }
  }
  return cachedEntries;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function save(entries: Entry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 30)));
  } catch {
    /* 저장 불가 환경(시크릿 모드 등) */
  }
  listeners.forEach((cb) => cb());
}

/** 걷기 후 감정 기록. 로그인 없이 이 브라우저에만 저장됩니다. */
export default function MoodLog({ record }: { record: HealingContent["record"] }) {
  const [mood, setMood] = useState<number | null>(null);
  const [memo, setMemo] = useState("");
  const [saved, setSaved] = useState(false);
  const entries = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  function submit() {
    if (mood === null) return;
    const m = record.moods[mood];
    const entry: Entry = { date: new Date().toISOString(), emoji: m.emoji, label: m.label, memo: memo.trim() };
    save([entry, ...entries]);
    setMood(null);
    setMemo("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function remove(i: number) {
    save(entries.filter((_, j) => j !== i));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[20px] border border-line bg-white p-6 md:p-8">
        <p className="text-[15px] font-semibold text-ink">오늘 감정</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {record.moods.map((m, i) => {
            const on = mood === i;
            return (
              <button
                key={`${m.label}-${i}`}
                type="button"
                onClick={() => setMood(i)}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors ${on ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-primary/60"}`}
              >
                <span aria-hidden className="text-[20px]">{m.emoji}</span>
                {m.label}
              </button>
            );
          })}
        </div>
        <label className="mt-5 block text-[15px] font-semibold text-ink">
          한 줄 메모 <span className="font-normal text-muted">(선택)</span>
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value.slice(0, 80))}
            placeholder="예: 소양강에서 30분, 발이 시원했다"
            className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-[16px] focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </label>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={mood === null}
            className="inline-flex min-h-12 items-center rounded-full bg-primary px-7 text-[16px] font-bold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            기록 저장
          </button>
          {saved && <span role="status" className="text-[14px] font-semibold text-success">저장했어요</span>}
        </div>
        <p className="mt-4 text-[13px] leading-5 text-muted">{record.note}</p>
      </div>

      <div className="rounded-[20px] bg-cream p-6 md:p-8">
        <p className="text-[15px] font-semibold text-ink">최근 기록</p>
        {entries.length === 0 ? (
          <p className="mt-4 text-[14px] text-muted">아직 기록이 없습니다. 걷고 난 뒤 첫 기록을 남겨 보세요.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {entries.slice(0, 7).map((e, i) => (
              <li key={`${e.date}-${i}`} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3">
                <span aria-hidden className="text-[22px]">{e.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-ink">{e.label}</span>
                  {e.memo && <span className="block text-[13px] text-ink-2">{e.memo}</span>}
                  <span className="block text-[12px] text-muted">{new Date(e.date).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" })}</span>
                </span>
                <button type="button" onClick={() => remove(i)} aria-label="기록 삭제" className="text-[12px] text-muted hover:text-danger">
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
