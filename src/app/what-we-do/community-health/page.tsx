import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "COMMUNITY HEALTH",
  description:
    "지자체·복지기관·기업과 함께 걷기, 운동, 노쇠 예방, 생활습관, 마음건강 프로그램을 운영합니다.",
};

const TOPICS = ["걷기", "운동", "노쇠 예방", "생활습관", "마음건강"];

export default function CommunityHealthPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary py-20 text-white md:py-24">
        <Image
          src="/assets/activities/barefoot-4.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50"
        />
        <Container className="relative">
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
            COMMUNITY HEALTH
          </p>
          <h1 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
            현장에서 함께 만드는 예방건강관리
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/85">
            지자체·복지기관·기업과 함께 걷기, 운동, 노쇠 예방, 생활습관,
            마음건강 프로그램을 운영합니다.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-20 md:py-24">
        <Container>
          <div className="flex flex-wrap gap-2.5">
            {TOPICS.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-primary-light px-4 py-2 text-[13.5px] font-semibold text-primary"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line p-8">
            <h2 className="text-[17px] font-bold text-ink">힐링로드ON</h2>
            <p className="mt-3 text-[14.5px] leading-7 text-muted">
              맨발걷기를 중심으로 지역사회와 함께 진행해 온 건강걷기
              프로그램입니다. 기존 힐링로드ON 콘텐츠와 운영 사례는 이 페이지로
              이관되어 안내될 예정입니다.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["/assets/activities/barefoot-1.jpg", "/assets/activities/barefoot-6.jpg", "/assets/activities/barefoot-7.jpg"].map(
                (src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={src} alt="맨발걷기 활동" fill className="object-cover" />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-cream p-9 text-center">
            <p className="text-[15px] leading-7 text-muted">
              프로그램 운영 사례와 상세 내용은 준비 중입니다. 프로그램 도입과
              운영을 상담해 드립니다.
            </p>
            <Button href="/contact" variant="primary" className="mt-6">
              프로그램 문의
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
