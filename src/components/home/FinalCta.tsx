import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-accent-light">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-primary/10 blur-3xl"
      />
      <Container className="relative py-24 md:py-32">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow text-accent-deep">09 · Contact</p>
          <h2 className="t-h1 mt-5 max-w-2xl text-ink">더 건강한 일상을, 더 많은 사람에게</h2>
          <p className="t-lead mt-5 max-w-xl text-muted">
            사업·협력, SENIO 실증·도입, 프로그램 운영에 관한 문의를 남겨 주시면 담당자가 확인 후 연락드립니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg" arrow>
              사업·협력 문의
            </Button>
            <Button href="/contact?type=senio" variant="secondary" size="lg">
              SENIO 실증·도입 문의
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
