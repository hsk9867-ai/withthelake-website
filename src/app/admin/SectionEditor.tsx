"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import type { Field } from "@/lib/admin/schema";
import { resetSectionAction, saveSectionAction, uploadAction } from "./actions";

type Json = Record<string, unknown>;

/* ---------- 값 다루기 ---------- */

function emptyFor(field: Field): unknown {
  switch (field.type) {
    case "text":
    case "textarea":
    case "image":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "select":
      return field.options[0] ?? "";
    case "strings":
    case "paragraphs":
    case "list":
      return [];
    case "group":
      return Object.fromEntries(field.fields.map((f) => [f.key, emptyFor(f)]));
  }
}

function itemTitle(item: Json, field: Extract<Field, { type: "list" }>, index: number) {
  const v = field.titleKey ? item[field.titleKey] : undefined;
  return typeof v === "string" && v.trim() ? v : `${index + 1}번 항목`;
}

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-[15px] text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";
const labelCls = "block text-[13px] font-semibold text-ink";
const helpCls = "mt-1 text-[12px] leading-5 text-muted";

/* ---------- 필드 컴포넌트 ---------- */

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = useId();

  switch (field.type) {
    case "text":
      return (
        <div>
          <label htmlFor={id} className={labelCls}>{field.label}</label>
          <input id={id} className={`${inputCls} mt-1.5`} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
          {field.help && <p className={helpCls}>{field.help}</p>}
        </div>
      );
    case "textarea":
      return (
        <div>
          <label htmlFor={id} className={labelCls}>{field.label}</label>
          <textarea id={id} rows={field.rows ?? 3} className={`${inputCls} mt-1.5 leading-6`} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
          {field.help && <p className={helpCls}>{field.help}</p>}
        </div>
      );
    case "number":
      return (
        <div>
          <label htmlFor={id} className={labelCls}>{field.label}</label>
          <input id={id} type="number" className={`${inputCls} mt-1.5`} value={value === undefined || value === null ? "" : String(value)} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} />
          {field.help && <p className={helpCls}>{field.help}</p>}
        </div>
      );
    case "boolean":
      return (
        <div className="flex items-start gap-3 rounded-lg bg-cream px-3 py-2.5">
          <input id={id} type="checkbox" className="mt-1 h-4 w-4 accent-primary" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <div>
            <label htmlFor={id} className={labelCls}>{field.label}</label>
            {field.help && <p className={helpCls}>{field.help}</p>}
          </div>
        </div>
      );
    case "select":
      return (
        <div>
          <label htmlFor={id} className={labelCls}>{field.label}</label>
          <select id={id} className={`${inputCls} mt-1.5`} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {field.help && <p className={helpCls}>{field.help}</p>}
        </div>
      );
    case "strings":
      return (
        <div>
          <label htmlFor={id} className={labelCls}>{field.label}</label>
          <textarea
            id={id}
            rows={Math.max(3, (Array.isArray(value) ? value.length : 0) + 1)}
            className={`${inputCls} mt-1.5 leading-6`}
            value={Array.isArray(value) ? value.join("\n") : ""}
            onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trimEnd()).filter((s, i, arr) => s !== "" || i === arr.length - 1))}
          />
          <p className={helpCls}>{field.help ?? "한 줄에 하나씩 입력합니다."}</p>
        </div>
      );
    case "paragraphs":
      return (
        <div>
          <label htmlFor={id} className={labelCls}>{field.label}</label>
          <textarea
            id={id}
            rows={8}
            className={`${inputCls} mt-1.5 leading-6`}
            value={Array.isArray(value) ? value.join("\n\n") : ""}
            onChange={(e) => onChange(e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter((p, i, arr) => p !== "" || i === arr.length - 1))}
          />
          <p className={helpCls}>{field.help ?? "문단 사이는 빈 줄로 구분합니다."}</p>
        </div>
      );
    case "image":
    case "audio":
      return <ImageInput id={id} field={field} value={String(value ?? "")} onChange={onChange} />;
    case "group": {
      const obj = (value && typeof value === "object" ? value : {}) as Json;
      return (
        <fieldset className="rounded-xl border border-line bg-white p-4 sm:p-5">
          <legend className="px-1 text-[14px] font-bold text-primary">{field.label}</legend>
          {field.help && <p className={`${helpCls} -mt-1 mb-3`}>{field.help}</p>}
          <div className="space-y-4">
            {field.fields.map((f) => (
              <FieldInput key={f.key} field={f} value={obj[f.key]} onChange={(v) => onChange({ ...obj, [f.key]: v })} />
            ))}
          </div>
        </fieldset>
      );
    }
    case "list":
      return <ListInput field={field} value={Array.isArray(value) ? (value as Json[]) : []} onChange={onChange} />;
  }
}

