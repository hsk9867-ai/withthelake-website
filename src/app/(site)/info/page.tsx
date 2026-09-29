import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { info } = await getContent();
  return { title: info.meta.title, description: info.meta.description };
}

const TABS = [
  { id: "what", label: "맨발걷기란" },
  { id: "benefits", label: "효과" },
  { id: "method", label: "올바른 방법" },
  { id: "safety", label: "주의사항" },
  { id: "research", label: "연구자료" },
];

/* 카드 색상은 옛 페이지 순서를 그대로 따릅니다 (항목이 늘어나면 순환) */
const BENEFIT_COLORS = [
  { box: "bg-green-100", text: "text-green-600" },
  { box: "bg-purple-100", text: "text-purple-600" },
  { box: "bg-blue-100", text: "text-blue-600" },
  { box: "bg-amber-100", text: "text-amber-600" },
];
const BENEFIT_ICONS = ["🦶", "🧠", "😴", "🛡️"];
const TAG_COLORS = [
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-red-100 text-red-700",
  "bg-blue-100 text-blue-700",
  "bg-amber-100 text-amber-700",
  "bg-orange-100 text-orange-700",
];
const SAFETY_ICONS = ["🩺", "🌡️", "🩹", "⚕️"];

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/** 맨발걷기 정보: 옛 페이지 디자인(초록 포인트 · 중앙 정렬 · 고정 탭)을 그대로 따릅니다. */
export default async function InfoPage() {
  const { info } = await getContent();
  const isExternal = (url: string) => /^https?:/.test(url);

  return (
    <div className="bg-white pt-[72px] text-gray-900">
      {/* HERO */}
      <section className="bg-gradient-to-b from-green-50 to-white py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2.5 text-base font-medium text-green-700">
            <span aria-hidden>🌿</span> {info.header.eyebrow}
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">{info.header.title}</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">{info.header.lead}</p>
        </div>
      </section>

      {/* 고정 탭 */}
      <nav aria-label="페이지 내 이동" className="sticky top-[72px] z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-14 items-center justify-start gap-2 overflow-x-auto sm:justify-center">
            {TABS.map((t, i) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`shrink-0 rounded-full px-5 py-2 text-base font-medium transition-colors ${i === 0 ? "bg-green-600 text-white hover:bg-green-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 맨발걷기란 */}
      <section id="what" className="scroll-mt-32 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-base font-medium text-green-600">{info.what.eyebrow}</p>
            <h2 className="mb-8 text-4xl font-bold md:text-5xl">{info.what.title}</h2>
            <div className="space-y-6 text-xl text-gray-600">
              {info.what.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {info.what.linkUrl && (
              <a href={info.what.linkUrl} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 text-lg font-semibold text-green-600 hover:underline">
                {info.what.linkLabel} <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 효과 */}
      <section id="benefits" className="scroll-mt-32 bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-base font-medium text-green-600">{info.benefits.eyebrow}</p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{info.benefits.title}</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-500">{info.benefits.lead}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {info.benefits.items.map((b, i) => {
              const c = BENEFIT_COLORS[i % BENEFIT_COLORS.length];
              return (
                <div key={`${b.title}-${i}`} className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${c.box} text-3xl`} aria-hidden>
                    {BENEFIT_ICONS[i % BENEFIT_ICONS.length]}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{b.title}</h3>
                  <p className="mb-4 flex-1 text-lg text-gray-600">{b.body}</p>
                  {b.url && (
                    <a href={b.url} target="_blank" rel="noreferrer" className={`mt-auto flex items-center gap-1 text-base font-medium hover:underline ${c.text}`}>
                      {b.source} <ExternalIcon />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 올바른 방법 */}
      <section id="method" className="scroll-mt-32 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-base font-medium text-green-600">{info.method.eyebrow}</p>
            <h2 className="text-4xl font-bold md:text-5xl">{info.method.title}</h2>
          </div>
          <div className="relative mx-auto max-w-4xl">
            <div aria-hidden className="absolute bottom-0 left-8 top-0 hidden w-0.5 bg-green-200 md:block" />
            <ol className="space-y-10">
              {info.method.steps.map((s, i) => (
                <li key={`${s.title}-${i}`} className="relative flex items-start gap-5 md:gap-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-xl font-bold text-white shadow-lg md:h-16 md:w-16 md:text-2xl">{i + 1}</div>
                  <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-3 flex items-center gap-4">
                      <span aria-hidden className="text-3xl">{s.emoji}</span>
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 주의사항 */}
      <section id="safety" className="scroll-mt-32 bg-amber-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2.5 text-base font-medium text-amber-700">
              <span aria-hidden>⚠️</span> {info.safety.eyebrow}
            </div>
            <h2 className="text-4xl font-bold md:text-5xl">{info.safety.title}</h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {info.safety.items.map((s, i) => (
              <div key={`${s.title}-${i}`} className="rounded-xl bg-white p-8 shadow-sm">
                <div className="flex items-start gap-5">
                  <span aria-hidden className="text-3xl">{SAFETY_ICONS[i % SAFETY_ICONS.length]}</span>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                    <p className="text-base text-gray-600">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-base text-gray-500">{info.safety.disclaimer}</p>
        </div>
      </section>

      {/* 연구자료 */}
      <section id="research" className="scroll-mt-32 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-base font-medium text-green-600">{info.research.eyebrow}</p>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{info.research.title}</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-500">{info.research.lead}</p>
          </div>
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {info.research.items.map((r, i) => (
              <a
                key={`${r.title}-${i}`}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${TAG_COLORS[i % TAG_COLORS.length]}`}>{r.tag}</span>
                </div>
                <h3 className="mb-3 min-h-[3.5rem] text-lg font-bold">{r.title}</h3>
                <p className="mb-4 flex-1 text-base text-gray-500">{r.body}</p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-400">{r.source}</span>
                  <span className="text-gray-400"><ExternalIcon /></span>
                </div>
              </a>
            ))}
          </div>
          {info.research.moreUrl && (
            <div className="mt-12 text-center">
              {isExternal(info.research.moreUrl) ? (
                <a href={info.research.moreUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-green-600 px-8 py-3 text-lg font-semibold text-green-600 transition-colors hover:bg-green-600 hover:text-white">
                  {info.research.moreLabel} →
                </a>
              ) : (
                <Link href={info.research.moreUrl} className="inline-flex items-center gap-2 rounded-full border-2 border-green-600 px-8 py-3 text-lg font-semibold text-green-600 transition-colors hover:bg-green-600 hover:text-white">
                  {info.research.moreLabel} →
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">{info.cta.title}</h2>
          <p className="mb-10 text-xl text-green-100 md:text-2xl">{info.cta.body}</p>
          {isExternal(info.cta.buttonUrl) ? (
            <a href={info.cta.buttonUrl} className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-bold text-green-600 shadow-xl transition-colors hover:bg-gray-100 md:px-12 md:py-6 md:text-2xl">
              {info.cta.buttonLabel} →
            </a>
          ) : (
            <Link href={info.cta.buttonUrl} className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-bold text-green-600 shadow-xl transition-colors hover:bg-gray-100 md:px-12 md:py-6 md:text-2xl">
              {info.cta.buttonLabel} →
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
