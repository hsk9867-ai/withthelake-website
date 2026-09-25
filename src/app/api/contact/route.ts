import { NextResponse } from "next/server";

type ContactPayload = {
  company: string;
  department?: string;
  position?: string;
  name: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
  agree: boolean;
  website?: string; // honeypot
};

const INQUIRY_TYPES = new Set(["사업·협력", "SENIO 실증·도입", "프로그램 운영", "제품·구매", "기타"]);

function clean(v: unknown, max = 500) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

/**
 * 접수 내용 전달 (기획서 7-5 폼 연동 · [확정 필요] 지정 메일).
 * RESEND_API_KEY + CONTACT_TO_EMAIL 이 설정되면 Resend API로 메일을 보냅니다.
 * 설정 전에는 서버 로그에만 남깁니다.
 */
async function deliver(p: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "WITH THE LAKE <noreply@withthelake.com>";

  const receivedAt = new Date().toISOString();
  if (!apiKey || !to) {
    console.log("[CONTACT US] 새 문의 접수 (메일 미설정)", { ...p, receivedAt });
    return;
  }

  const rows: [string, string][] = [
    ["문의 유형", p.inquiryType],
    ["회사명", p.company],
    ["부서", p.department ?? ""],
    ["직책", p.position ?? ""],
    ["담당자", p.name],
    ["연락처", p.phone],
    ["이메일", p.email],
    ["접수 시각", receivedAt],
  ];
  const html = `
    <h2 style="font-family:sans-serif">[홈페이지 문의] ${escapeHtml(p.inquiryType)} · ${escapeHtml(p.company)}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><th align="left" style="padding:6px 12px 6px 0;color:#555">${k}</th><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:sans-serif;margin-top:20px">요청 내용</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(p.message)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: p.email,
      subject: `[홈페이지 문의] ${p.inquiryType} · ${p.company} · ${p.name}`,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`메일 전송 실패: ${res.status} ${text}`);
  }
}

export async function POST(request: Request) {
  let raw: Partial<ContactPayload>;
  try {
    raw = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 봇 차단: 숨은 필드가 채워져 있으면 조용히 성공 처리
  if (clean(raw.website)) return NextResponse.json({ ok: true });

  const payload: ContactPayload = {
    company: clean(raw.company, 120),
    department: clean(raw.department, 120),
    position: clean(raw.position, 120),
    name: clean(raw.name, 60),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 120),
    inquiryType: clean(raw.inquiryType, 40),
    message: clean(raw.message, 4000),
    agree: raw.agree === true,
  };

  if (!payload.company || !payload.name || !payload.phone || !payload.email || !payload.message) {
    return NextResponse.json({ ok: false, error: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ ok: false, error: "이메일 형식을 확인해 주세요." }, { status: 400 });
  }
  if (!INQUIRY_TYPES.has(payload.inquiryType)) {
    return NextResponse.json({ ok: false, error: "문의 유형을 선택해 주세요." }, { status: 400 });
  }
  if (!payload.agree) {
    return NextResponse.json({ ok: false, error: "개인정보 수집 및 이용에 동의해 주세요." }, { status: 400 });
  }

  try {
    await deliver(payload);
  } catch (err) {
    console.error("[CONTACT US] 전달 실패", err);
    return NextResponse.json(
      { ok: false, error: "접수 처리 중 오류가 발생했습니다. 이메일로 직접 문의해 주세요." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
