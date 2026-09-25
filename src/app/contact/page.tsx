import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import ContactForm from "@/components/contact/ContactForm";
import { IconMail, IconPhone } from "@/components/Icons";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "CONTACT US — 문의",
  description: "사업·협력, SENIO 실증·도입, 프로그램 운영, 제품·구매 문의를 남겨주세요.",
};

const TYPES = [
  { label: "사업·협력", desc: "지자체·기관·기업과의 협력, 공동사업 제안" },
  { label: "SENIO 실증·도입", desc: "2026 실증 참여, 기관 도입 상담" },
  { label: "프로그램 운영", desc: "걷기·운동·노쇠 예방·생활습관·마음건강 프로그램" },
  { label: "제품·구매", desc: "WITH WELL ME 제품, 단체 구매" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        crumbs={[{ label: "CONTACT US" }]}
        title="문의를 남겨주시면 담당자가 확인 후 연락드립니다"
        lead="문의 유형을 선택하고 요청 내용을 남겨 주세요. 접수 후 영업일 기준 2~3일 안에 답변드립니다."
      />

      <section className="section bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <aside className="space-y-8">
              <div>
                <p className="eyebrow text-accent-deep">문의 유형</p>
                <ul className="mt-5 divide-y divide-line">
                  {TYPES.map((t) => (
                    <li key={t.label} className="py-3.5">
                      <p className="text-[16px] font-semibold text-ink">{t.label}</p>
                      <p className="text-[15px] text-muted">{t.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] bg-cream p-7">
                <p className="eyebrow text-accent-deep">직접 연락</p>
                <p className="mt-3 text-[16px] font-semibold text-ink">
                  {SITE.name} {SITE.contact.team} {SITE.contact.person}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={`tel:${SITE.contact.phone}`} className="inline-flex items-center gap-3 text-[16px] text-ink-2 hover:text-primary">
                    <IconPhone className="text-primary" /> {SITE.contact.phone}
                  </a>
                  <a href={`mailto:${SITE.contact.email}`} className="inline-flex items-center gap-3 text-[16px] text-ink-2 hover:text-primary">
                    <IconMail className="text-primary" /> {SITE.contact.email}
                  </a>
                </div>
              </div>
            </aside>

            <div className="card p-6 sm:p-8 md:p-10">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
