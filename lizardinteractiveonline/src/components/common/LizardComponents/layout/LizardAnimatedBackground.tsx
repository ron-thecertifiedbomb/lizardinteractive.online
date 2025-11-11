import { cn } from "@/lib/utils";
import { LizardLogoContainer } from "../LizardLogoContainer";
import { LizardDiv } from "./LizardDiv";

interface LizardAnimatedBackgroundProps {
    className?: string;
    svg?: React.FC<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
    logoFill?: string;
    logoStroke?: string;
    logoPadding?: string;
    thumbNailHeight?: string;
    thumbNailWidth?: string;
}

export function LizardAnimatedBackground({
    className,
    logoFill,
    logoStroke,
    thumbNailHeight,
    thumbNailWidth,
    svg: SvgIcon,
    onClick,
}: LizardAnimatedBackgroundProps) {
    return (
        <LizardDiv className={cn("overflow-hidden", className)}>
            {SvgIcon && (
                <LizardLogoContainer
                    onClick={onClick}
                    svg={SvgIcon}
                    logoFill={logoFill}
                    logoStroke={logoStroke}
                    logoHeight={thumbNailHeight}
                    logoWidth={thumbNailWidth}
                />
            )}
        </LizardDiv>
    );
}
