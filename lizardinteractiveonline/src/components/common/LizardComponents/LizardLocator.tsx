import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
    Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LizardDiv } from "./layout";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Suggestion {
    display_name: string;
    lat: string;
    lon: string;
}

interface LizardLocatorProps {
    className?: string;
}

export function LizardLocator({ className }: LizardLocatorProps) {
    const [origin, setOrigin] = useState<[number, number] | null>(null);
    const [destination, setDestination] = useState<[number, number] | null>(null);
    const [route, setRoute] = useState<[number, number][]>([]);
    const [distance, setDistance] = useState<number | null>(null);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showModal, setShowModal] = useState(false);

    // Get user's location
    useEffect(() => {
        navigator.geolocation?.getCurrentPosition(
            (pos) => setOrigin([pos.coords.latitude, pos.coords.longitude]),
            () => alert("Unable to retrieve your location")
        );
    }, []);

    // Fetch route from OSRM
    async function fetchRoute(dest: [number, number]) {
        if (!origin) return;
        try {
            const res = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`
            );
            const data = await res.json();
            if (data.routes?.length) {
                const coords = data.routes[0].geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                ) as [number, number][];
                setRoute(coords);
                setDistance(data.routes[0].distance);
                setShowModal(true);
            }
        } catch (err) {
            console.error(err);
            alert("Routing failed");
        }
    }

    // Fetch suggestions while typing
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        query
                    )}&addressdetails=1&limit=5`,
                    {
                        headers: {
                            "Accept": "application/json",
                            "User-Agent": "YourAppNameHere" // Nominatim requires User-Agent
                        },
                    }
                );
                const results = await res.json();
                setSuggestions(results);
            } catch (err) {
                console.error(err);
            }
        }, 300); // debounce 300ms

        return () => clearTimeout(timeout);
    }, [query]);

    const selectSuggestion = (lat: string, lon: string) => {
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setDestination(coords);
        fetchRoute(coords);
        setQuery("");
        setSuggestions([]);
    };

    function CenterMap({ dest }: { dest: [number, number] | null }) {
        const map = useMap();
        useEffect(() => {
            if (dest) map.setView(dest, 14);
        }, [dest, map]);
        return null;
    }

    function DestinationMarker() {
        useMapEvents({
            click(e) {
                const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
                setDestination(coords);
                fetchRoute(coords);
            },
        });
        return destination ? (
            <Marker position={destination}>
                <Popup>Destination selected</Popup>
            </Marker>
        ) : null;
    }

    if (!origin)
        return (
            <LizardDiv className={`flex-1 flex justify-center items-center ${className}`}>
                Locating...
            </LizardDiv>
        );

    return (
        <LizardDiv className={`relative w-full h-full ${className}`}>
            {/* Search Input */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[70%] max-w-md z-[1000]">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search destination..."
                    className="w-full px-2 py-1 rounded border focus:outline-none text-[13px] bg-[#065f46]/70 text-[#f8fafc]"
                />
                {suggestions.length > 0 && (
                    <LizardDiv className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md max-h-52 overflow-auto z-[1001]">
                        {suggestions.map((s, i) => (
                            <LizardDiv
                                key={i}
                                className="px-2 py-1 hover:bg-green-100 cursor-pointer text-sm text-[#16a34a]"
                                onClick={() => selectSuggestion(s.lat, s.lon)}
                            >
                                {s.display_name}
                            </LizardDiv>
                        ))}
                    </LizardDiv>
                )}
            </div>

            {/* Map */}
            <MapContainer center={origin as L.LatLngExpression} zoom={14} className="w-full h-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={origin}>
                    <Popup>You are here</Popup>
                </Marker>

                <DestinationMarker />
                <CenterMap dest={destination} />

                {route.length > 0 && <Polyline positions={route} color="green" />}
            </MapContainer>

            {/* Distance Modal */}
            {showModal && distance && (
                <LizardDiv className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white p-2 shadow-md w-full max-w-[20%] z-[1000] rounded-2xl">
                    <LizardDiv className="flex justify-between items-center">
                        <LizardDiv>Distance from me</LizardDiv>
                        <LizardDiv>{(distance / 1000).toFixed(2)} km</LizardDiv>
                        <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white text-[10px] uppercase border px-1 mt-2">
                            close
                        </button>
                    </LizardDiv>
                </LizardDiv>
            )}
        </LizardDiv>
    );
}
