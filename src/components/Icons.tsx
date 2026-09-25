import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

/** 측정 — 스트립/드롭 */
export function IconMeasure({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M12 3c3 4 5.5 7 5.5 10a5.5 5.5 0 1 1-11 0C6.5 10 9 7 12 3Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  );
}

/** 이해 — 말풍선/리포트 */
export function IconUnderstand({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7Z" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>
  );
}

/** 행동 — 걷기 */
export function IconWalk({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <circle cx="13.5" cy="4" r="1.8" />
      <path d="M9 21l2.2-6.2M12.5 8.5 9.3 11l-1.5 4.5M12.5 8.5l1.7 3.8 3.3 1.4M12.5 8.5l-.5 5 2.7 2.7 1.3 4.8" />
    </svg>
  );
}

/** 지속 — 달력/체크 */
export function IconContinue({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8.5 14.5l2.3 2.3 4.7-4.8" />
    </svg>
  );
}

/** 변화 확인 — 상승 추세 */
export function IconTrend({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M4 19h16" />
      <path d="M5 14.5 9.5 10l3.5 3.5L19 7" />
      <path d="M15.5 7H19v3.5" />
    </svg>
  );
}

/** 순환 화살표 */
export function IconLoop({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v4.5h-4.5" />
    </svg>
  );
}

/** 당뇨 — 포도당/케톤 */
export function IconGlucose({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M12 3.5c2.6 3.4 4.5 6 4.5 8.6a4.5 4.5 0 1 1-9 0c0-2.6 1.9-5.2 4.5-8.6Z" />
      <path d="M8 20.5h8" />
    </svg>
  );
}

/** 간 */
export function IconLiver({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M3.5 9.5c0-2.5 2-4.5 4.5-4.5h6.5c3.3 0 6 2.7 6 6 0 3.6-3.4 6.5-7.5 6.5H12c-1.5 0-2.7 1-3.4 2.3-.4.7-1.4.9-2 .3C4.3 18 3.5 15.5 3.5 13V9.5Z" />
      <path d="M13 9.5c1.2 0 2.5.5 3 1.5" />
    </svg>
  );
}

/** 신장 */
export function IconKidney({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M9 4.5C6 4.5 4 7 4 10.5v3C4 16.5 6 19 8.5 19c1.7 0 2.5-1.2 2.5-2.5v-1.2c0-.8-.6-1.3-1.3-1.3h-.4M15 4.5c3 0 5 2.5 5 6v3c0 3-2 5.5-4.5 5.5-1.7 0-2.5-1.2-2.5-2.5v-1.2c0-.8.6-1.3 1.3-1.3h.4" />
      <path d="M11 6.5c.6-.7 1.4-.7 2 0" />
    </svg>
  );
}

/** 스트립 */
export function IconStrip({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="9" y="2.5" width="6" height="19" rx="1.5" />
      <path d="M9 6.5h6M9 9.5h6M9 12.5h6M9 15.5h6" />
    </svg>
  );
}

/** 측정기 */
export function IconDevice({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <rect x="8.5" y="5" width="7" height="6" rx="1" />
      <path d="M18 9.5h1.2" />
    </svg>
  );
}

/** 앱/대시보드 */
export function IconDashboard({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 13.5h3M8 16.5h6" />
    </svg>
  );
}

/** 기관 — 건물 */
export function IconBuilding({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M4 20.5h16M5.5 20.5V5l7-2v17.5M12.5 8.5l6 1.5v10.5" />
      <path d="M8.5 8h1M8.5 11h1M8.5 14h1M15.5 13h1M15.5 16h1" />
    </svg>
  );
}

/** 하트/돌봄 */
export function IconCare({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

/** 기업/핸드셰이크 대체 — 체크 배지 */
export function IconBadge({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M12 2.8 14.6 5l3.4-.3.6 3.3 3 1.6-1.6 3 .3 3.4-3.3.6L14.6 19 12 17.2 9.4 19 7 16.6l-3.3-.6.3-3.4-1.6-3 3-1.6.6-3.3 3.4.3L12 2.8Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

/** 집/주거 */
export function IconHome({ size = 24, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M4 11.5 12 4.5l8 7v8a1.5 1.5 0 0 1-1.5 1.5h-4v-6h-5v6h-4A1.5 1.5 0 0 1 4 19.5v-8Z" />
    </svg>
  );
}

/** 아웃링크 */
export function IconExternal({ size = 16, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function IconArrow({ size = 16, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconMail({ size = 20, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconPhone({ size = 20, ...p }: P) {
  return (
    <svg {...base(size, p)}>
      <path d="M5.5 3.5h3l1.6 4-2 1.4a11 11 0 0 0 6.9 6.9l1.4-2 4 1.6v3a2 2 0 0 1-2 2A16 16 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
