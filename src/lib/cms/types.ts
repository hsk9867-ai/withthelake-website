/**
 * 관리자에서 편집하는 사이트 콘텐츠의 타입.
 * 실제 값은 `content/site-content.json` 에 저장되고, 없는 키는 `defaults.ts` 로 채워집니다.
 */

export type Link = { label: string; href: string };
export type Stat = { value: string; label: string };
export type Meta = { title: string; description: string };
export type PageHeaderContent = { eyebrow: string; title: string; lead: string; image?: string; imageAlt?: string };

/** 아이콘은 이름으로 저장하고 렌더 시 `Icons.tsx` 에서 찾습니다. */
export type IconName =
  | "measure" | "understand" | "walk" | "continue" | "trend" | "loop"
  | "glucose" | "liver" | "kidney" | "strip" | "device" | "dashboard"
  | "building" | "care" | "badge" | "home";

export type BusinessKey = "senio" | "withWellMe" | "communityHealth";

export type SiteSettings = {
  name: string;
  nameEn: string;
  description: string;
  tagline: string;
  contact: { team: string; person: string; phone: string; email: string; address: string; postalCode: string };
  links: {
    store: string;
    appIos: string;
    appAndroid: string;
    menbalooIos: string;
    menbalooAndroid: string;
    cafe: string;
    blog: string;
    instagram: string;
    youtube: string;
  };
  heroVideo: string;
  heroPoster: string;
  publish: { withWellMe: boolean; communityHealth: boolean };
};

export type HomeContent = {
  intro: { slogan: string; headline: string; lead: string; primaryCta: Link; secondaryCta: Link };
  beginning: {
    eyebrow: string;
    headline: string;
    lead: string;
    image: string;
    imageAlt: string;
    steps: { no: string; title: string; body: string }[];
  };
  problem: {
    bannerImage: string;
    bannerAlt: string;
    bannerEn: string;
    bannerKo: string;
    title: string;
    cards: { title: string; body: string }[];
    quote: string;
  };
  howWeWork: {
    eyebrow: string;
    title: string;
    lead: string;
    centerLabel: string;
    centerText: string;
    steps: { n: string; title: string; en: string; icon: IconName; body: string }[];
  };
  whatWeDo: {
    panelTitle: string;
    title: string;
    lead: string;
    businesses: {
      key: BusinessKey;
      name: string;
      kind: string;
      tag: string;
      body: string;
      pills: string[];
      image: string;
      imageAlt: string;
      href: string;
      actions: { label: string; href: string; variant: "primary" | "secondary"; external?: boolean }[];
    }[];
  };
  senio: {
    eyebrow: string;
    sub: string;
    title: string;
    body: string;
    stats: Stat[];
    image: string;
    imageAlt: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
  partners: { title: string; lead: string; ctaLabel: string };
  story: { title: string; lead: string; moreLabel: string };
  forOrganizations: {
    title: string;
    statement: string;
    lead: string;
    cardEyebrow: string;
    cardTitle: string;
    targets: { icon: IconName; audience: string; headline: string; body: string }[];
    ctaTitle: string;
    ctaBody: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
};

export type AboutContent = {
  meta: Meta;
  header: PageHeaderContent;
  perception: { eyebrow: string; title: string; leadBefore: string; leadHighlight: string; leadAfter: string };
  message: { eyebrow: string; title: string; body: string; steps: string[] };
  identity: { eyebrow: string; lead: string; axes: { key: string; ko: string; body: string; image: string; alt: string }[] };
  businesses: { eyebrow: string; title: string; items: { key: BusinessKey; name: string; kind: string; desc: string; href: string }[] };
  info: { certsEyebrow: string; infoEyebrow: string; ctaLabel: string };
};

export type WhatWeDoContent = { meta: Meta; header: PageHeaderContent };

export type WithWellMeContent = {
  meta: Meta;
  header: PageHeaderContent & { logo: string };
  axes: { eyebrow: string; title: string; lead: string; items: { name: string; ko: string; desc: string }[] };
  products: { eyebrow: string; title: string; lead: string; note: string; ctaLabel: string };
};

export type CommunityHealthContent = {
  meta: Meta;
  header: PageHeaderContent & { ctaLabel: string };
  programs: { eyebrow: string; title: string; lead: string; items: { name: string; body: string }[] };
  healingRoad: { eyebrow: string; title: string; lead: string; walkTitle: string; walkBody: string; photos: string[] };
  cases: { eyebrow: string; title: string; lead: string; storiesTitle: string; moreLabel: string };
  cta: { title: string; body: string; label: string };
};

export type SenioContent = {
  meta: Meta;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    primaryCta: Link;
    secondaryCta: Link;
    stats: Stat[];
    image: string;
    imageAlt: string;
  };
  flow: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { n: string; icon: IconName; title: string; body: string }[];
    levelsLabel: string;
    levels: string[];
    image: string;
    imageAlt: string;
  };
  products: {
    eyebrow: string;
    title: string;
    strip: { eyebrow: string; title: string; body: string; indicators: { group: string; icon: IconName; items: string[] }[] };
    lens: { eyebrow: string; title: string; body: string; image: string };
    care: { eyebrow: string; title: string; body: string; image: string; pills: string[] };
  };
  rnd: {
    eyebrow: string;
    title: string;
    rndEyebrow: string;
    ipEyebrow: string;
    verifyEyebrow: string;
    verifyBody: string;
    roadmapEyebrow: string;
    roadmapNote: string;
    pilotEyebrow: string;
    noticeEyebrow: string;
    noticeBody: string;
  };
  orgs: { eyebrow: string; title: string; rows: { icon: IconName; target: string; usage: string }[]; note: string };
  cta: {
    eyebrow: string;
    title: string;
    org: { eyebrow: string; title: string; body: string; ctaLabel: string };
    personal: { eyebrow: string; title: string; screens: string[]; ctaLabel: string; note: string };
  };
};