function ListInput({ field, value, onChange }: { field: Extract<Field, { type: "list" }>; value: Json[]; onChange: (v: Json[]) => void }) {
  const [open, setOpen] = useState<number | null>(value.length <= 3 ? null : -1);
  const update = (i: number, v: Json) => onChange(value.map((it, j) => (j === i ? v : it)));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    if (open !== null && open >= 0) setOpen(j);
  };
  const remove = (i: number) => {
    if (!confirm(`"${itemTitle(value[i], field, i)}" 항목을 삭제할까요?`)) return;
    onChange(value.filter((_, j) => j !== i));
    setOpen(null);
  };
  const add = () => {
    onChange([...value, emptyFor({ type: "group", key: "", label: "", fields: field.fields }) as Json]);
    setOpen(value.length);
  };
  const collapsible = open !== null;

  return (
    <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[14px] font-bold text-primary">
          {field.label} <span className="ml-1 text-[12px] font-semibold text-muted">{value.length}개</span>
        </p>
        <button type="button" onClick={add} className="rounded-md border border-primary/40 px-3 py-1.5 text-[13px] font-semibold text-primary hover:bg-primary-light">
          + 항목 추가
        </button>
      </div>
      {field.help && <p className={`${helpCls} mt-1`}>{field.help}</p>}
      <ol className="mt-3 space-y-2">
        {value.map((item, i) => {
          const expanded = !collapsible || open === i;
          return (
            <li key={i} className="rounded-lg border border-line bg-cream/60">
              <div className="flex items-center gap-2 px-3 py-2">
                {collapsible ? (
                  <button type="button" onClick={() => setOpen(expanded ? -1 : i)} className="flex min-w-0 flex-1 items-center gap-2 text-left text-[14px] font-semibold text-ink" aria-expanded={expanded}>
                    <span className="text-[11px] text-muted">{expanded ? "▼" : "▶"}</span>
                    <span className="truncate">{i + 1}. {itemTitle(item, field, i)}</span>
                  </button>
                ) : (
                  <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-ink">{i + 1}. {itemTitle(item, field, i)}</p>
                )}
                <div className="flex shrink-0 items-center gap-1 text-[12px]">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="위로" className="rounded px-2 py-1 text-ink-2 hover:bg-white disabled:opacity-30">↑</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="아래로" className="rounded px-2 py-1 text-ink-2 hover:bg-white disabled:opacity-30">↓</button>
                  <button type="button" onClick={() => remove(i)} className="rounded px-2 py-1 font-semibold text-danger hover:bg-white">삭제</button>
                </div>
              </div>
              {expanded && (
                <div className="space-y-4 border-t border-line bg-white p-4">
                  {field.fields.map((f) => (
                    <FieldInput key={f.key} field={f} value={item[f.key]} onChange={(v) => update(i, { ...item, [f.key]: v })} />
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {value.length === 0 && <p className="mt-2 text-[13px] text-muted">항목이 없습니다. ‘항목 추가’를 눌러 시작하세요.</p>}
    </div>
  );
}

function ImageInput({ id, field, value, onChange }: { id: string; field: Extract<Field, { type: "image" | "audio" }>; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const isVideo = /\.mp4($|\?)/i.test(value);
  const isAudioField = field.type === "audio";
  const isAudio = isAudioField || /\.(wav|mp3|m4a|ogg)($|\?)/i.test(value);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadAction(fd);
    setBusy(false);
    if (res.ok) onChange(res.url);
    else setError(res.error);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      <label htmlFor={id} className={labelCls}>{field.label}</label>
      <div className="mt-1.5 flex flex-wrap items-start gap-3">
        {value ? (
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md border border-line bg-cream">
            {isAudio ? (
              <span className="flex h-full flex-col items-center justify-center gap-1 text-[12px] font-semibold text-muted">
                오디오
                <audio src={value} controls preload="none" className="h-7 w-24" />
              </span>
            ) : isVideo ? (
              <span className="flex h-full items-center justify-center text-[12px] font-semibold text-muted">MP4</span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        ) : (
          <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-md border border-dashed border-line-strong text-[12px] text-muted">없음</div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input id={id} className={inputCls} value={value} placeholder="/assets/... 또는 https://..." onChange={(e) => onChange(e.target.value)} />
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept={isAudioField ? "audio/*,.wav,.mp3,.m4a" : "image/*,video/mp4"}
              className="text-[12px]"
              disabled={busy}
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            />
            {busy && <span className="text-[12px] text-muted">올리는 중...</span>}
            {value && (
              <button type="button" onClick={() => onChange("")} className="text-[12px] font-semibold text-danger hover:underline">
                비우기
              </button>
            )}
          </div>
          {error && <p className="text-[12px] font-medium text-danger">{error}</p>}
          {field.help && <p className={helpCls}>{field.help}</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- 섹션 편집기 ---------- */

export default function SectionEditor({
  section,
  label,
  description,
  preview,
  fields,
  initial,
}: {
  section: string;
  label: string;
  description: string;
  preview: string;
  fields: Field[];
  initial: unknown;
}) {
  const [value, setValue] = useState<Json>((initial ?? {}) as Json);
  const [saved, setSaved] = useState<Json>((initial ?? {}) as Json);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);

  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  function save() {
    startTransition(async () => {
      const res = await saveSectionAction(section, JSON.stringify(value));
      if (res.ok) {
        setSaved(value);
        setNotice({ ok: true, text: res.message ?? "저장했습니다." });
      } else {
        setNotice({ ok: false, text: res.error });
      }
    });
  }

  function reset() {
    if (!confirm(`${label} 을(를) 기본 내용으로 되돌릴까요? 지금까지 수정한 내용이 사라집니다.`)) return;
    startTransition(async () => {
      const res = await resetSectionAction(section);
      if (res.ok) {
        setNotice({ ok: true, text: res.message ?? "복원했습니다." });
        location.reload();
      } else setNotice({ ok: false, text: res.error });
    });
  }

  return (
    <div className="pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-ink">{label}</h1>
          <p className="mt-1 max-w-2xl text-[14px] leading-6 text-muted">{description}</p>
        </div>
        <a href={preview} target="_blank" rel="noreferrer" className="rounded-md border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink-2 hover:border-primary hover:text-primary">
          페이지 열기 ↗
        </a>
      </div>

      <div className="mt-6 space-y-4">
        {fields.map((f) => (
          <FieldInput key={f.key} field={f} value={value[f.key]} onChange={(v) => setValue({ ...value, [f.key]: v })} />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 text-[13px]">
            {notice ? (
              <p role="status" className={`truncate font-medium ${notice.ok ? "text-success" : "text-danger"}`}>{notice.text}</p>
            ) : dirty ? (
              <p className="font-medium text-warn">저장하지 않은 변경이 있습니다.</p>
            ) : (
              <p className="text-muted">변경 사항 없음</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={reset} disabled={pending} className="rounded-md px-3 py-2 text-[13px] font-semibold text-muted hover:text-danger disabled:opacity-50">
              기본값 복원
            </button>
            <button
              type="button"
              onClick={() => { setValue(saved); setNotice(null); }}
              disabled={!dirty || pending}
              className="rounded-md border border-line px-4 py-2 text-[13px] font-semibold text-ink-2 hover:border-primary disabled:opacity-40"
            >
              되돌리기
            </button>
            <button
              type="button"
              onClick={save}
              disabled={pending || !dirty}
              className="inline-flex min-h-10 items-center rounded-md bg-primary px-5 text-[14px] font-bold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {pending ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
