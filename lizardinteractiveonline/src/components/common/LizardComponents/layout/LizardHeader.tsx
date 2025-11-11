import { LizardTitle } from "@/components/icons";
import { LizardDiv } from ".";
import { LizardDateAndTime } from "../LizardDateAndTime";
import { LizardLogoContainer } from "../LizardLogoContainer";
import { useControlPanelStore } from "@/store/ControlPanelStore";

export function LizardHeader() {

    const { showHeaderPanel } = useControlPanelStore()
    return (
        <LizardDiv
            direction="row"
            className={`flex w-full  justify-between items-center absolute top-0 z-50
    transition-transform duration-900 ease-in-out
    ${showHeaderPanel ? 'translate-y-0' : '-translate-y-[100px]'}
  `}
        >
            <LizardDiv className=" w-full py-4  md:px-5 lg:px-5 2xl:px-20 flex items-center justify-center md:w-auto lg:w-auto">
                <LizardDiv >
                    <LizardLogoContainer
                        svg={LizardTitle}
                        logoStroke="#00FF88"
                        className="
drop-shadow-[0_0_20px_#00ff88]
    hover:drop-shadow-[0_0_25px_#00ff88]
    transition-all duration-300
    opacity-90
    stroke-6
   
  "/>
                </LizardDiv>

            </LizardDiv>
            <LizardDiv direction="row" className="hidden  sm:flex lg:flex gap-4 md:px-5 lg:px-5 2xl:px-20 lg:py-4">
                <LizardDateAndTime time="utcTime" type="time" label="Server Time:" />
                <LizardDateAndTime time="localTime" type="time" label="Local Time:" />
            </LizardDiv>
        </LizardDiv>

    );
}
