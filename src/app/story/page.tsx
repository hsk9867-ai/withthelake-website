import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import StoryList from "@/components/story/StoryList";
import { STORIES } from "@/content/stories";

export const metadata: Metadata = {
  title: "STORY — 맨발걷기 정보 · 힐링로드ON · NEWS",
  description: "현장에서 만드는 건강한 변화. 맨발걷기 정보, 힐링로드ON, NEWS를 한 곳에서 만나보세요.",
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Story"
        crumbs={[{ label: "STORY" }]}
        title="현장에서 만드는 건강한 변화"
        lead="맨발걷기 정보, 힐링로드ON 프로그램 소식, 회사 NEWS를 카테고리로 나누어 전합니다."
      />
      <section className="section bg-surface">
        <Container>
          <Suspense fallback={null}>
            <StoryList stories={STORIES} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
