import { Fragment } from "react";

/** 관리자에서 입력한 줄바꿈("\n")을 <br /> 로 렌더링합니다. */
export default function Lines({ text }: { text: string }) {
  const parts = text.split(/\r?\n/);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {p}
        </Fragment>
      ))}
    </>
  );
}
