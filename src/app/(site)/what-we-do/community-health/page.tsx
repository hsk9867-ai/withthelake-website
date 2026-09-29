import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import StoryCard from "@/components/story/StoryCard";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { communityHealth, site } = await getContent();
  return {
    title: communityHealth.meta.title,
    description: communityHealth.meta.description,
    robots: site.publish.communityHealth ? undefined : { index: false, follow: false },
  };
}

export default async function CommunityHealthPage() {
  const content = await getContent();
  const { communityHealth: ch, site, impact } = content;
  if (!site.publish.communityHealth) notFound();
  const healingStories = content.story.items.filter((s) => s.category === "힐링로드ON").slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={ch.header.eyebrow}
        crumbs={[{ label: "WHAT WE DO", href: "/what-we-do" }, { label: "COMMUNITY HEALTH" }]}
        title={ch.header.title}
        lead={ch.header.lead}
        image={ch.header.image}
        imageAlt={ch.header.imageAlt}
      >
        <Button href="/contact?type=program" variant="primary" arrow>
          {ch.header.ctaLabel}
        </Button>
      </PageHeader>

      {/* 프로그램 소개 */}
      <section className="section bg-surface">
        <Container>
          <SectionHeading eyebrow={ch.programs.eyebrow} title={ch.programs.title} lead={ch.programs.lead} />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {ch.programs.items.map((p, i) => (
              <Reveal as="li" key={`${p.name}-${i}`} delay={i * 80} className="bg-white p-7 transition-colors hover:bg-primary-light">
                <p className="t-meta text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <p className="t-h3 mt-6 text-ink">{p.name}</p>
                <p className="t-body mt-3 text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 힐링로드ON */}
      <section className="section bg-cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading eyebrow={ch.healingRoad.eyebrow} title={ch.healingRoad.title} lead={ch.healingRoad.lead} />
              <div className="mt-8 rounded-[20px] bg-white p-6">
                <p className="eyebrow text-accent-deep">{impact.leaderTraining.title}</p>
                <p className="t-body mt-3 text-ink-2">{impact.leaderTraining.body}</p>
              </div>
              <div className="mt-4 rounded-[20px] bg-white p-6">
                <p className="eyebrow text-accent-deep">{ch.healingRoad.walkTitle}</p>
                <p className="t-body mt-3 text-ink-2">{ch.healingRoad.walkBody}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {site.links.menbalooIos && (
                    <Button href={site.links.menbalooIos} variant="secondary" size="sm" external>
                      App Store
                    </Button>
                  )}
                  {site.links.menbalooAndroid && (
                    <Button href={site.links.menbalooAndroid} variant="secondary" size="sm" external>
                      Google Play
                    </Button>
                  )}
                  {site.links.cafe && (
                    <Button href={site.links.cafe} variant="secondary" size="sm" external>
                      네이버 카페 힐링로드ON
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Reveal delay={100} className="grid grid-cols-2 gap-3">
              {ch.healingRoad.photos.map((src, i) => (
                <div key={`${src}-${i}`} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image src={src} alt="맨발걷기 프로그램 현장" fill sizes="(min-width:1024px) 320px, 50vw" className="object-cover" />
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 운영 사례 */}
      <section className="section bg-surface">
        <Container>
          <SectionHeading eyebrow={ch.cases.eyebrow} title={ch.cases.title} lead={ch.cases.lead} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impact.partners.map((p, i) => (
              <Reveal as="li" key={`${p.src}-${i}`} delay={i * 80} className="card flex items-center gap-4 p-4">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-ink">{p.name}</p>
                  <p className="text-[14px] text-muted">{p.kind}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          {healingStories.length > 0 && (
            <div className="mt-14">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow text-accent-deep">{ch.cases.storiesTitle}</p>
                <Link href="/story?category=힐링로드ON" className="t-meta font-semibold text-primary hover:underline">
                  {ch.cases.moreLabel}
                </Link>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {healingStories.map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-accent-light">
        <Container className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <h2 className="t-h2 text-ink">{ch.cta.title}</h2>
          <p className="t-body max-w-xl text-muted">{ch.cta.body}</p>
          <Button href="/contact?type=program" variant="primary" size="lg" arrow>
            {ch.cta.label}
          </Button>
        </Container>
      </section>
    </>
  );
}
