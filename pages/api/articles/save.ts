import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

// Increase the body size limit to accommodate large article payloads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is missing in environment variables");
    return res
      .status(500)
      .json({ message: "Database connection string missing" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("lizrd_core");
    const collection = db.collection("articles");

    const data = req.body;

    // Auto-generate a slug (id) from the title if not provided
    if (!data.id && data.title) {
      data.id = data.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Auto-use the featured image for the social sharing (OG) image if not provided
    if (!data.ogImage && data.image) {
      data.ogImage = data.image;
    }

    // Prevent client from overwriting the creation timestamp
    delete data.createdAt;

    // Upsert the article based on its 'id' (slug)
    const result = await collection.updateOne(
      { id: data.id },
      {
        $set: { ...data, updatedAt: new Date().toISOString() },
        $setOnInsert: { createdAt: new Date().toISOString() },
      },
      { upsert: true },
    );

    res.status(200).json({ message: "Article saved successfully", result });
  } catch (error) {
    console.error("❌ Failed to save article:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
