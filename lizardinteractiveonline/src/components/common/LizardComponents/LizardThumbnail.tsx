import { LizardText } from "@/components/common/LizardComponents/LizardText";
import { LizardLogoContainer } from "./LizardLogoContainer";


import { Lizard } from "@/components/icons";


// interface LizardCardItem {
//   label: string;
//   value: string;
//   valueClassName?: string;
//   labelProps?: React.ComponentProps<typeof LizardText>;
//   valueProps?: React.ComponentProps<typeof LizardText>;
// }


interface LizardThumbnailProps {
  title: string;
  content?: string;
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  logoFill: string;
  logoStroke: string;
  logoHeight: string;
  logoWidth: string;

}

export function LizardThumbnail({
  title,
  content,
  logoFill,
  logoStroke,
  logoHeight,
  logoWidth,

  
}: LizardThumbnailProps) {
  return (
    <div
      className="relative max-w-[184px]
    h-auto
    w-full
    
  bg-transparent"
    >
      <div className="flex flex-col">
        <div className="rounded-sm overflow-hidden border border-white/10 flex flex-col items-center justify-center p-4 mb-4 space-y-2">
          <LizardLogoContainer svg={Lizard} logoFill={logoFill} logoStroke={logoStroke} logoHeight={logoHeight} logoWidth={logoWidth} />
          
          <LizardText className="text-[16px]  text-[#7A7A7A]  font-light uppercase">
            {title}
          </LizardText>
        </div>

        <div>
          {content && (
            <LizardText
              variant="p"
              className="text-[14px] text-[#7A7A7A]  font-light leading-snug tracking-wide uppercase"
            >
              {content}
            </LizardText>
          )}
        </div>
      </div>
    </div>
  );
}
