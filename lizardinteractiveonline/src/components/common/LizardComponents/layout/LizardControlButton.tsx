import { LizardLogoContainer } from "@/components/common/LizardComponents";
import { bounceIn } from "@/lib/motionMode";
import { Lizard, LizardTitle } from "@/components/icons";
import { LizardDiv } from "./LizardDiv";
import { useControlPanelStore } from "@/store/ControlPanelStore";
import { useNavigationStore } from "@/store";
import { useScreenType } from "@/hooks/useScreenType";

export function LizardControlButton() {
    const {
        hideControlPanelButton,
        showHeaderPanel,
        setShowHeaderPanel,
        showLeftPanel,
        showRightPanel,
        setHideControlPanelButton,
        setShowRightPanel,
        setShowLeftPanel,
        activeComponent,
        setShowLizardInteractiveMobilePanel,
        showLizardInteractiveMobilePanel
    } = useControlPanelStore();

    const { showPanel, setShowPanel } = useNavigationStore();

    const { showCenterLogo, setShowCenterLogo } = useControlPanelStore()
  const { isMobile } = useScreenType()
    if (activeComponent) {
        return null;
    }

    return (
        <LizardDiv
            animation={bounceIn}
            className="flex flex-col flex-1 w-full items-center justify-center lg:px-10 bg-transparent"
        >
            <LizardDiv
                onClick={() => {
                    setShowHeaderPanel(!showHeaderPanel);
                    setHideControlPanelButton(!hideControlPanelButton);
                    setShowPanel(!showPanel);
                    setShowCenterLogo(!showCenterLogo);
                    setShowLizardInteractiveMobilePanel(!showLizardInteractiveMobilePanel)

                    if (!isMobile) {
                        setShowRightPanel(!showRightPanel);
                        setShowLeftPanel(!showLeftPanel);
                    }
                }}
                className="cursor-pointer relative flex items-center justify-center"
            >
                {/* Lizard icon */}
         
                <LizardLogoContainer
                    svg={Lizard}
                    logoFill="#fafaf9"
                    logoStroke="#00FF88"
                    logoHeight="55%"
                    logoWidth="55%"
                    className={`
    drop-shadow-[0_0_8px_rgba(255,255,255,3)] opacity-60 hover:drop-shadow-[0_0_10px_#ffffff]
    origin-center
    transition-all duration-700 ease-in-out
    ${hideControlPanelButton
                            ? "scale-170 opacity-100"
                            : "scale-0 opacity-0"
                        }`}
                />

                {/* LizardTitle icon */}
                <LizardLogoContainer
                    svg={LizardTitle}
                    logoStroke="#00FF88"
                    logoHeight="300"
                    logoWidth="300"
                    className={`
    absolute drop-shadow-[0_0_10px_#00ff88] hover:drop-shadow-[0_0_10px_#00ff88]
    origin-center
    transition-[opacity,transform] duration-700 ease-in-out delay-400
    ${hideControlPanelButton
                            ? "scale-0 opacity-0"
                            : "scale-100 opacity-100"
                        }`}
                    
                    
                />

            </LizardDiv>
        </LizardDiv>
    );
}
