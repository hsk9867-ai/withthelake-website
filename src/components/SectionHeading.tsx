import { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * 섹션 공통 헤딩: 번호 + 영문 라벨(eyebrow) / 제목 / 리드 문장.
 * tone="dark" 는 보라색 배경 섹션용.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  action,
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  const center = align === "center";

  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <div
        className={`flex flex-wrap gap-6 ${center ? "flex-col items-center" : "items-end justify-between"}`}
      >
        <div className={center ? "flex flex-col items-center" : ""}>
          {(eyebrow || index) && (
            <p
              className={`eyebrow flex items-center gap-3 ${dark ? "text-accent" : "text-accent-deep"}`}
            >
              {index && <span className="tabular-nums">{index}</span>}
              {index && <span aria-hidden className={`h-px w-6 ${dark ? "bg-accent/60" : "bg-accent-deep/50"}`} />}
              {eyebrow}
            </p>
          )}
          <h2 className={`t-h2 mt-4 max-w-2xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
          {lead && (
            <p className={`t-lead mt-5 max-w-2xl ${dark ? "text-white/80" : "text-muted"}`}>{lead}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
