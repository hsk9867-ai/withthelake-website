import { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * 섹션 공통 헤딩 (레퍼런스 "Our Partners" 스타일):
 * 영문 타이틀(Manrope, 굵게) + 한글 제목 + 리드.
 * index 는 하위 호환용으로 받되 표시하지 않습니다.
 */
export default function SectionHeading({
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
      <div className={`flex flex-wrap gap-6 ${center ? "flex-col items-center" : "items-end justify-between"}`}>
        <div className={center ? "flex flex-col items-center" : ""}>
          {eyebrow && <p className={`t-en ${dark ? "text-white" : "text-ink"}`}>{eyebrow}</p>}
          <h2 className={`${eyebrow ? "t-h3 mt-4 font-semibold" : "t-h2"} max-w-2xl ${dark ? "text-white/90" : eyebrow ? "text-ink-2" : "text-ink"}`}>
            {title}
          </h2>
          {lead && <p className={`t-lead mt-4 max-w-2xl ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
