import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline-white";
type Size = "md" | "lg" | "sm";

const styles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-white text-primary border border-primary/50 hover:border-primary hover:bg-primary-light",
  ghost: "bg-transparent text-white border border-white/60 hover:bg-white/10",
  white: "bg-white text-primary hover:bg-primary-light",
  "outline-white": "bg-transparent text-white border border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-[15px]",
  md: "min-h-12 px-7 text-[16px]",
  lg: "min-h-14 px-8 text-[17px]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}) {
  const cls = `group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-colors duration-200 ${styles[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
        >
          <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
