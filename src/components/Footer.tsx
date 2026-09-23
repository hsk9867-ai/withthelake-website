import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-cream">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Image
              src="/assets/logo/with-the-lake.png"
              alt="위드더레이크"
              width={178}
              height={58}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-sm text-[14px] leading-7 text-muted">
              데이터와 건강행동을 연결해 시니어의 건강한 자립생활이
              더 오래 지속되도록 돕는 지역사회 기반 예방건강관리 기업
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[14px] sm:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold text-ink">회사</p>
              <ul className="space-y-2 text-muted">
                <li><Link href="/about" className="hover:text-primary">ABOUT</Link></li>
                <li><Link href="/impact" className="hover:text-primary">IMPACT</Link></li>
                <li><Link href="/story" className="hover:text-primary">STORY</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-ink">사업</p>
              <ul className="space-y-2 text-muted">
                <li><Link href="/senio" className="hover:text-primary">SENIO</Link></li>
                <li><Link href="/what-we-do/with-well-me" className="hover:text-primary">WITH WELL ME</Link></li>
                <li><Link href="/what-we-do/community-health" className="hover:text-primary">COMMUNITY HEALTH</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-ink">고객지원</p>
              <ul className="space-y-2 text-muted">
                <li><Link href="/contact" className="hover:text-primary">CONTACT US</Link></li>
                <li><Link href="/store" className="hover:text-primary">STORE</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">개인정보 처리방침</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-8 text-[13px] leading-6 text-muted md:flex-row md:items-center md:justify-between">
          <p>
            ㈜위드더레이크&nbsp;&nbsp;|&nbsp;&nbsp;문의 P. 010-4629-5925&nbsp;&nbsp;|&nbsp;&nbsp;
            M. contact@withthelake.com
          </p>
          <p>&copy; {new Date().getFullYear()} WITH THE LAKE Co., Ltd. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
