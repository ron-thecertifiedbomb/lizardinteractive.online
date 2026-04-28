import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("❌ MONGODB_URI is missing in environment variables");
        return res.status(500).json({ message: "Database connection string missing" });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("lizrd_core");
        const collection = db.collection("articles");

        const data = req.body;

        // Upsert the article based on its 'id' (slug)
        const result = await collection.updateOne(
            { id: data.id },
            { $set: data },
            { upsert: true }
        );

        res.status(200).json({ message: "Article saved successfully", result });
    } catch (error) {
        console.error("❌ Failed to save article:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        await client.close();
    }
}
