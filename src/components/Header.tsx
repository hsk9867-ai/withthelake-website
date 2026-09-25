"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { NAV, SITE } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 경로가 바뀌면 열린 메뉴를 닫는다 (렌더 중 상태 조정 패턴)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setOpenSub(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleNav = NAV.map((item) => {
    if (!("children" in item)) return item;
    return {
      ...item,
      children: item.children.filter((c) => {
        if (c.href === "/what-we-do/with-well-me") return SITE.publish.withWellMe;
        if (c.href === "/what-we-do/community-health") return SITE.publish.communityHealth;
        return true;
      }),
    };
  });

  const senioActive = pathname.startsWith("/senio");

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-[box-shadow,border-color] ${
        scrolled ? "border-line shadow-[0_8px_30px_-20px_rgba(23,22,28,0.35)]" : "border-transparent"
      }`}
    >
      <Container size="wide" className="flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="위드더레이크 홈">
          <Image
            src="/assets/logo/with-the-lake.png"
            alt="WITH THE LAKE"
            width={178}
            height={58}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 lg:flex">
          {visibleNav.map((item) => {
            const active =
              isActive(pathname, item.href) || (item.href === "/what-we-do" && senioActive);
            const hasChildren = "children" in item && item.children.length > 0;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  if (hasChildren) setOpenSub(item.href);
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setOpenSub(null), 120);
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? openSub === item.href : undefined}
                  onFocus={() => hasChildren && setOpenSub(item.href)}
                  className={`t-meta relative inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 font-semibold transition-colors ${
                    active ? "text-primary" : "text-ink hover:text-primary"
                  }`}
                >
                  {item.label}
                  {hasChildren && (
                    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-primary transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>

                {hasChildren && (
                  <div
                    role="menu"
                    className={`absolute left-0 top-full pt-2 transition-[opacity,transform] duration-150 ${
                      openSub === item.href
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenSub(null);
                    }}
                  >
                    <div className="w-[300px] rounded-2xl border border-line bg-white p-2 shadow-[0_24px_50px_-24px_rgba(23,22,28,0.35)]">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          className={`flex items-baseline justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-primary-light ${
                            isActive(pathname, c.href) ? "bg-primary-light" : ""
                          }`}
                        >
                          <span className="t-meta font-semibold text-ink">{c.label}</span>
                          <span className="text-[14px] text-muted">{c.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="t-meta inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            CONTACT US
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
        >
          <div className="flex flex-col gap-[5px]">
            <span className={`h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </div>
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col py-3">
            {visibleNav.map((item) => {
              const hasChildren = "children" in item && item.children.length > 0;
              return (
                <div key={item.href} className="border-b border-line/70 last:border-0">
                  <Link
                    href={item.href}
                    className={`t-meta flex min-h-14 items-center px-2 text-[16px] font-semibold ${
                      isActive(pathname, item.href) ? "text-primary" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <div className="mb-2 flex flex-col">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-[16px] ${
                            isActive(pathname, c.href) ? "bg-primary-light text-primary" : "text-ink-2"
                          }`}
                        >
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {c.label}
                          <span className="ml-auto text-[14px] text-muted">{c.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-[16px] font-semibold text-white"
            >
              CONTACT US
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
