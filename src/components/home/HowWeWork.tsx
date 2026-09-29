import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconByName } from "@/components/Icons";
import { lines } from "@/lib/cms/helpers";
import type { HomeContent } from "@/lib/cms/types";

type Data = HomeContent["howWeWork"];

/* ---------- 순환 다이어그램 (레퍼런스 WHY 섹션의 동심원 + 기획서의 순환 구조) ---------- */
const SIZE = 620;
const C = SIZE / 2;
const R = 230;
const NODE_R = 46;

function CycleDiagram({ data }: { data: Data }) {
  const steps = data.steps;
  const n = Math.max(steps.length, 1);
  const pos = (i: number) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: C + R * Math.cos(angle), y: C + R * Math.sin(angle), angle };
  };
  const arc = (i: number) => {
    const a = pos(i);
    const b = pos((i + 1) % n);
    const gap = (NODE_R + 12) / R;
    const a1 = a.angle + gap;
    const a2 = b.angle - gap;
    return `M ${(C + R * Math.cos(a1)).toFixed(1)} ${(C + R * Math.sin(a1)).toFixed(1)} A ${R} ${R} 0 0 1 ${(C + R * Math.cos(a2)).toFixed(1)} ${(C + R * Math.sin(a2)).toFixed(1)}`;
  };
  const center = lines(data.centerText);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full max-w-[620px]"
      role="img"
      aria-label={`${steps.map((s) => s.title).join(", ")}의 ${steps.length}단계가 원형으로 순환하는 구조`}
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

      {steps.map((_, i) => (
        <path
          key={i}
          d={arc(i)}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.2"
          markerEnd="url(#hw-arrow)"
          className={i === steps.length - 1 ? "animate-dash" : ""}
          strokeDasharray={i === steps.length - 1 ? "6 8" : undefined}
        />
      ))}

      {steps.map((s, i) => {
        const p = pos(i);
        return (
          <g key={`${s.n}-${i}`} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
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
        {data.centerLabel}
      </text>
      {center.map((line, i) => (
        <text key={i} x={C} y={C + 10 + i * 28} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
          {line}
        </text>
      ))}
    </svg>
  );
}

export default function HowWeWork({ data }: { data: Data }) {
  return (
    <section className="bg-rings section relative overflow-hidden bg-navy text-white">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} tone="dark" align="center" title={data.title} lead={data.lead} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal delay={100} className="flex justify-center">
            <CycleDiagram data={data} />
          </Reveal>

          <ol className="space-y-3">
            {data.steps.map((s, i) => (
              <Reveal as="li" key={`${s.n}-${i}`} delay={i * 70} className="flex gap-5 rounded-[10px] border border-white/10 bg-white/[0.04] p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <IconByName name={s.icon} size={22} />
                </span>
                <div>
                  <p className="flex items-baseline gap-3">
                    <span className="text-[19px] font-bold">{s.title}</span>
                    <span className="t-meta text-accent">{s.en}</span>
                  </p>
                  <p className="t-body mt-1 text-white/75">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
