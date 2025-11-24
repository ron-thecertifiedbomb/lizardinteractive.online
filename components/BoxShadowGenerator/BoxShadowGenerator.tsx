"use client";

import { useState } from "react";

export default function BoxShadowGenerator() {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(0);

    // RGB & Alpha sliders
    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);
    const [a, setA] = useState(0.3);

    const [copied, setCopied] = useState(false);

    const color = `rgba(${r}, ${g}, ${b}, ${a})`;

    const shadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`box-shadow: ${shadow};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className="space-y-8 mt-8">

            {/* Preview Box */}
            <div
                className="w-full h-40 bg-white rounded-lg border border-gray-200 flex items-center justify-center"
                style={{ boxShadow: shadow }}
            >
                <span className="text-gray-600 text-sm">Preview</span>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                {/* Horizontal Offset */}
                <Range label="Horizontal Offset" value={hOffset} min={-100} max={100} onChange={setHOffset} />

                {/* Vertical Offset */}
                <Range label="Vertical Offset" value={vOffset} min={-100} max={100} onChange={setVOffset} />

                {/* Blur Radius */}
                <Range label="Blur Radius" value={blur} min={0} max={200} onChange={setBlur} />

                {/* Spread Radius */}
                <Range label="Spread Radius" value={spread} min={-50} max={100} onChange={setSpread} />
            </div>

            {/* RGB + Opacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">

                <Range label="Red" value={r} min={0} max={255} onChange={setR} />
                <Range label="Green" value={g} min={0} max={255} onChange={setG} />
                <Range label="Blue" value={b} min={0} max={255} onChange={setB} />

                <label className="text-sm text-gray-300">
                    Opacity ({a})
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={a}
                        onChange={(e) => setA(Number(e.target.value))}
                        className="w-full mt-1"
                    />
                </label>
            </div>

            {/* Output Box */}
            <div className="relative bg-gray-900 p-4 rounded-lg text-sm border border-gray-700">
                <pre className="whitespace-pre-wrap break-words font-normal text-xs">
                    box-shadow: {shadow};
                </pre>

                <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition"
                >
                    Copy
                </button>

                {copied && (
                    <div className="absolute bottom-2 right-2 text-green-400 text-xs animate-fade">
                        Copied!
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes fade {
                    0% { opacity: 0; transform: translateY(4px); }
                    30% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-4px); }
                }
                .animate-fade {
                    animation: fade 1.2s ease forwards;
                }
            `}</style>
        </div>
    );
}

/* Reusable Slider */
function Range({
    label,
    value,
    min,
    max,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (n: number) => void;
}) {
    return (
        <label className="text-sm text-gray-300">
            {label} ({value})
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full mt-1 "
            />
        </label>
    );
}
