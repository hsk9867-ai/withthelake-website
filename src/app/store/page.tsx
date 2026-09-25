import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "STORE — 네이버 스마트스토어",
  description: "WITH WELL ME 제품은 네이버 스마트스토어에서 만나보실 수 있습니다.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store"
        crumbs={[{ label: "STORE" }]}
        title="WITH WELL ME 제품은 네이버 스마트스토어에서 만나보실 수 있습니다"
        lead="강원도 자연원료 기반 셀프케어 제품과 건강 루틴 제품을 준비하고 있습니다."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={SITE.links.store} variant="primary" size="lg" external arrow>
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
          <div className="grid items-center gap-10 rounded-[24px] bg-cream p-8 md:grid-cols-[1fr_1fr] md:p-12">
            <div>
              <Image src="/assets/logo/with-well-me.png" alt="WITH WELL ME" width={2000} height={500} className="h-9 w-auto" />
              <p className="t-lead mt-6 text-ink-2">
                EAT · MOVE · WALK · CARE · RECOVER — 하루의 리듬을 따라 건강한 행동을 일상으로 잇는 제품과
                콘텐츠를 만듭니다.
              </p>
              <p className="t-body mt-4 text-muted">
                제품·구매 관련 문의는 CONTACT US에서 &lsquo;제품·구매&rsquo; 유형을 선택해 남겨 주세요.
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
