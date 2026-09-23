import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "bg-white text-primary border border-primary hover:bg-primary-light",
  ghost:
    "bg-transparent text-white border border-white/70 hover:bg-white/10",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-[15px] font-semibold tracking-tight transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
