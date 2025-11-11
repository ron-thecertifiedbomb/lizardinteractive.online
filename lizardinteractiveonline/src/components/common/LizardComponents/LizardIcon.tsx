import { LizardDiv } from "./layout";

interface LizardIconProps {
    icon?: React.ReactNode;      // 👈 can be JSX, SVG, or string
    iconClassName?: string;
}

export function LizardIcon({
    icon,
    iconClassName = "",
}: LizardIconProps) {
    console.log("AppMarqueeIcons");

    return (
        <LizardDiv className={iconClassName}>
            <LizardDiv>
                {icon}
            </LizardDiv>
        </LizardDiv>
    );
}
