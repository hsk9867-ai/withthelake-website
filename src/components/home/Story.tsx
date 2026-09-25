import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StoryCard from "@/components/story/StoryCard";
import { getFeaturedStories } from "@/content/stories";

export default function Story() {
  const stories = getFeaturedStories(3);

  return (
    <section className="section bg-cream">
      <Container>
        <SectionHeading
          index="08"
          eyebrow="Story"
          title="현장에서 만드는 건강한 변화"
          action={
            <Button href="/story" variant="secondary" arrow>
              STORY 전체 보기
            </Button>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <Reveal key={story.slug} delay={i * 110}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
