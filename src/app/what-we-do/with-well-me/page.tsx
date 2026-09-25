import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { SITE } from "@/content/site";
import ProductCard from "@/components/store/ProductCard";
import { PRODUCTS, STORE_URL } from "@/content/products";

export const metadata: Metadata = {
  title: "WITH WELL ME — 웰니스 브랜드",
  description:
    "강원도 자연원료 기반 셀프케어 제품과 건강 루틴·콘텐츠로 건강한 생활습관이 지속되도록 돕는 웰니스 브랜드입니다.",
  robots: SITE.publish.withWellMe ? undefined : { index: false, follow: false },
};

/** 5개 축 */
const AXES = [
  { name: "EAT", ko: "먹기", desc: "강원도 자연원료 기반 식품과 식습관 루틴" },
  { name: "MOVE", ko: "움직이기", desc: "일상에서 이어가는 운동 루틴과 콘텐츠" },
  { name: "WALK", ko: "걷기", desc: "맨발걷기에서 시작한 걷기 습관과 프로그램" },
  { name: "CARE", ko: "돌보기", desc: "몸 상태를 확인하고 돌보는 셀프케어 제품" },
  { name: "RECOVER", ko: "회복하기", desc: "휴식과 회복을 돕는 루틴과 제품" },
];

export default function WithWellMePage() {
  if (!SITE.publish.withWellMe) notFound();

  return (
    <>
      <PageHeader
        eyebrow="With Well Me"
        crumbs={[{ label: "WHAT WE DO", href: "/what-we-do" }, { label: "WITH WELL ME" }]}
        title="위드웰미"
        lead="건강한 행동을 일상으로. 걷기, 운동, 건강 루틴, 콘텐츠, 셀프케어 제품을 통해 건강한 생활습관이 지속되도록 돕는 웰니스 브랜드입니다. 강원도 자연원료 기반 셀프케어 제품과 건강 루틴·콘텐츠를 준비하고 있습니다."
        image="/assets/stock/barefoot-trail.jpg"
        imageAlt="숲길을 맨발로 걷는 모습"
      >
        <Image
          src="/assets/logo/with-well-me.png"
          alt="WITH WELL ME"
          width={2000}
          height={500}
          className="h-9 w-auto"
        />
      </PageHeader>

      <section className="section bg-surface">
        <Container>
          <SectionHeading
            eyebrow="5 Axes"
            title="다섯 가지 축으로 건강한 하루를 설계합니다"
            lead="먹고, 움직이고, 걷고, 돌보고, 회복하는 하루의 리듬을 제품과 콘텐츠로 뒷받침합니다."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {AXES.map((axis, i) => (
              <Reveal as="li" key={axis.name} delay={i * 80} className="group bg-white p-7 transition-colors hover:bg-primary-light">
                <p className="t-meta text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <p className="font-display mt-6 text-[24px] font-bold tracking-tight text-primary">{axis.name}</p>
                <p className="text-[15px] font-semibold text-ink">{axis.ko}</p>
                <p className="t-body mt-3 text-muted">{axis.desc}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section bg-cream">
        <Container>
          <SectionHeading
            eyebrow="Products"
            title="제품 소개"
            lead="위드웰미 풋케어 제품과 어싱 제품, 힐링로드ON 걷기 체험을 네이버 스마트스토어에서 구매하실 수 있습니다."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.url} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-white p-7">
            <p className="t-body text-ink-2">WITH WELL ME 제품은 네이버 스마트스토어에서 만나보실 수 있습니다.</p>
            <Button href={STORE_URL} variant="primary" external arrow>
              스토어 바로가기
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
