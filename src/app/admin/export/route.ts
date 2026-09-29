import { isAuthenticated } from "@/lib/admin/auth";
import { getContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

/** 현재 콘텐츠 전체를 JSON 파일로 내려받습니다 (로그인 필요). */
export async function GET() {
  if (!(await isAuthenticated())) return new Response("Unauthorized", { status: 401 });
  const content = await getContent();
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(JSON.stringify(content, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="withthelake-content-${stamp}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
