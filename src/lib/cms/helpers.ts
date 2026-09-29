import type { BusinessKey, SiteContent, Story } from "./types";

/** 페이지 공개 여부: SENIO 는 항상 공개, 나머지는 사이트 설정의 publish 값을 따릅니다. */
export function isPublished(site: SiteContent["site"], key: BusinessKey) {
  if (key === "senio") return true;
  return site.publish[key];
}

export function getStory(content: SiteContent, slug: string) {
  return content.story.items.find((s) => s.slug === slug);
}

/** HOME 노출 글: featured 우선, 부족하면 최신 글로 채웁니다. */
export function getFeaturedStories(content: SiteContent, limit = 3): Story[] {
  const featured = content.story.items.filter((s) => s.featured);
  const list = featured.length >= limit ? featured : content.story.items;
  return list.slice(0, limit);
}

/** "줄1\n줄2" 를 <br /> 로 나눠 렌더링할 때 씁니다. */
export function lines(text: string) {
  return text.split(/\r?\n/);
}
