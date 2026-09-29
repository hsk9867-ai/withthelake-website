-- WITH THE LAKE 관리자(CMS) 저장소 준비 SQL
-- Supabase 대시보드 → SQL Editor 에 붙여 넣고 Run 하면 됩니다. 여러 번 실행해도 안전합니다.
--
-- 1) cms_files : 관리자에서 저장한 콘텐츠(site-content)와 비밀번호 해시(admin-auth) 를 담는 테이블
-- 2) uploads   : 관리자에서 올린 이미지·영상을 담는 공개 Storage 버킷
--
-- 서버는 service_role 키로만 접근하므로 RLS 를 켜 두고 공개 정책은 만들지 않습니다(익명 접근 차단).

create table if not exists public.cms_files (
  path        text primary key,
  content     jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.cms_files enable row level security;

comment on table public.cms_files is 'WITH THE LAKE 관리자(CMS) 저장 파일. path=content/site-content.json 등';

-- 업로드 버킷 (공개 읽기). 이미 있으면 그대로 둡니다.
insert into storage.buckets (id, name, public, file_size_limit)
values ('uploads', 'uploads', true, 8388608)
on conflict (id) do update set public = true;

-- 버킷의 파일을 누구나 볼 수 있게 (사이트 이미지 표시용). 쓰기는 service_role 만 가능.
drop policy if exists "uploads public read" on storage.objects;
create policy "uploads public read"
  on storage.objects for select
  using (bucket_id = 'uploads');
