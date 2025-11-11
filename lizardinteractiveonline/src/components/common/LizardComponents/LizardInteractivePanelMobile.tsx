import { LizardDiv } from "./layout";
import { LizardText } from "./LizardText";
import { ActiveComponent, useControlPanelStore } from "@/store/ControlPanelStore";
import { FaHome, FaMap, FaDollarSign, FaLanguage } from "react-icons/fa";
import { IconType } from "react-icons";

interface NavigationPanelMobile {
    title: string;
    component: ActiveComponent;
    icon: string;
    isActive: boolean;
}

interface LizardInteractivePanelMobileProps {
    className?: string;
    items?: NavigationPanelMobile[];
}

export function LizardInteractivePanelMobile({
    items = [],
    className = "",
}: LizardInteractivePanelMobileProps) {

    const { activeComponent, setActiveComponent, showLizardInteractiveMobilePanel } = useControlPanelStore();

    const getIcon = (iconName: string): IconType | null => {
        switch (iconName) {
            case "home":
                return FaHome;
            case "map":
                return FaMap;
            case "translator":
                return FaLanguage;
            case "currency":
                return FaDollarSign;
            default:
                return null;
        }
    };

    return (
        <LizardDiv direction="row" className={`    transition-transform duration-500 ease-in-out
    ${showLizardInteractiveMobilePanel ? "translate-y-0 bottom-0" : "translate-y-full bottom-0"}                    ${className} `}>
            {items.map((item, i) => {
                const IconComponent = getIcon(item.icon);
                const isActive = activeComponent === item.component; // check active

                return (
                    <LizardDiv
                        key={i}
                        className={`cursor-pointer p-2 rounded flex items-center gap-2 transition
              ${isActive ? "border-[#65a30d] text-[#4ade80]" : "hover:border-[#14532d] text-[#14532d]"} text-[12px] sm:text-[18px] uppercase`}
                        onClick={() => setActiveComponent(item.component)}
                    >
                        {IconComponent && (
                            <IconComponent className={`w-6 h-6 ${isActive ? "text-[#4ade80]" : "text-[#14532d]"}`} />
                        )}
                        <LizardText >{item.title}</LizardText>
                    </LizardDiv>
                );
            })}
        </LizardDiv>
    );
}
