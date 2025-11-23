export default async function handler(req, res) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Missing coordinates" });
    }

    const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en`;

    const geoRes = await fetch(url);
    const data = await geoRes.json();

    // Normalize structure so frontend always receives data.results[]
    const results = (data.features || []).map((f) => {
      const p = f.properties || {};

      return {
        city: p.city || null,
        town: p.town || null,
        village: p.village || null,
        municipality: p.municipality || null,
        locality: p.locality || null,
      };
    });

    return res.status(200).json({ results });
  } catch (err) {
    console.error("GEOCODE API ERROR:", err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
}
