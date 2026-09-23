import Container from "@/components/Container";
import Button from "@/components/Button";

const ROWS = [
  { label: "상호", value: "㈜위드더레이크 (WITH THE LAKE Co., Ltd.)" },
  { label: "담당", value: "서비스기획팀 과장 김민주" },
  { label: "전화", value: "010-4629-5925" },
  { label: "이메일", value: "contact@withthelake.com" },
];

export default function AboutInfo() {
  return (
    <section className="bg-surface py-24 md:py-28">
      <Container className="flex flex-col items-start justify-between gap-10 rounded-2xl border border-line p-10 md:flex-row md:items-center">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {ROWS.map((row) => (
            <div key={row.label} className="flex gap-3">
              <dt className="w-14 shrink-0 text-[14px] font-semibold text-primary">
                {row.label}
              </dt>
              <dd className="text-[14.5px] text-muted">{row.value}</dd>
            </div>
          ))}
        </dl>
        <Button href="/contact" variant="primary">
          사업·협력 문의하기
        </Button>
      </Container>
    </section>
  );
}
