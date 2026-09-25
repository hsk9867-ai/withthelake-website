import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/content/site";
import ScrollTop from "./ScrollTop";

const COLUMNS = [
  {
    title: "회사소개",
    links: [
      { label: "ABOUT", href: "/about" },
      { label: "연혁", href: "/impact#history" },
      { label: "인증 · 수상", href: "/impact#awards" },
      { label: "파트너", href: "/impact#partners" },
    ],
  },
  {
    title: "사업소개",
    links: [
      { label: "SENIO", href: "/senio" },
      { label: "WITH WELL ME", href: "/what-we-do/with-well-me" },
      { label: "COMMUNITY HEALTH", href: "/what-we-do/community-health" },
    ],
  },
  {
    title: "성과",
    links: [
      { label: "주요 프로젝트", href: "/impact#projects" },
      { label: "실증 현황", href: "/impact#pilots" },
      { label: "R&D · 지식재산", href: "/impact#rnd" },
      { label: "사회적 가치", href: "/impact#social" },
    ],
  },
  {
    title: "스토리",
    links: [
      { label: "맨발걷기 정보", href: "/story?category=맨발걷기 정보" },
      { label: "힐링로드ON", href: "/story?category=힐링로드ON" },
      { label: "NEWS", href: "/story?category=NEWS" },
    ],
  },
  {
    title: "고객센터",
    links: [
      { label: "문의하기", href: "/contact" },
      { label: "스토어", href: "/store" },
      { label: "개인정보 처리방침", href: "/privacy" },
    ],
  },
];

const SOCIAL = [
  {
    label: "YouTube",
    href: SITE.links.youtube,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
        <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l6 3.1-6 3.1Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: SITE.links.instagram,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "네이버 블로그",
    href: SITE.links.blog,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M7 9h10M7 12.5h10M7 16h6" />
      </svg>
    ),
  },
  {
    label: "네이버 카페 힐링로드ON",
    href: SITE.links.cafe,
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
        <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M6 4.5c0 1 1 1 1 2M10 4.5c0 1 1 1 1 2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-navy text-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[16px] font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ScrollTop />
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Image src="/assets/logo/with-the-lake-white.png" alt="WITH THE LAKE" width={1780} height={580} className="h-9 w-auto" />
            <ul className="flex items-center gap-5">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-white/85 transition-colors hover:text-accent">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-[14px] leading-6 text-white/55 md:flex-row md:flex-wrap md:items-center md:gap-x-4">
            <p>
              {SITE.name} · ({SITE.contact.postalCode}) {SITE.contact.address}
            </p>
            <p>
              {SITE.contact.team} {SITE.contact.person} · P. {SITE.contact.phone} · M. {SITE.contact.email}
            </p>
            <p className="t-meta md:ml-auto">&copy; {new Date().getFullYear()} WITH THE LAKE Co., Ltd.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
