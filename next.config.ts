import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true 로 빌드하면 정적 내보내기(out/)로 GitHub Pages 에 올릴 수 있습니다.
 * 기본(Vercel 등)에서는 서버 기능(문의 API, 이미지 최적화)을 그대로 씁니다.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? process.env.NEXT_PUBLIC_BASE_PATH ?? "" : "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        // 정적 호스팅: 이미지 최적화 대신 basePath 만 붙이는 로더 사용
        images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
      }
    : {}),
};

export default nextConfig;
