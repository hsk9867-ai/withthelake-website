import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow" ? "max-w-[820px]" : size === "wide" ? "max-w-[1320px]" : "max-w-[1200px]";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 md:px-10 ${className}`}>{children}</div>
  );
}
