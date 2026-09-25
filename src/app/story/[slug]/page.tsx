import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Button from "@/components/Button";
import StoryCard from "@/components/story/StoryCard";
import { IconArrow } from "@/components/Icons";
import { STORIES, getStory } from "@/content/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/story/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: { title: story.title, description: story.excerpt, images: [{ url: story.image }] },
  };
}

export default async function StoryDetailPage({ params }: PageProps<"/story/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const idx = STORIES.findIndex((s) => s.slug === slug);
  const prev = STORIES[idx - 1];
  const next = STORIES[idx + 1];
  const related = STORIES.filter((s) => s.slug !== slug && s.category === story.category).slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-cream">
        <Container size="narrow" className="py-14 md:py-20">
          <nav aria-label="breadcrumb" className="t-meta flex flex-wrap items-center gap-2 text-muted">
            <Link href="/" className="hover:text-primary">HOME</Link>
            <span aria-hidden>/</span>
            <Link href="/story" className="hover:text-primary">STORY</Link>
            <span aria-hidden>/</span>
            <Link href={`/story?category=${encodeURIComponent(story.category)}`} className="text-ink hover:text-primary">
              {story.category}
            </Link>
          </nav>
          <h1 className="t-h1 mt-8 text-ink">{story.title}</h1>
          <p className="t-meta mt-5 flex items-center gap-3 text-muted">
            <span className="font-semibold text-accent-deep">{story.category}</span>
            <span aria-hidden className="text-line-strong">·</span>
            <time dateTime={story.date.replaceAll(".", "-")}>{story.date}</time>
          </p>
        </Container>
      </section>

      <article className="section bg-surface">
        <Container size="narrow">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px]">
            <Image src={story.image} alt="" fill priority sizes="(min-width:820px) 820px, 100vw" className="object-cover" />
          </div>
          <div className="mx-auto mt-12 max-w-[68ch] space-y-6">
            <p className="t-lead font-medium text-ink">{story.excerpt}</p>
            {story.body.map((p, i) => (
              <p key={i} className="t-body-lg text-ink-2">
                {p}
              </p>
            ))}
          </div>

          <nav aria-label="이전/다음 글" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/story/${prev.slug}`} className="group rounded-2xl border border-line p-5 transition-colors hover:border-primary">
                <p className="t-meta text-muted">이전 글</p>
                <p className="mt-1 text-[16px] font-semibold text-ink group-hover:text-primary">{prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/story/${next.slug}`} className="group rounded-2xl border border-line p-5 text-right transition-colors hover:border-primary">
                <p className="t-meta text-muted">다음 글</p>
                <p className="mt-1 text-[16px] font-semibold text-ink group-hover:text-primary">{next.title}</p>
              </Link>
            )}
          </nav>

          <div className="mt-8 flex justify-center">
            <Button href="/story" variant="secondary">
              <IconArrow size={16} className="rotate-180" /> 목록으로
            </Button>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="section bg-cream">
          <Container>
            <p className="eyebrow text-accent-deep">같은 카테고리의 글</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
