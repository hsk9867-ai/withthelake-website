import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { getContent } from "@/lib/cms/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
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
