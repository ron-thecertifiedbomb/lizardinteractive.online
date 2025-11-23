"use client";

import { useEffect, useState } from "react";

type CurrentWeather = {
    temperature: number;
    weathercode: number;
    is_day: number;
};

export function WeatherWidget({ className = "" }: { className?: string }) {
    const [current, setCurrent] = useState<CurrentWeather | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationName, setLocationName] = useState("Loading...");

    const weatherCodeToLayers = (code: number, isDay: number) => {
        const night = isDay === 0;

        const sun = night ? null : "☀️";
        const moon = night ? "🌙" : null;

        switch (code) {
            case 0: return { sun, moon, clouds: null, precip: null };
            case 1:
            case 2: return { sun, moon, clouds: "☁️", precip: null };
            case 3: return { sun: null, moon: null, clouds: "☁️", precip: null };
            case 45:
            case 48: return { sun: null, moon: null, clouds: "🌫️", precip: null };
            case 51:
            case 53:
            case 55: return { sun, moon, clouds: "☁️", precip: "🌧️" };
            case 61:
            case 63:
            case 65: return { sun, moon, clouds: null, precip: "🌧️" };
            case 71:
            case 73:
            case 75: return { sun: null, moon: null, clouds: "☁️", precip: "🌨️" };
            case 80:
            case 81:
            case 82: return { sun, moon, clouds: "☁️", precip: "🌧️" };
            case 95:
            case 96:
            case 99: return { sun, moon, clouds: "☁️", precip: "⛈️" };
            default: return { sun, moon, clouds: "☁️", precip: null };
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
                    is_day: data.current_weather.is_day,
                });
            }
        } catch {
            setError("Weather load failed");
        } finally {
            setLoading(false);
        }
    };

    const fetchMunicipality = async (lat: number, lon: number) => {
        try {
            const res = await fetch(`/api/geocode?lat=${lat}&lon=${lon}`);
            const data = await res.json();
            const extractMunicipality = (place: any) => {
                return (
                    place.city ||
                    place.town ||
                    place.municipality ||
                    place.village ||
                    place.locality ||
                    "Unknown"
                );
            };
            if (data && data.results && data.results.length > 0) {
                const place = data.results[0];
                const muni = extractMunicipality(place);
                setLocationName(muni);
            } else {
                setLocationName("Unknown");
            }

        } catch (err) {
            console.log("GEOCODE ERROR", err);
            setLocationName("Unknown");
        }
    };


    useEffect(() => {
        if (!navigator?.geolocation) {
            setError("Geolocation not supported");
            return;
        }

        let intervalId: NodeJS.Timeout;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;

                fetchWeather(latitude, longitude);
                fetchMunicipality(latitude, longitude);

                intervalId = setInterval(() => {
                    fetchWeather(latitude, longitude);
                }, 5 * 60 * 1000);
            },
            () => setError("Failed to get location"),
            { timeout: 8000 }
        );

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className={`w-28 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm ${className}`}
            title={error || locationName}
        >
            {loading ? (
                "⏳"
            ) : current ? (
                <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                        {(() => {
                            const { sun, moon, clouds, precip } =
                                weatherCodeToLayers(current.weathercode, current.is_day);

                            return (
                                <>
                                    {/* SUN / MOON */}
                                    {sun && (
                                        <span className="absolute text-3xl left-5 top-0 z-30">
                                            {sun}
                                        </span>
                                    )}
                                    {moon && (
                                        <span className="absolute text-3xl left-2 top-1 z-30">
                                            {moon}
                                        </span>
                                    )}

                                    {/* CLOUDS */}
                                    {clouds && (
                                        <span className="absolute text-3xl left-0 top-4 z-20">
                                            {clouds}
                                        </span>
                                    )}

                                    {/* RAIN / SNOW / STORM */}
                                    {precip && (
                                        <span className="absolute text-3xl left-2 top-7 z-10">
                                            {precip}
                                        </span>
                                    )}
                                </>
                            );
                        })()}
                    </div>

                    <span className="text-lg">{current.temperature.toFixed(0)}°</span>
                </div>
            ) : (
                "—"
            )}
        </div>
    );
}
