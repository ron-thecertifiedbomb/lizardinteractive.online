import clientPromise from "@/lib/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  // 1. Security Check (Same as Outbound)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  // 2. Ask Gemini for Leads
  const prompt = `Research 5 businesses in the Philippines (Real Estate or Luxury Retail) likely to have unoptimized, slow websites. 
  Return a JSON array of objects with: name, email, websiteUrl, industry, and contacted: false.`;

  const result = await model.generateContent(prompt);
  const leads = JSON.parse(result.response.text());

  // 3. Insert into MongoDB
  const client = await clientPromise;
  const db = client.db("lizrd_core");
  await db.collection("prospects").insertMany(leads);

  return Response.json({
    message: "Lizard Fed Successfully",
    count: leads.length,
  });
}
