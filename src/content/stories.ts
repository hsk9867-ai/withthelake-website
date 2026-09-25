/**
 * STORY 게시물 데이터.
 * 아임웹의 맨발걷기 정보 · 힐링로드ON · NEWS 게시물을 이곳으로 이관합니다.
 * `featured: true` 인 글이 HOME 08 섹션에 최대 3건 노출됩니다 (기획서: 관리자에서 노출 글 지정).
 *
 * ※ 아래 항목은 레이아웃 확인용 샘플입니다. 실제 게시물 이관 시 교체해 주세요.
 */

export type StoryCategory = "맨발걷기 정보" | "힐링로드ON" | "NEWS";

export type Story = {
  slug: string;
  category: StoryCategory;
  title: string;
  date: string; // YYYY.MM.DD
  image: string;
  excerpt: string;
  body: string[]; // 문단 배열
  featured?: boolean;
};

export const STORY_CATEGORIES: StoryCategory[] = ["맨발걷기 정보", "힐링로드ON", "NEWS"];

export const STORIES: Story[] = [
  {
    slug: "senio-patent-filed",
    category: "NEWS",
    title: "SENIO 핵심 알고리즘 특허 출원을 완료했습니다",
    date: "2026.08.19",
    image: "/assets/senio/device-styled.jpg",
    excerpt:
      "소변 스트립 판독 편차를 줄이는 핵심 알고리즘에 대해 특허 출원을 완료했습니다. 상표 4건과 기기 외관 디자인 1건도 함께 출원했습니다.",
    body: [
      "㈜위드더레이크는 2026년 8월 19일 SENIO 핵심 알고리즘에 대한 특허 출원을 완료했습니다(출원번호 10-2026-0155385).",
      "이번 출원은 사람의 눈이 아닌 광학 센서로 스트립을 읽어 판독 편차를 줄이는 방식에 관한 것입니다. 상표 출원 4건과 기기 외관 디자인 출원 1건도 함께 진행했습니다.",
      "SENIO는 현재 웰니스 기기로 운영하고 있으며, 공인시험 성적서 확보 절차와 강원 거점 실증을 거쳐 2027년 식약처 의료기기 2등급 인허가 신청을 준비하고 있습니다.",
    ],
    featured: true,
  },
  {
    slug: "barefoot-leader-course",
    category: "힐링로드ON",
    title: "맨발걷기 지도자 양성과정, 현장의 건강리더를 키웁니다",
    date: "2026.06.20",
    image: "/assets/activities/training-1.jpg",
    excerpt:
      "지역에서 걷기 프로그램을 직접 이끌 지도자를 양성하는 과정입니다. 이론 교육과 현장 실습을 함께 진행합니다.",
    body: [
      "맨발걷기 지도자 양성과정은 지역에서 걷기 프로그램을 직접 운영할 건강리더를 양성하는 교육입니다.",
      "걷기의 기본 원리와 안전 수칙, 시니어 대상 프로그램 운영 방법을 배우고, 현장 실습을 통해 실제 진행 경험을 쌓습니다.",
      "과정을 수료한 지도자는 지자체·복지기관과 함께하는 COMMUNITY HEALTH 프로그램에 참여합니다.",
    ],
    featured: true,
  },
  {
    slug: "chuncheon-future-mou",
    category: "NEWS",
    title: "춘천미래동행재단과 지역사회 예방건강관리 협약을 맺었습니다",
    date: "2026.05.12",
    image: "/assets/partners/mou-chuncheon-future.jpg",
    excerpt:
      "재단 프로그램과 연계해 지역 주민 대상 예방건강관리 프로그램과 SENIO 실증을 함께 진행합니다.",
    body: [
      "㈜위드더레이크는 춘천미래동행재단과 지역사회 예방건강관리 업무협약을 체결했습니다.",
      "양 기관은 재단이 운영하는 지역 프로그램에 걷기·생활습관 프로그램을 연계하고, SENIO를 활용한 건강 모니터링 실증을 함께 진행합니다.",
    ],
    featured: true,
  },
  {
    slug: "why-barefoot-walking",
    category: "맨발걷기 정보",
    title: "맨발걷기, 지역사회와 함께 걷는 이유",
    date: "2026.04.03",
    image: "/assets/activities/barefoot-1.jpg",
    excerpt:
      "위드더레이크는 함께 걷는 현장에서 시작했습니다. 걷기가 예방건강관리의 출발점이 되는 이유를 정리했습니다.",
    body: [
      "걷기는 특별한 장비 없이 누구나 시작할 수 있는 건강행동입니다. 맨발로 흙길을 걷는 경험은 걷기를 습관으로 이어가게 하는 계기가 됩니다.",
      "위드더레이크는 지역 주민이 함께 걷는 프로그램에서 출발했고, 걷기를 측정·이해·행동·지속·변화 확인의 순환으로 연결하는 구조를 만들어가고 있습니다.",
    ],
  },
  {
    slug: "daily-walking-habit",
    category: "맨발걷기 정보",
    title: "일상 속 걷기 습관 만들기",
    date: "2026.03.14",
    image: "/assets/activities/barefoot-3.jpg",
    excerpt: "무리하지 않고 오래 이어가는 걷기 루틴을 만드는 방법을 안내합니다.",
    body: [
      "걷기는 강도보다 지속이 중요합니다. 하루 10분부터 시작해 기록을 남기고, 변화를 확인하는 것이 습관을 유지하는 방법입니다.",
      "SENIO 앱은 걷기 기록과 측정 결과를 함께 보여 주어, 걷기가 몸의 변화로 이어지는지를 확인할 수 있게 돕습니다.",
    ],
  },
  {
    slug: "wellness-lecture",
    category: "NEWS",
    title: "웰니스 특강, 건강한 습관을 나누다",
    date: "2026.02.27",
    image: "/assets/activities/wellness-lecture.jpg",
    excerpt: "기관 이용자와 담당자를 대상으로 예방건강관리 특강을 진행했습니다.",
    body: [
      "지역 기관 이용자와 담당자를 대상으로 웰니스 특강을 진행했습니다. 걷기·생활습관·마음건강을 주제로 일상에서 실천할 수 있는 방법을 나눴습니다.",
    ],
  },
  {
    slug: "governance-meeting",
    category: "NEWS",
    title: "시니어돌봄거버넌스 협의체 회의에 참여했습니다",
    date: "2026.01.22",
    image: "/assets/activities/governance-meeting.jpg",
    excerpt: "지자체·복지기관·기업이 함께 지역 돌봄 체계를 논의하는 협의체에 참여했습니다.",
    body: [
      "시니어돌봄거버넌스 협의체 회의에 참여해 지역 돌봄 체계 안에서 예방건강관리와 SENIO의 역할을 논의했습니다.",
    ],
  },
];

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug);
}

export function getFeaturedStories(limit = 3) {
  const featured = STORIES.filter((s) => s.featured);
  const list = featured.length >= limit ? featured : STORIES;
  return list.slice(0, limit);
}
