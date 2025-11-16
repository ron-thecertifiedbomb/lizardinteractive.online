"use client";
import { useState, useEffect } from "react";

export default function YoutubeToMp3() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState<string | null>(null);

    const fetchVideoInfo = async (videoUrl: string) => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/youtube-to-mp3/info?url=${encodeURIComponent(videoUrl)}`
            );
            if (!res.ok) throw new Error("Failed to fetch video info");
            const data = await res.json();
            setTitle(data.title || null);
            return data.title || null;
        } catch (err) {
            console.error(err);
            setTitle(null);
            return null;
        }
    };

    const handleDownload = async () => {
        if (!url) return alert("Enter YouTube URL");
        if (!/^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url)) {
            return alert("Please enter a valid YouTube URL");
        }

        setLoading(true);
        setProgress(0);

        // Start fake progress
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 1 : prev));
        }, 200); // increment every 200ms until 90%

        const fetchedTitle = await fetchVideoInfo(url);

        try {
            const response = await fetch(
                `http://localhost:8080/api/youtube-to-mp3/audio?url=${encodeURIComponent(url)}`
            );
            if (!response.ok) throw new Error("Failed to convert video");

            const blob = await response.blob();
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `${fetchedTitle || "audio"}.mp3`;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to convert video");
        } finally {
            clearInterval(interval);
            setProgress(100); // complete progress
            setLoading(false);
            setUrl(""); // clear field
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-blue-400 text-white rounded">
            <h2 className="text-xl font-bold mb-4">YouTube Video to MP3</h2>

            <input
                type="text"
                placeholder="YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full mb-2 p-2 text-black rounded"
            />

            {title && <p className="mb-2 text-sm text-gray-200">Video: {title}</p>}

            <button
                onClick={handleDownload}
                disabled={loading}
                className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? `Converting...` : "Convert to MP3"}
            </button>

            {loading && (
                <p className="text-sm text-gray-400 mt-2">Converting: {progress}%</p>
            )}
        </div>
    );
}
