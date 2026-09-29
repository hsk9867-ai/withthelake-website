#!/usr/bin/env bash
# GitHub Pages 배포: 정적 내보내기 결과(out/)를 gh-pages 브랜치에 푸시합니다.
# 사용: npm run deploy:pages
set -euo pipefail
export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL="*"

REPO_NAME="${REPO_NAME:-withthelake-website}"
OWNER="${OWNER:-hsk9867-ai}"
REMOTE="${REMOTE:-origin}"

cd "$(dirname "$0")/.."

# 정적 내보내기에서는 서버 API 와 관리자 페이지(서버 액션·쿠키)를 쓸 수 없으므로 잠시 치워 둡니다.
# 문의 폼은 mailto 로 대체되고, 콘텐츠는 content/site-content.json 의 저장본이 그대로 빌드에 들어갑니다.
SERVER_DIRS="api admin uploads"
BACKUP="$(mktemp -d)"
restore() {
  for d in $SERVER_DIRS; do
    [ -d "$BACKUP/$d" ] && rm -rf "src/app/$d" && mv "$BACKUP/$d" "src/app/$d"
  done
  return 0
}
trap restore EXIT
for d in $SERVER_DIRS; do
  [ -d "src/app/$d" ] && mv "src/app/$d" "$BACKUP/$d"
done

rm -rf out .next
GITHUB_PAGES=true \
NEXT_PUBLIC_BASE_PATH="/$REPO_NAME" \
NEXT_PUBLIC_SITE_URL="https://$OWNER.github.io/$REPO_NAME" \
npm run build

restore
trap - EXIT

touch out/.nojekyll
REMOTE_URL="$(git remote get-url "$REMOTE")"
SHA="$(git rev-parse --short HEAD)"

pushd out >/dev/null
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Deploy $SHA to GitHub Pages"
git push -f "$REMOTE_URL" gh-pages:gh-pages
popd >/dev/null
rm -rf out/.git

echo "Deployed: https://$OWNER.github.io/$REPO_NAME/"
