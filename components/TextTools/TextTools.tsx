/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Copy,
    Check,
    Trash2,
    Type,
    Hash,
    AlignLeft,
    ArrowUp,
    ArrowDown,
    Sparkles
} from "lucide-react";

export function TextTools() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    // Stats
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
    const paragraphs = text === "" ? 0 : text.split(/\n\s*\n/).length;
    const sentences = text === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Actions
    const toUpperCase = () => setText(text.toUpperCase());
    const toLowerCase = () => setText(text.toLowerCase());
    const toTitleCase = () => {
        setText(text.replace(/\w\S*/g, (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ));
    };
    const removeExtraSpaces = () => {
        setText(text.replace(/\s+/g, " ").trim());
    };
    const removeLineBreaks = () => {
        setText(text.replace(/\r?\n|\r/g, " "));
    };
    const clearText = () => setText("");
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Text Area */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                    <div className="border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Type size={14} className="text-emerald-500" />
                            <span className="text-xs font-mono text-zinc-500">INPUT_TEXT</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyToClipboard}
                                disabled={!text}
                                className="p-1.5 rounded-lg hover:bg-zinc-900 transition disabled:opacity-50"
                                title="Copy"
                            >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-zinc-500" />}
                            </button>
                            <button
                                onClick={clearText}
                                disabled={!text}
                                className="p-1.5 rounded-lg hover:bg-zinc-900 transition disabled:opacity-50"
                                title="Clear"
                            >
                                <Trash2 size={14} className="text-zinc-500" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste or type your text here..."
                        className="w-full h-[200px] bg-transparent px-4 py-4 text-white font-mono text-sm focus:outline-none resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                        onClick={toUpperCase}
                        disabled={!text}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition disabled:opacity-50 text-xs font-mono"
                    >
                        <ArrowUp size={12} /> UPPERCASE
                    </button>
                    <button
                        onClick={toLowerCase}
                        disabled={!text}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition disabled:opacity-50 text-xs font-mono"
                    >
                        <ArrowDown size={12} /> lowercase
                    </button>
                    <button
                        onClick={toTitleCase}
                        disabled={!text}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition disabled:opacity-50 text-xs font-mono"
                    >
                        <Type size={12} /> Title Case
                    </button>
                    <button
                        onClick={removeExtraSpaces}
                        disabled={!text}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition disabled:opacity-50 text-xs font-mono"
                    >
                        <AlignLeft size={12} /> Fix Spaces
                    </button>
                    <button
                        onClick={removeLineBreaks}
                        disabled={!text}
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition disabled:opacity-50 text-xs font-mono"
                    >
                        <Hash size={12} /> Single Line
                    </button>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="space-y-4">
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-4">STATISTICS</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs font-mono text-zinc-500">Characters</span>
                            <span className="text-xl font-black text-white">{characters.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs font-mono text-zinc-500">Characters (no spaces)</span>
                            <span className="text-xl font-black text-white">{charactersNoSpaces.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs font-mono text-zinc-500">Words</span>
                            <span className="text-xl font-black text-white">{words.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs font-mono text-zinc-500">Lines</span>
                            <span className="text-xl font-black text-white">{lines.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs font-mono text-zinc-500">Paragraphs</span>
                            <span className="text-xl font-black text-white">{paragraphs.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-zinc-500">Sentences</span>
                            <span className="text-xl font-black text-white">{sentences.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Reading Time */}
                <div className="bg-gradient-to-r from-emerald-950/20 to-transparent border border-emerald-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <span className="text-emerald-500 text-xs font-black">📖</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-500">READING TIME</span>
                    </div>
                    <p className="text-2xl font-black text-white">
                        {Math.ceil(words / 200)} min
                    </p>
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">
                        Average reading speed: 200 words/minute
                    </p>
                </div>
            </div>
        </div>
    );
}