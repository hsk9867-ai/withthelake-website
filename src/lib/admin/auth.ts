import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readStoredText, writeStoredText } from "@/lib/cms/store";

/**
 * 관리자 로그인.
 * - 비밀번호: 관리자 화면에서 바꾼 비밀번호가 `content/admin-auth.json` 에 해시로 저장됩니다.
 *   저장된 것이 없으면 `ADMIN_PASSWORD` 환경변수를 씁니다 (최초 비밀번호).
 *   둘 다 없으면 관리자 비활성.
 * - 세션: HMAC 서명된 만료시각을 HttpOnly 쿠키에 저장.
 *   서명 키는 `ADMIN_SESSION_SECRET` (없으면 환경변수 비밀번호 + 저장된 해시에서 파생 → 비밀번호를 바꾸면 기존 로그인이 풀립니다)
 */
const COOKIE = "wtl_admin";
const SESSION_DAYS = 7;
export const AUTH_PATH = "content/admin-auth.json";
export const MIN_PASSWORD_LENGTH = 4;

type StoredAuth = { passwordHash: string; updatedAt: string };

/* ---------- 비밀번호 해시 (scrypt) ---------- */

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 32 };

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const hash = scryptSync(password, salt, SCRYPT.keylen, SCRYPT).toString("base64url");
  return `scrypt$${SCRYPT.N}$${salt}$${hash}`;
}

function verifyHash(password: string, stored: string) {
  const [algo, n, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !n || !salt || !hash) return false;
  const computed = scryptSync(password, salt, SCRYPT.keylen, { ...SCRYPT, N: Number(n) });
  const expected = Buffer.from(hash, "base64url");
  return computed.length === expected.length && timingSafeEqual(computed, expected);
}

/* ---------- 저장된 비밀번호 ---------- */

const readStoredAuth = cache(async (): Promise<StoredAuth | null> => {
  const raw = await readStoredText(AUTH_PATH).catch((err) => {
    console.error("[admin] admin-auth.json 읽기 실패", err);
    return null;
  });
  if (!raw) return null;
  try {
    const json = JSON.parse(raw) as Partial<StoredAuth>;
    return typeof json.passwordHash === "string" ? { passwordHash: json.passwordHash, updatedAt: json.updatedAt ?? "" } : null;
  } catch {
    return null;
  }
});

/** 비밀번호가 어디서 오는지 (설정 화면 안내용) */
export async function passwordSource(): Promise<{ source: "stored" | "env" | "none"; updatedAt?: string }> {
  const stored = await readStoredAuth();
  if (stored) return { source: "stored", updatedAt: stored.updatedAt };
  return process.env.ADMIN_PASSWORD ? { source: "env" } : { source: "none" };
}

export async function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD) || (await readStoredAuth()) !== null;
}

export async function checkPassword(input: string) {
  const stored = await readStoredAuth();
  if (stored) return verifyHash(input, stored.passwordHash);
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

/** 비밀번호를 바꿔 저장합니다. 호출 전에 로그인 여부와 현재 비밀번호를 확인해야 합니다. */
export async function savePassword(next: string): Promise<StoredAuth> {
  const record: StoredAuth = { passwordHash: hashPassword(next), updatedAt: new Date().toISOString() };
  await writeStoredText(AUTH_PATH, JSON.stringify(record, null, 2) + "\n", "CMS: 관리자 비밀번호 변경");
  return record;
}

/* ---------- 세션 ---------- */

/** `auth` 를 넘기면 저장소를 다시 읽지 않고 그 값으로 서명 키를 만듭니다 (같은 요청 안에서 비밀번호를 바꾼 직후). */
async function secret(auth?: StoredAuth) {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  const stored = auth ?? (await readStoredAuth());
  return `wtl-session:${process.env.ADMIN_PASSWORD ?? ""}:${stored?.passwordHash ?? ""}`;
}

async function sign(payload: string, auth?: StoredAuth) {
  return createHmac("sha256", await secret(auth)).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

async function makeToken(auth?: StoredAuth) {
  const exp = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${exp}.${await sign(exp, auth)}`;
}

async function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (!safeEqual(sig, await sign(exp))) return false;
  return Number(exp) > Date.now();
}

export async function createSession(auth?: StoredAuth) {
  const store = await cookies();
  store.set(COOKIE, await makeToken(auth), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated() {
  if (!(await isAdminConfigured())) return false;
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

/** 서버 액션 안에서 호출: 로그인하지 않았으면 예외 */
export async function requireAdmin() {
  if (!(await isAuthenticated())) throw new Error("로그인이 필요합니다.");
}

/**
 * 관리자 페이지 컴포넌트 맨 앞에서 호출: 로그인하지 않았으면 로그인 화면으로 보냅니다.
 * 레이아웃에서도 검사하지만, Next 는 레이아웃과 페이지를 병렬로 렌더링하므로
 * 페이지 자체도 검사해야 미인증 응답에 페이지 내용이 섞여 나가지 않습니다.
 */
export async function requireAdminPage(next?: string) {
  if (!(await isAuthenticated())) redirect(next ? `/admin/login?next=${encodeURIComponent(next)}` : "/admin/login");
}
