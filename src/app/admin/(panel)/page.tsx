import Link from "next/link";
import { requireAdminPage } from "@/lib/admin/auth";
import { getContent, getStoreMode, hasStoredContent } from "@/lib/cms/store";
import { SECTIONS, SECTION_ORDER } from "@/lib/admin/schema";
import ImportForm from "../ImportForm";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  await requireAdminPage("/admin");
  const [content, stored] = await Promise.all([getContent(), hasStoredContent()]);
  const mode = getStoreMode();
  const isVercelWithoutStore = process.env.VERCEL === "1" && mode === "file";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold text-ink">대시보드</h1>
        <p className="mt-1 text-[15px] text-muted">왼쪽 메뉴에서 페이지를 골라 문구와 이미지를 수정하세요. 저장하면 사이트에 바로 반영됩니다.</p>
      </div>

      {isVercelWithoutStore && (
        <div className="rounded-xl border border-warn/40 bg-orange-50 p-5 text-[14px] leading-6 text-ink-2">
          <p className="font-bold text-warn">저장소가 연결되지 않았습니다</p>
          <p className="mt-1">
            이 서버는 파일을 보관하지 않으므로 저장한 내용이 배포마다 사라집니다. 환경변수 <code>CMS_GITHUB_TOKEN</code> 을 설정하면 GitHub 저장소에 커밋되어 안전하게 유지됩니다.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTION_ORDER.map((key) => {
          const def = SECTIONS[key];
          return (
            <Link key={key} href={`/admin/${key}`} className="group rounded-xl border border-line bg-white p-5 transition-colors hover:border-primary">
              <p className="text-[16px] font-bold text-ink group-hover:text-primary">{def.label}</p>
              <p className="mt-1.5 line-clamp-3 text-[13px] leading-5 text-muted">{def.description}</p>
              {key === "story" && <p className="mt-3 text-[12px] font-semibold text-accent-deep">게시물 {content.story.items.length}건</p>}
              {key === "store" && <p className="mt-3 text-[12px] font-semibold text-accent-deep">제품 {content.store.products.length}개</p>}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[15px] font-bold text-ink">백업</p>
          <p className="mt-1 text-[13px] leading-5 text-muted">
            현재 콘텐츠 전체를 JSON 파일로 내려받습니다. {stored ? "" : "아직 저장한 적이 없어 기본 내용이 내려받아집니다."}
          </p>
          <a href="/admin/export" download className="mt-4 inline-flex min-h-10 items-center rounded-md border border-primary/40 px-4 text-[14px] font-semibold text-primary hover:bg-primary-light">
            JSON 내려받기
          </a>
        </div>
        <ImportForm />
      </div>

      <div className="rounded-xl border border-line bg-white p-5 text-[13px] leading-6 text-muted">
        <p className="font-bold text-ink">저장 방식</p>
        <p className="mt-1">
          {mode === "supabase"
            ? "Supabase 데이터베이스(cms_files 테이블)에 저장되고, 업로드한 이미지는 Supabase Storage(uploads 버킷)에 보관됩니다. 코드 저장소에는 아무것도 커밋되지 않습니다."
            : mode === "github"
              ? "저장할 때마다 GitHub 저장소에 커밋됩니다. 변경 이력은 저장소의 content/site-content.json 커밋 기록에서 확인할 수 있습니다."
              : "content/site-content.json 파일에 저장됩니다. 이 파일을 git 에 커밋하면 GitHub Pages 미리보기에도 반영됩니다."}
        </p>
      </div>
    </div>
  );
}
