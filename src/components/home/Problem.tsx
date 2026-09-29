import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { HomeContent } from "@/lib/cms/types";

/**
 * 레퍼런스의 흰 배경 섹션: 둥근 풀폭 배너 이미지 + 도형 불릿이 붙은 큰 문장 + 인용 문단.
 * 기획서 03 PROBLEM 원고를 그대로 사용합니다.
 */
const SHAPES = [
  <span key="c" aria-hidden className="inline-block h-4 w-4 rounded-full bg-primary" />,
  <span key="s" aria-hidden className="inline-block h-4 w-4 rounded-[3px] bg-accent" />,
  <span key="t" aria-hidden className="inline-block h-4 w-4 bg-primary" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />,
];

export default function Problem({ data }: { data: HomeContent["problem"] }) {
  return (
    <section className="section bg-surface">
      <Container size="wide">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[20px] sm:aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={data.bannerImage}
            alt={data.bannerAlt}
            fill
            sizes="(min-width:1400px) 1320px, 100vw"
            className="object-cover object-[50%_35%]"
          />
          <div aria-hidden className="absolute inset-0 bg-black/25" />
          <p className="t-en absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-white md:flex-row md:gap-0">
            <span>{data.bannerEn}</span>
            <span aria-hidden className="hidden h-7 w-px bg-white/60 md:mx-5 md:block" />
            <span className="text-[clamp(18px,2.4vw,30px)] font-medium">{data.bannerKo}</span>
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-4xl text-center md:mt-28">
          <h2 className="t-h2 text-ink">{data.title}</h2>
        </Reveal>

        <ul className="mx-auto mt-12 max-w-4xl space-y-8 md:mt-16 md:space-y-10">
          {data.cards.map((c, i) => {
            const shape = SHAPES[i % SHAPES.length];
            return (
              <Reveal as="li" key={`${c.title}-${i}`} delay={i * 120} className="text-center">
                <p className="t-statement flex flex-wrap items-center justify-center gap-4 text-ink">
                  {i % 2 === 0 && shape}
                  {c.title}
                  {i % 2 === 1 && shape}
                </p>
                <p className="t-body-lg mx-auto mt-3 max-w-2xl text-muted">{c.body}</p>
              </Reveal>
            );
          })}
        </ul>

        {data.quote && (
          <Reveal className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
            <p className="t-lead text-ink-2">&ldquo;{data.quote}&rdquo;</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
