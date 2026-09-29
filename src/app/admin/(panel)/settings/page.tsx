import type { Metadata } from "next";
import { AUTH_PATH, MIN_PASSWORD_LENGTH, passwordSource } from "@/lib/admin/auth";
import { getStoreMode } from "@/lib/cms/store";
import PasswordForm from "./PasswordForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "설정" };

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
}

export default async function AdminSettingsPage() {
  const source = await passwordSource();
  const mode = getStoreMode();
  const updated = formatDate(source.updatedAt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold text-ink">설정</h1>
        <p className="mt-1 text-[15px] text-muted">관리자 로그인 비밀번호를 관리합니다.</p>
      </div>

      <PasswordForm minLength={MIN_PASSWORD_LENGTH} />

      <div className="rounded-xl border border-line bg-white p-5 text-[13px] leading-6 text-muted">
        <p className="font-bold text-ink">현재 비밀번호 출처</p>
        {source.source === "stored" ? (
          <p className="mt-1">
            관리자 화면에서 바꾼 비밀번호를 쓰고 있습니다{updated ? ` (마지막 변경: ${updated})` : ""}. 해시만{" "}
            <code className="rounded bg-cream px-1.5 py-0.5 text-[12px]">{AUTH_PATH}</code> 에 저장되고 원문은 어디에도 남지 않습니다.
          </p>
        ) : (
          <p className="mt-1">
            서버 환경변수 <code className="rounded bg-cream px-1.5 py-0.5 text-[12px]">ADMIN_PASSWORD</code> 의 값을 쓰고 있습니다. 위에서 한 번 바꾸면 그 뒤로는
            환경변수 대신 여기서 정한 비밀번호가 쓰입니다.
          </p>
        )}
        {mode === "github" && (
          <p className="mt-2 text-warn">
            저장 방식이 GitHub 이라 비밀번호 해시가 저장소에 커밋됩니다. 저장소가 공개라면 짧거나 흔한 비밀번호는 유추될 수 있으니 길고 복잡한 비밀번호를 쓰세요.
          </p>
        )}
        <p className="mt-2">
          비밀번호를 잊었을 때는 서버에서 <code className="rounded bg-cream px-1.5 py-0.5 text-[12px]">npm run admin:password -- 새비밀번호</code> 를 실행하거나{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-[12px]">{AUTH_PATH}</code> 파일을 지우면 환경변수 비밀번호로 돌아갑니다.
        </p>
      </div>
    </div>
  );
}
