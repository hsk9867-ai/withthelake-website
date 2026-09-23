import type { Metadata } from "next";
import Container from "@/components/Container";
import WhatWeDo from "@/components/home/WhatWeDo";

export const metadata: Metadata = {
  title: "WHAT WE DO",
  description: "SENIO, WITH WELL ME, COMMUNITY HEALTH — 세 가지 방식으로 건강을 연결합니다.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <section className="bg-primary py-20 text-white md:py-24">
        <Container>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
            WHAT WE DO
          </p>
          <h1 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
            SENIO · WITH WELL ME · COMMUNITY HEALTH
          </h1>
        </Container>
      </section>
      <WhatWeDo />
    </>
  );
}
