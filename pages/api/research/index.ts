import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 1. Method & Auth Guard
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const authHeader = req.headers.authorization; // For Vercel Cron
  const manualAuthHeader = req.headers["x-lizard-secret"] as string; // For manual curl

  const cronSecret = process.env.CRON_SECRET;

  if (
    authHeader !== `Bearer ${cronSecret}` &&
    manualAuthHeader !== cronSecret
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 2. Configure Model with JSON Schema (Ensures clean MongoDB data)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING },
              email: { type: SchemaType.STRING },
              websiteUrl: { type: SchemaType.STRING },
              industry: { type: SchemaType.STRING },
              contacted: { type: SchemaType.BOOLEAN },
            },
            required: ["name", "email", "websiteUrl", "industry", "contacted"],
          },
        },
      },
    });

    const prompt =
      "Research 5 real estate or luxury businesses in the Philippines with slow-loading websites. Provide contact emails and URLs.";

    const result = await model.generateContent(prompt);
    const leads = JSON.parse(result.response.text());

    // 3. Database Operation (Bulk Upsert to prevent duplicates)
    const client = await clientPromise;
    const db = client.db("lizrd_core");
    const collection = db.collection("prospects");

    const operations = leads.map((lead: any) => ({
      updateOne: {
        filter: { websiteUrl: lead.websiteUrl },
        update: { $setOnInsert: lead },
        upsert: true,
      },
    }));

    const resultStatus = await collection.bulkWrite(operations);

    return res.status(200).json({
      message: "Lizard Fed Successfully",
      newLeads: resultStatus.upsertedCount,
      totalProcessed: leads.length,
    });
  } catch (error: any) {
    // Log the full error to your VS Code terminal
    console.error("LIZRD_ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      details: error.message || "Unknown Error",
    });
  }
}
