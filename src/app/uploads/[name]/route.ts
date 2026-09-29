import { promises as fs } from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

/**
 * 관리자에서 올린 파일(public/uploads/*) 을 서빙합니다.
 * `next start` 는 빌드 시점의 public 파일만 알고 있어, 그 뒤에 올린 파일은 이 핸들러가 디스크에서 읽어 줍니다.
 * (정적 내보내기에서는 제외되고, public/uploads 가 그대로 복사됩니다.)
 */
const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  mp4: "video/mp4",
};

export async function GET(_req: Request, { params }: RouteContext<"/uploads/[name]">) {
  const { name } = await params;
  if (!/^[a-zA-Z0-9._-]+$/.test(name) || name.includes("..")) return new Response("Not found", { status: 404 });
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const type = TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });

  try {
    const data = await fs.readFile(path.join(process.cwd(), "public", "uploads", name));
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
