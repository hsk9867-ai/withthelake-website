/** 정적 배포(GitHub Pages) 시 하위 경로. next/image 와 Link 는 자동 처리되므로 raw URL 에만 붙입니다. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE_PATH}${path}`;

/**
 * 사이트 전역 설정.
 * 링크·연락처·외부 서비스 ID처럼 자주 바뀌는 값은 이 파일에서만 수정합니다.
 */
export const SITE = {
  name: "㈜위드더레이크",
  nameEn: "WITH THE LAKE",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.withthelake.com",
  description:
    "㈜위드더레이크는 데이터와 건강행동을 연결해 시니어의 건강한 자립생활이 더 오래 지속되도록 돕는 지역사회 기반 예방건강관리 기업입니다.",
  tagline: "건강한 삶은 병원 밖, 일상에서 시작됩니다",

  contact: {
    team: "서비스기획팀",
    person: "김민주 과장",
    phone: "010-4629-5925",
    email: "contact@withthelake.com",
    address: "강원특별자치도 춘천시 후석로462번길 7, 춘천 ICT혁신센터 206호",
    postalCode: "24232",
  },

  links: {
    /** 네이버 스마트스토어 (기존 withthelake.com/store 연동 주소) */
    store: "https://smartstore.naver.com/withlab201",
    /** SENIO 앱 스토어 링크 — 출시 시 교체 (비어 있으면 문의 폼으로 연결) */
    appIos: "",
    appAndroid: "",
    /** 힐링로드ON 맨발걷기 앱 "맨발루" */
    menbalooIos: "https://apps.apple.com/kr/app/%EB%A7%A8%EB%B0%9C%EB%A3%A8/id6651824430",
    menbalooAndroid: "https://play.google.com/store/apps/details?id=com.apppp.menbaloo",
    /** 커뮤니티 · SNS */
    cafe: "https://cafe.naver.com/healingroadon",
    blog: "https://blog.naver.com/with_thelake",
    instagram: "https://www.instagram.com/withwellme/",
    youtube: "https://www.youtube.com/channel/UC8vmE6swgfF-PvsVIQUmsOQ",
  },

  /** HOME HERO 영상 (기획서: 현재 영상 활용). 파일을 public/assets/video/에 두고 경로를 지정하면 이미지 대신 재생됩니다. */
  heroVideo: "" as string,
  heroPoster: "/assets/stock/barefoot-stream.jpg",

  /** Google Analytics 측정 ID (G-XXXXXXX). .env의 NEXT_PUBLIC_GA_ID 로 설정 */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  /**
   * 원고가 확정되지 않은 페이지 공개 여부 (기획서 5: 틀만 제작 후 비공개).
   * false 로 두면 메뉴·홈 카드에서 해당 페이지 링크가 숨겨지고 검색엔진 색인에서도 제외됩니다.
   */
  publish: {
    withWellMe: true,
    communityHealth: true,
  },
} as const;

export const NAV = [
  { label: "ABOUT", href: "/about" },
  {
    label: "WHAT WE DO",
    href: "/what-we-do",
    children: [
      { label: "SENIO", desc: "디지털 헬스케어", href: "/senio" },
      { label: "WITH WELL ME", desc: "웰니스 브랜드", href: "/what-we-do/with-well-me" },
      { label: "COMMUNITY HEALTH", desc: "오프라인 프로그램", href: "/what-we-do/community-health" },
    ],
  },
  { label: "IMPACT", href: "/impact" },
  { label: "STORY", href: "/story" },
  { label: "STORE", href: "/store" },
] as const;
