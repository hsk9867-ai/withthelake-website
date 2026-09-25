/**
 * GitHub Pages(정적 내보내기)용 next/image 로더.
 * 이미지 최적화 서버가 없으므로 원본 경로에 basePath 만 붙여 그대로 씁니다.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src) || src.startsWith("data:")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src}`;
}
