import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeJobbers } from "@/lib/scraper";
import { analyzeLead } from "@/lib/gemini";
import clientPromise from "@/lib/mongodb";

// Increase timeout for Playwright/AI operations (Vercel Pro)
// Note: Pages Router uses a different config object than App Router
export const config = {
  api: {
    responseLimit: false, // Allows for larger data if needed
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 1. Only allow GET requests (or check for Cron headers)
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Security: Verify Vercel Cron Secret
  const authHeader = req.headers["authorization"];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // 2. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("lizrd_interactive");
    const collection = db.collection("leads");

    // 3. Run the Scraper
    const rawJobs = await scrapeJobbers();
    const stats = { processed: 0, saved: 0 };

    // 4. Process the Leads
    for (const job of rawJobs) {
      // Check if lead already exists to save tokens/time
      const existing = await collection.findOne({ link: job.link });
      if (existing) continue;

      stats.processed++;

      try {
        // Intelligence Layer
        const analysis = await analyzeLead(job.title, job.description);

        if (analysis.score >= 7) {
          await collection.updateOne(
            { link: job.link },
            {
              $set: {
                ...job,
                ...analysis,
                status: "new",
                createdAt: new Date(),
              },
            },
            { upsert: true },
          );
          stats.saved++;
        }
      } catch (geminiError) {
        console.error(`Gemini failed for ${job.title}:`, geminiError);
        continue;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Scanned ${rawJobs.length} jobs. Analyzed ${stats.processed}. Saved ${stats.saved} leads.`,
      stats,
    });
  } catch (error: any) {
    console.error("Critical API Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
