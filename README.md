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

정적 호스팅이라 문의 폼은 서버 API 대신 메일 앱(mailto)으로 내용을 전달하고, 관리자 페이지는 포함되지 않습니다(빌드 시 `content/site-content.json` 의 저장본이 반영됩니다). 실제 메일 접수와 관리자 페이지는 Vercel 등 서버 배포에서 동작합니다.
(GitHub Actions 자동 배포 워크플로는 `docs/github-pages.workflow.yml`에 있으며, 토큰에 `workflow` 권한이 생기면 `.github/workflows/`로 옮겨 쓰면 됩니다.)

## 환경 변수

`.env.example`을 `.env.local`로 복사해 채웁니다.

| 변수 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트 공개 URL (sitemap · OG 절대경로) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 측정 ID. 설정 시 자동 로드 |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | CONTACT US 접수 메일 발송(Resend). 미설정 시 서버 로그에만 기록 |
| `ADMIN_PASSWORD` | 관리자 페이지(`/admin`) 비밀번호. 설정해야 관리자가 열립니다 |
| `ADMIN_SESSION_SECRET` | 로그인 세션 서명 키(선택). 미설정 시 비밀번호에서 파생 |
| `CMS_GITHUB_TOKEN`, `CMS_GITHUB_REPO`, `CMS_GITHUB_BRANCH` | 콘텐츠를 GitHub 저장소에 커밋해 보관(선택). Vercel 처럼 파일이 유지되지 않는 서버에서는 필수 |

## 관리자 페이지 (`/admin`)

사이트 전반의 문구·이미지·목록을 코드 수정 없이 편집합니다. `.env.local` 에 `ADMIN_PASSWORD` 를 넣고 개발 서버를 재시작한 뒤 http://localhost:3000/admin 으로 접속합니다.

| 메뉴 | 편집 범위 |
| --- | --- |
| 사이트 기본 정보 | 회사명 · 연락처 · SNS/스토어/앱 링크 · HERO 사진/영상 · 페이지 공개 여부 |
| HOME | 인트로 · OUR BEGINNING · PROBLEM · HOW WE WORK · WHAT WE DO 카드 · SENIO 하이라이트 · FOR ORGANIZATIONS |
| ABOUT · WHAT WE DO · SENIO · WITH WELL ME · COMMUNITY HEALTH | 각 페이지의 제목·본문·이미지·반복 항목 |
| IMPACT 성과 | KPI · 협력기관 · 프로젝트 · 실증 · R&D · 지식재산 · 인증 · 수상 · 선정 · 사회적 가치 · 연혁 · 로드맵 (HOME · SENIO 에도 반영) |
| STORY 게시물 | 게시물 작성·수정·순서·카테고리, HOME 노출 글 지정 |
| STORE 제품 | 제품 목록·가격·이미지·스마트스토어 링크 |
| CONTACT · 개인정보 처리방침 | 안내 문구 · 문의 유형 · 처리방침 조항 |

- 저장하면 사이트 캐시가 즉시 갱신됩니다. 이미지는 각 이미지 필드에서 바로 업로드할 수 있습니다(8MB 이하).
- 대시보드에서 전체 콘텐츠를 JSON 으로 내려받거나(백업) 다시 불러올 수 있습니다.
- 저장 위치는 두 가지입니다.
  - **로컬 파일** (기본): `content/site-content.json` · 업로드는 `public/uploads/`. 개발 환경과 자체 서버(`next start`)에서 사용하며, 이 파일들을 git 에 커밋하면 GitHub Pages 미리보기에도 반영됩니다.
  - **GitHub 커밋**: `CMS_GITHUB_TOKEN` 을 설정하면 같은 경로를 GitHub 저장소에 커밋합니다. Vercel 배포에서는 이 방식을 써야 저장이 유지됩니다. 업로드 이미지는 저장소 raw URL 로 연결됩니다(저장소 공개 필요).
- 코드 쪽 기본값은 `src/lib/cms/defaults.ts`, 타입은 `src/lib/cms/types.ts`, 관리자 폼 정의는 `src/lib/admin/schema.ts` 에 있습니다. 새 필드를 추가하면 세 파일을 함께 수정합니다.

## 콘텐츠 파일

| 파일 | 내용 |
| --- | --- |
| `content/site-content.json` | 관리자에서 저장한 사이트 전체 콘텐츠 (없는 키는 `src/lib/cms/defaults.ts` 기본값 사용) |
| `public/uploads/` | 관리자에서 올린 이미지·영상 |
| `public/assets/` | 로고, 현장 사진, SENIO 제품 이미지 (초기 자료) |

## 페이지

`/` HOME · `/about` · `/what-we-do` (+ `/senio`, `/what-we-do/with-well-me`, `/what-we-do/community-health`) · `/impact` · `/story`, `/story/[slug]` · `/store` · `/contact` · `/privacy`

`/sitemap.xml`, `/robots.txt`, `/opengraph-image` 는 자동 생성됩니다.
