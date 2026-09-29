import type { SectionKey } from "@/lib/cms/types";
import { ICON_NAMES } from "@/components/Icons";

/**
 * 관리자 편집 폼 정의. 콘텐츠 JSON 의 구조(types.ts)를 폼 필드로 설명합니다.
 * - key 는 섹션 객체 기준 상대 경로 (group / list 안에서는 그 항목 기준)
 * - 여기 정의는 클라이언트로 직렬화되므로 함수는 넣지 않습니다.
 */
export type Field =
  | { type: "text"; key: string; label: string; help?: string }
  | { type: "textarea"; key: string; label: string; help?: string; rows?: number }
  | { type: "image"; key: string; label: string; help?: string }
  | { type: "audio"; key: string; label: string; help?: string }
  | { type: "number"; key: string; label: string; help?: string }
  | { type: "boolean"; key: string; label: string; help?: string }
  | { type: "select"; key: string; label: string; options: string[]; help?: string }
  | { type: "strings"; key: string; label: string; help?: string }
  | { type: "paragraphs"; key: string; label: string; help?: string }
  | { type: "group"; key: string; label: string; fields: Field[]; help?: string }
  | { type: "list"; key: string; label: string; fields: Field[]; titleKey?: string; help?: string };

export type SectionDef = { label: string; description: string; preview: string; fields: Field[] };

const t = (key: string, label: string, help?: string): Field => ({ type: "text", key, label, help });
const ta = (key: string, label: string, help?: string, rows?: number): Field => ({ type: "textarea", key, label, help, rows });
const img = (key: string, label: string, help?: string): Field => ({ type: "image", key, label, help });
const audio = (key: string, label: string, help?: string): Field => ({ type: "audio", key, label, help });
const num = (key: string, label: string, help?: string): Field => ({ type: "number", key, label, help });
const bool = (key: string, label: string, help?: string): Field => ({ type: "boolean", key, label, help });
const sel = (key: string, label: string, options: string[], help?: string): Field => ({ type: "select", key, label, options, help });
const strs = (key: string, label: string, help?: string): Field => ({ type: "strings", key, label, help });
const paras = (key: string, label: string, help?: string): Field => ({ type: "paragraphs", key, label, help });
const grp = (key: string, label: string, fields: Field[], help?: string): Field => ({ type: "group", key, label, fields, help });
const list = (key: string, label: string, fields: Field[], titleKey?: string, help?: string): Field => ({ type: "list", key, label, fields, titleKey, help });

const icon = (key = "icon") => sel(key, "아이콘", ICON_NAMES);
const link = (key: string, label: string) => grp(key, label, [t("label", "버튼 문구"), t("href", "링크 주소")]);
const meta = grp("meta", "검색엔진 · 브라우저 탭 정보", [t("title", "페이지 제목 (탭 · 검색 결과)"), ta("description", "페이지 설명 (검색 결과)")]);
const header = (withImage = true, extra: Field[] = []) =>
  grp("header", "페이지 상단", [
    t("eyebrow", "영문 타이틀"),
    t("title", "페이지 제목"),
    ta("lead", "소개 문장"),
    ...(withImage ? [img("image", "이미지"), t("imageAlt", "이미지 설명(대체 텍스트)")] : []),
    ...extra,
  ]);
const stats = (key = "stats") => list(key, "핵심 숫자", [t("value", "숫자"), t("label", "설명")], "value");

