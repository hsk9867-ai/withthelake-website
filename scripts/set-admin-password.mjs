#!/usr/bin/env node
/**
 * 관리자 비밀번호를 서버에서 직접 설정합니다 (비밀번호를 잊었을 때, 최초 설정 시).
 *
 *   npm run admin:password -- 새비밀번호
 *
 * content/admin-auth.json 에 scrypt 해시만 저장됩니다. src/lib/admin/auth.ts 의 hashPassword 와 같은 형식이어야 합니다.
 * GitHub 저장 모드(CMS_GITHUB_TOKEN)를 쓰는 서버라면 이 파일을 커밋해서 올려야 반영됩니다.
 */
import { randomBytes, scryptSync } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const AUTH_PATH = "content/admin-auth.json";
const MIN_LENGTH = 4;
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 32 };

const password = process.argv[2];
if (!password || password.length < MIN_LENGTH || /\s/.test(password)) {
  console.error(`사용법: npm run admin:password -- <새비밀번호>   (${MIN_LENGTH}자 이상, 공백 없이)`);
  process.exit(1);
}

const salt = randomBytes(16).toString("base64url");
const hash = scryptSync(password, salt, SCRYPT.keylen, SCRYPT).toString("base64url");
const record = { passwordHash: `scrypt$${SCRYPT.N}$${salt}$${hash}`, updatedAt: new Date().toISOString() };

const file = resolve(process.cwd(), AUTH_PATH);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, JSON.stringify(record, null, 2) + "\n");
console.log(`관리자 비밀번호를 저장했습니다 → ${AUTH_PATH}`);
console.log("개발 서버가 켜져 있으면 다음 요청부터 바로 적용됩니다.");
