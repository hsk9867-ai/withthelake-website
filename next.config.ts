import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true 로 빌드하면 정적 내보내기(out/)로 GitHub Pages 에 올릴 수 있습니다.
 * 기본(Vercel 등)에서는 서버 기능(문의 API, 관리자 페이지, 이미지 최적화)을 그대로 씁니다.
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
    : {
        images: {
          // 관리자에서 올린 이미지: Supabase Storage(공개 버킷) 또는 GitHub 저장소(raw URL)
          remotePatterns: [
            { protocol: "https", hostname: "*.supabase.co" },
            { protocol: "https", hostname: "*.supabase.in" },
            { protocol: "https", hostname: "raw.githubusercontent.com" },
          ],
        },
      }),
  experimental: {
    // 관리자 이미지 업로드(서버 액션) 용량
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
