import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import type { SenioContent } from "@/lib/cms/types";

export default function SenioHero({ data }: { data: SenioContent["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-[72px] text-white">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)" }} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[560px] w-[560px] animate-float-slow rounded-full bg-accent/25 blur-3xl"
      />
      <Container className="relative">
        <nav aria-label="breadcrumb" className="t-meta flex items-center gap-2 pt-8 text-white/60">
          <Link href="/" className="hover:text-white">HOME</Link>
          <span aria-hidden>/</span>
          <Link href="/what-we-do" className="hover:text-white">WHAT WE DO</Link>
          <span aria-hidden>/</span>
          <span className="text-white">SENIO</span>
        </nav>

        <div className="grid gap-14 py-16 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow animate-fade-up text-accent">{data.eyebrow}</p>
            <h1 className="t-display mt-5 max-w-[15ch] animate-fade-up" style={{ animationDelay: "120ms" }}>
              {data.title}
            </h1>
            <p className="t-lead mt-7 max-w-xl animate-fade-up text-white/85" style={{ animationDelay: "220ms" }}>
              {data.lead}
            </p>
            <p className="t-body mt-5 max-w-xl animate-fade-up text-white/70" style={{ animationDelay: "320ms" }}>
              {data.body}
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
              <Button href={data.primaryCta.href} variant="white" size="lg" arrow>
                {data.primaryCta.label}
              </Button>
              <Button href={data.secondaryCta.href} variant="outline-white" size="lg">
                {data.secondaryCta.label}
              </Button>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-1 gap-px animate-fade-up overflow-hidden rounded-[10px] border border-white/15 bg-white/15 sm:grid-cols-3" style={{ animationDelay: "480ms" }}>
              {data.stats.map((s, i) => (
                <div key={`${s.label}-${i}`} className="bg-primary-dark/80 px-5 py-5">
                  <dd className="t-stat text-accent">{s.value}</dd>
                  <dt className="mt-2 text-[14px] leading-5 text-white/75">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex h-[380px] w-full max-w-md animate-fade-up items-end justify-center md:h-[500px]" style={{ animationDelay: "200ms" }}>
            <div aria-hidden className="absolute bottom-10 h-[300px] w-[300px] rounded-full bg-white/10 blur-2xl md:h-[380px] md:w-[380px]" />
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={930}
              height={986}
              priority
              sizes="(min-width:768px) 480px, 90vw"
              className="relative h-full w-auto animate-float-slow object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
