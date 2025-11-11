  import { AnimatePresence } from "framer-motion";
  import { LizardDiv } from "@/components/common/LizardComponents/layout/LizardDiv";
  import { useControlPanelStore } from "@/store/ControlPanelStore";
  import { LizardInteractive } from "./LizardInteractive";
  import { LizardMap } from "./LizardMap";
import { LizardTranslator } from "./LizardTranslator";
import { LizardCurrencyConverter } from "./LizardCurrencyConverter";
import { LizardWeather } from "./LizardWeather";


interface LizardCenterScreen {
  className?: string;
}

export function LizardCenterScreen({ className= ""}: LizardCenterScreen ) {

  const { activeComponent, setActiveComponent } = useControlPanelStore();
  

    const renderContent = () => {
      switch (activeComponent) {
        case "home":
          return <LizardWeather className="w-full max-h-[640px] xl:max-h-[700px] p-2 overflow-y-auto" />
        case "map":
          return <LizardMap className="w-full h-[400px] xl:h-[700px]" />;
        case "translator":
          return <LizardTranslator className="w-full max-h-[400px] py-6 overflow-y-auto" />
        case "lizardinteractive":
          return <LizardInteractive className="w-full h-[500px] xl:h-[700px] p-2" />;
        case "currency":
          return <LizardCurrencyConverter className="w-full  h-[500px] p-6" />;
        default:
          return null;
      }
    };

    return (
<AnimatePresence>
  <LizardDiv
    key="lizard-center"
    animation={{
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        opacity: { duration: 0.9 },
        scale: { duration: 0.9 },
      },
    }}
    className={`relative  ${className}`}
        >
          
          <LizardDiv className="flex flex-1 min-h-0 w-full">
            {renderContent()}
          </LizardDiv>
    {activeComponent && (
      <button
        onClick={() => setActiveComponent(null)}
        className="absolute top-2 right-4 z-700 px-2 py-1 text-[8px] uppercase sm:text-[10px] border border-[#14532d] bg-[#14532d] text-white rounded-4xl hover:bg-gray-700 transition cursor-pointer shadow-md"
      >
        close
      </button>
    )}
  </LizardDiv>
</AnimatePresence>

    );
  }
