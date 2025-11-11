import { LizardDiv, LizardOverlay } from "../layout";
import { LizardLocator } from "../LizardLocator";

interface LizardMapProps {
    className?: string;
}

export function LizardMap({ className= "relative borderflex justify-center items-center overflow-hidden" }: LizardMapProps) {
    return (
        <LizardDiv className={`${className}`}>
            <LizardLocator className="w-full h-full object-cover" />
            <LizardOverlay
                fromColor="from-blue-500/40"
                viaColor="via-cyan-400/30"
                toColor="to-blue-500/40"
            />
        </LizardDiv>
    );
}
