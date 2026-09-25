"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const INQUIRY_TYPES = [
  "사업·협력",
  "SENIO 실증·도입",
  "프로그램 운영",
  "제품·구매",
  "기타",
] as const;

/** ?type= 쿼리로 문의 유형을 미리 선택할 수 있습니다 (예: /contact?type=senio) */
const TYPE_ALIAS: Record<string, (typeof INQUIRY_TYPES)[number]> = {
  business: "사업·협력",
  senio: "SENIO 실증·도입",
  program: "프로그램 운영",
  product: "제품·구매",
  other: "기타",
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full min-h-12 rounded-xl border border-line bg-white px-4 text-[16px] text-ink placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";
const labelClass = "mb-2 block text-[15px] font-semibold text-ink";

function Req() {
  return (
    <span className="text-accent-deep" aria-hidden>
      {" "}
      *
    </span>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const preset = TYPE_ALIAS[params.get("type") ?? ""] ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("submitting");
    setErrorMessage("");

    const data = new FormData(form);
    const payload = {
      company: data.get("company"),
      department: data.get("department"),
      position: data.get("position"),
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      inquiryType: data.get("inquiryType"),
      message: data.get("message"),
      agree: data.get("agree") === "on",
      website: data.get("website"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setErrorMessage(result.error ?? "문의 접수 중 오류가 발생했습니다.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("네트워크 오류로 접수하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-primary-light p-10 text-center" role="status">
        <p className="eyebrow text-accent-deep">접수 완료</p>
        <h2 className="t-h3 mt-3 text-primary">문의가 접수되었습니다</h2>
        <p className="t-body mt-3 text-ink-2">보내주신 내용을 확인한 뒤 담당자가 순차적으로 연락드리겠습니다.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-primary px-6 text-[15px] font-semibold text-primary hover:bg-white"
        >
          새 문의 작성하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            회사명 <Req />
          </label>
          <input id="company" name="company" required autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor="department" className={labelClass}>부서</label>
          <input id="department" name="department" className={inputClass} />
        </div>
        <div>
          <label htmlFor="position" className={labelClass}>직책</label>
          <input id="position" name="position" autoComplete="organization-title" className={inputClass} />
        </div>
        <div>
          <label htmlFor="name" className={labelClass}>
            담당자 이름 <Req />
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            연락처 <Req />
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="010-0000-0000" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            이메일 <Req />
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="inquiryType" className={labelClass}>
          문의 유형 <Req />
        </label>
        <select id="inquiryType" name="inquiryType" required className={inputClass} defaultValue={preset}>
          <option value="" disabled>
            선택해 주세요
          </option>
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          요청 내용 <Req />
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="기관 유형, 이용자 규모, 희망 일정 등을 함께 적어 주시면 상담이 빨라집니다."
          className={`${inputClass} min-h-0 py-3`}
        />
      </div>

      {/* honeypot — 사람은 보지 못하는 필드 */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-cream p-5">
        <input id="agree" name="agree" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-primary" />
        <label htmlFor="agree" className="text-[15px] leading-6 text-ink-2">
          개인정보 수집 및 이용에 동의합니다. 수집 항목과 이용 목적은{" "}
          <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2">
            개인정보 처리방침
          </Link>
          에서 확인하실 수 있습니다.
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[15px] font-medium text-danger">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-primary px-8 text-[16px] font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "접수 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
