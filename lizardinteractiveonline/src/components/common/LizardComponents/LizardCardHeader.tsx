import { LizardText } from "./LizardText";

type LizardCardHeaderItem = {
    label: string;
    value: string;
    type?: "highlight" | "bordered" | "default"; // optional type
};

interface LizardCardHeaderProps {
    items: LizardCardHeaderItem[];
    className?: string;
}

export function LizardCardHeader({ items, className }: LizardCardHeaderProps) {
    return (
        <div className={`flex flex-col items-start gap-4 w-full ${className || ""}`}>
            {items.map((item, idx) => {
                const { label, value, type = "default" } = item;

                // base value styling
                let valueClasses = "text-1xl leading-tight whitespace-nowrap uppercase";

                // wrapper classes
                let wrapperClasses = "";

                switch (type) {
                    case "highlight":
                        wrapperClasses = "w-full bg-[#E84A4A]";
                        valueClasses += " text-black px-2";
                        break;
                    case "bordered":
                        wrapperClasses = "w-full border border-[#E84A4A]";
                        valueClasses += " text-[#E84A4A] px-2";
                        break;
                    default:
                        valueClasses += " text-[#E84A4A]";
                        break;
                }

                return (
                    <>
                        <div key={idx} >
                            <LizardText className="leading-none uppercase mb-1">{label}</LizardText>
                            <div className={wrapperClasses || undefined}>
                                <LizardText className={valueClasses}>{value}</LizardText>
                            </div>

                        </div>
                    </>
                );
            })}
        </div>
    );
}
