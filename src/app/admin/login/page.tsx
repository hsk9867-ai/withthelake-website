import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isAdminConfigured, isAuthenticated } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (isAdminConfigured() && (await isAuthenticated())) redirect("/admin");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      {isAdminConfigured() ? (
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      ) : (
        <div className="max-w-lg rounded-2xl border border-line bg-white p-8">
          <h1 className="text-[22px] font-bold">관리자 비밀번호가 설정되지 않았습니다</h1>
          <p className="mt-3 text-[15px] leading-7 text-muted">
            서버 환경변수 <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">ADMIN_PASSWORD</code> 를 설정한 뒤 다시 열어 주세요.
          </p>
        </div>
      )}
    </div>
  );
}
