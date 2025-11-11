import { TAILWIND_COLORS } from "@/config/tailwindColors";
import { toast } from "react-hot-toast";
import { LizardDiv } from "./layout";

export function LizardTailwindColors() {
    const handleCopy = (hex: string, name: string) => {
        navigator.clipboard.writeText(hex);
        toast.success(`${name} copied!`);
    };

    return (
        <LizardDiv className="p-4 grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {Object.entries(TAILWIND_COLORS).map(([colorName, shades]) =>
                Object.entries(shades).map(([shade, hex]) => {
                    const displayName = `${colorName}-${shade}`;
                    return (
                        <LizardDiv
                            key={displayName}
                            className="relative flex flex-col items-center justify-center p-2 rounded cursor-pointer shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                            style={{ backgroundColor: hex }}
                            onClick={() => handleCopy(hex, displayName)}
                        >
                            <span
                                className="font-semibold text-sm select-none"
                                style={{ color: getContrastYIQ(hex) }}
                            >
                                {displayName}
                            </span>
                            <span
                                className="text-xs select-none"
                                style={{ color: getContrastYIQ(hex) }}
                            >
                                {hex}
                            </span>
                        </LizardDiv>
                    );
                })
            )}
        </LizardDiv>
    );
}

// Helper: return black or white depending on background color contrast
function getContrastYIQ(hex: string) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
}
