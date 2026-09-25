import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "㈜위드더레이크 개인정보 처리방침",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: [
      "㈜위드더레이크는 CONTACT US 문의 접수를 위해 다음 항목을 수집합니다.",
      "필수: 회사명, 담당자 이름, 연락처, 이메일, 문의 유형, 요청 내용",
      "선택: 부서, 직책",
    ],
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    body: ["수집한 개인정보는 문의 확인 및 답변, 사업·협력 상담, SENIO 실증·도입 상담, 프로그램 운영 상담, 제품·구매 안내 목적으로만 이용합니다."],
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    body: ["문의 처리가 완료된 이후 관련 법령에 따른 보관 의무가 없는 한 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는 방법으로 삭제합니다."],
  },
  {
    title: "4. 개인정보의 제3자 제공 및 처리 위탁",
    body: [
      "㈜위드더레이크는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않으며, 법령에 근거가 있거나 이용자가 사전에 동의한 경우에만 제공합니다.",
      "문의 접수 메일 발송을 위해 이메일 발송 서비스에 처리를 위탁할 수 있으며, 위탁 시 수탁자와 업무 내용을 본 방침에 공개합니다.",
    ],
  },
  {
    title: "5. 이용자의 권리",
    body: ["이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요청할 수 있으며, 아래 문의처로 연락하시면 지체 없이 조치합니다."],
  },
  {
    title: "6. 개인정보 보호책임자 및 문의처",
    body: [`${SITE.name} ${SITE.contact.team} ${SITE.contact.person} · 전화 ${SITE.contact.phone} · 이메일 ${SITE.contact.email}`],
  },
  {
    title: "7. 고지",
    body: ["본 방침은 시행일부터 적용되며, 내용이 변경될 경우 홈페이지를 통해 공지합니다."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy Policy" crumbs={[{ label: "개인정보 처리방침" }]} title="개인정보 처리방침" lead="㈜위드더레이크가 수집하는 개인정보의 항목, 목적, 보유 기간과 이용자의 권리를 안내합니다." />
      <section className="section bg-surface">
        <Container size="narrow">
          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="t-h3 text-ink">{s.title}</h2>
                <div className="mt-3 space-y-2">
                  {s.body.map((b) => (
                    <p key={b} className="t-body text-ink-2">
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
