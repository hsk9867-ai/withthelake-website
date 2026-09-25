/**
 * IMPACT · 성과 데이터.
 * HOME 07 섹션, IMPACT 페이지, SENIO R&D 섹션이 이 파일을 공유합니다.
 * 항목을 추가·수정하면 세 곳에 동시에 반영됩니다.
 */

export const KPIS = [
  { value: "4억+", label: "연구개발 누적 수주", note: "정부 R&D 과제 수행" },
  { value: "7종", label: "한 번에 확인하는 지표", note: "당뇨 · 간기능 · 신장" },
  { value: "4곳", label: "2026 실증 확정 기관", note: "목표 10개 기관" },
  { value: "4곳", label: "MOU 협력기관", note: "지자체 재단 · 요양 · 기업" },
] as const;

export const PARTNERS = [
  { src: "/assets/partners/mou-chuncheon-future.jpg", name: "춘천미래동행재단", kind: "지자체 출연기관" },
  { src: "/assets/partners/mou-chuncheon-hope.jpg", name: "춘천 희망요양원", kind: "요양기관" },
  { src: "/assets/partners/mou-hongcheon-uptown.jpg", name: "업타운㈜", kind: "기업" },
  { src: "/assets/partners/mou-zest.jpg", name: "제스트㈜", kind: "기업" },
] as const;

export const PROJECTS = [
  {
    src: "/assets/activities/interview-gangwon-elderly.jpg",
    title: "대한노인회 강원연합회 현장 인터뷰",
    body: "시니어 건강관리 수요와 현장 운영 조건을 확인하는 사용자 조사",
  },
  {
    src: "/assets/activities/interview-wonju-medical.jpg",
    title: "원주의료사회협동조합 인터뷰",
    body: "지역 의료·돌봄 기관과의 연계 방안을 논의한 현장 조사",
  },
  {
    src: "/assets/activities/interview-udu-center.jpg",
    title: "우두경로당 이용자 인터뷰",
    body: "경로당 이용 시니어의 생활 습관과 측정 경험을 듣는 현장 조사",
  },
  {
    src: "/assets/activities/governance-meeting.jpg",
    title: "시니어돌봄거버넌스 협의체 회의",
    body: "지자체·복지기관·기업이 함께 지역 돌봄 체계를 논의하는 협의체 참여",
  },
  {
    src: "/assets/activities/wellness-lecture.jpg",
    title: "웰니스 특강",
    body: "기관 이용자와 담당자를 대상으로 한 예방건강관리 교육",
  },
] as const;

export const LEADER_TRAINING = {
  title: "건강리더 양성",
  body: "맨발걷기 지도자 양성과정을 운영하고, 지역에서 건강 프로그램을 이끌 건강동행리더를 양성합니다. 양성된 리더는 지역 프로그램 운영에 참여합니다.",
  photos: ["/assets/activities/training-1.jpg", "/assets/activities/training-2.jpg"],
} as const;

/** SENIO 실증 현황 (기획서 4-06) */
export const PILOTS = {
  year: 2026,
  target: 10,
  confirmed: [
    "춘천 희망요양원",
    "춘천 희망복지관",
    "춘천미래동행재단 프로그램",
    "MG함께자람 사업",
  ],
} as const;

export const RND = {
  summary: "연구개발 누적 수주 4억원 이상",
  body: "중소벤처기업부 디딤돌 R&D, Pre-TIPS, 강원 초기창업 등 정부 R&D 과제를 수행하며 개발을 진행해왔습니다.",
  programs: ["중소벤처기업부 디딤돌 R&D", "Pre-TIPS", "강원 초기창업 지원사업"],
} as const;

export const IP = [
  { label: "핵심 알고리즘 특허", value: "출원 완료", detail: "2026.08.19 · 출원번호 10-2026-0155385" },
  { label: "상표", value: "출원 4건", detail: "" },
  { label: "기기 외관 디자인", value: "출원 1건", detail: "" },
] as const;

export const CERTS = [
  { name: "벤처기업", short: "VENTURE" },
  { name: "소셜벤처기업", short: "SOCIAL VENTURE" },
  { name: "강원도 예비사회적기업", short: "PRE-SOCIAL ENTERPRISE" },
  { name: "여성기업", short: "WOMEN-OWNED" },
] as const;

export const AWARDS = [
  "강원지방중소벤처기업청장상",
  "강원관광재단 이사장상",
  "강원여성창업 공모전 대상",
] as const;

export const PROGRAMS = [
  "한라대·한림성심대 RISE",
  "강원 AI헬스케어 글로벌혁신특구",
  "MG함께자람 사회경제조직육성사업",
  "강원창업 초기 지원사업",
] as const;

/** 사회적 가치 (기획서 5 IMPACT 항목) */
export const SOCIAL_VALUE = [
  {
    title: "지역사회 예방건강관리",
    body: "병원에 가기 전 단계의 건강관리를 지역 현장에서 제공해, 시니어의 건강한 자립생활이 더 오래 이어지도록 돕습니다.",
  },
  {
    title: "돌봄 담당자의 부담 완화",
    body: "개인별 건강 변화를 기록하고 추적하는 도구를 제공해, 한 사람이 여러 사람을 돌보는 현장의 업무를 덜어냅니다.",
  },
  {
    title: "지역 건강리더 양성",
    body: "맨발걷기 지도자와 건강동행리더를 양성해, 지역 주민이 지역의 건강을 이끄는 구조를 만듭니다.",
  },
  {
    title: "강원 기반 사회적 경제",
    body: "강원도 예비사회적기업·소셜벤처로서 지역 자원과 원료를 활용하고, 지역 기관과 함께 사업을 설계합니다.",
  },
] as const;

/**
 * 연혁 (기획서 3-07 · 5 IMPACT).
 * 연도가 확인된 항목만 표시합니다. 설립·수상·인증·MOU 체결 시점은 확인 후 추가해 주세요.
 */
export const HISTORY = [
  {
    year: "2026",
    items: [
      { month: "08", text: "SENIO 핵심 알고리즘 특허 출원 (10-2026-0155385)" },
      { month: "", text: "강원 거점 실증 4개 기관 확정 (연내 10개 기관 목표)" },
      { month: "", text: "공인시험 성적서 확보 절차 진행" },
    ],
  },
  {
    year: "2027",
    items: [{ month: "", text: "식약처 의료기기 2등급 인허가 신청 (목표)" }],
  },
  {
    year: "2028",
    items: [{ month: "", text: "의료기기 2등급 인허가 취득 (목표)" }],
  },
] as const;

/** SENIO 인허가 로드맵 (기획서 4-06) */
export const ROADMAP = [
  { period: "현재", title: "웰니스 기기", body: "일상 모니터링과 이상 징후 확인을 목적으로 운영" },
  { period: "2026", title: "실증 · 공인시험", body: "강원 거점 실증에서 병원 사용 검사 장비와 결과 비교 데이터 확보" },
  { period: "2027", title: "인허가 신청", body: "식약처 의료기기 2등급 인허가 신청" },
  { period: "2028", title: "인허가 취득 목표", body: "의료기기 2등급 인허가 취득" },
] as const;
