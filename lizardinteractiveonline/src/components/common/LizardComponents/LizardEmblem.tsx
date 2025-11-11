import React from "react";
import { LizardCardBorder, LizardLogoContainer, LizardAnimatedBackground } from "@/components/common/LizardComponents";
import { LizardDiv } from "./layout";

export interface LizardEmblemProps {
    svg?: React.FC<React.SVGProps<SVGSVGElement>>;
    thumbNailBg?: React.FC<React.SVGProps<SVGSVGElement>>;
    thumbNailWidth?: string;
    thumbNailHeight?: string;
    logoFill?: string;
    logoStroke?: string;
    logoPadding?: string;
    logoHeight?: string;
    logoWidth?: string;

    borderColor?: string;
    borderStyle?: string;
    topLeftHLength?: string;
    topLeftVLength?: string;
    topRightHLength?: string;
    topRightVLength?: string;
    bottomRightHLength?: string;
    bottomRightVLength?: string;
    bottomLeftHLength?: string;
    bottomLeftVLength?: string;
}

export const LizardEmblem: React.FC<LizardEmblemProps> = ({
    svg: SvgIcon,
    thumbNailBg,
    thumbNailWidth,
    thumbNailHeight,
    logoFill,
    logoStroke,
    logoPadding,
    logoHeight,
    logoWidth,
    borderColor = "#00ff88",
    borderStyle = "solid",
    topLeftHLength = "40px",
    topLeftVLength = "20px",
    topRightHLength = "40px",
    topRightVLength = "20px",
    bottomRightHLength = "40px",
    bottomRightVLength = "20px",
    bottomLeftHLength = "40px",
    bottomLeftVLength = "20px",
}) => (
    <LizardCardBorder
        borderColor={borderColor}
        borderStyle={borderStyle}
        topLeftHLength={topLeftHLength}
        topLeftVLength={topLeftVLength}
        topRightHLength={topRightHLength}
        topRightVLength={topRightVLength}
        bottomRightHLength={bottomRightHLength}
        bottomRightVLength={bottomRightVLength}
        bottomLeftHLength={bottomLeftHLength}
        bottomLeftVLength={bottomLeftVLength}
    >
        <LizardDiv className={`border w-full justify-center items-center ${logoPadding}`}>
            <LizardDiv className="absolute inset-0 z-0">
                <LizardAnimatedBackground svg={thumbNailBg} thumbNailWidth={thumbNailWidth} thumbNailHeight={thumbNailHeight} className="w-full h-full pointer-events-none px-4 rounded-2xl" />
            </LizardDiv>
            {SvgIcon && <LizardLogoContainer svg={SvgIcon} logoFill={logoFill} logoStroke={logoStroke} logoHeight={logoHeight} logoWidth={logoWidth} />}
        </LizardDiv>
    </LizardCardBorder>
);
