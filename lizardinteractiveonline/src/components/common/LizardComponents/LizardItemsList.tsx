// components/common/LizardItemsList.tsx
import { LizardDiv } from "./layout";
import { LizardText } from "./LizardText";

export interface LizardItem {
    label: string;
    value: string;
    labelProps?: React.ComponentProps<typeof LizardText>;
    valueProps?: React.ComponentProps<typeof LizardText>;
}

interface LizardItemsListProps {
    items: LizardItem[];
    className?: string; // Optional wrapper styling
}

export function LizardItemsList({ items, className = "" }: LizardItemsListProps) {
    return (
        <LizardDiv className={className}>
            
            {items.map((item, index) => (
                <LizardDiv key={index} className="mb-2 sm:mb-3">
                    <LizardText
                        variant="h1"
                        className={`text-[12px] sm:text-[14px] lg:text-[16px] uppercase w-full mb-1 ${item.labelProps?.className || ""}`}
                        {...item.labelProps}
                    >
                        {item.label}
                    </LizardText>
                    <LizardText
                        variant="p"
                        className={`text-[12px] sm:text-[14px] md:text-[16px] uppercase text-[#E84A4A] w-full leading-none ${item.valueProps?.className || ""}`}
                        {...item.valueProps}
                    >
                        {item.value}
                    </LizardText>
                </LizardDiv>
            ))}
        </LizardDiv>
    );
}
