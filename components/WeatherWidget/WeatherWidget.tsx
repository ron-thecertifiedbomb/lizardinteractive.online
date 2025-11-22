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
        switch (code) {
            case 0: return "☀️";        // Clear sky
            case 1: return "🌤️";       // Mainly clear
            case 2: return "⛅";        // Partly cloudy
            case 3: return "☁️";        // Overcast
            case 45: case 46: case 47: case 48: return "🌫️"; // Fog
            case 51: case 53: case 55: case 56: case 57: return "🌦️"; // Drizzle
            case 61: case 63: case 65: case 66: case 67: return "🌧️"; // Rain
            case 71: case 73: case 75: case 77: return "🌨️"; // Snow
            case 80: case 81: case 82: return "⛈️"; // Rain showers
            case 85: case 86: return "❄️"; // Snow showers
            case 95: case 96: case 99: return "⛈️"; // Thunderstorm
            default: return "🌈"; // Unknown
        }
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
            className={`w-16 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${className}`}
            title={error || locationLabel}
        >
            {loading ? (
                "⏳"
            ) : current ? (
                <div className="flex items-center">
                    <span className="text-4xl">{weatherCodeToEmoji(current.weathercode)}</span>
                    <span className="text-lg">{current.temperature.toFixed(0)}°</span>
                </div>
            ) : (
                "—"
            )}
        </div>
    );
}
