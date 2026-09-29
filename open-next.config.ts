import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext(Cloudflare) 설정.
 * 사이트 페이지는 요청 시 렌더링하고 콘텐츠는 Supabase 에서 읽으므로 별도 캐시(R2/KV) 없이 동작합니다.
 */
export default defineCloudflareConfig({});
