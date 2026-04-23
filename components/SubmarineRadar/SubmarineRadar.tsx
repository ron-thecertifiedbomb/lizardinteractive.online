"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

export default function SubmarineRadar() {
    const [isActive, setIsActive] = useState(false);
    const [contacts, setContacts] = useState<Array<{ angle: number, distance: number, type: string }>>([]);
    const [depth, setDepth] = useState(120);
    const [heading, setHeading] = useState(0);
    const [speed, setSpeed] = useState(8);
    const [sonarPing, setSonarPing] = useState(false);
    const [threatLevel, setThreatLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('LOW');

    // Radar rotation
    const radarRotation = useMotionValue(0);
    const sweepAngle = useMotionValue(0);

    // Refs for performance
    const radarIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const contactIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const pingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Rotate radar sweep
    useEffect(() => {
        if (isActive) {
            radarIntervalRef.current = setInterval(() => {
                radarRotation.set((radarRotation.get() + 5) % 360);
                sweepAngle.set((sweepAngle.get() + 5) % 360);

                // Trigger sonar ping every rotation
                if (Math.floor(radarRotation.get()) % 360 === 0) {
                    setSonarPing(true);
                    if (pingTimeoutRef.current) clearTimeout(pingTimeoutRef.current);
                    pingTimeoutRef.current = setTimeout(() => setSonarPing(false), 200);
                }
            }, 50);
        }

        return () => {
            if (radarIntervalRef.current) clearInterval(radarIntervalRef.current);
            if (pingTimeoutRef.current) clearTimeout(pingTimeoutRef.current);
        };
    }, [isActive, radarRotation, sweepAngle]);

    // Generate random contacts
    useEffect(() => {
        if (isActive) {
            contactIntervalRef.current = setInterval(() => {
                // Add random contact
                if (Math.random() > 0.7 && contacts.length < 8) {
                    const newContact = {
                        angle: Math.random() * 360,
                        distance: Math.random() * 80 + 20,
                        type: ['ENEMY SUB', 'WARSHIP', 'TORPEDO', 'FRIENDLY'][Math.floor(Math.random() * 4)]
                    };
                    setContacts(prev => [...prev, newContact]);

                    // Update threat level based on contacts
                    const enemyCount = contacts.filter(c => c.type === 'ENEMY SUB' || c.type === 'WARSHIP' || c.type === 'TORPEDO').length;
                    if (enemyCount > 3) setThreatLevel('CRITICAL');
                    else if (enemyCount > 2) setThreatLevel('HIGH');
                    else if (enemyCount > 1) setThreatLevel('MEDIUM');
                    else setThreatLevel('LOW');
                }

                // Remove old contacts
                setContacts(prev => prev.filter(() => Math.random() > 0.05));
            }, 3000);
        }

        return () => {
            if (contactIntervalRef.current) clearInterval(contactIntervalRef.current);
        };
    }, [isActive, contacts.length]);

    // Simulate depth changes
    useEffect(() => {
        if (isActive) {
            const depthInterval = setInterval(() => {
                setDepth(prev => Math.max(50, Math.min(300, prev + (Math.random() - 0.5) * 2)));
                setHeading(prev => (prev + (Math.random() - 0.5) * 3 + 360) % 360);
                setSpeed(prev => Math.max(0, Math.min(25, prev + (Math.random() - 0.5) * 0.5)));
            }, 2000);

            return () => clearInterval(depthInterval);
        }
    }, [isActive]);

    // Launch countermeasure
    const [countermeasures, setCountermeasures] = useState(3);
    const launchCountermeasure = useCallback(() => {
        if (countermeasures > 0 && isActive) {
            setCountermeasures(prev => prev - 1);
            setThreatLevel('LOW');
            // Remove closest threat
            const threats = contacts.filter(c => c.type !== 'FRIENDLY');
            if (threats.length > 0) {
                setContacts(prev => prev.filter(c => c !== threats[0]));
            }
        }
    }, [countermeasures, isActive, contacts]);

    return (
        <div className="relative w-full h-[50vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
            {/* Stealth Cockpit Overlay - Emerald Theme */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />

            {/* HUD Grid Lines - Emerald */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Scanlines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent bg-[length:100%_4px] animate-scan opacity-30 pointer-events-none" />

            {/* Main Container */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">

                {/* RADAR DISPLAY */}
                <div className="relative">
                    {/* Radar Outer Ring */}
                    <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
                        {/* Radar Background */}
                        <div className="absolute inset-0 rounded-full bg-black/90 border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            {/* Range Rings */}
                            {[25, 50, 75, 100].map(range => (
                                <div
                                    key={range}
                                    className="absolute inset-0 rounded-full border border-emerald-500/30"
                                    style={{
                                        margin: `${(100 - range) * 1.4}px`,
                                        boxShadow: `0 0 2px rgba(16,185,129,0.3)`
                                    }}
                                />
                            ))}

                            {/* Crosshairs */}
                            <div className="absolute inset-0">
                                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-emerald-500/30 transform -translate-x-1/2" />
                                <div className="absolute top-1/2 left-0 h-0.5 w-full bg-emerald-500/30 transform -translate-y-1/2" />
                                {[45, 135, 225, 315].map(angle => (
                                    <div
                                        key={angle}
                                        className="absolute left-1/2 top-1/2 w-0.5 h-full bg-emerald-500/20 transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ transform: `rotate(${angle}deg)` }}
                                    />
                                ))}
                            </div>

                            {/* Radar Contacts */}
                            {contacts.map((contact, idx) => {
                                const angleRad = (contact.angle * Math.PI) / 180;
                                const radius = (contact.distance / 100) * 140;
                                const x = 140 + radius * Math.cos(angleRad);
                                const y = 140 + radius * Math.sin(angleRad);
                                const isEnemy = contact.type !== 'FRIENDLY';

                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="absolute"
                                        style={{
                                            left: x,
                                            top: y,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        <div className={`relative ${isEnemy ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {contact.type === 'TORPEDO' ? (
                                                <motion.div
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 0.5, repeat: Infinity }}
                                                    className="w-2 h-2 bg-red-500 rounded-full"
                                                />
                                            ) : (
                                                <div className={`w-2 h-2 ${isEnemy ? 'bg-red-500' : 'bg-emerald-500'} rounded-full`}>
                                                    <div className={`absolute inset-0 ${isEnemy ? 'bg-red-500' : 'bg-emerald-500'} rounded-full animate-ping opacity-50`} />
                                                </div>
                                            )}
                                            <div className="absolute whitespace-nowrap text-[8px] font-mono mt-1 left-1/2 transform -translate-x-1/2 text-gray-400">
                                                {contact.type}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Radar Sweep - Emerald */}
                            <motion.div
                                style={{ rotate: radarRotation }}
                                className="absolute inset-0 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-emerald-500 to-transparent transform -translate-x-1/2" />
                                <div className="absolute top-0 left-1/2 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-xl" />
                            </motion.div>

                            {/* Center Hub - Emerald */}
                            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-black/90 rounded-full border-2 border-emerald-500 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="absolute inset-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full" />
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Sonar Ping Effect - Emerald */}
                        {sonarPing && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 rounded-full border-2 border-emerald-500 pointer-events-none"
                            />
                        )}
                    </div>
                </div>

                {/* Stealth Cockpit HUD - Emerald Theme */}
                <div className="mt-4 grid grid-cols-4 gap-2 w-full max-w-2xl">
                    {/* Depth Gauge */}
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">DEPTH</div>
                        <div className="text-xl font-bold text-emerald-400 text-center tabular-nums">{Math.floor(depth)}</div>
                        <div className="text-[6px] text-gray-400 text-center">METERS</div>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${(depth / 300) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">HEADING</div>
                        <div className="text-xl font-bold text-emerald-400 text-center tabular-nums">{Math.floor(heading)}</div>
                        <div className="text-[6px] text-gray-400 text-center">DEGREES</div>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                style={{ width: `${(heading / 360) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Speed */}
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">SPEED</div>
                        <div className="text-xl font-bold text-emerald-400 text-center tabular-nums">{speed.toFixed(1)}</div>
                        <div className="text-[6px] text-gray-400 text-center">KNOTS</div>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${(speed / 25) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Threat Level */}
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">THREAT</div>
                        <div className={`text-lg font-bold text-center ${threatLevel === 'CRITICAL' ? 'text-red-500 animate-pulse' :
                                threatLevel === 'HIGH' ? 'text-orange-500' :
                                    threatLevel === 'MEDIUM' ? 'text-yellow-500' :
                                        'text-emerald-500'
                            }`}>
                            {threatLevel}
                        </div>
                        <div className="flex gap-0.5 justify-center mt-1">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-1 rounded-full transition-all ${i < (threatLevel === 'CRITICAL' ? 4 : threatLevel === 'HIGH' ? 3 : threatLevel === 'MEDIUM' ? 2 : 1)
                                            ? threatLevel === 'CRITICAL' ? 'bg-red-500' :
                                                threatLevel === 'HIGH' ? 'bg-orange-500' :
                                                    threatLevel === 'MEDIUM' ? 'bg-yellow-500' :
                                                        'bg-emerald-500'
                                            : 'bg-gray-800'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Secondary Stats */}
                <div className="mt-3 grid grid-cols-3 gap-2 w-full max-w-2xl">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-1.5 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">SONAR</div>
                        <div className="text-xs font-mono text-center text-emerald-400">ACTIVE</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-1.5 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">SILENT RUN</div>
                        <div className="text-xs font-mono text-center text-emerald-400">{speed < 5 ? 'ACTIVE' : 'INACTIVE'}</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-1.5 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">COUNTER</div>
                        <div className="text-xs font-mono text-center text-emerald-400">{countermeasures}</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className={`px-5 py-2 rounded-full font-bold text-xs transition-all ${isActive
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                            } shadow-lg`}
                    >
                        {isActive ? "SHUT DOWN" : "ACTIVATE RADAR"}
                    </button>

                    <button
                        onClick={launchCountermeasure}
                        disabled={!isActive || countermeasures === 0}
                        className="px-5 py-2 rounded-full font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        🚀 COUNTERMEASURE
                    </button>

                    <button
                        onClick={() => {
                            setContacts([]);
                            setThreatLevel('LOW');
                            setCountermeasures(3);
                        }}
                        className="px-5 py-2 rounded-full font-bold text-xs bg-gray-700 hover:bg-gray-600 text-white shadow-lg transition-colors"
                    >
                        RESET
                    </button>
                </div>

                {/* Contact Counter */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-emerald-500/40">
                        <div className="text-[8px] text-emerald-400 text-center">CONTACTS</div>
                        <div className="text-2xl font-bold text-red-500 text-center tabular-nums">
                            {contacts.filter(c => c.type !== 'FRIENDLY').length}
                        </div>
                    </div>
                </div>

                {/* Depth Warning */}
                {depth > 250 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 left-4 z-20 bg-red-600/90 backdrop-blur-sm rounded-lg p-2 border border-yellow-500"
                    >
                        <div className="text-white font-bold text-[10px] animate-pulse whitespace-nowrap">
                            ⚠️ CRUSH DEPTH WARNING!
                        </div>
                    </motion.div>
                )}

                {/* System Status - Emerald */}
                <div className="absolute bottom-4 left-4 z-20">
                    <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <div className="text-[8px] text-emerald-400 font-mono">SYS:{isActive ? 'ONLINE' : 'STANDBY'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}