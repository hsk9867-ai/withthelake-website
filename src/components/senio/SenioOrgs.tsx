import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { IconByName } from "@/components/Icons";
import type { SenioContent } from "@/lib/cms/types";

export default function SenioOrgs({ data }: { data: SenioContent["orgs"] }) {
  return (
    <section className="section bg-cream">
      <Container>
        <SectionHeading index="04" eyebrow={data.eyebrow} title={data.title} />

        <Reveal delay={100} className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white">
          <table className="w-full border-collapse text-left">
            <thead className="sr-only">
              <tr>
                <th>대상</th>
                <th>활용 방식</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.rows.map((row, i) => (
                <tr key={`${row.target}-${i}`} className="grid grid-cols-1 gap-2 px-6 py-5 sm:table-row sm:px-0 sm:py-0">
                  <td className="sm:w-[320px] sm:px-7 sm:py-6">
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <IconByName name={row.icon} size={20} />
                      </span>
                      <span className="text-[17px] font-bold text-ink">{row.target}</span>
                    </span>
                  </td>
                  <td className="t-body text-muted sm:px-7 sm:py-6">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="t-body mt-6 max-w-2xl text-muted">{data.note}</p>
      </Container>
    </section>
  );
}
