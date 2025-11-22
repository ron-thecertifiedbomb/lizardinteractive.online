"use client";

import { useEffect, useState } from "react";

type CurrentWeather = {
    temperature: number;
    weathercode: number;
};

export function WeatherWidget({ className = "" }: { className?: string }) {
    const [current, setCurrent] = useState<CurrentWeather | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationLabel, setLocationLabel] = useState("Current Location");

    const weatherCodeToEmoji = (code: number) => {
        if (code === 0) return "☀️";
        if (code === 1 || code === 2) return "🌤️";
        if (code === 3) return "☁️";
        if (code >= 45 && code <= 48) return "🌫️";
        if (code >= 51 && code <= 57) return "🌦️";
        if (code >= 61 && code <= 67) return "🌧️";
        if (code >= 71 && code <= 77) return "🌨️";
        if (code >= 80 && code <= 82) return "⛈️";
        if (code >= 85 && code <= 86) return "❄️";
        if (code >= 95 && code <= 99) return "⛈️";
        return "🌈";
    };

    const fetchWeather = async (lat: number, lon: number) => {
        setLoading(true);
        setError("");
        try {
            const url = new URL("https://api.open-meteo.com/v1/forecast");
            url.searchParams.set("latitude", String(lat));
            url.searchParams.set("longitude", String(lon));
            url.searchParams.set("current_weather", "true");
            url.searchParams.set("timezone", "auto");

            const res = await fetch(url.toString());
            if (!res.ok) throw new Error("Weather API error");

            const data = await res.json();
            if (data.current_weather) {
                setCurrent({
                    temperature: data.current_weather.temperature,
                    weathercode: data.current_weather.weathercode,
                });
            }
        } catch (err) {
            console.error(err);
            setError("Weather load failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!navigator?.geolocation) return;

        let intervalId: NodeJS.Timeout;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                // Fetch initially
                fetchWeather(latitude, longitude);

                // Fetch every 3 minutes
                intervalId = setInterval(() => {
                    fetchWeather(latitude, longitude);
                }, 5 * 60 * 1000);
            },
            () => setError("Failed to get location"),
            { timeout: 8000 }
        );

        // Clean up interval on unmount
        return () => clearInterval(intervalId);
    }, []); // <- empty dependency array ensures this effect runs only once

    return (
        <div
            className={`w-14 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${className}`}
            title={error || locationLabel}
        >
            {loading ? (
                "⏳"
            ) : current ? (
                <>
                    <span className="text-2xl">{weatherCodeToEmoji(current.weathercode)}</span>
                    <span className="text-xs">{current.temperature.toFixed(0)}°</span>
                </>
            ) : (
                "—"
            )}
        </div>
    );
}
