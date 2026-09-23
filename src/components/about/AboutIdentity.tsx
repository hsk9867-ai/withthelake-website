import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function AboutIdentity() {
  return (
    <section className="bg-surface py-24 md:py-28">
      <Container className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            방문자가 갖게 할 인식
          </p>
          <p className="mt-5 text-[19px] font-bold leading-9 text-ink md:text-[21px]">
            맨발걷기, 제품, 프로그램, SENIO를 각각 하는 회사가 아니라,
            <br />
            시니어가 자신의 건강을 이해하고 건강한 행동을 지속하도록
            기술·데이터·웰니스·지역사회를 연결하는 회사
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-accent-dark">
            핵심 메시지
          </p>
          <p className="mt-5 text-[19px] font-bold leading-9 text-ink md:text-[21px]">
            건강한 삶은 병원 밖, 일상에서 시작됩니다.
          </p>
          <p className="mt-4 text-[15px] leading-8 text-muted">
            건강정보를 제공하는 것에서 끝나지 않고, 측정 → 이해 → 건강행동 →
            지속 → 변화 확인까지 연결되는 예방건강관리 구조를 만들어갑니다.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
