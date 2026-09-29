import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "관리자", template: "%s | 위드더레이크 관리자" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="admin min-h-screen bg-cream text-ink">{children}</div>;
}
