"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({ items }: { items: { key: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <nav aria-label="관리 메뉴" className="sticky top-20 space-y-1">
        <Link
          href="/admin"
          className={`block rounded-md px-3 py-2 text-[14px] font-semibold ${pathname === "/admin" ? "bg-primary text-white" : "text-ink-2 hover:bg-white"}`}
        >
          대시보드
        </Link>
        <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wider text-muted">콘텐츠</p>
        {items.map((it) => {
          const href = `/admin/${it.key}`;
          const on = pathname === href;
          return (
            <Link key={it.key} href={href} className={`block rounded-md px-3 py-2 text-[14px] font-semibold ${on ? "bg-primary text-white" : "text-ink-2 hover:bg-white"}`}>
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
