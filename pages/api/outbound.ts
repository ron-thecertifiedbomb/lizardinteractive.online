import type { NextApiRequest, NextApiResponse } from "next";
import { processOutboundLead } from "@/helpers/outbound-engine";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow POST requests for security
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed. Use POST." });
  }

  try {
    const result = await processOutboundLead();

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({
      message: "Protocol Executed Successfully",
      sentTo: result.email,
    });
  } catch (error: any) {
    console.error("Outbound Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Engine Failure" });
  }
}