export const SECTIONS: Record<SectionKey, SectionDef> = {
  site: {
    label: "사이트 기본 정보",
    description: "회사명 · 연락처 · SNS 링크 · HERO 영상 · 페이지 공개 여부. 헤더 · 푸터 · 문의 페이지 등 사이트 전체에 쓰입니다.",
    preview: "/",
    fields: [
      t("name", "회사명"),
      t("nameEn", "영문 회사명"),
      ta("description", "회사 한 줄 소개", "검색 결과와 SNS 공유 카드에 표시됩니다."),
      t("tagline", "슬로건"),
      grp("contact", "연락처", [
        t("team", "담당 부서"),
        t("person", "담당자"),
        t("phone", "전화"),
        t("email", "이메일"),
        t("address", "주소"),
        t("postalCode", "우편번호"),
      ]),
      grp("links", "외부 링크", [
        t("store", "네이버 스마트스토어"),
        t("appIos", "SENIO 앱 App Store", "출시 전에는 비워 두면 '앱 출시 안내 받기' 버튼이 대신 표시됩니다."),
        t("appAndroid", "SENIO 앱 Google Play"),
        t("menbalooIos", "맨발루 App Store"),
        t("menbalooAndroid", "맨발루 Google Play"),
        t("cafe", "네이버 카페 힐링로드ON"),
        t("blog", "네이버 블로그"),
        t("instagram", "Instagram"),
        t("youtube", "YouTube"),
      ]),
      img("heroPoster", "HOME 대표 사진", "인트로 로고 안과 HERO 배경에 쓰입니다."),
      img("heroVideo", "HOME HERO 영상(MP4)", "올리면 대표 사진 대신 영상이 재생됩니다. 비우면 사진을 씁니다."),
      grp("publish", "페이지 공개", [
        bool("withWellMe", "WITH WELL ME 페이지 공개", "끄면 메뉴 · 홈 카드에서 숨겨지고 주소로 접근해도 열리지 않습니다."),
        bool("communityHealth", "COMMUNITY HEALTH 페이지 공개"),
      ]),
    ],
  },

  home: {
    label: "HOME",
    description: "홈 화면의 각 섹션 문구와 이미지. 협력기관 · 스토리 카드는 각각 IMPACT · STORY 메뉴에서 관리합니다.",
    preview: "/",
    fields: [
      grp("intro", "01 인트로 · HERO", [
        t("slogan", "인트로 영문 슬로건"),
        ta("headline", "헤드라인", "줄바꿈이 그대로 반영됩니다.", 2),
        ta("lead", "소개 문장"),
        link("primaryCta", "첫 번째 버튼"),
        link("secondaryCta", "두 번째 버튼"),
      ]),
      grp("beginning", "02 OUR BEGINNING", [
        t("eyebrow", "영문 타이틀"),
        ta("headline", "헤드라인", "줄바꿈이 그대로 반영됩니다.", 2),
        ta("lead", "소개 문장"),
        img("image", "사진"),
        t("imageAlt", "사진 설명"),
        list("steps", "3단계 목록", [t("no", "번호"), t("title", "제목"), ta("body", "설명")], "title"),
      ]),
      grp("problem", "03 PROBLEM", [
        img("bannerImage", "배너 사진"),
        t("bannerAlt", "배너 사진 설명"),
        t("bannerEn", "배너 영문 문구"),
        t("bannerKo", "배너 한글 문구"),
        t("title", "질문 헤드라인"),
        list("cards", "문제 3가지", [t("title", "제목"), ta("body", "설명")], "title"),
        ta("quote", "인용 문단"),
      ]),
      grp("howWeWork", "04 HOW WE WORK", [
        t("eyebrow", "영문 타이틀"),
        t("title", "제목"),
        ta("lead", "소개 문장"),
        t("centerLabel", "다이어그램 가운데 영문"),
        ta("centerText", "다이어그램 가운데 문구", "줄바꿈 기준 두 줄", 2),
        list("steps", "5단계", [t("n", "번호"), t("title", "단계명"), t("en", "영문"), icon(), ta("body", "설명")], "title"),
      ]),
      grp("whatWeDo", "05 WHAT WE DO", [
        t("panelTitle", "사진 패널 위 큰 제목"),
        t("title", "제목 (사업소개 페이지)"),
        ta("lead", "소개 문장 (사업소개 페이지)"),
        list(
          "businesses",
          "세 가지 사업 카드",
          [
            sel("key", "연결 페이지", ["senio", "withWellMe", "communityHealth"], "비공개 페이지면 링크가 자동으로 숨겨집니다."),
            t("name", "사업명"),
            t("kind", "분류"),
            t("tag", "한 줄 태그"),
            ta("body", "설명"),
            strs("pills", "키워드 (한 줄에 하나)"),
            img("image", "사진"),
            t("imageAlt", "사진 설명"),
            t("href", "자세히 보기 링크"),
            list("actions", "버튼", [t("label", "문구"), t("href", "링크"), sel("variant", "스타일", ["primary", "secondary"]), bool("external", "새 창으로 열기")], "label"),
          ],
          "name",
        ),
      ]),
      grp("senio", "SENIO 하이라이트", [
        t("eyebrow", "영문 타이틀"),
        t("sub", "부제"),
        t("title", "제목"),
        ta("body", "설명"),
        stats(),
        img("image", "기기 이미지"),
        t("imageAlt", "이미지 설명"),
        link("primaryCta", "첫 번째 버튼"),
        link("secondaryCta", "두 번째 버튼"),
      ]),
      grp("partners", "07 OUR PARTNERS", [t("title", "영문 타이틀"), ta("lead", "소개 문장"), t("ctaLabel", "버튼 문구")], "협력기관 목록은 IMPACT 메뉴에서 수정합니다."),
      grp("story", "08 STORY", [t("title", "영문 타이틀"), t("lead", "소개 문장"), t("moreLabel", "전체 보기 문구")], "노출 글은 STORY 메뉴에서 'HOME 노출'을 켜서 지정합니다."),
      grp("forOrganizations", "06 FOR ORGANIZATIONS · 09 FINAL CTA", [
        t("title", "영문 타이틀"),
        ta("statement", "큰 문장", "줄바꿈이 그대로 반영됩니다.", 2),
        ta("lead", "소개 문장"),
        t("cardEyebrow", "네이비 카드 영문 타이틀"),
        ta("cardTitle", "네이비 카드 제목", "줄바꿈이 그대로 반영됩니다.", 2),
        list("targets", "기관 유형 4가지", [icon(), t("audience", "대상"), t("headline", "제목"), ta("body", "설명")], "audience"),
        t("ctaTitle", "FINAL CTA 헤드라인"),
        ta("ctaBody", "FINAL CTA 설명"),
        link("primaryCta", "첫 번째 버튼"),
        link("secondaryCta", "두 번째 버튼"),
      ]),
    ],
  },

  about: {
    label: "ABOUT 회사소개",
    description: "회사소개 페이지의 텍스트와 이미지. 인증 목록은 IMPACT 메뉴, 회사 정보는 사이트 기본 정보에서 수정합니다.",
    preview: "/about",
    fields: [
      meta,
      header(),
      grp("perception", "우리가 전하려는 인식", [
        t("eyebrow", "소제목"),
        ta("title", "큰 문장"),
        ta("leadBefore", "설명 (강조 앞)"),
        t("leadHighlight", "강조 문구 (보라색)"),
        t("leadAfter", "설명 (강조 뒤)"),
      ]),
      grp("message", "핵심 메시지", [t("eyebrow", "소제목"), t("title", "제목"), ta("body", "설명"), strs("steps", "순환 단계 (한 줄에 하나)")]),
      grp("identity", "Nature × Human × Science", [
        t("eyebrow", "영문 타이틀"),
        ta("lead", "소개 문장"),
        list("axes", "세 축", [t("key", "영문"), t("ko", "한글"), t("body", "설명"), img("image", "사진"), t("alt", "사진 설명")], "key"),
      ]),
      grp("businesses", "사업 구성", [
        t("eyebrow", "소제목"),
        t("title", "제목"),
        list("items", "사업 카드", [sel("key", "연결 페이지", ["senio", "withWellMe", "communityHealth"]), t("name", "사업명"), t("kind", "분류"), ta("desc", "설명"), t("href", "링크")], "name"),
      ]),
      grp("info", "인증 · 회사 정보 카드", [t("certsEyebrow", "인증 카드 소제목"), t("infoEyebrow", "회사 정보 카드 소제목"), t("ctaLabel", "버튼 문구")]),
    ],
  },

  whatWeDo: {
    label: "WHAT WE DO 사업소개",
    description: "사업소개 페이지 상단. 아래 세 사업 카드는 HOME > 05 WHAT WE DO, 기관 안내는 HOME > FOR ORGANIZATIONS 에서 수정합니다.",
    preview: "/what-we-do",
    fields: [meta, header(false)],
  },

  withWellMe: {
    label: "WITH WELL ME",
    description: "위드웰미 브랜드 페이지. 제품 목록은 STORE 메뉴에서, 공개 여부는 사이트 기본 정보에서 관리합니다.",
    preview: "/what-we-do/with-well-me",
    fields: [
      meta,
      header(true, [img("logo", "브랜드 로고")]),
      grp("axes", "5개 축", [t("eyebrow", "영문 타이틀"), t("title", "제목"), ta("lead", "소개 문장"), list("items", "축", [t("name", "영문"), t("ko", "한글"), ta("desc", "설명")], "name")]),
      grp("products", "제품 소개", [t("eyebrow", "영문 타이틀"), t("title", "제목"), ta("lead", "소개 문장"), t("note", "스토어 안내 문구"), t("ctaLabel", "버튼 문구")]),
    ],
  },

  communityHealth: {
    label: "COMMUNITY HEALTH",
    description: "건강 프로그램 페이지. 운영 사례의 협력기관은 IMPACT 메뉴, 건강리더 양성 문구도 IMPACT 메뉴에서 수정합니다.",
    preview: "/what-we-do/community-health",
    fields: [
      meta,
      header(true, [t("ctaLabel", "상단 버튼 문구")]),
      grp("programs", "프로그램 소개", [t("eyebrow", "영문 타이틀"), t("title", "제목"), ta("lead", "소개 문장"), list("items", "프로그램", [t("name", "이름"), ta("body", "설명")], "name")]),
      grp("healingRoad", "힐링로드ON", [
        t("eyebrow", "소제목"),
        t("title", "제목"),
        ta("lead", "소개 문장"),
        t("walkTitle", "함께 걷기 카드 제목"),
        ta("walkBody", "함께 걷기 카드 설명"),
        strs("photos", "현장 사진 (한 줄에 하나, 경로 또는 URL)", "첫 번째 사진이 크게 표시됩니다. 새 사진은 아무 이미지 필드에서 업로드한 뒤 경로를 붙여 넣으세요."),
      ]),
      grp("cases", "운영 사례", [t("eyebrow", "영문 타이틀"), t("title", "제목"), ta("lead", "소개 문장"), t("storiesTitle", "스토리 소제목"), t("moreLabel", "더 보기 문구")]),
      grp("cta", "하단 문의 배너", [t("title", "제목"), ta("body", "설명"), t("label", "버튼 문구")]),
    ],
  },

  senio: {
    label: "SENIO",
    description: "SENIO 페이지 전체. 실증 현황 · 지식재산 · 인허가 로드맵 데이터는 IMPACT 메뉴와 공유합니다.",
    preview: "/senio",
    fields: [
      meta,
      grp("hero", "01 상단", [
        t("eyebrow", "소제목"),
        ta("title", "헤드라인"),
        ta("lead", "소개 문장"),
        ta("body", "설명"),
        link("primaryCta", "첫 번째 버튼"),
        link("secondaryCta", "두 번째 버튼"),
        stats(),
        img("image", "기기 이미지"),
        t("imageAlt", "이미지 설명"),
      ]),
      grp("flow", "02 측정 흐름", [
        t("eyebrow", "영문 타이틀"),
        t("title", "제목"),
        ta("lead", "소개 문장"),
        list("steps", "단계", [t("n", "번호"), icon(), t("title", "제목"), ta("body", "설명")], "title"),
        t("levelsLabel", "결과 단계 라벨"),
        strs("levels", "결과 4단계 (한 줄에 하나)"),
        img("image", "앱 화면 이미지"),
        t("imageAlt", "이미지 설명"),
      ]),
      grp("products", "03 Strip · Lens · Care", [
        t("eyebrow", "영문 타이틀"),
        t("title", "제목"),
        grp("strip", "Strip 카드", [t("eyebrow", "소제목"), t("title", "제목"), ta("body", "설명"), list("indicators", "지표 그룹", [t("group", "그룹"), icon(), strs("items", "지표 (한 줄에 하나)")], "group")]),
        grp("lens", "Lens 카드", [t("eyebrow", "소제목"), t("title", "제목"), ta("body", "설명"), img("image", "기기 이미지")]),
        grp("care", "Care 카드", [t("eyebrow", "소제목"), t("title", "제목"), ta("body", "설명"), img("image", "앱 이미지"), strs("pills", "키워드 (한 줄에 하나)")]),
      ]),
      grp("rnd", "04 R&D · 실증 현황", [
        t("eyebrow", "소제목"),
        t("title", "제목"),
        t("rndEyebrow", "연구개발 카드 소제목"),
        t("ipEyebrow", "지식재산 카드 소제목"),
        t("verifyEyebrow", "검증 카드 소제목"),
        ta("verifyBody", "검증 카드 내용"),
        t("roadmapEyebrow", "로드맵 소제목"),
        t("roadmapNote", "로드맵 오른쪽 안내"),
        t("pilotEyebrow", "현장 실증 카드 소제목"),
        t("noticeEyebrow", "이용 안내 소제목"),
        ta("noticeBody", "이용 안내 내용"),
      ]),
      grp("orgs", "05 적용 가능 기관", [t("eyebrow", "소제목"), t("title", "제목"), list("rows", "기관 유형", [icon(), t("target", "대상"), ta("usage", "활용 방식")], "target"), ta("note", "표 아래 안내")]),
      grp("cta", "06 문의", [
        t("eyebrow", "소제목"),
        t("title", "제목"),
        grp("org", "기관 · 기업 카드", [t("eyebrow", "소제목"), t("title", "제목"), ta("body", "설명"), t("ctaLabel", "버튼 문구")]),
        grp("personal", "개인 · 보호자 카드", [t("eyebrow", "소제목"), t("title", "제목"), strs("screens", "앱 화면 이미지 (한 줄에 하나)"), t("ctaLabel", "앱 링크가 없을 때 버튼 문구"), t("note", "앱 링크가 없을 때 안내")]),
      ]),
    ],
  },

  impact: {
    label: "IMPACT 성과",
    description: "KPI · 협력기관 · 프로젝트 · 실증 · R&D · 지식재산 · 인증 · 수상 · 선정 · 사회적 가치 · 연혁. HOME 협력기관 섹션과 SENIO 페이지에도 함께 반영됩니다.",
    preview: "/impact",
    fields: [
      meta,
      header(false),
      list("kpis", "핵심 숫자 (상단 4칸)", [t("value", "숫자"), t("label", "설명"), t("note", "부연")], "label"),
      grp("sections", "섹션 제목 · 소개", [
        grp("projects", "주요 프로젝트", [t("title", "제목"), ta("lead", "소개")]),
        grp("pilots", "실증 현황", [t("title", "제목"), ta("lead", "소개", "{year} 와 {target} 은 아래 실증 현황 값으로 바뀝니다.")]),
        grp("rnd", "R&D · 지식재산", [t("title", "제목")]),
        grp("awards", "인증 · 수상 · 선정", [t("title", "제목")]),
        grp("social", "사회적 가치", [t("title", "제목"), ta("lead", "소개")]),
        grp("partners", "협력기관", [t("title", "제목"), ta("lead", "소개")]),
        grp("history", "연혁", [t("title", "제목"), ta("lead", "소개")]),
      ]),
      list("projects", "주요 프로젝트", [img("src", "사진"), t("title", "제목"), ta("body", "설명")], "title"),
      grp("leaderTraining", "건강리더 양성 카드", [t("title", "제목"), ta("body", "설명"), strs("photos", "사진 2장 (한 줄에 하나)")]),
      grp("pilots", "SENIO 실증 현황", [num("year", "연도"), num("target", "목표 기관 수"), strs("confirmed", "확정 기관 (한 줄에 하나)")]),
      grp("rnd", "연구개발", [t("headline", "큰 숫자"), t("summary", "요약"), ta("body", "설명"), strs("programs", "수행 과제 (한 줄에 하나)")]),
      list("ip", "지식재산", [t("label", "항목"), t("value", "상태"), t("detail", "상세")], "label"),
      t("ipNote", "지식재산 카드 아래 안내"),
      list("certs", "인증", [t("name", "인증명"), t("short", "영문 표기")], "name"),
      strs("awards", "수상 (한 줄에 하나)"),
      strs("programs", "선정 사업 (한 줄에 하나)"),
      list("socialValue", "사회적 가치", [t("title", "제목"), ta("body", "설명")], "title"),
      list("partners", "협력기관 (MOU)", [img("src", "협약식 사진"), t("name", "기관명"), t("kind", "기관 유형")], "name"),
      list("history", "연혁", [t("year", "연도"), list("items", "항목", [t("month", "월 (숫자 두 자리, 비워도 됨)"), t("text", "내용")], "text")], "year"),
      list("roadmap", "SENIO 인허가 로드맵", [t("period", "시기"), t("title", "제목"), ta("body", "설명")], "title"),
    ],
  },

  story: {
    label: "STORY 게시물",
    description: "게시물 작성 · 수정 · 카테고리 지정. 'HOME 노출'을 켠 글 3건이 홈에 표시됩니다. 최근 글이 위로 오도록 순서를 조정하세요.",
    preview: "/story",
    fields: [
      meta,
      header(false),
      strs("categories", "카테고리 (한 줄에 하나)", "게시물의 카테고리는 여기 목록 중 하나여야 합니다."),
      list(
        "items",
        "게시물",
        [
          t("title", "제목"),
          t("slug", "주소(영문 slug)", "게시물 주소가 됩니다. 영문 소문자 · 숫자 · 하이픈만 사용하고, 글마다 달라야 합니다."),
          t("category", "카테고리"),
          t("date", "날짜", "YYYY.MM.DD"),
          img("image", "대표 이미지"),
          ta("excerpt", "요약"),
          paras("body", "본문", "문단 사이는 빈 줄로 구분합니다."),
          bool("featured", "HOME 노출"),
        ],
        "title",
      ),
    ],
  },

  store: {
    label: "STORE 제품",
    description: "네이버 스마트스토어 연동 제품 목록. 스토어 주소는 사이트 기본 정보 > 외부 링크에서 수정합니다.",
    preview: "/store",
    fields: [
      meta,
      header(false, [t("ctaLabel", "스마트스토어 버튼 문구"), t("brandCtaLabel", "브랜드 소개 버튼 문구")]),
      strs("categories", "카테고리 (한 줄에 하나)", "제품이 이 순서대로 묶여 표시됩니다."),
      list(
        "products",
        "제품",
        [
          t("brand", "브랜드"),
          t("name", "제품명"),
          num("price", "판매가 (원)"),
          num("originalPrice", "정가 (원)", "판매가보다 크면 할인율이 표시됩니다. 0이면 표시하지 않습니다."),
          t("category", "카테고리"),
          t("badge", "배지 (예: 베스트)"),
          img("image", "제품 이미지"),
          t("url", "스마트스토어 상품 주소"),
          sel("axis", "WITH WELL ME 축", ["EAT", "MOVE", "WALK", "CARE", "RECOVER"]),
        ],
        "name",
      ),
      grp("brand", "하단 브랜드 배너", [img("logo", "로고"), ta("lead", "소개 문장"), ta("body", "안내"), t("ctaLabel", "버튼 문구"), img("image", "사진"), t("imageAlt", "사진 설명")]),
    ],
  },

  contact: {
    label: "CONTACT 문의",
    description: "문의 페이지 안내 문구와 문의 유형. 연락처는 사이트 기본 정보에서 수정합니다.",
    preview: "/contact",
    fields: [
      meta,
      header(false),
      list("types", "문의 유형 안내", [t("label", "유형"), t("desc", "설명")], "label"),
      t("directLabel", "직접 연락 카드 소제목"),
      grp("form", "문의 폼", [
        strs("inquiryTypes", "폼 문의 유형 선택지 (한 줄에 하나)", "폼과 접수 API 가 함께 사용합니다."),
        ta("placeholder", "요청 내용 안내 문구"),
        t("successTitle", "접수 완료 제목"),
        ta("successBody", "접수 완료 안내"),
      ]),
    ],
  },

  privacy: {
    label: "개인정보 처리방침",
    description: "처리방침 본문. {company} {team} {person} {phone} {email} 은 사이트 기본 정보 값으로 바뀝니다.",
    preview: "/privacy",
    fields: [meta, header(false), list("sections", "조항", [t("title", "제목"), paras("body", "내용", "문단 사이는 빈 줄로 구분합니다.")], "title")],
  },

  info: {
    label: "맨발걷기 정보",
    description: "/info 페이지. 맨발걷기란 · 효과 · 올바른 방법 · 주의사항 · 관련 연구 자료 · 힐링로드 ON 안내.",
    preview: "/info",
    fields: [
      meta,
      header(false),
      grp("what", "맨발걷기란?", [t("eyebrow", "영문 타이틀"), t("title", "제목"), paras("body", "본문"), t("linkLabel", "참고 링크 문구"), t("linkUrl", "참고 링크 주소")]),
      grp("benefits", "과학적으로 보고된 효과", [
        t("eyebrow", "영문 타이틀"),
        t("title", "제목"),
        ta("lead", "소개 문장"),
        list("items", "효과 목록", [t("title", "제목"), ta("body", "설명"), t("source", "출처 이름"), t("url", "출처 링크")], "title"),
      ]),
      grp("method", "올바른 맨발걷기 방법", [t("eyebrow", "영문 타이틀"), t("title", "제목"), list("steps", "단계", [t("emoji", "이모지"), t("title", "제목"), ta("body", "설명")], "title")]),
      grp("safety", "주의사항", [t("eyebrow", "영문 타이틀"), t("title", "제목"), list("items", "주의 항목", [t("title", "제목"), ta("body", "설명")], "title"), ta("disclaimer", "면책 문구")]),
      grp("research", "관련 연구 자료", [
        t("eyebrow", "영문 타이틀"),
        t("title", "제목"),
        ta("lead", "소개 문장"),
        list("items", "자료 목록", [t("tag", "분류"), t("title", "논문·기사 제목"), ta("body", "요약"), t("source", "출처"), t("url", "링크")], "title"),
        t("moreLabel", "더보기 버튼 문구"),
        t("moreUrl", "더보기 링크"),
      ]),
      grp("cta", "마무리 안내", [t("title", "제목"), ta("body", "설명"), t("buttonLabel", "버튼 문구"), t("buttonUrl", "버튼 링크")]),
    ],
  },

  healing: {
    label: "힐링로드 ON",
    description: "/healing 페이지. 걷기 안내 · 긍정확언 · 길 안내 오디오, 감정 기록, 설문조사, 스토어 안내. 오디오 파일은 각 항목에서 올립니다(WAV · MP3 · M4A, 25MB 이하).",
    preview: "/healing",
    fields: [
      meta,
      header(false),
      grp("audio", "오디오 듣기", [
        t("title", "제목"),
        t("lead", "제목 옆 설명"),
        t("placeholder", "선택 전 플레이어 문구"),
        t("placeholderHint", "선택 전 안내 문구"),
        t("mapLabel", "지도로 선택 버튼 문구"),
        grp("walkGuides", "걷기 안내", [t("label", "버튼 이름"), t("emoji", "버튼 이모지"), t("description", "목록 설명"), list("items", "오디오", [t("emoji", "이모지"), t("title", "제목"), ta("description", "설명"), audio("src", "오디오 파일")], "title")]),
        grp("affirmations", "긍정확언", [t("label", "버튼 이름"), t("emoji", "버튼 이모지"), t("description", "목록 설명"), list("items", "오디오", [t("emoji", "이모지"), t("title", "제목"), ta("description", "확언 문장"), audio("src", "오디오 파일")], "title")]),
        grp("trailGuides", "길 안내", [
          t("label", "버튼 이름"),
          t("emoji", "버튼 이모지"),
          t("description", "목록 설명"),
          list(
            "items",
            "산책로",
            [t("emoji", "이모지"), t("title", "코스 이름"), ta("description", "코스 설명"), t("region", "지역"), t("distance", "거리"), t("walkingTime", "소요 시간"), t("difficulty", "난이도", "쉬움 · 보통 · 어려움"), audio("src", "안내 오디오")],
            "title",
          ),
        ]),
      ]),
      grp("record", "기록하기", [t("title", "제목"), t("lead", "제목 옆 설명"), t("buttonLabel", "감정 기록 버튼 문구"), list("moods", "감정 선택지", [t("emoji", "이모지"), t("label", "이름")], "label"), ta("note", "기록 창 안내 문구")]),
      grp("survey", "설문조사", [t("buttonLabel", "버튼 문구"), t("url", "설문 링크")]),
      grp("store", "힐링로드ON 제품", [t("title", "제목"), num("count", "표시할 제품 수", "STORE 메뉴의 제품 목록 앞에서부터 표시합니다."), t("buttonLabel", "스토어 버튼 문구", "링크는 사이트 기본 정보 > 네이버 스마트스토어를 씁니다.")]),
      grp("community", "커뮤니티 안내", [t("title", "제목"), ta("body", "설명"), t("buttonLabel", "버튼 문구", "링크는 사이트 기본 정보 > 네이버 카페를 씁니다.")]),
    ],
  },
};

export const SECTION_ORDER: SectionKey[] = ["site", "home", "about", "whatWeDo", "senio", "withWellMe", "communityHealth", "healing", "info", "impact", "story", "store", "contact", "privacy"];
