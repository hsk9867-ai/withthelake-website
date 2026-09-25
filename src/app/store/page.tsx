import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/store/ProductCard";
import { SITE } from "@/content/site";
import { PRODUCTS, PRODUCT_CATEGORIES, STORE_URL } from "@/content/products";

export const metadata: Metadata = {
  title: "STORE — WITH WELL ME 마켓",
  description: "맨발걷기와 셀프케어를 위한 WITH WELL ME 제품을 네이버 스마트스토어에서 만나보세요.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store · WITH WELL ME 마켓"
        crumbs={[{ label: "STORE" }]}
        title="맨발걷기와 셀프케어를 위한 제품"
        lead="위드웰미 풋케어, 어싱 제품, 힐링로드ON 걷기 체험을 네이버 스마트스토어에서 구매하실 수 있습니다. 제품을 누르면 스마트스토어 상품 페이지로 이동합니다."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={STORE_URL} variant="primary" size="lg" external arrow>
            네이버 스마트스토어 방문하기
          </Button>
          {SITE.publish.withWellMe && (
            <Button href="/what-we-do/with-well-me" variant="secondary" size="lg">
              브랜드 소개 보기
            </Button>
          )}
        </div>
      </PageHeader>

      <section className="section bg-surface">
        <Container>
          {PRODUCT_CATEGORIES.map((cat, ci) => {
            const items = PRODUCTS.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className={ci > 0 ? "mt-16" : ""}>
                <Reveal className="flex items-baseline gap-3">
                  <h2 className="t-h3 text-ink">{cat}</h2>
                  <span className="t-meta text-muted">{items.length}개</span>
                </Reveal>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((p, i) => (
                    <Reveal key={p.url} delay={i * 80}>
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
              <Image src="/assets/logo/with-well-me.png" alt="WITH WELL ME" width={2000} height={500} className="h-9 w-auto" />
              <p className="t-lead mt-6 text-ink-2">
                EAT · MOVE · WALK · CARE · RECOVER — 하루의 리듬을 따라 건강한 행동을 일상으로 잇는 제품과
                콘텐츠를 만듭니다.
              </p>
              <p className="t-body mt-4 text-muted">
                단체 구매나 제품 관련 문의는 CONTACT US에서 &lsquo;제품·구매&rsquo; 유형을 선택해 남겨 주세요.
              </p>
              <div className="mt-6">
                <Button href="/contact?type=product" variant="secondary">
                  제품·구매 문의
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/assets/stock/barefoot-trail.jpg" alt="숲길을 맨발로 걷는 모습" fill sizes="(min-width:768px) 520px, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
