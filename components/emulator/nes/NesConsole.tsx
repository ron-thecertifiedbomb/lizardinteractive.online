"use client";

export function NesConsole({
    canvasRef,
    status,
}: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    status: "idle" | "running" | "paused";
}) {
    return (
        <div className="mt-4 mx-auto max-w-3xl">
            {/* 1. CONTAINER: Sets the Emerald Glow and Zinc Border */}
            <div
                className="relative w-full overflow-hidden border border-zinc-900 bg-black scanlines"
                style={{
                    boxShadow: `0 0 30px -10px rgba(16, 185, 129, 0.25)`,
                }}
            >
                {/* 2. THE CROP WRAPPER: 
                       NES native is 256px wide, but we often hide the first 8px 
                       to remove scrolling garbage. This wrapper ensures a clean 4:3 fit. */}
                <div className="aspect-[4/3] w-full flex items-center justify-center bg-black">
                    <canvas
                        ref={canvasRef}
                        width={256}
                        height={240}
                        /* 3. CANVAS: 
                           Using 'h-full w-full' with 'pixel-perfect' (from your CSS) 
                           keeps the Emerald pixels sharp. */
                        className="h-full w-full pixel-perfect block"
                    />
                </div>

                {/* 4. MINIMALIST PAUSE OVERLAY */}
                {status === "paused" && (
                    <div className="absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[1px] z-30">
                        <div className="font-mono text-xs tracking-[0.4em] text-emerald-500 uppercase">
                            System_Paused
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}