"use client";

import React, { useState, useRef } from "react";

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
            console.error("Error accessing screen capture:", err);
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
        <div className="p-4 bg-blue-700 text-white rounded-lg shadow-lg max-w-xl mx-auto">
       

            <div className="flex gap-2">
                {!recording ? (
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={startRecording}
                    >
                        Start Recording
                    </button>
                ) : (
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={stopRecording}
                    >
                        Stop Recording
                    </button>
                )}

                {videoURL && (
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={downloadRecording}
                    >
                        Download
                    </button>
                )}
            </div>

            {videoURL && (
                <video
                    className="w-full border rounded"
                    src={videoURL}
                    controls
                ></video>
            )}
        </div>
    );
}
