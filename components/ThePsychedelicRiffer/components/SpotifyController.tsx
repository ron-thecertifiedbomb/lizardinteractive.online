"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

declare global {
    interface Window {
        onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
        SpotifyIframeApi?: any;
    }
}

interface SpotifyControllerProps {
    uri: string;
    onPlayChange: (playing: boolean) => void;
}

const SpotifyController = dynamic(
    () => Promise.resolve(({ uri, onPlayChange }: SpotifyControllerProps) => {
        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            // Prevent double-loading script if it already exists
            if (typeof window !== "undefined" && (window as any).SpotifyIframeApi) {
                setIsReady(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
            script.async = true;

            window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
                const element = document.getElementById("spotify-embed-root");
                const options = {
                    uri: uri,
                    width: "100%",
                    height: "352",
                };

                IFrameAPI.createController(element, options, (EmbedController: any) => {
                    setIsReady(true);
                    EmbedController.addListener("playback_update", (e: any) => {
                        // e.data.isPaused is true when music stops
                        onPlayChange(!e.data.isPaused);
                    });
                });
            };

            document.body.appendChild(script);

            return () => {
                // Cleanup global reference on unmount if needed
                delete (window as any).onSpotifyIframeApiReady;
            };
        }, [uri, onPlayChange, isReady]);

        return (
            <div className="w-full max-w-[800px] min-h-[352px] mx-auto mt-12">
                {!isReady && (
                    <div className="skeleton-loading w-full h-[352px] rounded-xl" />
                )}
                <div
                    id="spotify-embed-root"
                    style={{ display: isReady ? "block" : "none", minHeight: "352px" }}
                />
            </div>
        );
    }),
    { ssr: false }
);

export default SpotifyController;