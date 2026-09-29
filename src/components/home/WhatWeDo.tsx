import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";
import { isPublished } from "@/lib/cms/helpers";
import type { HomeContent, SiteSettings } from "@/lib/cms/types";

type Data = HomeContent["whatWeDo"];
type Props = { data: Data; site: SiteSettings };

/**
 * 레퍼런스 "Our Products" — 세로 패널 이미지 콜라주 위에 큰 흰 타이틀.
 * 기획서 05 WHAT WE DO 의 세 사업을 패널로 두고, 아래에 원고 카드를 이어 붙입니다.
 * 비공개 페이지(사이트 설정 publish)는 링크와 '자세히 보기' 버튼이 숨겨집니다.
 */
function resolve(biz: Data["businesses"][number], site: SiteSettings) {
  const published = isPublished(site, biz.key);
  const href = published && biz.href ? biz.href : undefined;
  // 비공개 페이지로 가는 버튼(자세히 보기)은 숨기고 외부 링크·문의 버튼은 유지
  const actions = published ? biz.actions : biz.actions.filter((a) => a.href !== biz.href);
  return { href, actions };
}

export function WhatWeDoPanels({ data, site }: Props) {
  return (
    <section className="relative bg-black text-white" aria-label={data.panelTitle}>
      <div className="grid h-[70vh] min-h-[520px] grid-cols-3">
        {data.businesses.map((b, i) => {
          const { href } = resolve(b, site);
          const inner = (
            <>
              <Image src={b.image} alt={b.imageAlt} fill sizes="34vw" className="object-cover opacity-80 transition-[transform,opacity] duration-700 group-hover:scale-[1.04] group-hover:opacity-100" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <p className="t-meta text-accent">{b.kind}</p>
                <p className="font-display mt-1 text-[clamp(16px,2vw,26px)] font-extrabold tracking-tight">{b.name}</p>
              </div>
            </>
          );
          const cls = `group relative overflow-hidden ${i === 1 ? "mt-[6vh]" : i === 2 ? "mt-[12vh]" : ""}`;
          return href ? (
            <Link key={`${b.name}-${i}`} href={href} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={`${b.name}-${i}`} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
      <h2 className="t-display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 text-center text-[clamp(44px,9vw,128px)] font-extrabold tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {data.panelTitle}
      </h2>
    </section>
  );
}

export default function WhatWeDo({ data, site, withHeading = true }: Props & { withHeading?: boolean }) {
  return (
    <section className="section bg-surface">
      <Container size="wide">
        {withHeading && (
          <Reveal className="text-center">
            <h2 className="t-h2 text-ink">{data.title}</h2>
            <p className="t-lead mx-auto mt-4 max-w-2xl text-muted">{data.lead}</p>
          </Reveal>
        )}

        <div className={`grid gap-6 lg:grid-cols-3 ${withHeading ? "mt-14" : ""}`}>
          {data.businesses.map((biz, i) => {
            const { href, actions } = resolve(biz, site);
            return (
              <Reveal key={`${biz.name}-${i}`} delay={i * 120} className="card card-hover group flex flex-col overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image src={biz.image} alt={biz.imageAlt} fill sizes="(min-width:1024px) 440px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className="t-meta absolute left-5 top-5 rounded-md bg-white/90 px-3 py-1 text-[13px] font-bold text-primary backdrop-blur">
                    {biz.kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-[24px] font-extrabold tracking-tight text-primary">
                    {href ? (
                      <Link href={href} className="inline-flex items-center gap-2 hover:underline">
                        {biz.name}
                        <IconArrow size={18} className="text-accent-dark opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ) : (
                      biz.name
                    )}
                  </h3>
                  <p className="mt-1 text-[16px] font-semibold text-ink">{biz.tag}</p>
                  <p className="t-body mt-4 flex-1 text-muted">{biz.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {biz.pills.map((pill) => (
                      <span key={pill} className="t-meta rounded-md border border-primary/25 px-3 py-1 text-[13px] font-bold text-primary">
                        {pill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {actions.map((action) => (
                      <Button key={action.label} href={action.href} variant={action.variant} size="sm" external={action.external}>
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
