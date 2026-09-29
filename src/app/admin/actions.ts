"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/admin/auth";
import { getContent, saveContent, saveSection, saveUpload } from "@/lib/cms/store";
import { DEFAULT_CONTENT } from "@/lib/cms/defaults";
import { SECTION_KEYS, type SectionKey, type SiteContent } from "@/lib/cms/types";
import { SECTIONS } from "@/lib/admin/schema";

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };

function isSectionKey(v: string): v is SectionKey {
  return (SECTION_KEYS as string[]).includes(v);
}

/** 사이트 전체를 다시 렌더링하도록 캐시를 비웁니다. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");
  // 무차별 대입을 늦추기 위한 짧은 지연
  await new Promise((r) => setTimeout(r, 400));
  if (!checkPassword(password)) return { ok: false, error: "비밀번호가 올바르지 않습니다." };
  await createSession();
  const next = String(formData.get("next") ?? "/admin");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/** 검증: 게시물 slug 중복 · 형식, 제품 가격 등 */
function validate(key: SectionKey, value: unknown): string | null {
  if (key === "story") {
    const items = (value as SiteContent["story"]).items ?? [];
    const seen = new Set<string>();
    for (const s of items) {
      if (!/^[a-z0-9-]+$/.test(s.slug)) return `게시물 "${s.title || "(제목 없음)"}" 의 주소(slug)는 영문 소문자 · 숫자 · 하이픈만 쓸 수 있습니다.`;
      if (seen.has(s.slug)) return `게시물 주소(slug) "${s.slug}" 가 중복됩니다.`;
      seen.add(s.slug);
      if (!s.title.trim()) return "제목이 없는 게시물이 있습니다.";
    }
  }
  if (key === "store") {
    for (const p of (value as SiteContent["store"]).products ?? []) {
      if (!(p.price >= 0)) return `제품 "${p.name}" 의 가격을 확인해 주세요.`;
    }
  }
  return null;
}

export async function saveSectionAction(section: string, json: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!isSectionKey(section)) return { ok: false, error: "알 수 없는 섹션입니다." };
    let value: unknown;
    try {
      value = JSON.parse(json);
    } catch {
      return { ok: false, error: "저장할 내용을 읽을 수 없습니다." };
    }
    const problem = validate(section, value);
    if (problem) return { ok: false, error: problem };
    await saveSection(section, value as SiteContent[typeof section], SECTIONS[section].label);
    revalidateSite();
    return { ok: true, message: "저장했습니다. 사이트에 바로 반영됩니다." };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "저장 중 오류가 발생했습니다." };
  }
}

export async function resetSectionAction(section: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!isSectionKey(section)) return { ok: false, error: "알 수 없는 섹션입니다." };
    await saveSection(section, DEFAULT_CONTENT[section], `${SECTIONS[section].label} 기본값 복원`);
    revalidateSite();
    return { ok: true, message: "기본 내용으로 되돌렸습니다." };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "복원 중 오류가 발생했습니다." };
  }
}

export async function uploadAction(formData: FormData): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  try {
    await requireAdmin();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) return { ok: false, error: "파일을 선택해 주세요." };
    const url = await saveUpload(file);
    return { ok: true, url };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다." };
  }
}

/** 백업 JSON 을 그대로 불러옵니다 (전체 덮어쓰기). */
export async function importAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) return { ok: false, error: "JSON 파일을 선택해 주세요." };
    const parsed = JSON.parse(await file.text()) as Partial<SiteContent>;
    const current = await getContent();
    const next = { ...current };
    for (const key of SECTION_KEYS) {
      if (parsed[key] !== undefined) (next as Record<string, unknown>)[key] = parsed[key];
    }
    await saveContent(next, "CMS: 백업 불러오기");
    revalidateSite();
    return { ok: true, message: "백업을 불러왔습니다." };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "불러오기 중 오류가 발생했습니다." };
  }
}
