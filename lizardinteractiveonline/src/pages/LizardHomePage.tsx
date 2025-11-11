import { LizardAnimatedBackground } from "@/components/common/LizardComponents";
import { LizardControlButton } from "@/components/common/LizardComponents/layout";
import { LizardDiv } from "@/components/common/LizardComponents/layout/LizardDiv";
import { LizardCenterScreen } from "@/components/common/LizardComponents/screens";
import { Center } from "@/components/icons";
import { useControlPanelStore } from "@/store/ControlPanelStore";

export function LizardHomePage() {

  const { showCenterLogo } = useControlPanelStore()

  return (
    <LizardDiv
      direction="row"
      className="relative flex w-full max-w-[1200px] flex-1 mx-auto overflow-hidden justify-center items-center "
    >
      <LizardDiv className="absolute z-0 flex-1 w-full justify-center items-center">
        <LizardAnimatedBackground
          svg={Center}
          className={`flex-1 flex justify-center items-center pointer-events-none px-4 rounded-2xl 
filter:drop-shadow(0_0_6px_rgba(57,255,20,0.9))_drop-shadow(0_0_12px_rgba(57,255,20,0.8))] opacity-90
    hover:drop-shadow-[0_0_50px_#065f46]
    origin-center
    transition-all duration-1000 ease-in-out
    ${showCenterLogo ? "opacity-100 delay-400" : " opacity-0 delay-400"}`}
          logoFill="#065f46"
          logoStroke="#065f46"
          thumbNailHeight="100%"
          thumbNailWidth="100%"
        />

      </LizardDiv>

      <LizardDiv className="relative z-10 flex-1 w-full flex items-center justify-center">
        <LizardCenterScreen className="relative z-20 flex flex-col w-full h-full flex-1 mx-auto overflow-hidden justify-center items-center gap-4" />
        <LizardDiv className="absolute inset-0 flex items-center justify-center z-10">
          <LizardControlButton />
        </LizardDiv>
      </LizardDiv>


    </LizardDiv>
  );
}
