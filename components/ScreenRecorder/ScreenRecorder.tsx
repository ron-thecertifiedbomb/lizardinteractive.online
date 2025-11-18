"use client";

import React, { useState, useRef } from "react";
import Button from "../shared/Button/Button";

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
        <div className="p-4 bg-slate-800 text-white rounded-lg shadow-lg max-w-xl mx-auto">
       

            <div className="flex gap-2 items-center justify-center ">
                {!recording ? (
                    <Button
                        className=" max-w-60 text-white px-4 py-2 rounded-lg hover:bg-blue-700 align-center"
                        onClick={startRecording}
                    >
                        Start Recording
                    </Button>
                ) : (
                        <Button
                            className=" max-w-xs  bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                        onClick={stopRecording}
                    >
                        Stop Recording
                    </Button>
                )}

                {videoURL && (
                    <Button
                        className=" max-w-xs text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={downloadRecording}
                    >
                        Download
                    </Button>
                )}

                {videoURL && (
                    <Button
                        className="flex items-center justify-center max-w-2 max-h-8 bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800"
                        onClick={() => {
                            setVideoURL(null);
                        }}
                    >
                     X
                    </Button>
                )}
            </div>

            {videoURL && (
                <video
                    className="w-full border rounded mt-4"
                    src={videoURL}
                    controls
                ></video>
            )}
        </div>
    );
}
