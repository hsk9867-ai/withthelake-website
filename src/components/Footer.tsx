import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { SITE } from "@/content/site";
import { IconMail, IconPhone } from "./Icons";

const COLUMNS = [
  {
    title: "COMPANY",
    links: [
      { label: "ABOUT", href: "/about" },
      { label: "IMPACT", href: "/impact" },
      { label: "STORY", href: "/story" },
    ],
  },
  {
    title: "WHAT WE DO",
    links: [
      { label: "SENIO", href: "/senio" },
      { label: "WITH WELL ME", href: "/what-we-do/with-well-me" },
      { label: "COMMUNITY HEALTH", href: "/what-we-do/community-health" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "CONTACT US", href: "/contact" },
      { label: "STORE", href: "/store" },
      { label: "개인정보 처리방침", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Image
              src="/assets/logo/with-the-lake-white.png"
              alt="WITH THE LAKE"
              width={1780}
              height={580}
              className="h-12 w-auto"
            />
            <p className="t-body mt-6 max-w-sm text-white/70">
              데이터와 건강행동을 연결해 시니어의 건강한 자립생활이 더 오래 지속되도록 돕는
              지역사회 기반 예방건강관리 기업
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a href={`tel:${SITE.contact.phone}`} className="inline-flex items-center gap-3 text-white/85 hover:text-white">
                <IconPhone className="text-accent" />
                <span className="t-meta">{SITE.contact.phone}</span>
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="inline-flex items-center gap-3 text-white/85 hover:text-white">
                <IconMail className="text-accent" />
                <span className="t-meta">{SITE.contact.email}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-accent">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[16px] text-white/80 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-[14px] leading-6 text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            {SITE.name} · {SITE.contact.team} {SITE.contact.person} · P. {SITE.contact.phone} · M. {SITE.contact.email}
          </p>
          <p className="t-meta">&copy; {new Date().getFullYear()} WITH THE LAKE Co., Ltd.</p>
        </div>
      </Container>
    </footer>
  );
}
