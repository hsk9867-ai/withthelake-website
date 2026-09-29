import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import ContactForm from "@/components/contact/ContactForm";
import { IconMail, IconPhone } from "@/components/Icons";
import { getContent } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getContent();
  return { title: contact.meta.title, description: contact.meta.description };
}

export default async function ContactPage() {
  const { contact, site } = await getContent();
  return (
    <>
      <PageHeader eyebrow={contact.header.eyebrow} crumbs={[{ label: "CONTACT US" }]} title={contact.header.title} lead={contact.header.lead} />

      <section className="section bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <aside className="space-y-8">
              <div>
                <p className="eyebrow text-accent-deep">문의 유형</p>
                <ul className="mt-5 divide-y divide-line">
                  {contact.types.map((t, i) => (
                    <li key={`${t.label}-${i}`} className="py-3.5">
                      <p className="text-[16px] font-semibold text-ink">{t.label}</p>
                      <p className="text-[15px] text-muted">{t.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] bg-cream p-7">
                <p className="eyebrow text-accent-deep">{contact.directLabel}</p>
                <p className="mt-3 text-[16px] font-semibold text-ink">
                  {site.name} {site.contact.team} {site.contact.person}
                </p>
                <p className="mt-2 text-[15px] leading-6 text-muted">
                  ({site.contact.postalCode}) {site.contact.address}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={`tel:${site.contact.phone}`} className="inline-flex items-center gap-3 text-[16px] text-ink-2 hover:text-primary">
                    <IconPhone className="text-primary" /> {site.contact.phone}
                  </a>
                  <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-3 text-[16px] text-ink-2 hover:text-primary">
                    <IconMail className="text-primary" /> {site.contact.email}
                  </a>
                </div>
              </div>
            </aside>

            <div className="card p-6 sm:p-8 md:p-10">
              <Suspense fallback={null}>
                <ContactForm email={site.contact.email} form={contact.form} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
