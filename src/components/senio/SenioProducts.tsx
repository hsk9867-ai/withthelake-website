import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconByName } from "@/components/Icons";
import type { SenioContent } from "@/lib/cms/types";

export default function SenioProducts({ data }: { data: SenioContent["products"] }) {
  const { strip, lens, care } = data;
  return (
    <section className="section bg-cream">
      <Container>
        <SectionHeading index="02" eyebrow={data.eyebrow} title={data.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Strip */}
          <Reveal className="card card-hover flex flex-col p-8">
            <p className="eyebrow text-accent-deep">{strip.eyebrow}</p>
            <h3 className="t-h3 mt-3 text-ink">{strip.title}</h3>
            <p className="t-body mt-3 text-muted">{strip.body}</p>
            <ul className="mt-6 space-y-3">
              {strip.indicators.map((g, i) => (
                <li key={`${g.group}-${i}`} className="flex items-center gap-4 rounded-xl bg-cream p-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                    <IconByName name={g.icon} size={22} />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-ink">{g.group}</p>
                    <p className="text-[14px] text-muted">{g.items.join(" · ")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Lens */}
          <Reveal delay={110} className="card card-hover flex flex-col p-8">
            <div className="relative mb-6 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-primary-light">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
              {lens.image && (
                <Image src={lens.image} alt="SENIO Lens 광학 측정기" width={1200} height={575} sizes="320px" className="relative h-28 w-auto object-contain" />
              )}
            </div>
            <p className="eyebrow text-accent-deep">{lens.eyebrow}</p>
            <h3 className="t-h3 mt-3 text-ink">{lens.title}</h3>
            <p className="t-body mt-3 text-muted">{lens.body}</p>
          </Reveal>

          {/* Care */}
          <Reveal delay={220} className="card card-hover flex flex-col p-8">
            <div className="relative mb-6 flex h-44 items-end justify-center overflow-hidden rounded-xl bg-primary-light">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
              {care.image && (
                <Image src={care.image} alt="SENIO 앱 측정 결과 화면" width={433} height={881} sizes="200px" className="relative h-40 w-auto translate-y-4 object-contain object-top" />
              )}
            </div>
            <p className="eyebrow text-accent-deep">{care.eyebrow}</p>
            <h3 className="t-h3 mt-3 text-ink">{care.title}</h3>
            <p className="t-body mt-3 text-muted">{care.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {care.pills.map((pill, i) => (
                <li key={`${pill}-${i}`} className="rounded-full bg-accent-light px-3.5 py-1 text-[14px] font-semibold text-accent-deep">
                  {pill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
