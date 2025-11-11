// components/common/LizardDiv.tsx
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";


type Direction = "row" | "column";

interface LizardDivProps extends HTMLMotionProps<"div"> {
    animation?: HTMLMotionProps<"div">; // renamed from `mode`
    direction?: Direction; // renamed from `layout`
}

export function LizardDiv({
    animation,
    direction = "column",
    className,
    children,
    ...props
}: LizardDivProps) {
    const finalClass = cn("flex", direction === "column" ? "flex-col" : "flex-row", className);

    return (
        <motion.div className={finalClass} {...animation} {...props}>
            {children}
        </motion.div>
    );
}
