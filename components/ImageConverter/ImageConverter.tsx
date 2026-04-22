/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import {
    Upload,
    Download,
    Trash2,
    RefreshCw,
    Image as ImageIcon,
    FileImage,
    AlertCircle,
    CheckCircle
} from "lucide-react";

type ConversionType = {
    from: string;
    to: string;
    label: string;
};

export function ImageConverter() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [convertedImage, setConvertedImage] = useState<string | null>(null);
    const [format, setFormat] = useState<"png" | "jpeg" | "webp" | "bmp">("png");
    const [quality, setQuality] = useState(0.9);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Available conversions
    const conversions: ConversionType[] = [
        { from: "any", to: "png", label: "PNG (Lossless)" },
        { from: "any", to: "jpeg", label: "JPEG (Smaller file)" },
        { from: "any", to: "webp", label: "WebP (Modern web)" },
        { from: "any", to: "bmp", label: "BMP (Uncompressed)" },
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please upload a valid image file");
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File too large! Maximum size is 10MB");
            return;
        }

        setError("");
        setFileName(file.name);
        setConvertedImage(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            setOriginalImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const convertImage = async () => {
        if (!originalImage) return;

        setLoading(true);
        setError("");

        try {
            // Create an image element
            const img = new Image();
            img.src = originalImage;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Create canvas
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                throw new Error("Cannot create canvas context");
            }

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Convert to selected format
            let mimeType = `image/${format}`;
            if (format === "jpeg") mimeType = "image/jpeg";

            const convertedDataUrl = canvas.toDataURL(mimeType, quality);
            setConvertedImage(convertedDataUrl);
        } catch (err) {
            setError("Failed to convert image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!convertedImage) return;

        const link = document.createElement("a");
        const extension = format === "jpeg" ? "jpg" : format;
        const newFileName = fileName.replace(/\.[^/.]+$/, `.${extension}`);

        link.download = newFileName;
        link.href = convertedImage;
        link.click();
    };

    const clearAll = () => {
        setOriginalImage(null);
        setConvertedImage(null);
        setError("");
        setFileName("");
    };

    const getFileSize = (base64: string) => {
        const bytes = (base64.length * 0.75) / 1024 / 1024;
        return bytes.toFixed(2);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            {!originalImage ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-br from-emerald-950/30 to-zinc-950 border-2 border-dashed border-emerald-500/30 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-500/60 transition"
                >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-4">
                        <FileImage size={48} className="text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2">Upload Image</h3>
                    <p className="text-xs font-mono text-zinc-500 mb-4">
                        PNG, JPG, WebP, BMP (Max 10MB)
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase">
                        <Upload size={12} /> SELECT IMAGE
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            ) : (
                <>
                    {/* Preview Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Original Image */}
                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                            <div className="border-b border-zinc-900 px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon size={14} className="text-emerald-500" />
                                        <span className="text-xs font-mono text-zinc-500">ORIGINAL</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-600">
                                        {getFileSize(originalImage)} MB
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-center bg-black/50">
                                <img
                                    src={originalImage}
                                    alt="Original"
                                    className="max-w-full max-h-64 object-contain"
                                />
                            </div>
                        </div>

                        {/* Converted Image */}
                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                            <div className="border-b border-zinc-900 px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileImage size={14} className="text-emerald-500" />
                                        <span className="text-xs font-mono text-zinc-500">CONVERTED</span>
                                    </div>
                                    {convertedImage && (
                                        <span className="text-[10px] font-mono text-zinc-600">
                                            {getFileSize(convertedImage)} MB
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-center bg-black/50 min-h-[200px]">
                                {convertedImage ? (
                                    <img
                                        src={convertedImage}
                                        alt="Converted"
                                        className="max-w-full max-h-64 object-contain"
                                    />
                                ) : (
                                    <p className="text-zinc-600 text-xs font-mono">
                                        Click convert to see result
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Format Selection */}
                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
                        <h3 className="text-xs font-mono text-zinc-500 mb-3">CONVERT TO</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {conversions.map((conv) => (
                                <button
                                    key={conv.to}
                                    onClick={() => setFormat(conv.to as any)}
                                    className={`px-3 py-2 rounded-lg text-xs font-mono transition ${format === conv.to
                                            ? "bg-emerald-500 text-black"
                                            : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
                                        }`}
                                >
                                    {conv.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quality Slider (for JPEG/WebP) */}
                    {(format === "jpeg" || format === "webp") && (
                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-mono text-zinc-500">QUALITY</label>
                                <span className="text-xs font-mono text-emerald-500">
                                    {Math.round(quality * 100)}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.05"
                                value={quality}
                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                            />
                            <p className="text-[8px] font-mono text-zinc-600 mt-2">
                                Lower quality = smaller file size
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={convertImage}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase tracking-wider active:scale-95 transition disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    CONVERTING...
                                </>
                            ) : (
                                <>
                                    <RefreshCw size={14} /> CONVERT
                                </>
                            )}
                        </button>

                        {convertedImage && (
                            <button
                                onClick={downloadImage}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 active:scale-95 transition text-xs font-mono"
                            >
                                <Download size={14} /> DOWNLOAD
                            </button>
                        )}
                    </div>

                    {/* Clear Button */}
                    <button
                        onClick={clearAll}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 active:scale-95 transition text-xs font-mono"
                    >
                        <Trash2 size={12} /> CONVERT ANOTHER IMAGE
                    </button>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-4">
                            <div className="flex items-start gap-2">
                                <AlertCircle size={14} className="text-red-500 mt-0.5" />
                                <p className="text-xs font-mono text-red-400">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {convertedImage && !error && (
                        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-3">
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <p className="text-[10px] font-mono text-emerald-500">
                                    Conversion complete! Click download to save your image.
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Info Box */}
            <div className="bg-gradient-to-r from-blue-950/20 to-transparent border border-blue-500/20 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-blue-500 mt-0.5" />
                    <div>
                        <h4 className="text-[10px] font-black text-blue-500 uppercase mb-1">WHY CONVERT IMAGES?</h4>
                        <ul className="text-[9px] font-mono text-zinc-500 space-y-1">
                            <li>• <span className="text-white">PNG</span> - Best for screenshots, logos, transparent backgrounds</li>
                            <li>• <span className="text-white">JPEG</span> - Smaller files, great for photos</li>
                            <li>• <span className="text-white">WebP</span> - Modern format, 30% smaller than JPEG</li>
                            <li>• <span className="text-white">BMP</span> - Uncompressed, highest quality</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}