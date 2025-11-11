import {
    LizardCardBorder,
    LizardLocator,
} from "@/components/common/LizardComponents";
import { LizardDiv } from "./layout";
import { fadeIn } from "@/lib/motionMode";

interface LizardUtilitiesProps {
    cardPosition?: string;
    onClick?: () => void; // 👈 new prop
}

export function LizardUtilities({ cardPosition, onClick }: LizardUtilitiesProps) {
    return (
        <LizardDiv
            animation={fadeIn}
            className={`${cardPosition} flex w-full max-w-[180px] cursor-pointer`} // 👈 cursor for interactivity
            onClick={onClick} // 👈 trigger onClick if passed
        >
            <LizardCardBorder
                borderStyle="solid"
                borderColor="#00ff88"
                topLeftHLength="40px"
                topLeftVLength="20px"
                topRightHLength="40px"
                topRightVLength="20px"
                bottomRightHLength="40px"
                bottomRightVLength="20px"
                bottomLeftHLength="40px"
                bottomLeftVLength="20px"
                className="h-full"
            >
                <LizardDiv className="relative border w-full h-[150px] p-2 flex justify-center items-center overflow-hidden">
                    {/* Thumbnail / Map */}
                    <LizardLocator className="w-full h-full object-cover opacity-50" />

                    {/* Hologram Tint Overlay */}
                    <LizardDiv
                        className="
              absolute inset-0
              pointer-events-none
              rounded-md
              bg-gradient-to-br
              from-[#00ff88]/20
              via-[#00fff0]/10
              to-[#00ff88]/20
              animate-pulse
              blur-sm
            "
                    />
                </LizardDiv>
            </LizardCardBorder>
        </LizardDiv>
    );
}
