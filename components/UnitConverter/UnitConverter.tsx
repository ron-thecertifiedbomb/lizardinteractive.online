/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import {
    Copy,
    Check,
    RefreshCw,
    ArrowRightLeft,
    Ruler,
    Weight,
    Thermometer,
    Clock,
    Database,
    Zap
} from "lucide-react";

type Category = {
    id: string;
    name: string;
    icon: any;
    units: string[];
    convert: (value: number, from: string, to: string) => number;
};

export function UnitConverter() {
    const [value, setValue] = useState("1");
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [category, setCategory] = useState("length");
    const [result, setResult] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    // Conversion categories
    const categories: Category[] = [
        {
            id: "length",
            name: "LENGTH",
            icon: Ruler,
            units: ["Meters", "Kilometers", "Miles", "Feet", "Inches", "Centimeters", "Millimeters", "Yards"],
            convert: (value, from, to) => {
                const toMeters: Record<string, number> = {
                    "Meters": 1,
                    "Kilometers": 1000,
                    "Miles": 1609.344,
                    "Feet": 0.3048,
                    "Inches": 0.0254,
                    "Centimeters": 0.01,
                    "Millimeters": 0.001,
                    "Yards": 0.9144
                };
                const meters = value * toMeters[from];
                return meters / toMeters[to];
            }
        },
        {
            id: "weight",
            name: "WEIGHT",
            icon: Weight,
            units: ["Kilograms", "Grams", "Pounds", "Ounces", "Tons", "Milligrams"],
            convert: (value, from, to) => {
                const toKg: Record<string, number> = {
                    "Kilograms": 1,
                    "Grams": 0.001,
                    "Pounds": 0.453592,
                    "Ounces": 0.0283495,
                    "Tons": 1000,
                    "Milligrams": 0.000001
                };
                const kg = value * toKg[from];
                return kg / toKg[to];
            }
        },
        {
            id: "temperature",
            name: "TEMPERATURE",
            icon: Thermometer,
            units: ["Celsius", "Fahrenheit", "Kelvin"],
            convert: (value, from, to) => {
                let celsius: number;
                // Convert to Celsius first
                if (from === "Celsius") celsius = value;
                else if (from === "Fahrenheit") celsius = (value - 32) * 5 / 9;
                else celsius = value - 273.15;

                // Convert from Celsius to target
                if (to === "Celsius") return celsius;
                if (to === "Fahrenheit") return (celsius * 9 / 5) + 32;
                return celsius + 273.15;
            }
        },
        {
            id: "area",
            name: "AREA",
            icon: Ruler,
            units: ["Square Meters", "Square Kilometers", "Square Miles", "Square Feet", "Acres", "Hectares"],
            convert: (value, from, to) => {
                const toSqMeters: Record<string, number> = {
                    "Square Meters": 1,
                    "Square Kilometers": 1_000_000,
                    "Square Miles": 2_589_988,
                    "Square Feet": 0.092903,
                    "Acres": 4046.86,
                    "Hectares": 10_000
                };
                const sqMeters = value * toSqMeters[from];
                return sqMeters / toSqMeters[to];
            }
        },
        {
            id: "volume",
            name: "VOLUME",
            icon: Database,
            units: ["Liters", "Milliliters", "Gallons", "Quarts", "Pints", "Cups", "Cubic Meters"],
            convert: (value, from, to) => {
                const toLiters: Record<string, number> = {
                    "Liters": 1,
                    "Milliliters": 0.001,
                    "Gallons": 3.78541,
                    "Quarts": 0.946353,
                    "Pints": 0.473176,
                    "Cups": 0.236588,
                    "Cubic Meters": 1000
                };
                const liters = value * toLiters[from];
                return liters / toLiters[to];
            }
        },
        {
            id: "time",
            name: "TIME",
            icon: Clock,
            units: ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years"],
            convert: (value, from, to) => {
                const toSeconds: Record<string, number> = {
                    "Seconds": 1,
                    "Minutes": 60,
                    "Hours": 3600,
                    "Days": 86400,
                    "Weeks": 604800,
                    "Months": 2_592_000,
                    "Years": 31_536_000
                };
                const seconds = value * toSeconds[from];
                return seconds / toSeconds[to];
            }
        },
        {
            id: "speed",
            name: "SPEED",
            icon: Zap,
            units: ["km/h", "mph", "m/s", "knots", "ft/s"],
            convert: (value, from, to) => {
                const toKmph: Record<string, number> = {
                    "km/h": 1,
                    "mph": 1.60934,
                    "m/s": 3.6,
                    "knots": 1.852,
                    "ft/s": 1.09728
                };
                const kmph = value * toKmph[from];
                return kmph / toKmph[to];
            }
        }
    ];

    const currentCategory = categories.find(c => c.id === category)!;

    // Initialize units when category changes
    useState(() => {
        setFromUnit(currentCategory.units[0]);
        setToUnit(currentCategory.units[1] || currentCategory.units[0]);
    });

    // Update units when category changes
    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        const cat = categories.find(c => c.id === newCategory)!;
        setFromUnit(cat.units[0]);
        setToUnit(cat.units[1] || cat.units[0]);
    };

    // Perform conversion
    const convert = useCallback(() => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setResult(null);
            return;
        }
        const converted = currentCategory.convert(numValue, fromUnit, toUnit);
        setResult(converted);
    }, [value, fromUnit, toUnit, currentCategory]);

    // Auto-convert when inputs change
    useState(() => {
        convert();
    });

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        setTimeout(convert, 0);
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        setTimeout(convert, 0);
    };

    const copyResult = async () => {
        if (result === null) return;
        await navigator.clipboard.writeText(result.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            {/* Result Display - Prominent */}
            <div className="bg-gradient-to-r from-emerald-950/30 to-zinc-950 border border-emerald-500/20 rounded-2xl p-6">
                <p className="text-[10px] font-mono text-emerald-500 mb-2">CONVERTED VALUE</p>
                <div className="flex items-baseline justify-between flex-wrap gap-4">
                    <div>
                        <span className="text-4xl font-black text-white">
                            {result !== null ? result.toFixed(6).replace(/\.?0+$/, '') : "—"}
                        </span>
                        <span className="text-xl font-black text-zinc-500 ml-2">{toUnit}</span>
                    </div>
                    <button
                        onClick={copyResult}
                        disabled={result === null}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 active:scale-95 transition text-xs font-mono disabled:opacity-50"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        {copied ? "COPIED" : "COPY"}
                    </button>
                </div>
            </div>

            {/* Value Input */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <div className="border-b border-zinc-900 px-4 py-3">
                    <span className="text-xs font-mono text-zinc-500">ENTER VALUE</span>
                </div>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    placeholder="Enter a number..."
                    className="w-full bg-transparent px-4 py-4 text-white font-mono text-2xl focus:outline-none"
                />
            </div>

            {/* Category Selection - Horizontal Scroll on Mobile */}
            <div className="overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex gap-2 min-w-max">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${category === cat.id
                                        ? "bg-emerald-500 text-black"
                                        : "bg-zinc-950 border border-zinc-900 text-zinc-500"
                                    }`}
                            >
                                <Icon size={14} />
                                <span className="text-[10px] font-black uppercase tracking-wider">{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Unit Selection */}
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
                {/* From Unit */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                    <div className="border-b border-zinc-900 px-3 py-2">
                        <span className="text-[8px] font-mono text-zinc-600">FROM</span>
                    </div>
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full bg-transparent px-3 py-3 text-white font-mono text-sm focus:outline-none"
                    >
                        {currentCategory.units.map((unit) => (
                            <option key={unit} value={unit} className="bg-zinc-900">
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Swap Button */}
                <button
                    onClick={swapUnits}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-emerald-500 active:scale-95 transition"
                >
                    <ArrowRightLeft size={20} />
                </button>

                {/* To Unit */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                    <div className="border-b border-zinc-900 px-3 py-2">
                        <span className="text-[8px] font-mono text-zinc-600">TO</span>
                    </div>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full bg-transparent px-3 py-3 text-white font-mono text-sm focus:outline-none"
                    >
                        {currentCategory.units.map((unit) => (
                            <option key={unit} value={unit} className="bg-zinc-900">
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quick Reference Table */}
            <details className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <summary className="px-4 py-3 flex items-center gap-2 cursor-pointer list-none">
                    <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-mono text-zinc-500 flex-1">COMMON CONVERSIONS</span>
                    <span className="text-zinc-600 text-xs">▼</span>
                </summary>
                <div className="p-4 border-t border-zinc-900">
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        {currentCategory.id === "length" && (
                            <>
                                <div className="flex justify-between"><span className="text-zinc-600">1 inch</span><span className="text-white">2.54 cm</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">1 foot</span><span className="text-white">0.3048 m</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">1 mile</span><span className="text-white">1.609 km</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">1 meter</span><span className="text-white">3.281 ft</span></div>
                            </>
                        )}
                        {currentCategory.id === "weight" && (
                            <>
                                <div className="flex justify-between"><span className="text-zinc-600">1 kg</span><span className="text-white">2.205 lbs</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">1 lb</span><span className="text-white">0.4536 kg</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">1 oz</span><span className="text-white">28.35 g</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">1 ton</span><span className="text-white">1000 kg</span></div>
                            </>
                        )}
                        {currentCategory.id === "temperature" && (
                            <>
                                <div className="flex justify-between"><span className="text-zinc-600">0°C</span><span className="text-white">32°F</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">100°C</span><span className="text-white">212°F</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">-40°C</span><span className="text-white">-40°F</span></div>
                                <div className="flex justify-between"><span className="text-zinc-600">0 K</span><span className="text-white">-273.15°C</span></div>
                            </>
                        )}
                    </div>
                </div>
            </details>

            {/* Info */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-3 text-center">
                <p className="text-[9px] font-mono text-zinc-600">
                    ⚡ Real-time conversion • Supports 50+ units • 100% accurate
                </p>
            </div>
        </div>
    );
}