// components/shared/PageLoader/PageLoader.tsx
"use client";

import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export default function PageLoader() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [closing, setClosing] = useState(false);

    // Store the path in a ref so we can check it without adding `router` to useEffect dependencies
    const asPathRef = useRef(router.asPath);
    useEffect(() => {
        asPathRef.current = router.asPath;
    }, [router.asPath]);

    useEffect(() => {
        let startClosingTimer: NodeJS.Timeout;
        let finishLoadingTimer: NodeJS.Timeout;

        const handleStart = (url: string, { shallow }: { shallow?: boolean } = {}) => {
            if (!shallow && url !== asPathRef.current) {
                // Clear any pending timers from a previous navigation that was interrupted.
                clearTimeout(startClosingTimer);
                clearTimeout(finishLoadingTimer);
                setLoading(true);
                setClosing(false);
            }
        };

        const handleDone = () => {
            // Clear timers to prevent duplicates
            clearTimeout(startClosingTimer);
            clearTimeout(finishLoadingTimer);

            // The `routeChangeComplete` event fires before the exit animation of the
            // old page begins. We need to keep the loader visible during that animation
            // to prevent a flash of the old content.

            // 1. Wait for the page exit animation to finish (e.g., 300ms).
            startClosingTimer = setTimeout(() => {
                setClosing(true); // This will trigger the fade-out transition on the loader.
            }, 300);

            // 2. Wait for the loader's own fade-out animation to finish before unmounting it.
            finishLoadingTimer = setTimeout(() => {
                setLoading(false);
            }, 600); // 300ms wait + 300ms fade-out.
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleDone);
        router.events.on("routeChangeError", handleDone);

        return () => {
            clearTimeout(startClosingTimer);
            clearTimeout(finishLoadingTimer);
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleDone);
            router.events.off("routeChangeError", handleDone);
        };
    }, [router.events]);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-9999 bg-black flex items-center justify-center transition-opacity duration-300 ${closing ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                }`}
        >
            {/* Ambient glow */}
            <div className="absolute w-[300px] h-[300px] bg-green-500/20 rounded-full blur-[120px]" />

            {/* Spinner */}
            <div className="relative flex flex-col items-center gap-6">
                <div className="w-12 h-12 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                <span className="text-xs font-mono text-green-400/70 uppercase tracking-widest">
                    Loading
                </span>
            </div>
        </div>
    );
}
