import "server-only";
import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { DEFAULT_CONTENT } from "./defaults";
import { mergeWithDefaults } from "./merge";
import type { SectionKey, SiteContent } from "./types";

/**
 * 콘텐츠 저장소.
 *
 * - **supabase**: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` 가 있으면 Supabase 의 `cms_files` 테이블에 콘텐츠를,
 *   Storage 버킷(`SUPABASE_BUCKET`, 기본 `uploads`)에 업로드 파일을 저장합니다. Vercel 등 어떤 서버에서도 저장이 유지되고
 *   저장소(git)에는 아무것도 커밋되지 않습니다. 테이블·버킷은 `supabase/schema.sql` 로 만듭니다.
 * - **github**: `CMS_GITHUB_TOKEN` 이 있으면 GitHub 저장소의 `content/site-content.json` 을 읽고 커밋합니다.
 * - **file**: 그 외에는 로컬 `content/site-content.json` 을 읽고 씁니다 (개발 · 자체 서버 · 정적 내보내기 빌드).
 */
const CONTENT_PATH = "content/site-content.json";
const UPLOAD_DIR = "public/uploads";

export type StoreMode = "supabase" | "github" | "file";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || process.env.GITHUB_PAGES === "true") return null;
  const bucket = process.env.SUPABASE_BUCKET || "uploads";
  return { url, key, bucket };
}

function githubConfig() {
  const token = process.env.CMS_GITHUB_TOKEN;
  if (!token || process.env.GITHUB_PAGES === "true") return null;
  const repo = process.env.CMS_GITHUB_REPO ?? "hsk9867-ai/withthelake-website";
  const branch = process.env.CMS_GITHUB_BRANCH ?? "master";
  return { token, repo, branch };
}

export function getStoreMode(): StoreMode {
  if (supabaseConfig()) return "supabase";
  return githubConfig() ? "github" : "file";
}

export function describeStore() {
  const sb = supabaseConfig();
  if (sb) return `Supabase ${new URL(sb.url).hostname.split(".")[0]}`;
  const gh = githubConfig();
  return gh ? `GitHub ${gh.repo} (${gh.branch})` : `로컬 파일 ${CONTENT_PATH}`;
}

/* ---------- Supabase (REST + Storage, SDK 없이 fetch) ---------- */

type SupabaseConfig = NonNullable<ReturnType<typeof supabaseConfig>>;
const SUPABASE_TABLE = "cms_files";

function sbHeaders(sb: SupabaseConfig, extra: Record<string, string> = {}) {
  return { apikey: sb.key, Authorization: `Bearer ${sb.key}`, ...extra };
}

async function sbReadText(sb: SupabaseConfig, filePath: string): Promise<string | null> {
  const url = `${sb.url}/rest/v1/${SUPABASE_TABLE}?select=content&path=eq.${encodeURIComponent(filePath)}&limit=1`;
  const res = await fetch(url, { headers: sbHeaders(sb, { Accept: "application/json" }), cache: "no-store" });
  if (!res.ok) throw new Error(`Supabase 읽기 실패 (${res.status}): ${await res.text()}`);
  const rows = (await res.json()) as { content: unknown }[];
  if (!rows.length) return null;
  const content = rows[0].content;
  return typeof content === "string" ? content : JSON.stringify(content);
}

