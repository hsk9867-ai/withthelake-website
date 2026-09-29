import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import StoryList from "@/components/story/StoryList";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { story } = await getContent();
  return { title: story.meta.title, description: story.meta.description };
}

export default async function StoryPage() {
  const { story } = await getContent();
  return (
    <>
      <PageHeader eyebrow={story.header.eyebrow} crumbs={[{ label: "STORY" }]} title={story.header.title} lead={story.header.lead} />
      <section className="section bg-surface">
        <Container>
          <Suspense fallback={null}>
            <StoryList stories={story.items} categories={story.categories} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
