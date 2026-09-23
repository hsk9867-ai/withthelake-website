"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Container from "./Container";

const NAV = [
  { label: "ABOUT", href: "/about" },
  { label: "WHAT WE DO", href: "/what-we-do" },
  { label: "IMPACT", href: "/impact" },
  { label: "STORY", href: "/story" },
  { label: "STORE", href: "/store" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo/with-the-lake.png"
            alt="위드더레이크"
            width={178}
            height={58}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-dark"
          >
            CONTACT US
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
        >
          <span className="sr-only">메뉴</span>
          <div className="flex flex-col gap-[5px]">
            <span
              className={`h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-[2px] w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="min-h-12 rounded-lg px-3 py-3 text-[16px] font-medium text-ink hover:bg-primary-light"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-semibold text-white"
            >
              CONTACT US
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
