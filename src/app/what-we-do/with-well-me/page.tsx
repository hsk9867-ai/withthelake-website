import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "WITH WELL ME",
  description:
    "강원도 자연원료 기반 셀프케어 제품과 건강 루틴·콘텐츠로 건강한 생활습관이 지속되도록 돕는 웰니스 브랜드입니다.",
};

const AXES = [
  { name: "EAT", desc: "콘텐츠 및 제품 정보 준비 중입니다." },
  { name: "MOVE", desc: "콘텐츠 및 제품 정보 준비 중입니다." },
  { name: "WALK", desc: "콘텐츠 및 제품 정보 준비 중입니다." },
  { name: "CARE", desc: "콘텐츠 및 제품 정보 준비 중입니다." },
  { name: "RECOVER", desc: "콘텐츠 및 제품 정보 준비 중입니다." },
];

export default function WithWellMePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary py-20 text-white md:py-24">
        <Image
          src="/assets/stock/barefoot-trail.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/50"
        />
        <Container className="relative">
          <Image
            src="/assets/logo/with-well-me.png"
            alt="WITH WELL ME"
            width={2000}
            height={500}
            className="h-10 w-auto"
          />
          <h1 className="mt-6 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
            건강한 행동을 일상으로
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/85">
            걷기, 운동, 건강 루틴, 콘텐츠, 셀프케어 제품을 통해 건강한
            생활습관이 지속되도록 돕는 웰니스 브랜드입니다. 강원도 자연원료
            기반 셀프케어 제품과 건강 루틴·콘텐츠를 준비하고 있습니다.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-20 md:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {AXES.map((axis) => (
              <div key={axis.name} className="rounded-2xl border border-line p-6">
                <p className="text-[16px] font-extrabold text-primary">{axis.name}</p>
                <p className="mt-2 text-[13.5px] leading-6 text-muted">{axis.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-cream p-9 text-center">
            <p className="text-[15px] leading-7 text-muted">
              제품 정보가 확정되는 대로 순차적으로 공개할 예정입니다. 제품
              구매는 네이버 스마트스토어에서 안내해 드립니다.
            </p>
            <Button href="/store" variant="primary" className="mt-6">
              스토어 바로가기
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
