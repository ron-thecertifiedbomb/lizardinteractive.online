"use client";

import { useState } from "react";

export default function YoutubeToMp3() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState<string>("audio");

    const handleDownload = async () => {
        if (!url) return alert("Enter YouTube URL");
        setLoading(true);
        setProgress(0);
        setTitle("audio");

        try {
            // SSE listener for progress + title
            const es = new EventSource(
                `http://localhost:8080/api/youtube-to-mp3/progress`
            );

            es.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setProgress(data.progress);
                // Optionally update the title dynamically
                setTitle(data.title);
            };

            // Fetch the MP3
            const response = await fetch(
                `http://localhost:8080/api/youtube-to-mp3/audio?url=${encodeURIComponent(
                    url
                )}`
            );
            if (!response.ok) throw new Error("Failed to convert video");

            const blob = await response.blob();
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `${title}.mp3`;
            a.click();

            es.close(); // stop SSE
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to convert video");
        } finally {
            setLoading(false);
            setProgress(0);
            setUrl("");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-blue-400 text-white rounded">
            <h2 className="text-xl font-bold mb-4">YouTube to MP3</h2>

            <input
                type="text"
                placeholder="YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full mb-2 p-2 text-black rounded"
            />

            <button
                onClick={handleDownload}
                disabled={loading}
                className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Converting..." : "Download MP3"}
            </button>

            {loading && (
                <p className="text-sm text-gray-200 mt-2">
                    {title} - Progress: {progress}%
                </p>
            )}
        </div>
    );
}
