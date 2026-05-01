"use client";

/**
 * Font note:
 * Gotham Medium is a licensed typeface by Hoefler&Co.
 * If you have a Gotham license, load it via @font-face in your global CSS:
 *
 *   @font-face {
 *     font-family: 'Gotham';
 *     src: url('/fonts/Gotham-Medium.woff2') format('woff2');
 *     font-weight: 500;
 *   }
 *
 * The component uses 'Gotham Medium' → 'Gotham' → 'Montserrat' as fallback.
 * Add this to your layout.tsx or globals.css for the free fallback:
 *   @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";

interface MatrixBannerProps {
    title: string;
    category?: string;
    author?: string;
    date?: string;
    readTime?: number;
    image?: string;
}

const GOTHAM = "'Gotham Medium', 'Gotham', 'Montserrat', sans-serif";

export default function MatrixBanner({
    title,
    category,
    author,
    date,
    readTime,
    image,
}: MatrixBannerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // If an image is provided, we don't run the animation.
        // The image will serve as the background instead.
        if (image) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        let animId: number;
        let drops: number[] = [];

        const chars =
            "01001101001110100011010011101000110100111010001101001110100011010011101000110100111010001101001110100011010011101000110100111010001101".split(
                ""
            );

        const startAnimation = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            if (W === 0 || H === 0) return; // not painted yet, bail

            // FIX 3: Retina / high-DPI sharpness
            const dpr = window.devicePixelRatio || 1;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.scale(dpr, dpr);

            const fontSize = 13;
            const cols = Math.floor(W / fontSize);
            drops = Array(cols)
                .fill(0)
                .map(() => Math.random() * -60);

            // FIX 1: Pre-fill black so there's no white flash on first paint
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, W, H);

            // FIX 2: requestAnimationFrame instead of setInterval — smooth & tab-aware
            cancelAnimationFrame(animId);

            const tick = () => {
                ctx.fillStyle = "rgba(0,0,0,0.045)";
                ctx.fillRect(0, 0, W, H);

                for (let i = 0; i < drops.length; i++) {
                    const ch = chars[Math.floor(Math.random() * chars.length)];
                    const y = drops[i] * fontSize;
                    const bright = Math.random() > 0.92;
                    ctx.fillStyle = bright
                        ? "#86efac"
                        : Math.random() > 0.7
                            ? "#16a34a"
                            : "#14532d";
                    ctx.font = `${fontSize}px monospace`;
                    ctx.fillText(ch, i * fontSize, y);
                    if (y > H && Math.random() > 0.975) drops[i] = 0;
                    drops[i] += 0.45;
                }

                animId = requestAnimationFrame(tick);
            };

            animId = requestAnimationFrame(tick);
        };

        // ResizeObserver fires once the canvas has real painted dimensions
        const observer = new ResizeObserver(() => startAnimation());
        observer.observe(canvas);

        // Also try immediately in case dimensions are already available
        startAnimation();

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
        };
    }, [image]); // Rerun if the image prop changes

    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : null;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/6",
                minHeight: "280px",
                maxHeight: "420px",
                background: "#000",
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "32px",
            }}
        >
            {/* Matrix rain canvas */}
            {!image && (
                <canvas
                    ref={canvasRef}
                    style={{ display: "block", width: "100%", height: "100%" }}
                />
            )}

            {/* Optional background image as subtle texture behind the rain */}
            {image && (
                <>
                    <Image
                        src={image.startsWith("http") || image.startsWith("/") ? image : `/${image}`}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 900px"
                        className="object-cover"
                        style={{ opacity: 0.3 }} // Increased opacity to make image more visible
                        priority
                    />
                    {/* Vignette so text stays readable over the image */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)",
                        }}
                    />
                </>
            )}

            {/* Bottom fade to blend into the page */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60px",
                    background:
                        "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
                    pointerEvents: "none",
                }}
            />

            {/* Overlay content */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "24px 20px",
                    boxSizing: "border-box",
                    gap: "6px",
                    pointerEvents: "none",
                }}
            >
                {/* Category badge */}
                {category && (
                    <span
                        style={{
                            fontFamily: "monospace",
                            fontSize: "10px",
                            letterSpacing: "3px",
                            color: "#22c55e",
                            border: "1px solid #166534",
                            padding: "3px 12px",
                            textTransform: "uppercase",
                            marginBottom: "6px",
                            opacity: 0.85,
                        }}
                    >
                        {category}
                    </span>
                )}

                {/* Title */}
                <div
                    style={{
                        fontFamily: GOTHAM,
                        fontSize: "clamp(18px, 4vw, 40px)",
                        fontWeight: 500,
                        letterSpacing: "2px",
                        color: "#00e87a",
                        lineHeight: 1.1,
                        textShadow: "0 0 6px rgba(0,220,100,0.4)",
                        maxWidth: "820px",
                        textTransform: "uppercase",
                    }}
                >
                    {title}
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: "320px",
                        maxWidth: "70%",
                        height: "1px",
                        background: "#166534",
                        margin: "10px auto",
                    }}
                />

                {/* Meta row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        fontFamily: "monospace",
                        fontSize: "10px",
                        letterSpacing: "1.5px",
                        color: "#15803d",
                    }}
                >
                    {formattedDate && (
                        <span
                            style={{ display: "flex", alignItems: "center", gap: "5px" }}
                        >
                            <Calendar size={10} color="#22c55e" />
                            {formattedDate}
                        </span>
                    )}
                    {readTime !== undefined && (
                        <span
                            style={{ display: "flex", alignItems: "center", gap: "5px" }}
                        >
                            <Clock size={10} color="#22c55e" />
                            {readTime} min read
                        </span>
                    )}
                    {author && (
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#22c55e",
                            }}
                        >
                            <User size={10} color="#22c55e" />
                            {author}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}