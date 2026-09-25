import Script from "next/script";
import { SITE } from "@/content/site";

/** Google Analytics 4 — NEXT_PUBLIC_GA_ID 가 설정된 경우에만 로드합니다. */
export default function Analytics() {
  const id = SITE.gaId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
