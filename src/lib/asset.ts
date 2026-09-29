/** 정적 배포(GitHub Pages) 시 하위 경로. next/image 와 Link 는 자동 처리되므로 raw URL 에만 붙입니다. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (/^(https?:)?\/\//.test(path) || path.startsWith("data:") ? path : `${BASE_PATH}${path}`);

/** 사이트 공개 URL (sitemap · OG 절대경로) */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.withthelake.com";

export function formatPrice(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}
