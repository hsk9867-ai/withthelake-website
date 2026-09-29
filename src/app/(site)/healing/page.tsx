import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import ProductCard from "@/components/store/ProductCard";
import HealingApp from "@/components/healing/AudioGuide";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { healing } = await getContent();
  return { title: healing.meta.title, description: healing.meta.description };
}

/** 힐링로드 ON: 옛 서비스 앱 화면과 같은 구성의 한 화면 페이지 */
export default async function HealingPage() {
  const { healing, store, site } = await getContent();
  const products = store.products.slice(0, Math.max(0, healing.store.count));

  return (
    <div className="bg-surface pt-[72px]">
      <Container size="narrow" className="py-8 md:py-12">
        <h1 className="sr-only">{healing.header.title}</h1>
        <HealingApp audio={healing.audio} record={healing.record} survey={healing.survey} />

        {/* 제품 */}
        <section aria-labelledby="healing-store" className="mt-10">
          <h2 id="healing-store" className="text-[24px] font-bold text-ink">🛒 {healing.store.title}</h2>
          {products.length > 0 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {products.map((p, i) => (
                <ProductCard key={`${p.url}-${i}`} product={p} />
              ))}
            </div>
          )}
          {site.links.store && (
            <div className="mt-5">
              <Button href={site.links.store} variant="secondary" external arrow>
                {healing.store.buttonLabel}
              </Button>
            </div>
          )}
        </section>

        {/* 커뮤니티 */}
        {site.links.cafe && (
          <section className="mt-10 rounded-[22px] bg-cream p-6">
            <p className="text-[18px] font-bold text-ink">💬 {healing.community.title}</p>
            <p className="mt-2 text-[15px] leading-6 text-muted">{healing.community.body}</p>
            <div className="mt-4">
              <Button href={site.links.cafe} variant="secondary" size="sm" external arrow>
                {healing.community.buttonLabel}
              </Button>
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
