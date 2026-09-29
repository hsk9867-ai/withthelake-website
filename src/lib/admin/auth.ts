import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 관리자 로그인.
 * - 비밀번호: `ADMIN_PASSWORD` 환경변수 (미설정 시 관리자 비활성)
 * - 세션: HMAC 서명된 만료시각을 HttpOnly 쿠키에 저장. 서명 키는 `ADMIN_SESSION_SECRET` (없으면 비밀번호에서 파생)
 */
const COOKIE = "wtl_admin";
const SESSION_DAYS = 7;

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || `wtl-session:${process.env.ADMIN_PASSWORD ?? ""}`;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

function makeToken() {
  const exp = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${exp}.${sign(exp)}`;
}

function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (!safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now();
}

export async function createSession() {
  const store = await cookies();
  store.set(COOKIE, makeToken(), {
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
  if (!isAdminConfigured()) return false;
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

/** 서버 액션 안에서 호출: 로그인하지 않았으면 예외 */
export async function requireAdmin() {
  if (!(await isAuthenticated())) throw new Error("로그인이 필요합니다.");
}
