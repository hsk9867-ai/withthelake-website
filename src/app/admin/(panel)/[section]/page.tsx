import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/cms/store";
import { SECTIONS } from "@/lib/admin/schema";
import { SECTION_KEYS, type SectionKey } from "@/lib/cms/types";
import SectionEditor from "../../SectionEditor";

export const dynamic = "force-dynamic";

function asKey(v: string): SectionKey | null {
  return (SECTION_KEYS as string[]).includes(v) ? (v as SectionKey) : null;
}

export async function generateMetadata({ params }: PageProps<"/admin/[section]">): Promise<Metadata> {
  const { section } = await params;
  const key = asKey(section);
  return { title: key ? SECTIONS[key].label : "관리자" };
}

export default async function AdminSectionPage({ params }: PageProps<"/admin/[section]">) {
  const { section } = await params;
  const key = asKey(section);
  if (!key) notFound();
  const content = await getContent();
  const def = SECTIONS[key];

  return (
    <SectionEditor
      key={key}
      section={key}
      label={def.label}
      description={def.description}
      preview={def.preview}
      fields={def.fields}
      initial={content[key]}
    />
  );
}
