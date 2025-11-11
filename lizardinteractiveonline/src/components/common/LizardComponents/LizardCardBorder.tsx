// LizardCardBorder.tsx
import React from "react";
import { LizardDiv } from "./layout";

interface LizardCardBorderProps {
    children: React.ReactNode;
    className?: string;

    borderColor?: string;
    borderStyle?: string;

    // Top Left
    topLeftHThickness?: string;
    topLeftHLength?: string;
    topLeftVThickness?: string;
    topLeftVLength?: string;

    // Top Right
    topRightHThickness?: string;
    topRightHLength?: string;
    topRightVThickness?: string;
    topRightVLength?: string;

    // Bottom Left
    bottomLeftHThickness?: string;
    bottomLeftHLength?: string;
    bottomLeftVThickness?: string;
    bottomLeftVLength?: string;

    // Bottom Right
    bottomRightHThickness?: string;
    bottomRightHLength?: string;
    bottomRightVThickness?: string;
    bottomRightVLength?: string;
}

export function LizardCardBorder({
    children,
    className,
    borderColor = "#E84A4A",
    borderStyle = "solid",

    // defaults
    topLeftHThickness = "1px",
    topLeftHLength = "10px",
    topLeftVThickness = "1px",
    topLeftVLength = "10px",

    topRightHThickness = "1px",
    topRightHLength = "10px",
    topRightVThickness = "1px",
    topRightVLength = "10px",

    bottomLeftHThickness = "1px",
    bottomLeftHLength = "10px",
    bottomLeftVThickness = "1px",
    bottomLeftVLength = "10px",

    bottomRightHThickness = "1px",
    bottomRightHLength = "10px",
    bottomRightVThickness = "1px",
    bottomRightVLength = "10px",
}: LizardCardBorderProps) {
    const makeBorder = (thickness: string) =>
        thickness !== "0" ? `${thickness} ${borderStyle} ${borderColor}` : "none";

    return (
        <LizardDiv className={`relative w-full flex items-center justify-center ${className ?? ""}`}>
            {children}

            <LizardDiv className="pointer-events-none absolute inset-0">
                {/* Top Left */}
                <LizardDiv className="absolute top-0 left-0">
                    <LizardDiv style={{ width: topLeftHLength, borderTop: makeBorder(topLeftHThickness) }} />
                    <LizardDiv style={{ height: topLeftVLength, borderLeft: makeBorder(topLeftVThickness) }} />
                </LizardDiv>

                {/* Top Right */}
                <LizardDiv className="absolute top-0 right-0">
                    <LizardDiv style={{ width: topRightHLength, borderTop: makeBorder(topRightHThickness) }} />
                    <LizardDiv style={{ height: topRightVLength, borderRight: makeBorder(topRightVThickness) }} />
                </LizardDiv>

                {/* Bottom Left */}
                <LizardDiv className="absolute bottom-0 left-0">
                    <LizardDiv style={{ height: bottomLeftVLength, borderLeft: makeBorder(bottomLeftVThickness) }} />
                    <LizardDiv style={{ width: bottomLeftHLength, borderBottom: makeBorder(bottomLeftHThickness) }} />
                </LizardDiv>

                {/* Bottom Right */}
                <LizardDiv className="absolute bottom-0 right-0">
                    <LizardDiv style={{ height: bottomRightVLength, borderRight: makeBorder(bottomRightVThickness) }} />
                    <LizardDiv style={{ width: bottomRightHLength, borderBottom: makeBorder(bottomRightHThickness) }} />
                </LizardDiv>
            </LizardDiv>
        </LizardDiv>
    );
}