export type ImpactContent = {
  meta: Meta;
  header: PageHeaderContent;
  kpis: { value: string; label: string; note: string }[];
  partners: { src: string; name: string; kind: string }[];
  projects: { src: string; title: string; body: string }[];
  leaderTraining: { title: string; body: string; photos: string[] };
  pilots: { year: number; target: number; confirmed: string[] };
  rnd: { headline: string; summary: string; body: string; programs: string[] };
  ip: { label: string; value: string; detail: string }[];
  ipNote: string;
  certs: { name: string; short: string }[];
  awards: string[];
  programs: string[];
  socialValue: { title: string; body: string }[];
  history: { year: string; items: { month: string; text: string }[] }[];
  roadmap: { period: string; title: string; body: string }[];
  sections: {
    projects: { title: string; lead: string };
    pilots: { title: string; lead: string };
    rnd: { title: string };
    awards: { title: string };
    social: { title: string; lead: string };
    partners: { title: string; lead: string };
    history: { title: string; lead: string };
  };
};

export type Story = {
  slug: string;
  category: string;
  title: string;
  date: string; // YYYY.MM.DD
  image: string;
  excerpt: string;
  body: string[];
  featured?: boolean;
};

export type StoryContent = {
  meta: Meta;
  header: PageHeaderContent;
  categories: string[];
  items: Story[];
};

export type Product = {
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  badge?: string;
  image: string;
  url: string;
  axis: string;
};

export type StoreContent = {
  meta: Meta;
  header: PageHeaderContent & { ctaLabel: string; brandCtaLabel: string };
  categories: string[];
  products: Product[];
  brand: { logo: string; lead: string; body: string; ctaLabel: string; image: string; imageAlt: string };
};

export type ContactContent = {
  meta: Meta;
  header: PageHeaderContent;
  types: { label: string; desc: string }[];
  directLabel: string;
  form: { inquiryTypes: string[]; placeholder: string; successTitle: string; successBody: string };
};

export type PrivacyContent = {
  meta: Meta;
  header: PageHeaderContent;
  sections: { title: string; body: string[] }[];
};

/** /info — 맨발걷기 정보 페이지 */
export type InfoContent = {
  meta: Meta;
  header: PageHeaderContent;
  what: { eyebrow: string; title: string; body: string[]; linkLabel: string; linkUrl: string };
  benefits: { eyebrow: string; title: string; lead: string; items: { title: string; body: string; source: string; url: string }[] };
  method: { eyebrow: string; title: string; steps: { emoji: string; title: string; body: string }[] };
  safety: { eyebrow: string; title: string; items: { title: string; body: string }[]; disclaimer: string };
  research: { eyebrow: string; title: string; lead: string; items: { tag: string; title: string; body: string; source: string; url: string }[]; moreLabel: string; moreUrl: string };
  cta: { title: string; body: string; buttonLabel: string; buttonUrl: string };
};

/** 힐링로드 ON 오디오 항목. src 는 관리자에서 올린 파일 주소(비어 있으면 '준비 중'으로 표시) */
export type HealingAudioItem = { title: string; description: string; emoji: string; src: string };
export type HealingTrailItem = HealingAudioItem & { region: string; distance: string; walkingTime: string; difficulty: string };

/** /healing — 힐링로드 ON 워킹 테라피 페이지 */
export type HealingContent = {
  meta: Meta;
  header: PageHeaderContent;
  audio: {
    title: string;
    lead: string;
    placeholder: string;
    placeholderHint: string;
    mapLabel: string;
    walkGuides: { label: string; emoji: string; description: string; items: HealingAudioItem[] };
    affirmations: { label: string; emoji: string; description: string; items: HealingAudioItem[] };
    trailGuides: { label: string; emoji: string; description: string; items: HealingTrailItem[] };
  };
  record: { title: string; lead: string; buttonLabel: string; moods: { emoji: string; label: string }[]; note: string };
  survey: { buttonLabel: string; url: string };
  store: { title: string; buttonLabel: string; count: number };
  community: { title: string; body: string; buttonLabel: string };
};

export type SiteContent = {
  site: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  whatWeDo: WhatWeDoContent;
  withWellMe: WithWellMeContent;
  communityHealth: CommunityHealthContent;
  senio: SenioContent;
  impact: ImpactContent;
  story: StoryContent;
  store: StoreContent;
  contact: ContactContent;
  privacy: PrivacyContent;
  info: InfoContent;
  healing: HealingContent;
};

export type SectionKey = keyof SiteContent;
export const SECTION_KEYS: SectionKey[] = [
  "site", "home", "about", "whatWeDo", "withWellMe", "communityHealth",
  "senio", "impact", "story", "store", "contact", "privacy", "info", "healing",
];
