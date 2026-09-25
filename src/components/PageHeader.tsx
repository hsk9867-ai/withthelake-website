import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Container from "./Container";

type Crumb = { label: string; href?: string };

/**
 * 서브페이지 공통 헤더.
 * 기본은 밝은 배경(크림) — 보라색 풀블리드는 HOME/CTA 밴드에만 쓰고, 서브페이지는 차분하게 시작합니다.
 * image 를 주면 오른쪽에 사진을 배치합니다.
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs = [],
  image,
  imageAlt = "",
  children,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`relative overflow-hidden border-b ${
        dark ? "border-white/10 bg-primary text-white" : "border-line bg-cream"
      }`}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-accent/25 blur-3xl"
        />
      )}
      <Container className="relative">
        <div
          className={`grid gap-10 py-16 md:py-20 ${
            image ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : ""
          }`}
        >
          <div>
            <nav aria-label="breadcrumb" className="t-meta flex flex-wrap items-center gap-2">
              <Link href="/" className={dark ? "text-white/70 hover:text-white" : "text-muted hover:text-primary"}>
                HOME
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-2">
                  <span aria-hidden className={dark ? "text-white/40" : "text-line-strong"}>
                    /
                  </span>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className={dark ? "text-white/70 hover:text-white" : "text-muted hover:text-primary"}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className={dark ? "text-white" : "text-ink"}>{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
            <p className={`eyebrow mt-8 ${dark ? "text-accent" : "text-accent-deep"}`}>{eyebrow}</p>
            <h1 className={`t-h1 mt-4 max-w-3xl ${dark ? "text-white" : "text-ink"}`}>{title}</h1>
            {lead && (
              <p className={`t-lead mt-6 max-w-2xl ${dark ? "text-white/85" : "text-muted"}`}>{lead}</p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(23,22,28,0.35)]">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
