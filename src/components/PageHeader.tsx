import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Container from "./Container";

type Crumb = { label: string; href?: string };

/**
 * 서브페이지 공통 헤더 (레퍼런스 구조):
 * 1) 코너 노치 + 페이지 제목
 * 2) 브랜드 컬러 배너: 영문 타이틀(Manrope) + 한 줄 설명 + 우측 이미지
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs = [],
  image,
  imageAlt = "",
  children,
}: {
  /** 배너의 영문 타이틀 (예: "About Us") */
  eyebrow: string;
  /** 페이지 제목 (노치 옆) */
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <section className="bg-surface pt-[72px]">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-10 pt-14 md:pt-20">
          <h1 className="notch-title text-ink">{title}</h1>
          <nav aria-label="breadcrumb" className="t-meta flex flex-wrap items-center gap-2 text-muted">
            <Link href="/" className="hover:text-primary">HOME</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span aria-hidden className="text-line-strong">/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary">{c.label}</Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className="relative overflow-hidden rounded-[10px] bg-primary text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-accent/30 blur-3xl"
          />
          <div className={`relative grid gap-8 px-8 py-12 md:px-14 md:py-16 ${image ? "lg:grid-cols-[1.2fr_0.8fr] lg:items-center" : ""}`}>
            <div>
              <p className="t-en text-white">{eyebrow}</p>
              {lead && <p className="t-body-lg mt-5 max-w-2xl text-white/88">{lead}</p>}
              {children && <div className="mt-8">{children}</div>}
            </div>
            {image && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] lg:aspect-[4/3]">
                <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
