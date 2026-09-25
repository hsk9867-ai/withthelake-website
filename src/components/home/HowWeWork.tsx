import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  IconContinue,
  IconMeasure,
  IconTrend,
  IconUnderstand,
  IconWalk,
} from "@/components/Icons";

const STEPS = [
  { n: "01", title: "측정", en: "Measure", icon: IconMeasure, body: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 일상에서 확인합니다" },
  { n: "02", title: "이해", en: "Understand", icon: IconUnderstand, body: "숫자를 쉬운 언어로 바꿔, 지금 내 상태가 어떤 의미인지 알려줍니다" },
  { n: "03", title: "행동", en: "Act", icon: IconWalk, body: "상태에 맞는 건강 루틴과 프로그램으로 다음 행동을 제안합니다" },
  { n: "04", title: "지속", en: "Continue", icon: IconContinue, body: "기록이 쌓이고 리마인드가 이어져 습관이 유지됩니다" },
  { n: "05", title: "변화 확인", en: "Confirm", icon: IconTrend, body: "다시 측정해 나아졌는지 확인하고, 그 변화가 다음 행동의 이유가 됩니다" },
];

/* ---------- 순환 다이어그램 (기획서: 마지막 단계에서 첫 단계로 이어지는 순환) ---------- */
const SIZE = 560;
const C = SIZE / 2;
const R = 200;
const NODE_R = 42;

function pos(i: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length;
  return { x: C + R * Math.cos(angle), y: C + R * Math.sin(angle), angle };
}

function arc(i: number) {
  const a = pos(i);
  const b = pos((i + 1) % STEPS.length);
  // 노드 가장자리에서 시작/끝나도록 각도 오프셋
  const gap = (NODE_R + 10) / R;
  const a1 = a.angle + gap;
  const a2 = b.angle - gap;
  const sx = C + R * Math.cos(a1);
  const sy = C + R * Math.sin(a1);
  const ex = C + R * Math.cos(a2);
  const ey = C + R * Math.sin(a2);
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${R} ${R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

function CycleDiagram() {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full max-w-[560px]"
      role="img"
      aria-label="측정, 이해, 행동, 지속, 변화 확인의 다섯 단계가 원형으로 순환하는 구조"
    >
      <defs>
        <marker id="hw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent-dark)" />
        </marker>
      </defs>

      {/* 배경 링 */}
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={R - 70} fill="var(--color-primary-light)" opacity="0.7" />

      {/* 흐름 화살표 */}
      {STEPS.map((_, i) => (
        <path
          key={i}
          d={arc(i)}
          fill="none"
          stroke="var(--color-accent-dark)"
          strokeWidth="2.2"
          markerEnd="url(#hw-arrow)"
          className={i === STEPS.length - 1 ? "animate-dash" : ""}
          strokeDasharray={i === STEPS.length - 1 ? "6 8" : undefined}
        />
      ))}

      {/* 노드 */}
      {STEPS.map((s, i) => {
        const p = pos(i);
        return (
          <g key={s.n} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            <circle r={NODE_R} fill="#fff" stroke="var(--color-primary)" strokeWidth="2" />
            <text
              y="-6"
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="12"
              fontWeight="600"
              fill="var(--color-accent-deep)"
              letterSpacing="1"
            >
              {s.n}
            </text>
            <text y="16" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--color-ink)">
              {s.title}
            </text>
          </g>
        );
      })}

      {/* 중앙 문구 */}
      <text x={C} y={C - 14} textAnchor="middle" fontSize="15" fill="var(--color-muted)">
        확인이 다음 행동의
      </text>
      <text x={C} y={C + 12} textAnchor="middle" fontSize="15" fill="var(--color-muted)">
        이유가 되는 순환
      </text>
      <text
        x={C}
        y={C + 40}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="11"
        fontWeight="600"
        letterSpacing="2"
        fill="var(--color-primary)"
      >
        CLOSED LOOP
      </text>
    </svg>
  );
}

export default function HowWeWork() {
  return (
    <section className="section bg-surface">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              index="04"
              eyebrow="How We Work"
              title="건강정보를 제공하는 것에서 끝내지 않습니다"
              lead="측정에서 변화 확인까지 다섯 단계가 하나로 이어지고, 확인된 변화는 다시 측정으로 돌아옵니다."
            />
            <ol className="mt-10 divide-y divide-line border-y border-line">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal as="li" key={s.n} delay={i * 70} className="flex gap-5 py-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="flex items-baseline gap-3">
                        <span className="t-h3 text-ink">{s.title}</span>
                        <span className="t-meta text-accent-deep">{s.en}</span>
                      </p>
                      <p className="t-body mt-1 text-muted">{s.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <Reveal delay={120} className="flex justify-center lg:justify-end">
            <CycleDiagram />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
