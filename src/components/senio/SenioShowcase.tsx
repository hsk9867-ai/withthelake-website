import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function SenioShowcase() {
  return (
    <section className="bg-cream py-20 md:py-24">
      <Container className="flex justify-center">
        <Reveal className="w-full max-w-3xl overflow-hidden rounded-3xl">
          <Image
            src="/assets/senio/device-styled.jpg"
            alt="SENIO 앱 측정 결과 화면"
            width={1800}
            height={1326}
            className="h-auto w-full object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
