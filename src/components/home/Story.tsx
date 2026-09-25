import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";
import { getFeaturedStories } from "@/content/stories";

/**
 * 레퍼런스 Media Center 카드: 이미지 · 제목 · "카테고리 | 날짜" · Read More 버튼.
 */
export default function Story() {
  const stories = getFeaturedStories(3);

  return (
    <section className="section border-t border-line bg-surface">
      <Container size="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="t-en text-ink">Story</h2>
            <p className="t-lead mt-3 text-muted">현장에서 만드는 건강한 변화</p>
          </div>
          <Link href="/story" className="t-meta inline-flex items-center gap-2 font-bold text-primary hover:underline">
            STORY 전체 보기 <IconArrow size={16} />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100}>
              <article className="group flex h-full flex-col">
                <Link href={`/story/${s.slug}`} className="relative block aspect-[4/3] overflow-hidden rounded-[10px]">
                  <Image src={s.image} alt="" fill sizes="(min-width:768px) 420px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </Link>
                <h3 className="t-h3 mt-6 text-ink">
                  <Link href={`/story/${s.slug}`} className="hover:text-primary">{s.title}</Link>
                </h3>
                <p className="t-body mt-3 line-clamp-2 text-muted">{s.excerpt}</p>
                <p className="t-meta mt-5 flex items-center gap-3 text-muted">
                  <span>{s.category}</span>
                  <span aria-hidden className="h-3 w-px bg-line-strong" />
                  <time dateTime={s.date.replaceAll(".", "-")}>{s.date}</time>
                </p>
                <Link
                  href={`/story/${s.slug}`}
                  className="t-meta mt-4 inline-flex min-h-10 w-fit items-center gap-3 rounded-md bg-primary px-4 text-[13px] font-bold text-white transition-colors hover:bg-primary-dark"
                >
                  Read More <IconArrow size={14} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
