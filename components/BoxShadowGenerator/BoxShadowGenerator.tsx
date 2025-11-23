"use client";

import { useState } from "react";

export default function BoxShadowGenerator() {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(30);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState("#000000");
    const [opacity, setOpacity] = useState(0.3);

    const shadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(
        color,
        opacity
    )}`;

    function hexToRgba(hex: string, alpha: number) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(`box-shadow: ${shadow};`);
    }

    return (
        <div className="p-6 bg-gray-800 rounded-xl shadow-xl space-y-8 text-white">

            {/* Preview Box */}
            <div className="flex justify-center my-12">
                <div
                    className="w-72 h-44 rounded-xl transition-all duration-200 border border-gray-700"
                    style={{ boxShadow: shadow, backgroundColor: "#111" }}
                ></div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Sliders */}
                <div className="space-y-5">
                    <label className="block">
                        Horizontal Offset: {hOffset}px
                        <input
                            type="range"
                            min="-100"
                            max="100"
                            value={hOffset}
                            onChange={(e) => setHOffset(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </label>

                    <label className="block">
                        Vertical Offset: {vOffset}px
                        <input
                            type="range"
                            min="-100"
                            max="100"
                            value={vOffset}
                            onChange={(e) => setVOffset(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </label>

                    <label className="block">
                        Blur: {blur}px
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={blur}
                            onChange={(e) => setBlur(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </label>

                    <label className="block">
                        Spread: {spread}px
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={spread}
                            onChange={(e) => setSpread(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </label>
                </div>

                {/* Color + Opacity */}
                <div className="space-y-5">
                    <label className="block">
                        Shadow Color
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full h-10 rounded"
                        />
                    </label>

                    <label className="block">
                        Opacity: {opacity}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={opacity}
                            onChange={(e) => setOpacity(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </label>
                </div>
            </div>

            {/* Output */}
            <div className="bg-gray-900 p-4 rounded-lg text-sm font-mono border border-gray-700">
                <pre className="whitespace-pre-wrap break-words">box-shadow: {shadow};</pre>
            </div>

            <button
                onClick={copyToClipboard}
                className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 font-semibold"
            >
                Copy CSS
            </button>
        </div>
    );
}
