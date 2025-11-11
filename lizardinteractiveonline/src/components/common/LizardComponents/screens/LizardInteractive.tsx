import { useNavigationStore } from "@/store";
import { LizardDiv, LizardOverlay } from "../layout";
import { LizardText } from "../LizardText";

interface LizardInteractive {
    className?: string;
}

export function LizardInteractive({ className = "relative border flex justify-center items-center overflow-hidden" }: LizardInteractive) {


  const { section } = useNavigationStore();


    return (
        <LizardDiv className={`${className}`}>
            <LizardText>
                {section}
          </LizardText>
            <LizardOverlay
                fromColor="from-blue-500/40"
                viaColor="via-cyan-400/30"
                toColor="to-blue-500/40"
            />
        </LizardDiv>
    );
}
