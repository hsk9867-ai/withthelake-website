import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import type { SenioContent, SiteSettings } from "@/lib/cms/types";

export default function SenioCta({ data, site }: { data: SenioContent["cta"]; site: SiteSettings }) {
  const hasApp = Boolean(site.links.appIos || site.links.appAndroid);

  return (
    <section className="section bg-surface">
      <Container>
        <Reveal className="text-center">
          <p className="eyebrow text-accent-deep">{data.eyebrow}</p>
          <h2 className="t-h1 mt-4 text-ink">{data.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="relative flex flex-col overflow-hidden rounded-[24px] bg-primary p-9 text-white md:p-11">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <p className="eyebrow text-accent">{data.org.eyebrow}</p>
            <h3 className="t-h2 mt-4">{data.org.title}</h3>
            <p className="t-body mt-4 text-white/80">{data.org.body}</p>
            <div className="mt-auto pt-8">
              <Button href="/contact?type=senio" variant="white" size="lg" arrow>
                {data.org.ctaLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="card flex flex-col overflow-hidden p-9 md:p-11">
            <p className="eyebrow text-accent-deep">{data.personal.eyebrow}</p>
            <h3 className="t-h2 mt-4 text-ink">{data.personal.title}</h3>
            <div className="mt-6 flex gap-3">
              {data.personal.screens.map((src, i) => (
                <div key={`${src}-${i}`} className="relative h-36 w-[4.4rem] overflow-hidden rounded-xl border border-line bg-cream">
                  <Image src={src} alt="SENIO 앱 화면" fill sizes="80px" className="object-cover object-top" />
                </div>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {hasApp ? (
                <>
                  {site.links.appIos && (
                    <Button href={site.links.appIos} variant="primary" external>
                      App Store
                    </Button>
                  )}
                  {site.links.appAndroid && (
                    <Button href={site.links.appAndroid} variant="secondary" external>
                      Google Play
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button href="/contact?type=other" variant="primary" arrow>
                    {data.personal.ctaLabel}
                  </Button>
                  <p className="w-full text-[14px] text-muted">{data.personal.note}</p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
