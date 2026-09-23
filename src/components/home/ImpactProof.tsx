import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const PARTNER_PHOTOS = [
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

export default function ImpactProof() {
  return (
    <section className="bg-primary py-24 text-white md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.2em] text-accent">
                IMPACT & PROOF
              </p>
              <h2 className="mt-4 max-w-xl text-[26px] font-extrabold leading-snug tracking-tight md:text-[34px]">
                현장에서 검증하며 쌓아온 신뢰
              </h2>
            </div>
            <Button href="/impact" variant="ghost">
              전체 성과 보기
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={i * 100} className="group overflow-hidden rounded-2xl bg-white/10">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="px-4 py-3 text-[13px] font-semibold text-white/90">{p.name}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-[15px] font-semibold text-accent">인증</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {CERTS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/25 px-4 py-2 text-[13px] text-white/90"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-accent">수상</h3>
            <ul className="mt-4 space-y-2 text-[15px] leading-7 text-white/90">
              {AWARDS.map((a) => (
                <li key={a}>· {a}</li>
              ))}
            </ul>

            <h3 className="mt-9 text-[15px] font-semibold text-accent">선정 사업</h3>
            <ul className="mt-4 space-y-2 text-[15px] leading-7 text-white/90">
              {PROGRAMS.map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 max-w-2xl text-[14px] leading-7 text-white/70">
          핵심 알고리즘 특허 출원 완료(2026.08) · 맨발걷기 지도자 양성과정, 건강동행리더 양성 등
          건강리더 양성 프로그램을 운영하고 있습니다.
        </p>
      </Container>
    </section>
  );
}
