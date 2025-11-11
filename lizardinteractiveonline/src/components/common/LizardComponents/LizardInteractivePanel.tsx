import { LizardLogoContainer, LizardText } from "@/components/common/LizardComponents";
import { navigationPanels } from "@/config/navigationPanels";
import { useNavigationStore } from "@/store";
import { AppData } from "@/types/appData";
import { LizardDiv } from "./layout";
import { Lizard } from "@/components/icons";
import { useControlPanelStore } from "@/store/ControlPanelStore";

type DisabledItem = {
  label: string;
  value: string;
  labelProps?: React.ComponentProps<typeof LizardText>;
  valueProps?: React.ComponentProps<typeof LizardText>;
  valueClassName?: string;
};

type Panel = {
  key: string;
  heading: string;
  overview: string;
  section?: string;
  isActive?: boolean
};

type LizardInteractivePanelProps = {
  disabled?: boolean;
  items?: DisabledItem[];
  heading?: string;
  positionClassName?: string;
  cardClassName?: string;
};

export function LizardInteractivePanel({
  disabled = false,
  items = [],
  heading,
  cardClassName,
  positionClassName = "",
}: LizardInteractivePanelProps) {

    const { setActiveComponent } = useControlPanelStore();

  const { activePanelKey, setSection, setActivePanel, showPanel, } =
    useNavigationStore();

  const panelsToRender: (Panel | { heading: string; items: DisabledItem[]; overview?: string })[] =
    disabled && items.length > 0
      ? [{ heading: "single-disabled", items, overview: "" }]
      : navigationPanels;

  return (
    <LizardDiv direction="row"
      className={`overflow-hidden inline-flex justify-center gap-1 lg:gap-4 fixed left-0 w-full
    transition-transform duration-500 ease-in-out
    ${showPanel ? "translate-y-0 bottom-0" : "translate-y-full bottom-0"}
    ${positionClassName}
  `}
    >

      {panelsToRender.map((panel) => {
        const isDisabledCard = "items" in panel;
        const isActive = !isDisabledCard && activePanelKey === panel.key;

        return (
          <LizardDiv
            key={panel.heading}
            className={`h-auto box-content rounded flex flex-col pl-1 lg:pl-2 transition-colors duration-300 ease-in-out 
    ${disabled || isDisabledCard
                ? "cursor-not-allowed bg-[#E84A4A] text-[#049851]"
                : "cursor-pointer hover:opacity-[0.8] hover:shadow-lg"}
    ${!disabled && !isDisabledCard && isActive
                ? "bg-[#E84A4A]  border"
                : !disabled && !isDisabledCard
                  ? "bg-black/20 hover:bg-white/10  border"
                  : ""}
    ${cardClassName || ""}
  `}
            style={{
              background: !disabled && !isDisabledCard && isActive
                ? "radial-gradient(125% 125% at 50% 90%, #000000 40%, #072607 100%)"

                : "transparent",
            }}
            onClick={() => {
              if (disabled || isDisabledCard) return;
              setActiveComponent('lizardinteractive')
              setSection(panel.heading as keyof AppData);
              setActivePanel(panel.key);

            }}
          >
            {/* Header */}
            <LizardDiv className="w-full relative overflow-hidden">
              {isDisabledCard ? (
                heading && (
                  <LizardDiv className="text-[14px] lg:text-[25px] pl-1 lg:pl-3 py-1 text-[#049851] font-light">
                    <LizardText variant="h3">{heading.toUpperCase()}</LizardText>
                  </LizardDiv>
                )
              ) : (
                <LizardDiv direction="row" className="text-[12px] w-full justify-between sm:text-[18px] lg:text-[20px] sm:pl-2 pl-1 pr-1 lg:pl-2 lg:pr-3 py-1 text-[#049851] font-light ">
                  <LizardText variant="h1">{panel.heading.toUpperCase()}</LizardText>
                  <LizardLogoContainer
                    svg={Lizard}
                      logoStroke="#475569"
                    logoHeight="20"
                    logoWidth="20"
                      logoFill="#00FF88"
                    className="opacity-80"
                  />

                </LizardDiv>
              )}





            </LizardDiv>

            {/* Body */}
            {isDisabledCard ? (
              <LizardDiv className="bg-[#2E4F32] flex-1 flex flex-col px-3 py-2 min-h-[100px]">
                {panel.items.map((item, index) => (
                  <LizardDiv key={index} className="mb-3">
                    <LizardText
                      variant="h1"
                      className={`text-[16px] uppercase text-[#b3b3b3] w-full mb-1 ${item.labelProps?.className || ""}`}
                      {...item.labelProps}
                    >
                      {item.label}
                    </LizardText>
                    <LizardText
                      variant="p"
                      className={`text-[16px] uppercase text-[#E84A4A] w-full leading-none ${item.valueClassName || ""} ${item.valueProps?.className || ""}`}
                      {...item.valueProps}
                    >
                      {item.value}
                    </LizardText>
                  </LizardDiv>
                ))}
              </LizardDiv>
            ) : (
              <LizardDiv className="bg-transparent flex-1 flex px-1 lg:px-2  border-t border-l rounded">
                {"overview" in panel && (
                  <LizardText
                    variant="p"
                    className="text-[8px] sm:text-[12px] lg:text-[14px] p-1 sm:p-2 lg:p-3  "
                  >
                    {panel.overview.toUpperCase()}
                  </LizardText>
                )}
              </LizardDiv>
            )}
          </LizardDiv>
        );
      })}
    </LizardDiv>
  );
}
