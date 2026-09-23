import Image from "next/image";
import Container from "@/components/Container";

export default function AboutHero() {
  return (
    <section className="bg-primary py-24 text-white md:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
            ABOUT
          </p>
          <h1 className="mt-4 max-w-2xl text-[26px] font-extrabold leading-relaxed tracking-tight md:text-[32px]">
            ㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한
            자립생활이 더 오래 지속되도록 돕는 지역사회 기반
            예방건강관리 기업입니다.
          </h1>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/assets/stock/senior-care-visit.jpg"
            alt="시니어와 함께하는 건강 상담"
            fill
            priority
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
