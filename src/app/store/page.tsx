import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "STORE",
  description: "WITH WELL ME 제품은 네이버 스마트스토어에서 만나보실 수 있습니다.",
};

export default function StorePage() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
          STORE
        </p>
        <h1 className="mt-4 max-w-lg text-[24px] font-extrabold leading-snug tracking-tight text-ink md:text-[30px]">
          WITH WELL ME 제품은 네이버 스마트스토어에서 만나보실 수 있습니다
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-7 text-muted">
          스토어 연동 링크는 제품 정보가 확정되는 대로 연결됩니다.
        </p>
        <a
          href="https://smartstore.naver.com"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 text-[15px] font-semibold text-white hover:bg-primary-dark"
        >
          네이버 스마트스토어 방문하기
        </a>
      </Container>
    </section>
  );
}
