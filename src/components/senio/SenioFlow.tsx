import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconByName } from "@/components/Icons";
import type { SenioContent } from "@/lib/cms/types";

const LEVEL_COLORS = ["bg-success", "bg-accent-dark", "bg-warn", "bg-danger"];

export default function SenioFlow({ data }: { data: SenioContent["flow"] }) {
  return (
    <section id="senio-flow" className="section scroll-mt-20 bg-surface">
      <Container>
        <SectionHeading index="01" eyebrow={data.eyebrow} title={data.title} lead={data.lead} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <ol className="space-y-4">
            {data.steps.map((f, i) => (
              <Reveal as="li" key={`${f.n}-${i}`} delay={i * 100} className="card flex gap-5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <IconByName name={f.icon} size={24} />
                </span>
                <div>
                  <p className="t-meta text-accent-deep">STEP {f.n}</p>
                  <h3 className="t-h3 mt-1 text-ink">{f.title}</h3>
                  <p className="t-body mt-2 text-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
            {data.levels.length > 0 && (
              <Reveal as="li" delay={320} className="flex flex-wrap items-center gap-x-6 gap-y-3 px-2 pt-2">
                <span className="t-meta font-semibold text-ink">{data.levelsLabel}</span>
                <ul className="flex flex-wrap gap-2">
                  {data.levels.map((label, i) => (
                    <li key={`${label}-${i}`} className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[15px] font-medium text-ink">
                      <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${LEVEL_COLORS[i % LEVEL_COLORS.length]}`} />
                      {label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </ol>

          <Reveal delay={150} className="relative overflow-hidden rounded-[24px] bg-primary-light">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={1800}
              height={1326}
              sizes="(min-width:1024px) 600px, 100vw"
              className="relative h-auto w-full"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
