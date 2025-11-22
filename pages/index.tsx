import Container from "../components/container";
import Image from "next/image";
import { homeContent } from "../lib/homeContent";

export default function HomePage() {
  return (
    <Container>
      {homeContent.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <div key={index} className="mb-6 animate-[fade-down]">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  {block.content}
                </h1>
              </div>
            );

          case "paragraph":
            return (
              <div key={index} className="mb-6 animate-[fade-up]">
                <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                  {block.content}
                </p>
              </div>
            );

          case "image":
            return (
              <div
                key={index}
                className="my-12 overflow-hidden rounded-2xl shadow-xl w-full max-w-4xl mx-auto animate-[zoom-in]"
              >
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  className="w-full h-auto object-cover"
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </Container>
  );
}
