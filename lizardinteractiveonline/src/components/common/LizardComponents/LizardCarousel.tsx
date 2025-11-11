import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LizardDiv } from "./layout/LizardDiv";
import { Items } from "@/types/appData";
import { LizardCard } from "./LizardCard";



interface LizardCarouselProps {
 
  items: Items[];
  maxWidth?: string;
}

export function LizardCarousel({  items }: LizardCarouselProps) {
  return (
    <LizardDiv className="w-full max-w-[800px] flex">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className=
        " flex"
      >
        <CarouselContent >
          {items?.map((item) => (
            <CarouselItem key={item.id}>
              <LizardCard title={item.title}
                description={item.description} imageSrc={item.imageSrc} imageAlt={item.imageAlt} techStack={item.techStack} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious hidden />
        <CarouselNext hidden />
      </Carousel>
      </LizardDiv>
  );
}
