"use client";

import React, { useState, useRef, useEffect } from "react";
import { Circle, Square, Download, X, Video, Monitor, Radio, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScreenRecorder() {
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunks = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Timer logic for the 'Recording' HUD
    useEffect(() => {
        if (recording) {
            timerRef.current = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setDuration(0);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [recording]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { frameRate: { ideal: 30 } },
                audio: true,
            });

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9'
            });
            recordedChunks.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) recordedChunks.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setVideoURL(url);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setRecording(true);
        } catch (err) {
            console.error(err);
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
        a.download = `lizard-rec-${Date.now()}.webm`;
        a.click();
    };

    return (
        <div className="w-full bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group selection:bg-emerald-500 selection:text-black">
            {/* HUD Status Bar */}
            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${recording ? 'bg-red-500 animate-pulse' : 'bg-zinc-800'}`} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                            System.Capture_v4
                        </h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter italic">
                        {recording ? `Status: ACTIVE_ENCODING // ${formatTime(duration)}` : 'Status: STANDBY'}
                    </p>
                </div>
                <ShieldCheck className="w-4 h-4 text-zinc-800" />
            </div>

            <div className="flex flex-col items-center justify-center gap-8 py-10">
                {!videoURL && !recording && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-4 opacity-20 group-hover:opacity-40 transition-opacity"
                    >
                        <Monitor className="w-16 h-16 stroke-[1px]" />
                        <span className="text-[10px] tracking-[0.5em] uppercase font-black">Ready to Source</span>
                    </motion.div>
                )}

                {/* Control Interface */}
                <div className="flex items-center gap-4 z-10">
                    <AnimatePresence mode="wait">
                        {!recording ? (
                            <motion.button
                                key="start"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                onClick={startRecording}
                                className="group flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all duration-500"
                            >
                                <Circle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                Start Stream
                            </motion.button>
                        ) : (
                            <motion.button
                                key="stop"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                onClick={stopRecording}
                                className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                            >
                                <Square className="w-4 h-4 fill-current" />
                                Terminate
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {videoURL && (
                        <div className="flex gap-2">
                            <button
                                onClick={downloadRecording}
                                className="p-4 border border-zinc-800 hover:border-emerald-500/50 text-emerald-500 transition-all"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setVideoURL(null)}
                                className="p-4 border border-zinc-800 hover:border-red-500/50 text-zinc-500 hover:text-red-500 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Preview HUD */}
            <AnimatePresence>
                {videoURL && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-8 border border-zinc-900 bg-black relative"
                    >
                        <div className="absolute top-0 left-0 w-full p-2 flex justify-between bg-zinc-900/50 backdrop-blur-md z-10">
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                <Radio className="w-3 h-3 text-emerald-500" /> Source_Review.mp4
                            </span>
                        </div>
                        <video
                            className="w-full h-auto aspect-video object-cover"
                            src={videoURL}
                            controls
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Aesthetic */}
            <div className="absolute -bottom-4 -right-4 text-7xl font-black text-white/[0.02] select-none uppercase italic">
                REC_v4
            </div>
        </div>
    );
}