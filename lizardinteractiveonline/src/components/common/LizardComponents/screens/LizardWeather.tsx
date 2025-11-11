import { useEffect, useState } from "react";
import { LizardDiv } from "../layout";
import { LizardText } from "../LizardText";
import { useLocationStore } from "@/store";

/**
 * LizardWeather
 * - Free: uses Open-Meteo geocoding and forecast APIs (no API key)
 * - Features: city search, geolocation fallback, current weather, 3-day forecast, hourly forecast
 */

type GeoResult = {
    name: string;
    country?: string;
    latitude: number;
    longitude: number;
    admin1?: string;
};

type CurrentWeather = {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
};

type DailyForecast = {
    date: string;
    tempMax: number;
    tempMin: number;
    weathercode: number;
};

type HourlyForecast = {
    time: string;
    temperature: number;
    weathercode: number;
};

export function LizardWeather({ className = "" }: { className?: string }) {
    const [query, setQuery] = useState<string>("");
    const [location, setLocation] = useState<GeoResult | null>(null);
    const [current, setCurrent] = useState<CurrentWeather | null>(null);
    const [daily, setDaily] = useState<DailyForecast[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [hourly, setHourly] = useState<HourlyForecast[]>([]);

    const {  city, country } = useLocationStore();
    
    console.log('Current Location', city)

    // Weather code -> emoji + label
    const weatherCodeToEmojiLabel = (code: number) => {
        if (code === 0) return { emoji: "☀️", label: "Clear" };
        if (code === 1 || code === 2) return { emoji: "🌤️", label: "Partly Cloudy" };
        if (code === 3) return { emoji: "☁️", label: "Overcast" };
        if (code >= 45 && code <= 48) return { emoji: "🌫️", label: "Fog" };
        if (code >= 51 && code <= 57) return { emoji: "🌦️", label: "Drizzle" };
        if (code >= 61 && code <= 67) return { emoji: "🌧️", label: "Rain" };
        if (code >= 71 && code <= 77) return { emoji: "🌨️", label: "Snow" };
        if (code >= 80 && code <= 82) return { emoji: "⛈️", label: "Rain Showers" };
        if (code >= 85 && code <= 86) return { emoji: "❄️", label: "Snow Showers" };
        if (code >= 95 && code <= 99) return { emoji: "⛈️", label: "Thunderstorm" };
        return { emoji: "🌈", label: "Unknown" };
    };

    const formatDate = (iso: string) => {
        try {
            return new Date(iso).toLocaleDateString(undefined, {
                weekday: "short", // e.g. Mon
                day: "numeric",   // e.g. 6
                month: "short",   // e.g. Sep
            });
        } catch {
            return iso;
        }
    };


    
    const formatHour = (iso: string) => {
        try {
            return new Date(iso).toLocaleTimeString([], { hour: "numeric" });
        } catch {
            return iso;
        }
    };

    // Fetch weather
    const fetchWeather = async (lat: number, lon: number, placeName?: string) => {
        setLoading(true);
        setError("");
        setCurrent(null);
        setDaily([]);
        setHourly([]);

        try {
            const url = new URL("https://api.open-meteo.com/v1/forecast");
            url.searchParams.set("latitude", String(lat));
            url.searchParams.set("longitude", String(lon));
            url.searchParams.set("current_weather", "true");
            url.searchParams.set("timezone", "auto");
            url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weathercode");
            url.searchParams.set("hourly", "temperature_2m,weathercode");

            const today = new Date();
            const end = new Date(today);
            end.setDate(today.getDate() + 3);
            url.searchParams.set("start_date", today.toISOString().slice(0, 10));
            url.searchParams.set("end_date", end.toISOString().slice(0, 10));

            const res = await fetch(url.toString());
            if (!res.ok) throw new Error("Weather API error");
            const data = await res.json();

            if (data.current_weather) {
                setCurrent({
                    temperature: data.current_weather.temperature,
                    windspeed: data.current_weather.windspeed,
                    winddirection: data.current_weather.winddirection,
                    weathercode: data.current_weather.weathercode,
                    time: data.current_weather.time,
                });
            }

            if (data.daily) {
                const combined: DailyForecast[] = data.daily.time.map((d: string, i: number) => ({
                    date: d,
                    tempMax: data.daily.temperature_2m_max[i],
                    tempMin: data.daily.temperature_2m_min[i],
                    weathercode: data.daily.weathercode[i],
                }));
                setDaily(combined);
            }

            if (data.hourly) {
                const combined: HourlyForecast[] = data.hourly.time.map((t: string, i: number) => ({
                    time: t,
                    temperature: data.hourly.temperature_2m[i],
                    weathercode: data.hourly.weathercode[i],
                }));
                setHourly(combined.slice(0, 12)); // show only 12 hours
            }

            setLocation(placeName ? { name: placeName, latitude: lat, longitude: lon } :
                { name: `${lat.toFixed(2)},${lon.toFixed(2)}`, latitude: lat, longitude: lon });
        } catch (err) {
            console.error(err);
            setError("Failed to load weather. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // Search city
    const searchCity = async (q: string) => {
        if (!q) return;
        setLoading(true);
        setError("");
        try {
            const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
            url.searchParams.set("name", q);
            url.searchParams.set("count", "5");
            const res = await fetch(url.toString());
            if (!res.ok) throw new Error("Geocoding failed");
            const data = await res.json();

            const results: GeoResult[] = (data.results || []).map((r: any) => ({
                name: r.name + (r.admin1 ? `, ${r.admin1}` : "") + (r.country ? `, ${r.country}` : ""),
                latitude: r.latitude,
                longitude: r.longitude,
            }));

            if (results.length === 0) {
                setError("Location not found");
            } else {
                const first = results[0];
                setLocation(first);
                await fetchWeather(first.latitude, first.longitude, first.name);
            }
        } catch (err) {
            console.error(err);
            setError("Search failed");
        } finally {
            setLoading(false);
        }
    };

    // Auto geolocation on mount
    useEffect(() => {
        if (!navigator?.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const label = city ? `${city}${country ? `, ${country}` : ""}` : "Current Location";
                fetchWeather(pos.coords.latitude, pos.coords.longitude, label);
            },
            () => { },
            { timeout: 8000 }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, country]);



    
    return (
        <LizardDiv className={`p-4 border rounded shadow-md bg-[#1e293b]/50 ${className} `}>
            <LizardText className="text-center font-bold text-lg mb-4 uppercase  text-green-500">Lizard Interactive Weather</LizardText>

            {/* Search & location */}
            <LizardDiv className="flex gap-2 mb-2">
                <input
                    className="flex-1 p-2 border rounded bg-transparent text-green-500"
                    placeholder="Search city (e.g. Manila)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchCity(query)}
                />
                <button
                    className="px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                    onClick={() => searchCity(query)}
                    disabled={loading}
                >
                    {loading ? "Searching…" : "Search"}
                </button>
                <button
                    className="px-3 py-2 rounded border hover:bg-white/5"
                    onClick={() => {
                        if (!navigator?.geolocation) {
                            setError("Geolocation not supported");
                            return;
                        }
                        setLoading(true);
                        navigator.geolocation.getCurrentPosition(
                            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, "Current location"),
                            (err) => {
                                console.error(err);
                                setError("Failed to get location");
                                setLoading(false);
                            },
                            { timeout: 8000 }
                        );
                    }}
                >
                    Use my location
                </button>
            </LizardDiv>

            {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

            {/* Current weather */}
            <LizardDiv className=" p-2 rounded bg-white/5 flex items-center gap-1">
                <LizardDiv className="text-6xl">
                    {current ? weatherCodeToEmojiLabel(current.weathercode).emoji : "⏳"}
                </LizardDiv>
                <LizardDiv>
                    <LizardDiv className="flex items-center justify-between">
                        <LizardDiv>
                            <LizardDiv className="text-sm text-gray-300 items-center">
                                {location ? location.name : "—"}
                            </LizardDiv>
                            <LizardDiv className="font-bold text-lg items-center">
                                {current ? `${current.temperature.toFixed(1)}°C` : "—"}
                            </LizardDiv>
                            <LizardDiv className="text-sm text-gray-400 items-center">
                                {current ? weatherCodeToEmojiLabel(current.weathercode).label : ""}
                            </LizardDiv>
                        </LizardDiv>
                        <LizardDiv className="text-right text-xs text-gray-400">
                            <LizardDiv>Wind {current ? `${current.windspeed} km/h` : "—"}</LizardDiv>
                            <LizardDiv>{current ? new Date(current.time).toLocaleTimeString() : ""}</LizardDiv>
                        </LizardDiv>
                    </LizardDiv>
                </LizardDiv>
            </LizardDiv>

            {/* Daily forecast */}
            <LizardText className="text-sm font-semibold mb-1">
                Next Days
            </LizardText>

            <LizardDiv className="grid grid-cols-3 gap-2">
                {daily.length === 0 && (
                    <LizardDiv className="col-span-3 text-sm text-gray-400">
                        No forecast yet
                    </LizardDiv>
                )}

                {(() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const startIndex = daily.findIndex((d) => {
                        const date = new Date(d.date);
                        date.setHours(0, 0, 0, 0);
                        return date.getTime() === today.getTime();
                    });

                    // If today isn’t found, just fallback to 0
                    const safeIndex = startIndex === -1 ? 0 : startIndex;
                    
                    return daily.slice(safeIndex, safeIndex + 3).map((d) => {
                        const { emoji, label } = weatherCodeToEmojiLabel(d.weathercode);
                        return (
                            <LizardDiv
                                key={d.date}
                                className="p-1 bg-white/5 rounded text-center"
                            >
                                <LizardDiv className="text-sm text-gray-300">
                                    {formatDate(d.date)}
                                </LizardDiv>
                                <LizardDiv className="text-[17px]">{emoji}</LizardDiv>
                                <LizardDiv className="text-sm font-bold">
                                    {d.tempMax.toFixed(0)}° / {d.tempMin.toFixed(0)}°
                                </LizardDiv>
                                <LizardDiv className="text-xs text-gray-400">{label}</LizardDiv>
                            </LizardDiv>
                        );
                    });
                })()}
            </LizardDiv>

            {/* Hourly forecast */}
            <LizardText className="text-sm font-semibold ">Next Hours</LizardText>
            <LizardDiv className="mt-1 w-full overflow-x-auto scrollbar-hide">
                <LizardDiv className="flex flex-row gap-2 ">
                    {hourly.length === 0 && (
                        <LizardDiv className="text-sm text-gray-400">No hourly data</LizardDiv>
                    )}
                    {hourly.map((h) => {
                        const { emoji } = weatherCodeToEmojiLabel(h.weathercode);
                        return (
                            <LizardDiv
                                key={h.time}
                                className="min-w-[70px] bg-white/5 rounded text-center flex-shrink-0"
                            >
                                <LizardDiv className="text-xs text-gray-300">
                                    {formatHour(h.time)}
                                </LizardDiv>
                                <LizardDiv className=" text-sm">{emoji}</LizardDiv>
                                <LizardDiv className="text-sm font-bold">
                                    {h.temperature.toFixed(0)}°
                                </LizardDiv>
                            </LizardDiv>
                        );
                    })}
                </LizardDiv>
            </LizardDiv>
            </LizardDiv>
    );
}
