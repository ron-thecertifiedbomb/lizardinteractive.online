import type { NextApiRequest, NextApiResponse } from "next";
import { processOutboundLead } from "@/helpers/outbound-engine";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Security Check
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
    const result = await processOutboundLead();

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({
      message: "Lizard Strike Complete",
      count: result.sentEmails?.length || 0,
      deliveredTo: result.sentEmails, // Now shows the full list in your terminal
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
