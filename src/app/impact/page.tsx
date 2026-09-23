import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "IMPACT",
  description: "주요 프로젝트 · 실증 · R&D · 성과 · 수상 · 사회적 가치 · 파트너",
};

const PROJECTS = [
  { src: "/assets/activities/interview-gangwon-elderly.jpg", caption: "대한노인회 강원연합회 인터뷰" },
  { src: "/assets/activities/interview-wonju-medical.jpg", caption: "원주의료사회협동조합 인터뷰" },
  { src: "/assets/activities/interview-udu-center.jpg", caption: "우두경로당 인터뷰" },
  { src: "/assets/activities/governance-meeting.jpg", caption: "시니어돌봄거버넌스 협의체 회의" },
  { src: "/assets/activities/wellness-lecture.jpg", caption: "웰니스 특강" },
];

const PARTNERS = [
  { src: "/assets/partners/mou-chuncheon-future.jpg", name: "춘천미래동행재단" },
  { src: "/assets/partners/mou-chuncheon-hope.jpg", name: "춘천 희망요양원" },
  { src: "/assets/partners/mou-hongcheon-uptown.jpg", name: "업타운㈜" },
  { src: "/assets/partners/mou-zest.jpg", name: "제스트㈜" },
];

const CERTS = ["벤처기업", "소셜벤처기업", "강원도 예비사회적기업", "여성기업"];
const AWARDS = [
  "강원지방중소벤처기업청장상",
  "강원관광재단 이사장상",
  "강원여성창업 공모전 대상",
];
const PROGRAMS = [
  "한라대·한림성심대 RISE",
  "강원 AI헬스케어 글로벌혁신특구",
  "MG함께자람 사회경제조직육성사업",
  "강원창업 초기 지원사업",
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-8">
      <h2 className="text-[17px] font-bold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ImpactPage() {
  return (
    <>
      <section className="bg-primary py-20 text-white md:py-24">
        <Container>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
            IMPACT & PROOF
          </p>
          <h1 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
            현장에서 검증하며 쌓아온 신뢰
          </h1>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <Container className="space-y-6">
          <Reveal className="rounded-2xl border border-line bg-white p-8">
            <h2 className="text-[17px] font-bold text-ink">주요 프로젝트</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p) => (
                <div key={p.src} className="group overflow-hidden rounded-xl border border-line">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="px-3 py-2.5 text-[13px] font-medium text-ink">{p.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-line bg-white p-8">
            <h2 className="text-[17px] font-bold text-ink">협력기관 (MOU)</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTNERS.map((p) => (
                <div key={p.src} className="group overflow-hidden rounded-xl border border-line">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="px-3 py-2.5 text-[13px] font-semibold text-primary">{p.name}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160} className="rounded-2xl border border-line bg-white p-8">
            <h2 className="text-[17px] font-bold text-ink">건강리더 양성</h2>
            <p className="mt-2 text-[14.5px] leading-7 text-muted">
              맨발걷기 지도자 양성과정을 운영하며, 건강동행리더를 양성하고
              있습니다.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {["/assets/activities/training-1.jpg", "/assets/activities/training-2.jpg"].map((src) => (
                <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line">
                  <Image src={src} alt="맨발걷기 지도자 양성과정" fill className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <Block title="지식재산">
                <p className="text-[14.5px] leading-7 text-muted">
                  핵심 알고리즘 특허 출원 완료 (2026.08.19, 출원번호
                  10-2026-0155385) · 상표 출원 4건 · 기기 외관 디자인 출원 1건
                </p>
              </Block>
            </Reveal>

            <Reveal delay={80}>
              <Block title="인증">
                <ul className="flex flex-wrap gap-2.5">
                  {CERTS.map((c) => (
                    <li
                      key={c}
                      className="rounded-full bg-primary-light px-4 py-2 text-[13.5px] font-semibold text-primary"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="수상">
                <ul className="space-y-2 text-[14.5px] leading-7 text-muted">
                  {AWARDS.map((a) => (
                    <li key={a}>· {a}</li>
                  ))}
                </ul>
              </Block>
            </Reveal>

            <Reveal delay={80}>
              <Block title="선정 사업">
                <ul className="space-y-2 text-[14.5px] leading-7 text-muted">
                  {PROGRAMS.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </Block>
            </Reveal>

            <Reveal>
              <Block title="연구개발">
                <p className="text-[14.5px] leading-7 text-muted">
                  연구개발 누적 수주 4억원 이상. 중소벤처기업부 디딤돌 R&D,
                  Pre-TIPS, 강원 초기창업 등 정부 R&D 과제를 수행하며 개발을
                  진행해왔습니다.
                </p>
              </Block>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
