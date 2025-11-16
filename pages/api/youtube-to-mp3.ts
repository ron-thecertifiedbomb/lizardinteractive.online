import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "YouTube URL is required" });
  }

  try {
    // Replace this with your RonDevServer endpoint
    const apiUrl = `http://localhost:8080/api/youtube-to-mp3?url=${encodeURIComponent(
      url
    )}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", "attachment; filename=video.mp3");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to convert video" });
  }
}
