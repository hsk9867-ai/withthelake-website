"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/content/site";

/**
 * 레퍼런스 스타일 헤더:
 * - 홈 상단에서는 투명(흰 로고), 스크롤하면 네이비 바
 * - 서브페이지는 항상 네이비 바
 * - 우측: CONTACT 링크 + 햄버거 → 전체화면 사이트맵 메뉴
 */
const MENU = [
  {
    title: "ABOUT",
    href: "/about",
    links: [
      { label: "회사소개", href: "/about" },
      { label: "Nature × Human × Science", href: "/about#identity" },
    ],
  },
  {
    title: "WHAT WE DO",
    href: "/what-we-do",
    links: [
      { label: "SENIO", href: "/senio" },
      ...(SITE.publish.withWellMe ? [{ label: "WITH WELL ME", href: "/what-we-do/with-well-me" }] : []),
      ...(SITE.publish.communityHealth ? [{ label: "COMMUNITY HEALTH", href: "/what-we-do/community-health" }] : []),
    ],
  },
  {
    title: "IMPACT",
    href: "/impact",
    links: [
      { label: "주요 프로젝트", href: "/impact#projects" },
      { label: "실증 현황", href: "/impact#pilots" },
      { label: "R&D · 지식재산", href: "/impact#rnd" },
      { label: "인증 · 수상 · 선정", href: "/impact#awards" },
      { label: "파트너", href: "/impact#partners" },
      { label: "연혁", href: "/impact#history" },
    ],
  },
  {
    title: "STORY",
    href: "/story",
    links: [
      { label: "맨발걷기 정보", href: "/story?category=맨발걷기 정보" },
      { label: "힐링로드ON", href: "/story?category=힐링로드ON" },
      { label: "NEWS", href: "/story?category=NEWS" },
    ],
  },
  {
    title: "STORE",
    href: "/store",
    links: [{ label: "네이버 스마트스토어", href: SITE.links.store, external: true }],
  },
  {
    title: "CONTACT",
    href: "/contact",
    links: [
      { label: "문의하기", href: "/contact" },
      { label: "개인정보 처리방침", href: "/privacy" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          transparent ? "bg-transparent" : "bg-navy"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 md:px-10">
          <Link href="/" className="flex shrink-0 items-center" aria-label="위드더레이크 홈">
            <Image
              src="/assets/logo/with-the-lake-white.png"
              alt="WITH THE LAKE"
              width={1780}
              height={580}
              priority
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-5">
            <Link
              href="/contact"
              className="t-meta hidden min-h-11 items-center font-bold text-white/90 transition-colors hover:text-white md:inline-flex"
            >
              CONTACT
            </Link>
            <button
              type="button"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-md text-white"
            >
              <div className="flex flex-col gap-[6px]">
                <span className={`h-[2px] w-6 bg-white transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`} />
                <span className={`h-[2px] w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`h-[2px] w-6 bg-white transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        id="site-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-navy text-white transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-5 pb-10 pt-[100px] sm:px-8 md:px-10">
          <nav aria-label="전체 메뉴" className="flex-1 overflow-y-auto">
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
              {MENU.map((group, gi) => (
                <li
                  key={group.title}
                  className={`transition-[opacity,transform] duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + gi * 60}ms` : "0ms" }}
                >
                  <Link href={group.href} className="t-en text-[24px] hover:text-accent" onClick={() => setOpen(false)}>
                    {group.title}
                  </Link>
                  <ul className="mt-5 space-y-3">
                    {group.links.map((l) =>
                      "external" in l && l.external ? (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noreferrer" className="text-[16px] text-white/70 hover:text-white">
                            {l.label}
                          </a>
                        </li>
                      ) : (
                        <li key={l.href}>
                          <Link href={l.href} className="text-[16px] text-white/70 hover:text-white" onClick={() => setOpen(false)}>
                            {l.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[15px] text-white/60 md:flex-row md:items-center md:justify-between">
            <p>
              {SITE.name} · {SITE.contact.phone} · {SITE.contact.email}
            </p>
            <div className="flex gap-5">
              <a href={SITE.links.cafe} target="_blank" rel="noreferrer" className="hover:text-white">힐링로드ON 카페</a>
              <a href={SITE.links.blog} target="_blank" rel="noreferrer" className="hover:text-white">블로그</a>
              <a href={SITE.links.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
              <a href={SITE.links.youtube} target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
