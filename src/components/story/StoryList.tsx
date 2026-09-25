"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StoryCard from "./StoryCard";
import Reveal from "@/components/Reveal";
import { STORY_CATEGORIES, type Story, type StoryCategory } from "@/content/stories";

const ALL = "전체";

export default function StoryList({ stories }: { stories: Story[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const raw = params.get("category");
  const active: StoryCategory | typeof ALL =
    raw && (STORY_CATEGORIES as string[]).includes(raw) ? (raw as StoryCategory) : ALL;

  const filtered = useMemo(
    () => (active === ALL ? stories : stories.filter((s) => s.category === active)),
    [stories, active],
  );

  function select(cat: string) {
    const next = new URLSearchParams(params.toString());
    if (cat === ALL) next.delete("category");
    else next.set("category", cat);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const counts = useMemo(() => {
    const m: Record<string, number> = { [ALL]: stories.length };
    for (const s of stories) m[s.category] = (m[s.category] ?? 0) + 1;
    return m;
  }, [stories]);

  return (
    <>
      <div role="tablist" aria-label="카테고리" className="flex flex-wrap gap-2">
        {[ALL, ...STORY_CATEGORIES].map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => select(c)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${
                on ? "bg-primary text-white" : "border border-line bg-white text-ink-2 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
              <span className={`t-meta text-[12px] ${on ? "text-white/70" : "text-muted"}`}>{counts[c] ?? 0}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="t-body mt-12 text-muted">해당 카테고리의 게시물이 아직 없습니다.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <StoryCard story={s} headingLevel="h2" />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
