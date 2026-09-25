import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/content/stories";

export default function StoryCard({ story, headingLevel = "h3" }: { story: Story; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card card-hover group h-full overflow-hidden">
      <Link href={`/story/${story.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={story.image}
            alt=""
            fill
            sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="t-meta flex items-center gap-2 text-accent-deep">
            <span className="font-semibold">{story.category}</span>
            <span aria-hidden className="text-line-strong">·</span>
            <time dateTime={story.date.replaceAll(".", "-")} className="text-muted">
              {story.date}
            </time>
          </p>
          <Heading className="t-h3 mt-3 text-ink transition-colors group-hover:text-primary">
            {story.title}
          </Heading>
          <p className="t-body mt-3 line-clamp-2 text-muted">{story.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
