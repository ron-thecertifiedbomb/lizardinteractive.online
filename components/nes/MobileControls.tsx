/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { NesButton } from "@/lib/nes/input";

function Btn({
    label,
    onPress,
    onRelease,
    className = "",
    variant = "default",
}: {
    label: string;
    onPress: () => void;
    onRelease: () => void;
    className?: string;
    variant?: "default" | "action" | "system";
}) {
    const variants = {
        /* Glassy D-Pad look */
        default: "border-zinc-800 bg-gradient-to-b from-zinc-900 to-black text-zinc-500 active:border-cyan-500/50 active:text-cyan-400 active:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        /* High-contrast Action buttons */
        action: "border-rose-900/50 bg-zinc-950 text-rose-600 font-black text-xl active:bg-rose-600 active:text-white active:shadow-[0_0_30px_rgba(225,29,72,0.5)]",
        /* Minimalist System buttons */
        system: "border-zinc-800/50 bg-transparent text-[9px] tracking-[0.2em] text-zinc-600 active:text-white active:border-zinc-500",
    };

    return (
        <button
            className={[
                "touch-none select-none border transition-all duration-75 active:scale-90 flex items-center justify-center",
                variants[variant],
                className,
            ].join(" ")}
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                onPress();
            }}
            onPointerUp={() => onRelease()}
            onPointerCancel={() => onRelease()}
            onPointerLeave={() => onRelease()}
            type="button"
        >
            {label}
        </button>
    );
}

type Props = {
    onPress: (b: NesButton) => void;
    onRelease: (b: NesButton) => void;
};

export function NesMobileControls({ onPress, onRelease }: Props) {
    return (
        <div className="mt-6 w-full lg:hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col gap-8 px-6 pb-12">

                {/* Main Control Deck */}
                <div className="flex items-end justify-between">

                    {/* D-Pad: Classic Cross Layout */}
                    <div className="grid grid-cols-3 grid-rows-3 gap-1 ">
                        <div />
                        <Btn label="▲" variant="default" className="h-14 w-14 rounded-xl" onPress={() => onPress("UP")} onRelease={() => onRelease("UP")} />
                        <div />

                        <Btn label="◀" variant="default" className="h-14 w-14  rounded-xl" onPress={() => onPress("LEFT")} onRelease={() => onRelease("LEFT")} />
                        <div className="h-16 w-16 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-zinc-800 shadow-[inset_0_1px_2px_rgba(0,0,0,1)]" />
                        </div>
                        <Btn label="▶" variant="default" className="h-14 w-14 rounded-xl" onPress={() => onPress("RIGHT")} onRelease={() => onRelease("RIGHT")} />
        
                        <div />
                        <Btn label="▼" variant="default" className="h-16 w-16 rounded-xl" onPress={() => onPress("DOWN")} onRelease={() => onRelease("DOWN")} />
                        <div />
                    </div>

                    {/* Action Buttons: Slanted A/B */}
                    <div className="relative h-30 w-30">
                        <Btn
                            label="B"
                            variant="action"
                            className="absolute bottom-2 left-0 h-12 w-12 rounded-full border-2"
                            onPress={() => onPress("B")}
                            onRelease={() => onRelease("B")}
                        />
                        <Btn
                            label="A"
                            variant="action"
                            className="absolute top-2 right-0 h-12 w-12 rounded-full border-2"
                            onPress={() => onPress("A")}
                            onRelease={() => onRelease("A")}
                        />
                    </div>
                </div>

                {/* System Row: Centered and Pill-shaped */}
                <div className="flex justify-center gap-6 pt-4 border-t border-zinc-900/50">
                    <div className="flex flex-col items-center gap-1">
                        <Btn label="SELECT" variant="system" className="w-24 py-3 rounded-full border-dashed" onPress={() => onPress("SELECT")} onRelease={() => onRelease("SELECT")} />
                        {/* <span className="text-[7px] text-zinc-700 font-black tracking-widest">FUNC_01</span> */}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Btn label="START" variant="system" className="w-24 py-3 rounded-full border-dashed" onPress={() => onPress("START")} onRelease={() => onRelease("START")} />
                        {/* <span className="text-[7px] text-zinc-700 font-black tracking-widest">EXEC_CMD</span> */}
                    </div>
                </div>

            </div>
        </div>
    );
}