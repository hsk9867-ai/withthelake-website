/**
 * 저장된 콘텐츠와 기본값을 합칩니다.
 * - 객체: 키별로 재귀 병합 (저장본에 없는 키는 기본값 유지)
 * - 배열: 저장본이 있으면 통째로 사용 (항목 추가·삭제를 그대로 반영)
 * - 원시값: 저장본 우선. 타입이 다르면 기본값
 */
export function mergeWithDefaults<T>(defaults: T, stored: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(stored) ? stored : defaults) as T;
  }
  if (defaults !== null && typeof defaults === "object") {
    const src = stored !== null && typeof stored === "object" && !Array.isArray(stored) ? (stored as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(defaults as Record<string, unknown>)) {
      out[k] = mergeWithDefaults(v, src[k]);
    }
    // 기본값에 없는 키(선택 필드 등)도 보존
    for (const [k, v] of Object.entries(src)) {
      if (!(k in out)) out[k] = v;
    }
    return out as T;
  }
  if (stored === undefined || stored === null) return defaults;
  if (typeof stored !== typeof defaults) return defaults;
  return stored as T;
}

/** "{year}" 같은 자리표시자를 값으로 바꿉니다. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}
