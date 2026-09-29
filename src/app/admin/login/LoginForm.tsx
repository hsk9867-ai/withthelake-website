"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, type ActionResult } from "../actions";

export default function LoginForm() {
  const params = useSearchParams();
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(loginAction, null);

  return (
    <form action={action} className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-sm">
      <p className="font-display text-[13px] font-bold tracking-wider text-accent-deep">WITH THE LAKE</p>
      <h1 className="mt-1 text-[22px] font-bold text-ink">관리자 로그인</h1>
      <input type="hidden" name="next" value={params.get("next") ?? "/admin"} />
      <label htmlFor="password" className="mt-6 block text-[14px] font-semibold text-ink">
        비밀번호
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-[16px] focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
      />
      {state && !state.ok && (
        <p role="alert" className="mt-3 text-[14px] font-medium text-danger">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary text-[15px] font-bold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}
