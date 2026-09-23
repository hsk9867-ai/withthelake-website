import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src="/assets/stock/barefoot-stream.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] animate-float-slow rounded-full bg-accent/25 blur-3xl"
      />

      <Container className="relative flex min-h-[640px] flex-col justify-center gap-8 py-28">
        <p className="animate-fade-up text-[14px] font-semibold tracking-[0.2em] text-accent">
          WITH THE LAKE
        </p>
        <h1
          className="max-w-3xl animate-fade-up text-[34px] font-extrabold leading-[1.35] tracking-tight md:text-[48px]"
          style={{ animationDelay: "120ms" }}
        >
          건강한 삶은 병원 밖,
          <br />
          일상에서 시작됩니다
        </h1>
        <p
          className="max-w-xl animate-fade-up text-[16px] leading-8 text-white/85 md:text-[18px]"
          style={{ animationDelay: "240ms" }}
        >
          ㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한
          자립생활을 돕는 지역사회 기반 예방건강관리 기업입니다.
        </p>
        <div
          className="flex animate-fade-up flex-wrap gap-3 pt-2"
          style={{ animationDelay: "360ms" }}
        >
          <Button href="/contact" variant="secondary">
            사업·협력 문의
          </Button>
          <Button href="/about" variant="ghost">
            위드더레이크 알아보기
          </Button>
        </div>
      </Container>
    </section>
  );
}
