"use client";

import React, { useState, useRef } from "react";
import { Circle, Square, Download, X } from "lucide-react";

export default function ScreenRecorder() {
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await (navigator.mediaDevices as any).getDisplayMedia({
                video: true,
                audio: true,
            });

            mediaRecorderRef.current = new MediaRecorder(stream);
            recordedChunks.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setVideoURL(url);
            };

            mediaRecorderRef.current.start();
            setRecording(true);
        } catch (err) {
            console.error(err);
            alert("Failed to start recording. Please allow screen capture permissions.");
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };

    const downloadRecording = () => {
        if (!videoURL) return;
        const a = document.createElement("a");
        a.href = videoURL;
        a.download = "screen-recording.webm";
        a.click();
        URL.revokeObjectURL(videoURL);
    };

    return (
        <div className="flex w-full flex-col lg:min-h-[380px] p-8 rounded-2xl bg-slate-900/60 backdrop-blur-lg border border-white/10 shadow-xl mx-auto my-auto justify-center items-center">

            {/* Title */}
            <h2 className="text-xl font-semibold text-white text-center mb-4">
                Screen Recorder
            </h2>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">

                {/* Start Recording */}
                {!recording && (
                    <button
                        onClick={startRecording}
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
                                   text-white flex items-center gap-2 transition shadow-lg"
                    >
                        <Circle className="w-4 h-4" />
                        Start
                    </button>
                )}

                {/* Stop Recording */}
                {recording && (
                    <button
                        onClick={stopRecording}
                        className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white 
                                   flex items-center gap-2 transition shadow-lg animate-pulse"
                    >
                        <Square className="w-4 h-4" />
                        Stop
                    </button>
                )}

                {/* Download */}
                {videoURL && (
                    <button
                        onClick={downloadRecording}
                        className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 
                                   text-white flex items-center gap-2 transition shadow-lg"
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </button>
                )}

                {/* Clear */}
                {videoURL && (
                    <button
                        onClick={() => setVideoURL(null)}
                        className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition shadow-lg"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Video Preview */}
            {videoURL && (
                <div className="mt-6 border border-white/10 rounded-xl overflow-hidden shadow-lg ">
                    <video
                        className="w-full lg:min-h-[340px]"
                        src={videoURL}
                        controls
                    />
                </div>
            )}
        </div>
    );
}
