import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="bg-accent py-24 text-center md:py-28">
      <Container>
        <Reveal className="flex flex-col items-center">
          <h2 className="mx-auto max-w-2xl text-[26px] font-extrabold leading-snug tracking-tight text-primary-dark md:text-[36px]">
            더 건강한 일상을, 더 많은 사람에게
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary">
              사업·협력 문의
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border-primary-dark text-primary-dark hover:bg-white"
            >
              SENIO 실증·도입 문의
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
