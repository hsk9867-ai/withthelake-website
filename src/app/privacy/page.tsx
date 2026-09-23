import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "㈜위드더레이크 개인정보 처리방침",
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "㈜위드더레이크는 CONTACT US 문의 접수를 위해 회사명, 부서, 직책, 담당자 이름, 연락처, 이메일, 문의 유형, 요청 내용을 수집합니다.",
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    body: "수집한 개인정보는 문의 확인 및 답변, 사업·협력 상담, SENIO 실증·도입 상담, 프로그램 운영 상담 목적으로만 이용합니다.",
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    body: "문의 처리가 완료된 이후 관련 법령에 따른 보관 의무가 없는 한 지체 없이 파기합니다.",
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: "㈜위드더레이크는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으며, 법령에 근거가 있거나 이용자가 사전에 동의한 경우에만 제공합니다.",
  },
  {
    title: "5. 문의처",
    body: "개인정보 관련 문의는 아래로 연락해 주시기 바랍니다. ㈜위드더레이크 서비스기획팀 · 전화 010-4629-5925 · 이메일 contact@withthelake.com",
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-surface py-20 md:py-24">
      <Container className="max-w-3xl">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
          PRIVACY POLICY
        </p>
        <h1 className="mt-4 text-[24px] font-extrabold tracking-tight text-ink md:text-[28px]">
          개인정보 처리방침
        </h1>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-[16px] font-bold text-ink">{s.title}</h2>
              <p className="mt-2 text-[14.5px] leading-7 text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
