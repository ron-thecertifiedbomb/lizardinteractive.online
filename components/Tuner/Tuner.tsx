// components/GuitarTuner.tsx
import React, { useState, useEffect, useRef } from 'react';

interface StringConfig {
    name: string;
    note: string;
    frequency: number;
}

const Tuner: React.FC = () => {
    const strings: StringConfig[] = [
        { name: 'High E', note: 'E', frequency: 329.63 },
        { name: 'B', note: 'B', frequency: 246.94 },
        { name: 'G', note: 'G', frequency: 196.00 },
        { name: 'D', note: 'D', frequency: 146.83 },
        { name: 'A', note: 'A', frequency: 110.00 },
        { name: 'Low E', note: 'E', frequency: 82.41 }
    ];

    const [selectedString, setSelectedString] = useState<StringConfig>(strings[0]);
    const [currentFrequency, setCurrentFrequency] = useState<number>(0);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [detectedNote, setDetectedNote] = useState<string>('--');
    const [cents, setCents] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationRef = useRef<number>();
    const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            stopListening();
        };
    }, []);

    const startListening = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Media devices not supported');
            }

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

            microphoneRef.current.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;

            setIsListening(true);
            analyzePitch();
        } catch (error) {
            console.error('Error accessing microphone:', error);
            // Simulate tuning for demo purposes
            simulateTuning();
        }
    };

    const stopListening = () => {
        if (microphoneRef.current) {
            microphoneRef.current.disconnect();
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }

        if (simulationIntervalRef.current) {
            clearInterval(simulationIntervalRef.current);
            simulationIntervalRef.current = null;
        }

        setIsListening(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const simulateTuning = () => {
        console.log('Starting simulation...');
        setIsListening(true);
        let simFrequency = 300;

        // Clear any existing interval
        if (simulationIntervalRef.current) {
            clearInterval(simulationIntervalRef.current);
        }

        simulationIntervalRef.current = setInterval(() => {
            simFrequency += (selectedString.frequency - simFrequency) * 0.1;
            setCurrentFrequency(simFrequency);
            calculateNoteAndCents(simFrequency);
            setVolume(Math.random() * 100);

            if (Math.abs(simFrequency - selectedString.frequency) < 0.1) {
                if (simulationIntervalRef.current) {
                    clearInterval(simulationIntervalRef.current);
                }
            }
        }, 100);
    };

    const analyzePitch = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const detectPitch = () => {
            analyserRef.current!.getByteFrequencyData(dataArray);

            // Find the dominant frequency (simplified)
            let maxVolume = 0;
            let maxIndex = 0;

            for (let i = 0; i < bufferLength; i++) {
                if (dataArray[i] > maxVolume) {
                    maxVolume = dataArray[i];
                    maxIndex = i;
                }
            }

            const frequency = maxIndex * (audioContextRef.current!.sampleRate / 2) / bufferLength;
            setCurrentFrequency(frequency);
            setVolume(maxVolume);
            calculateNoteAndCents(frequency);

            animationRef.current = requestAnimationFrame(detectPitch);
        };

        detectPitch();
    };

    const calculateNoteAndCents = (frequency: number) => {
        // Simple note detection based on standard tuning frequencies
        let closestNote = strings.reduce((prev, curr) =>
            Math.abs(curr.frequency - frequency) < Math.abs(prev.frequency - frequency) ? curr : prev
        );

        setDetectedNote(closestNote.note);

        // Calculate cents difference
        // Formula: 1200 * log2(f1 / f2)
        if (frequency > 0 && selectedString.frequency > 0) {
            const centsDiff = 1200 * Math.log2(frequency / selectedString.frequency);
            setCents(Math.max(-50, Math.min(50, centsDiff)));
        }
    };

    const getMeterPosition = () => {
        // Convert cents to pixel position (-50 to +50 cents maps to left to right)
        return ((cents + 50) / 100) * 100;
    };

    const getTuningStatus = () => {
        if (Math.abs(cents) < 5) return 'perfect';
        if (Math.abs(cents) < 15) return 'close';
        return 'far';
    };

    const getStatusColor = () => {
        const status = getTuningStatus();
        switch (status) {
            case 'perfect': return 'bg-green-500';
            case 'close': return 'bg-yellow-500';
            case 'far': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const playReferenceTone = () => {
        // For a real implementation, you would play the reference tone
        console.log(`Playing reference tone: ${selectedString.note} (${selectedString.frequency}Hz)`);
    };

    return (
        <div className="min-h-screen text-white p-4">
            <div className="max-w-sm mx-auto">
                {/* Main Tuner Display */}
                <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700">
                    {/* Note Display */}
                    <div className="text-center mb-4">
                        <div className="text-5xl font-bold text-white mb-1">
                            {detectedNote}
                        </div>
                        <div className="text-gray-400 text-base">
                            {currentFrequency > 0 ? currentFrequency.toFixed(1) + ' Hz' : '-- Hz'}
                        </div>
                    </div>

                    {/* Tuning Meter */}
                    <div className="mb-6">
                        <div className="relative h-24 bg-gray-900 rounded-lg p-4 border border-gray-600">
                            {/* Center line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-400 transform -translate-x-1/2"></div>

                            {/* Tick marks */}
                            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2"></div>
                            <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-1/2"></div>

                            {/* Needle */}
                            <div
                                className={`absolute top-2 bottom-2 w-1 ${getStatusColor()} rounded-full transition-all duration-100`}
                                style={{ left: `${getMeterPosition()}%` }}
                            ></div>

                            {/* Labels */}
                            <div className="absolute bottom-2 left-1/4 transform -translate-x-1/2 text-xs text-gray-400">-25</div>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400">0</div>
                            <div className="absolute bottom-2 left-3/4 transform -translate-x-1/2 text-xs text-gray-400">+25</div>
                        </div>

                        {/* Tuning Status */}
                        <div className="text-center mt-3">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full ${getTuningStatus() === 'perfect' ? 'bg-green-500' :
                                getTuningStatus() === 'close' ? 'bg-yellow-500' : 'bg-red-500'
                                } bg-opacity-20 border ${getTuningStatus() === 'perfect' ? 'border-green-500' :
                                    getTuningStatus() === 'close' ? 'border-yellow-500' : 'border-red-500'
                                }`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${getTuningStatus() === 'perfect' ? 'bg-green-500' :
                                    getTuningStatus() === 'close' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}></div>
                                <span className="text-xs font-medium">
                                    {getTuningStatus() === 'perfect' ? 'Perfect!' :
                                        getTuningStatus() === 'close' ? 'Close' : 'Keep tuning'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Volume Indicator */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                            <span>Input Level</span>
                            <span>{Math.min(volume, 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${Math.min(volume, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={isListening ? stopListening : startListening}
                            className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all ${isListening
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {isListening ? 'Stop Listening' : 'Start Listening'}
                        </button>

                        <button
                            onClick={playReferenceTone}
                            className="flex-1 py-2 px-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-sm transition-all"
                        >
                            Play Tone
                        </button>
                    </div>

                    {/* String Selection */}
                    <div className="grid grid-cols-2 gap-2">
                        {strings.map((string, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedString(string)}
                                className={`p-3 rounded-xl border-2 transition-all ${selectedString.name === string.name
                                    ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                                    : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className="font-bold text-base">{string.note}</div>
                                    <div className="text-xs text-gray-400 mt-1">{string.name}</div>
                                    <div className="text-xs text-gray-500">{string.frequency} Hz</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center mt-4 text-gray-500 text-xs">
                    <p>Play the {selectedString.name} string and tune to {selectedString.frequency} Hz</p>
                </div>
            </div>
        </div>
    );
};

export default Tuner;