async function sbWriteText(sb: SupabaseConfig, filePath: string, text: string) {
  let content: unknown = text;
  try {
    content = JSON.parse(text);
  } catch {
    /* JSON 이 아니면 문자열 그대로 저장 */
  }
  const res = await fetch(`${sb.url}/rest/v1/${SUPABASE_TABLE}?on_conflict=path`, {
    method: "POST",
    headers: sbHeaders(sb, { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" }),
    body: JSON.stringify([{ path: filePath, content, updated_at: new Date().toISOString() }]),
  });
  if (!res.ok) throw new Error(`Supabase 저장 실패 (${res.status}): ${await res.text()}`);
}

async function sbUpload(sb: SupabaseConfig, name: string, data: Buffer, contentType: string) {
  const res = await fetch(`${sb.url}/storage/v1/object/${sb.bucket}/${name}`, {
    method: "POST",
    headers: sbHeaders(sb, { "Content-Type": contentType, "x-upsert": "false" }),
    body: new Uint8Array(data),
  });
  if (!res.ok) throw new Error(`Supabase 업로드 실패 (${res.status}): ${await res.text()}`);
  return `${sb.url}/storage/v1/object/public/${sb.bucket}/${name}`;
}

/* ---------- GitHub Contents API ---------- */

async function ghRequest(gh: NonNullable<ReturnType<typeof githubConfig>>, filePath: string, init: RequestInit = {}) {
  const url = `https://api.github.com/repos/${gh.repo}/contents/${filePath}`;
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${gh.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function ghRead(gh: NonNullable<ReturnType<typeof githubConfig>>, filePath: string) {
  const res = await ghRequest(gh, `${filePath}?ref=${encodeURIComponent(gh.branch)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub 읽기 실패 (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { sha: string; content: string; encoding: string };
  const content = Buffer.from(json.content.replace(/\n/g, ""), "base64");
  return { sha: json.sha, content };
}

async function ghWrite(gh: NonNullable<ReturnType<typeof githubConfig>>, filePath: string, data: Buffer, message: string) {
  const existing = await ghRead(gh, filePath).catch(() => null);
  const res = await ghRequest(gh, filePath, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: data.toString("base64"),
      branch: gh.branch,
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) throw new Error(`GitHub 저장 실패 (${res.status}): ${await res.text()}`);
}

/* ---------- 읽기 · 쓰기 ---------- */

function parse(raw: string | null | undefined): SiteContent {
  if (!raw) return DEFAULT_CONTENT;
  try {
    return mergeWithDefaults(DEFAULT_CONTENT, JSON.parse(raw));
  } catch (err) {
    console.error("[CMS] site-content.json 파싱 실패, 기본값 사용", err);
    return DEFAULT_CONTENT;
  }
}

/** 저장소(GitHub 또는 로컬)에서 텍스트 파일을 읽습니다. 없으면 null. */
export async function readStoredText(filePath: string): Promise<string | null> {
  const sb = supabaseConfig();
  if (sb) return sbReadText(sb, filePath);
  const gh = githubConfig();
  if (gh) {
    const file = await ghRead(gh, filePath);
    return file ? file.content.toString("utf8") : null;
  }
  try {
    return await fs.readFile(path.join(process.cwd(), filePath), "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

/** 저장소(GitHub 또는 로컬)에 텍스트 파일을 씁니다. */
export async function writeStoredText(filePath: string, text: string, message: string) {
  const sb = supabaseConfig();
  if (sb) return sbWriteText(sb, filePath, text);
  const data = Buffer.from(text, "utf8");
  const gh = githubConfig();
  if (gh) {
    await ghWrite(gh, filePath, data, message);
    return;
  }
  const file = path.join(process.cwd(), filePath);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
}

async function readRaw(): Promise<string | null> {
  return readStoredText(CONTENT_PATH);
}

/** 전체 콘텐츠 (기본값과 병합). 한 번의 렌더링 안에서는 여러 번 불러도 한 번만 읽습니다. */
export const getContent = cache(async (): Promise<SiteContent> => parse(await readRaw()));

/** 저장본이 있는지 (기본값만 쓰고 있는지) */
export async function hasStoredContent() {
  return (await readRaw()) !== null;
}

export async function saveContent(content: SiteContent, message = "CMS: 콘텐츠 수정") {
  await writeStoredText(CONTENT_PATH, JSON.stringify(content, null, 2) + "\n", message);
}

export async function saveSection<K extends SectionKey>(key: K, value: SiteContent[K], label?: string) {
  const current = await getContent();
  const next = { ...current, [key]: mergeWithDefaults(DEFAULT_CONTENT[key], value) };
  await saveContent(next, `CMS: ${label ?? key} 수정`);
  return next;
}

/* ---------- 이미지 업로드 ---------- */

const ALLOWED = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/svg+xml", "svg"],
  ["video/mp4", "mp4"],
]);
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

function safeName(name: string) {
  const base = name
    .normalize("NFKD")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "file";
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${stamp}-${base}-${Math.random().toString(36).slice(2, 7)}`;
}

/** 파일을 저장하고 사이트에서 쓸 수 있는 URL(경로)을 돌려줍니다. */
export async function saveUpload(file: File): Promise<string> {
  const ext = ALLOWED.get(file.type);
  if (!ext) throw new Error("JPG · PNG · WebP · GIF · SVG · MP4 파일만 올릴 수 있습니다.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("파일은 8MB 이하여야 합니다.");
  const name = `${safeName(file.name)}.${ext}`;
  const data = Buffer.from(await file.arrayBuffer());

  const sb = supabaseConfig();
  if (sb) return sbUpload(sb, name, data, file.type);
  const gh = githubConfig();
  if (gh) {
    await ghWrite(gh, `${UPLOAD_DIR}/${name}`, data, `CMS: 이미지 업로드 ${name}`);
    // 재배포 전에도 바로 보이도록 GitHub raw URL 을 사용합니다 (저장소가 공개일 때).
    return `https://raw.githubusercontent.com/${gh.repo}/${gh.branch}/${UPLOAD_DIR}/${name}`;
  }
  const dir = path.join(process.cwd(), UPLOAD_DIR);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), data);
  return `/uploads/${name}`;
}
