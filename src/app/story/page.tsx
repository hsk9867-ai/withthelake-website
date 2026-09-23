import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "STORY",
  description: "맨발걷기 정보, 힐링로드ON, NEWS를 한 곳에서 만나보세요.",
};

const CATEGORIES = ["전체", "맨발걷기 정보", "힐링로드ON", "NEWS"];

const POSTS = [
  { image: "/assets/activities/barefoot-1.jpg", category: "맨발걷기 정보", title: "맨발걷기, 지역사회와 함께 걷는 이유" },
  { image: "/assets/activities/training-1.jpg", category: "힐링로드ON", title: "2024 맨발걷기 지도자 양성과정 현장" },
  { image: "/assets/activities/barefoot-3.jpg", category: "맨발걷기 정보", title: "일상 속 걷기 습관 만들기" },
  { image: "/assets/activities/wellness-lecture.jpg", category: "NEWS", title: "웰니스 특강, 건강한 습관을 나누다" },
  { image: "/assets/activities/barefoot-5.jpg", category: "맨발걷기 정보", title: "걷기와 생활데이터가 만나는 지점" },
  { image: "/assets/activities/governance-meeting.jpg", category: "NEWS", title: "시니어돌봄거버넌스 협의체 회의 참여" },
];

export default function StoryPage() {
  return (
    <>
      <section className="bg-primary py-20 text-white md:py-24">
        <Container>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
            STORY
          </p>
          <h1 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
            현장에서 만드는 건강한 변화
          </h1>
        </Container>
      </section>

      <section className="bg-surface py-20 md:py-24">
        <Container>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-4 py-2 text-[13.5px] font-semibold ${
                  i === 0
                    ? "bg-primary text-white"
                    : "border border-line text-muted"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, i) => (
              <Reveal key={post.title} delay={(i % 3) * 100}>
                <article className="group overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[12px] font-semibold text-accent-dark">{post.category}</p>
                    <h2 className="mt-2 text-[15.5px] font-bold leading-6 text-ink">{post.title}</h2>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-[13.5px] leading-6 text-muted">
            맨발걷기 정보, 힐링로드ON, NEWS 게시물이 이 페이지로 이관될
            예정입니다. 관리자에서 게시물 작성·수정과 홈 노출 글 지정이
            가능하도록 구성됩니다.
          </p>
        </Container>
      </section>
    </>
  );
}
