import type { NextApiRequest, NextApiResponse } from "next";
import { processOutboundLead } from "@/helpers/outbound-engine";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "POST only." });

  try {
    const result = await processOutboundLead();
    if (!result.success) return res.status(404).json(result);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
