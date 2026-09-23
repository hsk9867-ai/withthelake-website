import { NextResponse } from "next/server";

type ContactPayload = {
  company: string;
  department?: string;
  position?: string;
  name: string;
  phone: string;
  email: string;
  inquiryType?: string;
  message: string;
  agree: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  if (!body.company || !body.name || !body.phone || !body.email || !body.message) {
    return NextResponse.json(
      { ok: false, error: "필수 항목을 모두 입력해 주세요." },
      { status: 400 },
    );
  }

  if (!body.agree) {
    return NextResponse.json(
      { ok: false, error: "개인정보 수집 및 이용에 동의해 주세요." },
      { status: 400 },
    );
  }

  // TODO: 접수 내용 전달 방식(지정 메일 등)이 확정되면 이메일/알림 연동으로 교체합니다.
  console.log("[CONTACT US] 새 문의 접수", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
