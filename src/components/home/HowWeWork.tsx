import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconContinue, IconMeasure, IconTrend, IconUnderstand, IconWalk } from "@/components/Icons";

const STEPS = [
  { n: "01", title: "측정", en: "Measure", icon: IconMeasure, body: "소변 기반 생체데이터와 걷기·운동 등 생활데이터를 일상에서 확인합니다" },
  { n: "02", title: "이해", en: "Understand", icon: IconUnderstand, body: "숫자를 쉬운 언어로 바꿔, 지금 내 상태가 어떤 의미인지 알려줍니다" },
  { n: "03", title: "행동", en: "Act", icon: IconWalk, body: "상태에 맞는 건강 루틴과 프로그램으로 다음 행동을 제안합니다" },
  { n: "04", title: "지속", en: "Continue", icon: IconContinue, body: "기록이 쌓이고 리마인드가 이어져 습관이 유지됩니다" },
  { n: "05", title: "변화 확인", en: "Confirm", icon: IconTrend, body: "다시 측정해 나아졌는지 확인하고, 그 변화가 다음 행동의 이유가 됩니다" },
];

/* ---------- 순환 다이어그램 (레퍼런스 WHY 섹션의 동심원 + 기획서의 순환 구조) ---------- */
const SIZE = 620;
const C = SIZE / 2;
const R = 230;
const NODE_R = 46;

function pos(i: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length;
  return { x: C + R * Math.cos(angle), y: C + R * Math.sin(angle), angle };
}

function arc(i: number) {
  const a = pos(i);
  const b = pos((i + 1) % STEPS.length);
  const gap = (NODE_R + 12) / R;
  const a1 = a.angle + gap;
  const a2 = b.angle - gap;
  return `M ${(C + R * Math.cos(a1)).toFixed(1)} ${(C + R * Math.sin(a1)).toFixed(1)} A ${R} ${R} 0 0 1 ${(C + R * Math.cos(a2)).toFixed(1)} ${(C + R * Math.sin(a2)).toFixed(1)}`;
}

function CycleDiagram() {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full max-w-[620px]"
      role="img"
      aria-label="측정, 이해, 행동, 지속, 변화 확인의 다섯 단계가 원형으로 순환하는 구조"
    >
      <defs>
        <marker id="hw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent)" />
        </marker>
      </defs>
      {[R + 60, R + 110].map((r) => (
        <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <circle cx={C} cy={C} r={R - 90} fill="var(--color-primary)" />

      {STEPS.map((_, i) => (
        <path
          key={i}
          d={arc(i)}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.2"
          markerEnd="url(#hw-arrow)"
          className={i === STEPS.length - 1 ? "animate-dash" : ""}
          strokeDasharray={i === STEPS.length - 1 ? "6 8" : undefined}
        />
      ))}

      {STEPS.map((s, i) => {
        const p = pos(i);
        return (
          <g key={s.n} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            <circle r={NODE_R} fill="var(--color-navy)" stroke="var(--color-accent)" strokeWidth="2" />
            <text y="-8" textAnchor="middle" fontFamily="var(--font-display)" fontSize="12" fontWeight="700" fill="var(--color-accent)" letterSpacing="1">
              {s.n}
            </text>
            <text y="16" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
              {s.title}
            </text>
          </g>
        );
      })}

      <text x={C} y={C - 22} textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="rgba(255,255,255,0.8)" letterSpacing="2">
        CLOSED LOOP
      </text>
      <text x={C} y={C + 10} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
        확인이 다음 행동의
      </text>
      <text x={C} y={C + 38} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
        이유가 되는 순환
      </text>
    </svg>
  );
}

export default function HowWeWork() {
  return (
    <section className="bg-rings section relative overflow-hidden bg-navy text-white">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          tone="dark"
          align="center"
          title="건강정보를 제공하는 것에서 끝내지 않습니다"
          lead="측정에서 변화 확인까지 다섯 단계가 하나로 이어지고, 확인된 변화는 다시 측정으로 돌아옵니다."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal delay={100} className="flex justify-center">
            <CycleDiagram />
          </Reveal>

          <ol className="space-y-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.n} delay={i * 70} className="flex gap-5 rounded-[10px] border border-white/10 bg-white/[0.04] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span className="text-[19px] font-bold">{s.title}</span>
                      <span className="t-meta text-accent">{s.en}</span>
                    </p>
                    <p className="t-body mt-1 text-white/75">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
