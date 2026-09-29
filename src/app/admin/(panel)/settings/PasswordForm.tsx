"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePasswordAction, type ActionResult } from "../../actions";

const inputClass =
  "mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-[16px] focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

export default function PasswordForm({ minLength }: { minLength: number }) {
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(changePasswordAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="rounded-xl border border-line bg-white p-5">
      <p className="text-[15px] font-bold text-ink">비밀번호 변경</p>
      <p className="mt-1 text-[13px] leading-5 text-muted">바꾸면 바로 적용되며, 다른 기기에서 로그인해 둔 세션은 풀립니다.</p>

      <div className="mt-4 max-w-sm space-y-4">
        <label className="block text-[14px] font-semibold text-ink">
          현재 비밀번호
          <input name="current" type="password" required autoComplete="current-password" className={inputClass} />
        </label>
        <label className="block text-[14px] font-semibold text-ink">
          새 비밀번호
          <input name="next" type="password" required minLength={minLength} autoComplete="new-password" className={inputClass} />
          <span className="mt-1 block text-[12px] font-normal text-muted">{minLength}자 이상, 공백 없이</span>
        </label>
        <label className="block text-[14px] font-semibold text-ink">
          새 비밀번호 확인
          <input name="confirm" type="password" required minLength={minLength} autoComplete="new-password" className={inputClass} />
        </label>
      </div>

      {state && (
        <p role={state.ok ? "status" : "alert"} className={`mt-4 text-[13px] font-medium ${state.ok ? "text-success" : "text-danger"}`}>
          {state.ok ? state.message : state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-[14px] font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "바꾸는 중..." : "비밀번호 바꾸기"}
      </button>
    </form>
  );
}
