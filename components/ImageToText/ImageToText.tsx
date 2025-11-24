"use client";

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { toast } from "react-hot-toast";
import Button from "../shared/Button/Button";
import UtilityContainer from "../shared/UtilityComponent/UtilityComponent";

export default function ImageToTextConverter() {
    const [image, setImage] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false); // <-- popup state

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
            setText("");
            setProgress(0);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setText("");
            setProgress(0);
        }
    };

    const handleConvert = async () => {
        if (!image) return toast.error("Please select an image first");
        setLoading(true);
        setProgress(0);
        setText("");

        try {
            const result = await Tesseract.recognize(image, "eng", {
                logger: (m) => {
                    if (m.status === "recognizing text") {
                        setProgress(Math.floor(m.progress * 100));
                    }
                },
            });

            setText(result.data.text);
            toast.success("Text extracted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to extract text");
        } finally {
            setLoading(false);
        }
    };

    return (
        <UtilityContainer className="max-w-4xl mx-auto w-full mt-12">

            {/* Drag & Drop */}
            {!image && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="
                        mb-6 p-6
                        border-2 border-dashed border-blue-500/40 
                        hover:border-blue-400/80
                        hover:bg-blue-600/10
                        rounded-xl text-center cursor-pointer 
                        transition-all
                    "
                >
                    <p className="text-gray-300 text-xs sm:text-sm md:text-md lg:text-xl">
                        Drag & drop an image here, or click to select
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}

            {/* Thumbnail Preview */}
            {image && (
                <div className="relative mb-6">
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="
                            w-full max-h-svh 
                            object-contain 
                            rounded-xl 
                            border border-white/10
                            shadow-md
                        "
                    />

                    <Button
                        onClick={() => {
                            setImage(null);
                            setText("");
                            setProgress(0);
                        }}
                        className="
                            absolute top-3 right-3 
                            text-white bg-red-600 hover:bg-red-700 
                            rounded-full w-7 h-8 
                            flex items-center justify-center 
                            font-bold shadow
                        "
                    >
                        X
                    </Button>
                </div>
            )}

            {/* Convert Button */}
            {!text && (
                <Button
                    onClick={handleConvert}
                    disabled={loading || !image}
                    className="
                        mb-5 
                        bg-blue-600 hover:bg-blue-700 
                        rounded-xl 
                        px-5 py-3
                        text-gray-300 text-xs sm:text-sm md:text-md lg:text-xl
                        disabled:opacity-50 
                        transition
                        mx-auto 
                        w-auto
                    "
                >
                    {loading ? `Converting... ${progress}%` : "Convert Image to Text"}
                </Button>
            )}

            {/* Progress Bar */}
            {loading && (
                <div className="w-full bg-gray-700 h-2 rounded-full mb-5">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Output + Copy */}
            {text && (
                <div className="flex flex-col gap-3 max-w-4xl w-full relative">

                    <textarea
                        className="
                            p-6 bg-gray-900/50 
                            rounded-xl h-72
                            resize-none border border-white/10 
                            text-white
                            text-sm sm:text-sm md:text-md lg:text-xl
                        "
                        value={text}
                        readOnly
                    />

                    {/* Copy Button Container */}
                    <div className="relative mx-auto">
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(text);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1200); // hide popup
                            }}
                            className="
                                max-w-xs px-4 py-3 
                                bg-blue-700 hover:bg-blue-600 
                                rounded-xl 
                                transition
                                mt-6
                                text-gray-300 text-xs sm:text-sm md:text-md lg:text-xl
                            "
                        >
                            Copy Text
                        </Button>

                        {/* Popup Animation */}
                        {copied && (
                            <div className="
                                absolute left-1/2 -translate-x-1/2
                                -top-8
                                bg-green-600 text-white
                                text-xs px-3 py-1
                                rounded-lg shadow-lg
                                animate-bounce
                            ">
                                Copied!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </UtilityContainer>
    );
}
