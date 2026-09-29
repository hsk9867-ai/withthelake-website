import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/store/ProductCard";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { store } = await getContent();
  return { title: store.meta.title, description: store.meta.description };
}

export default async function StorePage() {
  const { store, site } = await getContent();
  // 카테고리 목록에 없는 제품도 누락되지 않도록 뒤에 붙입니다.
  const extra = Array.from(new Set(store.products.map((p) => p.category))).filter((c) => !store.categories.includes(c));
  const categories = [...store.categories, ...extra];

  return (
    <>
      <PageHeader eyebrow={store.header.eyebrow} crumbs={[{ label: "STORE" }]} title={store.header.title} lead={store.header.lead}>
        <div className="flex flex-wrap gap-3">
          <Button href={site.links.store} variant="primary" size="lg" external arrow>
            {store.header.ctaLabel}
          </Button>
          {site.publish.withWellMe && (
            <Button href="/what-we-do/with-well-me" variant="secondary" size="lg">
              {store.header.brandCtaLabel}
            </Button>
          )}
        </div>
      </PageHeader>

      <section className="section bg-surface">
        <Container>
          {categories.map((cat, ci) => {
            const items = store.products.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className={ci > 0 ? "mt-16" : ""}>
                <Reveal className="flex items-baseline gap-3">
                  <h2 className="t-h3 text-ink">{cat}</h2>
                  <span className="t-meta text-muted">{items.length}개</span>
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((p, i) => (
                    <Reveal key={`${p.url}-${i}`} delay={i * 80}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="section bg-cream">
        <Container>
          <div className="grid items-center gap-10 rounded-[24px] bg-white p-8 md:grid-cols-[1fr_1fr] md:p-12">
            <div>
              {store.brand.logo && <Image src={store.brand.logo} alt="WITH WELL ME" width={2000} height={500} className="h-9 w-auto" />}
              <p className="t-lead mt-6 text-ink-2">{store.brand.lead}</p>
              <p className="t-body mt-4 text-muted">{store.brand.body}</p>
              <div className="mt-6">
                <Button href="/contact?type=product" variant="secondary">
                  {store.brand.ctaLabel}
                </Button>
              </div>
            </div>
            {store.brand.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={store.brand.image} alt={store.brand.imageAlt} fill sizes="(min-width:768px) 520px, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
