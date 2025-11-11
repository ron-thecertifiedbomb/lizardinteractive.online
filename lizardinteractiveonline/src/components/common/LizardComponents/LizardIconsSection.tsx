import Marquee from "react-fast-marquee";

import { ReactNode } from "react";
import {  LizardTechStackLogos } from ".";
import { LizardDiv } from "./layout";

interface Tech {
  label: string;
  icon: ReactNode;
  url?: string;
}

interface LizardIconsSectionProps {
  stack: Tech[];
  speed?: number;
  direction?: "left" | "right";
  containerClassName?: string;
  iconClassName?: string;
}
export function LizardIconsSection({
  stack,
  speed = 40,
  direction = "left",
  containerClassName = "",
  iconClassName = "",
}: LizardIconsSectionProps) {
  console.log("AppMarqueeIcons");

  return (
    <LizardDiv>
      <div className={containerClassName}>
        <Marquee
          speed={speed}
          direction={direction}
          pauseOnHover
          gradient={false}
        >
          {stack.map((tech) => (
            <div
              key={tech.label}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <LizardTechStackLogos stack={[tech]} className={iconClassName} />
            </div>
          ))}
        </Marquee>
      </div>
    </LizardDiv>
  );
}
