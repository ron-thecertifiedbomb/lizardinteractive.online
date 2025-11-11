

import { LizardIcon, } from "@/components/icons/svg";
import { LizardLogoContainer } from "./LizardLogoContainer";
interface LizardInteractiveButtonProps {
  onClick?: () => void;

  className?: string; // extra Tailwind classes for the image
}

export function LizardInteractiveButton({
  onClick,
  className

}: LizardInteractiveButtonProps) {
  // Cast the imported SVG properly

  return (

    <div
      onClick={onClick}
      className={`${className} cursor-pointer pb-2`}

    >
      <LizardLogoContainer
        svg={LizardIcon}
        logoStroke=" stroke-white stroke-[7]"
        logoWidth="w-10"
        logoHeight="h-10"
        className=" drop-shadow-[0_0_8px_rgba(255,255,255,3)]"
      />
    </div>

  );
}
