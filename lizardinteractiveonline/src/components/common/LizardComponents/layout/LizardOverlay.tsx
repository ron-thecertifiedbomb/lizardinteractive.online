import { LizardDiv } from "@/components/common/LizardComponents/layout/LizardDiv";

interface LizardOverlayProps {
    fromColor?: string;
    viaColor?: string;
    toColor?: string;
    className?: string;
}

export function LizardOverlay({
    fromColor = "from-[#14532d]/50",
    viaColor = "via-[#14532d]/50",
    toColor = "to-[#14532d]/50",
    className = "",
}: LizardOverlayProps) {
    return (
        <LizardDiv
            className={`
        absolute inset-0  // 👈 stretches to parent bounds
        pointer-events-none
        z-[500]
        rounded-md
        bg-gradient-to-br
        ${fromColor} ${viaColor} ${toColor}
        animate-pulse
        blur-sm
        ${className}
      `}
        />
    );
}
