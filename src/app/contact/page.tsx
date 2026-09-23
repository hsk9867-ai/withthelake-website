import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "CONTACT US",
  description: "사업·협력, SENIO 실증·도입, 프로그램 운영 문의를 남겨주세요.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary py-20 text-white md:py-24">
        <Container>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
            CONTACT US
          </p>
          <h1 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
            문의를 남겨주시면
            <br />
            담당자가 확인 후 연락드립니다
          </h1>
        </Container>
      </section>

      <section className="bg-surface py-20 md:py-24">
        <Container className="max-w-2xl">
          <ContactForm />

          <div className="mt-14 grid gap-6 border-t border-line pt-10 text-[14.5px] text-muted sm:grid-cols-2">
            <div>
              <p className="font-semibold text-ink">전화</p>
              <p className="mt-1">010-4629-5925</p>
            </div>
            <div>
              <p className="font-semibold text-ink">이메일</p>
              <p className="mt-1">contact@withthelake.com</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
