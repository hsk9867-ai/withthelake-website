import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import AudioGuide from "@/components/healing/AudioGuide";
import MoodLog from "@/components/healing/MoodLog";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { healing } = await getContent();
  return { title: healing.meta.title, description: healing.meta.description };
}

export default async function HealingPage() {
  const { healing, site } = await getContent();
  const trails = healing.audio.trailGuides.items;

  return (
    <>
      <PageHeader eyebrow={healing.header.eyebrow} crumbs={[{ label: "힐링로드 ON" }]} title={healing.header.title} lead={healing.header.lead}>
        <div className="flex flex-wrap gap-3">
          <Button href="#audio" variant="primary" size="lg">
            오디오 듣기
          </Button>
          <Button href="/info" variant="secondary" size="lg">
            맨발걷기 정보
          </Button>
        </div>
      </PageHeader>

      {/* 기능 카드 */}
      <section className="section bg-surface pt-0">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {healing.features.map((f, i) => (
              <Reveal key={`${f.title}-${i}`} as="li" delay={i * 80}>
                <a href={`#${f.anchor}`} className="card card-hover block h-full rounded-[20px] border border-line bg-white p-6">
                  <span aria-hidden className="text-[32px]">{f.emoji}</span>
                  <p className="mt-3 text-[18px] font-bold text-ink">{f.title}</p>
                  <p className="mt-1 text-[14px] text-muted">{f.body}</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 오디오 */}
      <section id="audio" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading eyebrow={healing.audio.eyebrow} title={healing.audio.title} lead={healing.audio.lead} />
          <div className="mt-10">
            <AudioGuide audio={healing.audio} />
          </div>
        </Container>
      </section>

      {/* 길 안내 */}
      <section id="trails" className="section scroll-mt-20 bg-surface">
        <Container>
          <SectionHeading eyebrow={healing.trails.eyebrow} title={healing.trails.title} lead={healing.trails.lead} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trails.map((t, i) => (
              <Reveal key={`${t.title}-${i}`} as="li" delay={i * 80} className="rounded-[20px] border border-line bg-white p-6">
                <span aria-hidden className="text-[32px]">{t.emoji}</span>
                <p className="mt-3 text-[17px] font-bold text-ink">{t.title}</p>
                <p className="mt-1 text-[14px] leading-6 text-muted">{t.description}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]">
                  {[
                    ["지역", t.region],
                    ["거리", t.distance],
                    ["소요 시간", t.walkingTime],
                    ["난이도", t.difficulty],
                  ]
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold text-ink">{v}</dd>
                      </div>
                    ))}
                </dl>
                <a href="#audio" className="mt-4 inline-block text-[14px] font-semibold text-primary hover:underline">
                  {t.src ? "안내 음성 듣기 →" : "안내 음성 준비 중"}
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 기록하기 */}
      <section id="record" className="section scroll-mt-20 bg-cream">
        <Container>
          <SectionHeading eyebrow={healing.record.eyebrow} title={healing.record.title} lead={healing.record.lead} />
          <div className="mt-10">
            <MoodLog record={healing.record} />
          </div>
        </Container>
      </section>

      {/* 설문 · 스토어 · 커뮤니티 */}
      <section id="survey" className="section scroll-mt-20 bg-surface">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { emoji: "📋", title: healing.survey.title, body: healing.survey.body, label: healing.survey.buttonLabel, href: healing.survey.url },
              { emoji: "🛒", title: healing.store.title, body: healing.store.body, label: healing.store.buttonLabel, href: site.links.store },
              { emoji: "💬", title: healing.community.title, body: healing.community.body, label: healing.community.buttonLabel, href: site.links.cafe },
            ]
              .filter((c) => c.href)
              .map((c, i) => (
                <Reveal key={`${c.title}-${i}`} delay={i * 80} className="flex flex-col rounded-[20px] border border-line bg-white p-7">
                  <span aria-hidden className="text-[32px]">{c.emoji}</span>
                  <p className="mt-3 text-[19px] font-bold text-ink">{c.title}</p>
                  <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{c.body}</p>
                  <div className="mt-5">
                    <Button href={c.href} variant="secondary" external arrow>
                      {c.label}
                    </Button>
                  </div>
                </Reveal>
              ))}
          </div>
        </Container>
      </section>
    </>
  );
}
