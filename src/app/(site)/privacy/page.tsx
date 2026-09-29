import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import { getContent } from "@/lib/cms/store";
import { fill } from "@/lib/cms/merge";

export async function generateMetadata(): Promise<Metadata> {
  const { privacy } = await getContent();
  return { title: privacy.meta.title, description: privacy.meta.description, robots: { index: false, follow: true } };
}

export default async function PrivacyPage() {
  const { privacy, site } = await getContent();
  const vars = {
    company: site.name,
    team: site.contact.team,
    person: site.contact.person,
    phone: site.contact.phone,
    email: site.contact.email,
  };

  return (
    <>
      <PageHeader eyebrow={privacy.header.eyebrow} crumbs={[{ label: privacy.header.title }]} title={privacy.header.title} lead={privacy.header.lead} />
      <section className="section bg-surface">
        <Container size="narrow">
          <div className="space-y-10">
            {privacy.sections.map((s, i) => (
              <div key={`${s.title}-${i}`}>
                <h2 className="t-h3 text-ink">{s.title}</h2>
                <div className="mt-3 space-y-2">
                  {s.body.map((b, j) => (
                    <p key={j} className="t-body whitespace-pre-line text-ink-2">
                      {fill(b, vars)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
