import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminConfigured, isAuthenticated } from "@/lib/admin/auth";
import { describeStore } from "@/lib/cms/store";
import { SECTIONS, SECTION_ORDER } from "@/lib/admin/schema";
import { logoutAction } from "../actions";
import AdminNav from "../AdminNav";

export const dynamic = "force-dynamic";

/** 로그인이 필요한 관리자 화면의 공통 틀 (상단 바 + 왼쪽 메뉴) */
export default async function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  if (!(await isAdminConfigured())) return <NotConfigured />;
  if (!(await isAuthenticated())) redirect("/admin/login");

  const items = SECTION_ORDER.map((key) => ({ key, label: SECTIONS[key].label }));

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-navy text-white">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-display text-[15px] font-bold tracking-tight">
              WITH THE LAKE <span className="ml-1 rounded bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold">ADMIN</span>
            </Link>
            <span className="hidden text-[12px] text-white/50 md:inline">저장 위치: {describeStore()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="rounded-md px-3 py-1.5 text-[13px] font-semibold text-white/85 hover:bg-white/10">
              사이트 보기 ↗
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-md px-3 py-1.5 text-[13px] font-semibold text-white/85 hover:bg-white/10">
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-4 py-6 sm:px-6">
        <AdminNav items={items} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}

function NotConfigured() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg rounded-2xl border border-line bg-white p-8">
        <p className="text-[13px] font-bold uppercase tracking-wider text-accent-deep">관리자 설정 필요</p>
        <h1 className="mt-2 text-[22px] font-bold">관리자 비밀번호가 설정되지 않았습니다</h1>
        <p className="mt-3 text-[15px] leading-7 text-muted">
          서버 환경변수 <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">ADMIN_PASSWORD</code> 를 설정한 뒤 다시 열어 주세요. 로컬에서는{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">.env.local</code> 파일에 넣고 개발 서버를 다시 시작합니다.
        </p>
      </div>
    </div>
  );
}
