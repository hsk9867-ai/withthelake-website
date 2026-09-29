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
| `ADMIN_PASSWORD` | 관리자 페이지(`/admin`) 최초 비밀번호. 관리자 설정에서 바꾸면 그 뒤로는 무시됩니다 |
| `ADMIN_SESSION_SECRET` | 로그인 세션 서명 키(선택, 운영에서는 권장). 미설정 시 비밀번호에서 파생 |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET` | 콘텐츠·업로드·비밀번호를 Supabase 에 보관(운영 권장). `supabase/schema.sql` 실행 필요. 버킷 기본값 `uploads` |
| `CMS_GITHUB_TOKEN`, `CMS_GITHUB_REPO`, `CMS_GITHUB_BRANCH` | 콘텐츠를 GitHub 저장소에 커밋해 보관(선택). Supabase 가 설정되면 무시됩니다 |

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
- 비밀번호는 왼쪽 메뉴 **설정** 에서 바꿉니다. 바꾼 비밀번호는 해시로만 저장되고(`content/admin-auth.json` 또는 Supabase), 그 뒤로 `ADMIN_PASSWORD` 는 무시됩니다. 잊었을 때는 `npm run admin:password -- 새비밀번호` (로컬 파일 모드).
- 저장 위치는 세 가지입니다.
  - **Supabase** (운영 권장): `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` 를 설정하면 콘텐츠는 `cms_files` 테이블에, 업로드는 Storage `uploads` 버킷에 저장됩니다. 먼저 Supabase SQL Editor 에서 `supabase/schema.sql` 을 실행해 테이블·버킷을 만듭니다. Cloudflare · Vercel 등 어떤 서버에서도 저장이 유지되고 git 에는 아무것도 커밋되지 않습니다.
  - **GitHub 커밋**: `CMS_GITHUB_TOKEN` 을 설정하면 같은 경로를 GitHub 저장소에 커밋합니다. 업로드 이미지는 저장소 raw URL 로 연결됩니다(저장소 공개 필요).
  - **로컬 파일** (기본): `content/site-content.json` · 업로드는 `public/uploads/`. 개발 환경과 자체 서버(`next start`)에서 사용하며, 이 파일들을 git 에 커밋하면 GitHub Pages 미리보기에도 반영됩니다.
- 사이트 페이지는 요청 시 렌더링되므로(정적 내보내기 제외) 저장한 내용이 바로 보입니다. sitemap · OG 이미지는 빌드 시점 콘텐츠를 씁니다.

## Cloudflare 배포 (관리자 페이지 포함)

Cloudflare Workers 에 OpenNext 어댑터로 올립니다. 콘텐츠 저장은 Supabase 를 씁니다.

1. Supabase 프로젝트를 만들고 SQL Editor 에서 `supabase/schema.sql` 을 실행합니다. Project Settings → API 에서 URL 과 `service_role` 키를 확인합니다.
2. `wrangler.jsonc` 의 `vars.SUPABASE_URL` 과 `vars.NEXT_PUBLIC_SITE_URL` 을 채웁니다.
3. Cloudflare 로그인 후 비밀값을 등록합니다.
   ```bash
   npx wrangler login
   npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put ADMIN_SESSION_SECRET   # 예: openssl rand -base64 32
   npx wrangler secret put RESEND_API_KEY          # 문의 메일을 쓸 때만
   ```
4. 배포: `npm run cf:deploy` (로컬 미리보기: `npm run cf:preview`). 배포 주소의 `/admin` 이 관리자 페이지입니다.
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
