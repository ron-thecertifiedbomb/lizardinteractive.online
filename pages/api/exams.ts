import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // If the incoming data is a new Exam Protocol, save it to the local JSON file
      if (data.questions && data.title) {
        const filePath = path.join(process.cwd(), "data", "exam", "exam.json");
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log("PROTOCOL_PERSISTED_TO_DISK:", data.title);
      } else {
        console.log("TELEMETRY_RECEIVED:", data.type || "UNKNOWN_SUBMISSION");
      }

      return res.status(200).json({
        status: "success",
        message: "Data processed by Next.js API",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  }
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
