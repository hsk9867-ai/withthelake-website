# ㈜위드더레이크 홈페이지 (WITH THE LAKE)

기획서: https://withthelake.notion.site/web-wtl-dv (텍스트 사본: `docs/기획안-web-wtl-dv.md`)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## 공유용 미리보기 (GitHub Pages)

https://hsk9867-ai.github.io/withthelake-website/

정적 내보내기 결과를 `gh-pages` 브랜치에 올려 서비스합니다. 사이트를 수정한 뒤 다시 올리려면:

```bash
npm run deploy:pages
```

정적 호스팅이라 문의 폼은 서버 API 대신 메일 앱(mailto)으로 내용을 전달합니다. 실제 메일 접수는 Vercel 등 서버 배포에서 동작합니다.
(GitHub Actions 자동 배포 워크플로는 `docs/github-pages.workflow.yml`에 있으며, 토큰에 `workflow` 권한이 생기면 `.github/workflows/`로 옮겨 쓰면 됩니다.)

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
