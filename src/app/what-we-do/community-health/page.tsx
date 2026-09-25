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
import { SITE } from "@/content/site";
import { LEADER_TRAINING, PARTNERS } from "@/content/impact";
import { STORIES } from "@/content/stories";

export const metadata: Metadata = {
  title: "COMMUNITY HEALTH — 지역사회 예방건강관리 프로그램",
  description: "지자체·복지기관·기업과 함께 걷기, 운동, 노쇠 예방, 생활습관, 마음건강 프로그램을 운영합니다.",
  robots: SITE.publish.communityHealth ? undefined : { index: false, follow: false },
};

const PROGRAMS = [
  { name: "걷기", body: "맨발걷기를 중심으로 한 지역 걷기 프로그램. 힐링로드ON에서 시작했습니다." },
  { name: "운동", body: "시니어의 체력과 균형을 유지하는 생활 운동 프로그램." },
  { name: "노쇠 예방", body: "근력·영양·활동량을 함께 관리해 노쇠를 늦추는 프로그램." },
  { name: "생활습관", body: "식사·수면·활동 기록으로 습관의 변화를 확인하는 프로그램." },
  { name: "마음건강", body: "함께 걷고 대화하며 외로움과 스트레스를 줄이는 프로그램." },
];

const HEALING_ROAD_PHOTOS = [
  "/assets/activities/barefoot-1.jpg",
  "/assets/activities/barefoot-6.jpg",
  "/assets/activities/barefoot-7.jpg",
  "/assets/activities/barefoot-4.jpg",
];

export default function CommunityHealthPage() {
  if (!SITE.publish.communityHealth) notFound();
  const healingStories = STORIES.filter((s) => s.category === "힐링로드ON").slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Community Health · Program"
        crumbs={[{ label: "WHAT WE DO", href: "/what-we-do" }, { label: "COMMUNITY HEALTH" }]}
        title="현장에서 함께 만드는 예방건강관리"
        lead="지자체·복지기관·기업과 함께 걷기, 운동, 노쇠 예방, 생활습관, 마음건강 프로그램을 운영합니다. 프로그램에서 쌓인 기록은 SENIO와 연결되어 변화를 확인하는 근거가 됩니다."
        image="/assets/activities/barefoot-2.jpg"
        imageAlt="지역 주민과 함께하는 맨발걷기 프로그램"
      >
        <Button href="/contact?type=program" variant="primary" arrow>
          프로그램 문의
        </Button>
      </PageHeader>

      {/* 프로그램 소개 */}
      <section className="section bg-surface">
        <Container>
          <SectionHeading eyebrow="Programs" title="프로그램 소개" lead="기관의 목적과 이용자 특성에 맞춰 다섯 가지 주제를 조합해 운영합니다." />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {PROGRAMS.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 80} className="bg-white p-7 transition-colors hover:bg-primary-light">
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
              <SectionHeading
                eyebrow="힐링로드ON"
                title="맨발로 함께 걷는 지역 건강걷기 프로그램"
                lead="위드더레이크의 시작점입니다. 지역 주민이 함께 흙길을 걷고, 지도자 양성과정을 거친 건강리더가 프로그램을 이끕니다."
              />
              <div className="mt-8 rounded-[20px] bg-white p-6">
                <p className="eyebrow text-accent-deep">{LEADER_TRAINING.title}</p>
                <p className="t-body mt-3 text-ink-2">{LEADER_TRAINING.body}</p>
              </div>
              <div className="mt-4 rounded-[20px] bg-white p-6">
                <p className="eyebrow text-accent-deep">함께 걷기</p>
                <p className="t-body mt-3 text-ink-2">
                  맨발걷기 앱 &lsquo;맨발루&rsquo;로 걷기 기록을 남기고, 네이버 카페 힐링로드ON에서 지역 걷기 모임 소식을 확인하세요.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Button href={SITE.links.menbalooIos} variant="secondary" size="sm" external>
                    App Store
                  </Button>
                  <Button href={SITE.links.menbalooAndroid} variant="secondary" size="sm" external>
                    Google Play
                  </Button>
                  <Button href={SITE.links.cafe} variant="secondary" size="sm" external>
                    네이버 카페 힐링로드ON
                  </Button>
                </div>
              </div>
            </div>
            <Reveal delay={100} className="grid grid-cols-2 gap-3">
              {HEALING_ROAD_PHOTOS.map((src, i) => (
                <div key={src} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
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
          <SectionHeading
            eyebrow="Cases"
            title="운영 사례"
            lead="업무협약을 맺은 기관과 함께 프로그램을 운영하고 있습니다. 상세 사례는 확정되는 대로 추가됩니다."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p, i) => (
              <Reveal as="li" key={p.src} delay={i * 80} className="card flex items-center gap-4 p-4">
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
                <p className="eyebrow text-accent-deep">힐링로드ON 이야기</p>
                <Link href="/story?category=힐링로드ON" className="t-meta font-semibold text-primary hover:underline">
                  더 보기
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
          <h2 className="t-h2 text-ink">프로그램 도입과 운영을 상담해 드립니다</h2>
          <p className="t-body max-w-xl text-muted">기관 유형, 이용자 규모, 운영 기간에 맞춰 프로그램을 구성합니다.</p>
          <Button href="/contact?type=program" variant="primary" size="lg" arrow>
            프로그램 문의
          </Button>
        </Container>
      </section>
    </>
  );
}
