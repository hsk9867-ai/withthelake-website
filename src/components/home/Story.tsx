import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const STORIES = [
  {
    category: "COMMUNITY HEALTH",
    title: "춘천 희망요양원과 함께한 건강동행리더 양성과정",
    date: "2026.08",
    image: "/assets/activities/training-1.jpg",
  },
  {
    category: "SENIO",
    title: "SENIO 핵심 알고리즘 특허 출원 완료",
    date: "2026.08",
    image: "/assets/senio/device-styled.jpg",
  },
  {
    category: "PARTNERSHIP",
    title: "춘천미래동행재단과 지역사회 예방건강관리 MOU 체결",
    date: "2026.07",
    image: "/assets/partners/mou-chuncheon-future.jpg",
  },
];

export default function Story() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-[26px] font-extrabold leading-snug tracking-tight text-ink md:text-[34px]">
              현장에서 만드는 건강한 변화
            </h2>
            <Button href="/story" variant="secondary">
              STORY 전체 보기
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STORIES.map((story, i) => (
            <Reveal key={story.title} delay={i * 110}>
              <Link
                href="/story"
                className="group block rounded-2xl border border-line bg-white p-7 transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="mt-5 text-[12px] font-semibold tracking-wide text-accent-dark">
                  {story.category} · {story.date}
                </p>
                <h3 className="mt-2 text-[16px] font-bold leading-7 text-ink group-hover:text-primary">
                  {story.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
