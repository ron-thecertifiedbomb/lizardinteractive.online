// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeLead(title: string, description: string) {
  try {
    // 💡 UPDATE: Use the 2026 stable model name
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
      Analyze this job lead for Lizrd Interactive:
      Title: ${title}
      Description: ${description}
      
      Return ONLY a JSON object:
      {
        "score": (number 1-10),
        "summary": "short summary",
        "fit": "why it fits"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { score: 0, summary: "Analysis failed", fit: "error" };
  }
}
