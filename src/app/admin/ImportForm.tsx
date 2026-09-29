"use client";

import { useActionState } from "react";
import { importAction, type ActionResult } from "./actions";

export default function ImportForm() {
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(importAction, null);
  return (
    <form action={action} className="rounded-xl border border-line bg-white p-5">
      <p className="text-[15px] font-bold text-ink">백업 불러오기</p>
      <p className="mt-1 text-[13px] leading-5 text-muted">내려받았던 JSON 파일을 올리면 현재 콘텐츠를 그 내용으로 덮어씁니다.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input type="file" name="file" accept="application/json,.json" required className="text-[13px]" />
        <button type="submit" disabled={pending} className="inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-[14px] font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
          {pending ? "불러오는 중..." : "불러오기"}
        </button>
      </div>
      {state && (
        <p role="status" className={`mt-3 text-[13px] font-medium ${state.ok ? "text-success" : "text-danger"}`}>
          {state.ok ? state.message : state.error}
        </p>
      )}
    </form>
  );
}
