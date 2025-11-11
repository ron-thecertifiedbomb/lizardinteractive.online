import { LizardInteractivePanel } from "../LizardInteractivePanel";
import { LizardDiv } from "./LizardDiv";
import { LizardInteractiveNavigationControlSection } from "../LizardInteractiveNavigationControlSection";
import { HTMLMotionProps } from "framer-motion";
import { LizardInteractivePanelMobile } from "../LizardInteractivePanelMobile";
import { useScreenType } from "@/hooks/useScreenType";
import { navigationMobilePanels } from "@/config/navigationPanels";

type LizardFooterProps = {
    footerStyle: string;
    animation?: HTMLMotionProps<"div">;
};

export function LizardFooter({ footerStyle, animation }: LizardFooterProps) {
    const { isMobile } = useScreenType(); // 👈 make sure to call inside component

    return (
        <LizardDiv className={`w-full ${footerStyle}`}>
            <LizardDiv
                animation={animation}
                className="relative w-full flex justify-center items-center overflow-hidden pointer-events-auto"
            >
                {!isMobile && <LizardInteractivePanel cardClassName="w-full max-w-[230px]" />}
                {isMobile && <LizardInteractivePanelMobile className="w-full border-1 border-[#64748b] border-b-0 flex-1 justify-between px-6 sm:px-15 py-1 " items={navigationMobilePanels} />}
            </LizardDiv>
            <LizardDiv
                animation={animation}
                className="flex justify-center w-full pointer-events-auto"
            >
                <LizardInteractiveNavigationControlSection />
            </LizardDiv>
        </LizardDiv>
    );
}
