import { connection } from "next/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { getContent } from "@/lib/cms/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  // 사이트 페이지를 요청 시 렌더링해 관리자에서 저장한 내용이 바로 보이게 합니다.
  // (Cloudflare 처럼 빌드 시 정적 페이지를 다시 만들 수 없는 서버에서도 동작)
  // GitHub Pages 정적 내보내기(GITHUB_PAGES=true)에서는 빌드 시점 콘텐츠로 고정합니다.
  if (process.env.GITHUB_PAGES !== "true") await connection();
  const { site } = await getContent();
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-5 focus:py-3 focus:text-white"
      >
        본문으로 건너뛰기
      </a>
      <Header site={site} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer site={site} />
      <Analytics />
    </>
  );
}
