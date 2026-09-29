import Image from "next/image";
import Reveal from "@/components/Reveal";
import Lines from "@/components/Lines";
import type { HomeContent } from "@/lib/cms/types";

/**
 * 블랙 섹션 (기획서 02 OUR BEGINNING).
 * 좌: 문장형 헤드라인 + 소개 문장 + 현장 사진 / 우: 세 키워드를 원고 문장과 짝지은 3단계 목록.
 */
export default function Beginning({ data }: { data: HomeContent["beginning"] }) {
  return (
    <section className="bg-black text-white" aria-label="우리의 시작">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-8 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
          {/* 좌: 헤드라인 + 소개 + 사진 */}
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-accent">{data.eyebrow}</p>
            <h2 className="t-h1 mt-5 text-white">
              <Lines text={data.headline} />
            </h2>
            <p className="t-lead mt-6 max-w-md text-white/75">{data.lead}</p>
            {data.image && (
              <div className="relative mt-8 aspect-[3/2] max-w-sm overflow-hidden rounded-[14px] md:mt-10">
                <Image src={data.image} alt={data.imageAlt} fill sizes="(min-width:768px) 384px, 100vw" className="object-cover" />
              </div>
            )}
          </Reveal>

          {/* 우: 3단계 목록 */}
          <ol className="md:col-span-7 md:self-center">
            {data.steps.map((s, i) => (
              <Reveal as="li" key={`${s.no}-${i}`} delay={120 + i * 120} className="border-t border-white/15 py-7 md:py-9">
                <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                  <span className="t-meta pt-2 font-bold text-accent">{s.no}</span>
                  <div>
                    <p className="text-[clamp(26px,2.8vw,38px)] font-extrabold leading-[1.2] tracking-[-0.03em] text-white">
                      {s.title}
                    </p>
                    <p className="t-body-lg mt-3 max-w-xl text-white/70">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <li aria-hidden className="border-t border-white/15" />
          </ol>
        </div>
      </div>
    </section>
  );
}
