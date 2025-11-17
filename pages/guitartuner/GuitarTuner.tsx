"use client";
import { useRef, useState, useEffect } from "react";

export default function GuitarTuner() {
    const [isRunning, setIsRunning] = useState(false);
    const [frequency, setFrequency] = useState<number | null>(null);
    const [note, setNote] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const bufferRef = useRef<Float32Array | null>(null);
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

    const findClosestNote = (freq: number) =>
        guitarNotes.reduce((prev, curr) =>
            Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev
        ).name;

    const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
        const size = buffer.length;
        let rms = 0;
        for (let i = 0; i < size; i++) rms += buffer[i] ** 2;
        rms = Math.sqrt(rms / size);
        if (rms < 0.01) return -1;

        let r1 = 0;
        let r2 = size - 1;
        const threshold = 0.2;
        while (r1 < size / 2 && Math.abs(buffer[r1]) < threshold) r1++;
        while (r2 > size / 2 && Math.abs(buffer[r2]) < threshold) r2--;
        if (r2 - r1 <= 0) return -1;

        const trimmed = buffer.subarray(r1, r2);
        const newSize = trimmed.length;
        let bestOffset = -1;
        let bestCorrelation = 0;

        for (let offset = 1; offset < newSize; offset++) {
            let correlation = 0;
            for (let i = 0; i < newSize - offset; i++) {
                correlation += trimmed[i] * trimmed[i + offset];
            }
            correlation /= newSize;
            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }

        if (bestCorrelation < 0.9 || bestOffset <= 0) return -1;
        return sampleRate / bestOffset;
    };

    

    const updatePitch = () => {
        if (bufferRef.current) {
            analyserRef.current?.getFloatTimeDomainData(bufferRef.current);
        }
        const freq = autoCorrelate(bufferRef.current, audioContextRef.current.sampleRate);

        if (freq > 0) {
            setFrequency(freq);
            setNote(findClosestNote(freq));
        } else {
            setFrequency(null);
            setNote("");
        }

        rafRef.current = requestAnimationFrame(updatePitch);
    };

    const startTuner = async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            const ctx = new AudioContext();
            audioContextRef.current = ctx;
            await ctx.resume(); // ✅ Required for browser autoplay policy

            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 2048;
            analyserRef.current = analyser;
            bufferRef.current = new Float32Array(analyser.fftSize);
            source.connect(analyser);

            setIsRunning(true);
            updatePitch();
        } catch (err) {
            setError("Microphone access denied or not available.");
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
        if (analyserRef.current) analyserRef.current.disconnect();
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(() => { });
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }

        // Reset refs
        bufferRef.current = null;
        analyserRef.current = null;
        audioContextRef.current = null;
        mediaStreamRef.current = null;
    };

    useEffect(() => {
        return () => {
            stopTuner(); // Cleanup on unmount
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-8">🎸 Guitar Tuner</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {!isRunning ? (
                <button
                    onClick={startTuner}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                    Start Tuner
                </button>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={stopTuner}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                            Stop
                        </button>
                        <div className="text-6xl font-bold">{note || "---"}</div>
                    </div>
                    <div className="text-xl text-gray-600">
                        {frequency ? `${frequency.toFixed(2)} Hz` : "---"}
                    </div>
                </div>
            )}
        </div>
    );
}   