# ㈜위드더레이크 홈페이지 (WITH THE LAKE)

기획서: https://withthelake.notion.site/web-wtl-dv (텍스트 사본: `docs/기획안-web-wtl-dv.md`)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## 환경 변수

`.env.example`을 `.env.local`로 복사해 채웁니다.

| 변수 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트 공개 URL (sitemap · OG 절대경로) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 측정 ID. 설정 시 자동 로드 |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | CONTACT US 접수 메일 발송(Resend). 미설정 시 서버 로그에만 기록 |

## 콘텐츠 수정 위치

코드 컴포넌트를 건드리지 않고 아래 데이터 파일만 고치면 사이트에 반영됩니다.

| 파일 | 내용 |
| --- | --- |
| `src/content/site.ts` | 연락처, 스토어·앱 링크, HERO 영상 경로, 페이지 공개 여부(`publish`) |
| `src/content/impact.ts` | KPI, 협력기관(MOU), 주요 프로젝트, 실증 현황, R&D, 지식재산, 인증, 수상, 선정 사업, 사회적 가치, 연혁, 인허가 로드맵 |
| `src/content/stories.ts` | STORY 게시물 (카테고리 · 날짜 · 본문). `featured: true`가 HOME에 노출 |
| `public/assets/` | 로고, 현장 사진, SENIO 제품 이미지 |

## 페이지

`/` HOME · `/about` · `/what-we-do` (+ `/senio`, `/what-we-do/with-well-me`, `/what-we-do/community-health`) · `/impact` · `/story`, `/story/[slug]` · `/store` · `/contact` · `/privacy`

`/sitemap.xml`, `/robots.txt`, `/opengraph-image` 는 자동 생성됩니다.
