"use client";
import { useRef, useState, useEffect } from "react";

export default function GuitarTuner() {
    const [isRunning, setIsRunning] = useState(false);
    const [frequency, setFrequency] = useState<number | null>(null);
    const [note, setNote] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafRef = useRef<number | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    const guitarNotes = [
        { name: "E2", freq: 82.41 },
        { name: "A2", freq: 110.0 },
        { name: "D3", freq: 146.83 },
        { name: "G3", freq: 196.0 },
        { name: "B3", freq: 246.94 },
        { name: "E4", freq: 329.63 },
    ];

    const findClosestNote = (freq: number) => {
        return guitarNotes.reduce((prev, curr) =>
            Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev
        ).name;
    };

    // Improved autocorrelation function
    const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
        const SIZE = buffer.length;

        // Calculate RMS to check if there's enough signal
        let rms = 0;
        for (let i = 0; i < SIZE; i++) {
            rms += buffer[i] * buffer[i];
        }
        rms = Math.sqrt(rms / SIZE);

        if (rms < 0.01) {
            return -1; // Not enough signal
        }

        // Find the first zero-crossing to start analysis
        let startIndex = 0;
        while (startIndex < SIZE - 1 && buffer[startIndex] >= 0) {
            startIndex++;
        }
        while (startIndex < SIZE - 1 && buffer[startIndex] <= 0) {
            startIndex++;
        }

        if (startIndex >= SIZE - 1) {
            return -1;
        }

        // Autocorrelation
        let bestCorrelation = 0;
        let bestOffset = -1;

        for (let offset = 5; offset < SIZE / 2; offset++) {
            let correlation = 0;

            for (let i = 0; i < SIZE - offset; i++) {
                correlation += buffer[i] * buffer[i + offset];
            }

            correlation /= (SIZE - offset);

            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        // Check if we found a good correlation
        if (bestCorrelation > 0.1 && bestOffset !== -1) {
            const frequency = sampleRate / bestOffset;

            // Filter out frequencies outside guitar range
            if (frequency > 70 && frequency < 400) {
                return frequency;
            }
        }

        return -1;
    };

    const updatePitch = () => {
        if (!audioContextRef.current || !analyserRef.current) {
            return;
        }

        const buffer = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(buffer);

        const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

        if (freq !== -1) {
            setFrequency(freq);
            setNote(findClosestNote(freq));
        } else {
            setFrequency(null);
            setNote("");
        }

        // Continue the animation loop
        if (isRunning) {
            rafRef.current = requestAnimationFrame(updatePitch);
        }
    };

    const startTuner = async () => {
        setError(null);
        try {
            // Request microphone access with better constraints
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false, // Disable for better pitch detection
                    noiseSuppression: false, // Disable for better pitch detection
                    autoGainControl: false,
                    sampleRate: 44100,
                    channelCount: 1
                }
            });

            mediaStreamRef.current = stream;

            // Create audio context
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass({
                sampleRate: 44100
            });
            audioContextRef.current = ctx;

            // Create analyser with better settings for pitch detection
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 4096; // Larger FFT for better frequency resolution
            analyser.smoothingTimeConstant = 0.8;
            analyserRef.current = analyser;

            source.connect(analyser);

            // Resume context (required in some browsers)
            await ctx.resume();

            setIsRunning(true);
            rafRef.current = requestAnimationFrame(updatePitch);

        } catch (err) {
            setError("Microphone access denied or not available.");
            console.error("Error starting tuner:", err);
        }
    };

    const stopTuner = () => {
        setIsRunning(false);
        setFrequency(null);
        setNote("");
        setError(null);

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }

        if (audioContextRef.current) {
            audioContextRef.current.close().catch(() => { });
        }

        // Reset refs
        analyserRef.current = null;
        audioContextRef.current = null;
        mediaStreamRef.current = null;
    };

    useEffect(() => {
        return () => {
            stopTuner();
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">🎸 Guitar Tuner</h1>

            {error && (
                <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            {!isRunning ? (
                <button
                    onClick={startTuner}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                >
                    Start Tuner
                </button>
            ) : (
                <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={stopTuner}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Stop Tuner
                        </button>
                        <div className="text-7xl font-bold text-gray-800 min-w-[120px] text-center">
                            {note || "---"}
                        </div>
                    </div>

                    <div className="text-2xl text-gray-600 font-mono">
                        {frequency ? `${frequency.toFixed(1)} Hz` : "Listening..."}
                    </div>

                    {frequency && (
                        <div className="text-lg text-gray-500">
                            Play a guitar string to detect the pitch
                        </div>
                    )}
                </div>
            )}

            {!isRunning && (
                <div className="mt-8 text-gray-600 text-center max-w-md">
                    <p className="mb-2">Make sure to:</p>
                    <ul className="list-disc list-inside text-left space-y-1">
                        <li>Allow microphone access when prompted</li>
                        <li>Play in a quiet environment</li>
                        <li>Play one string at a time clearly</li>
                    </ul>
                </div>
            )}
        </div>
    );
}