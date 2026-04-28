import { google } from "@ai-sdk/google";
import { streamText, tool, stepCountIs } from "ai";
import { z } from "zod";

export const config = {
  runtime: "edge", // Key for 100/100 Lighthouse performance
};

export default async function handler(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("gemini-3-flash"), // Optimized for speed/cost
    messages,
    stopWhen: stepCountIs(5),
    tools: {
      checkLighthouse: tool({
        description: "Audit a website performance score.",
        parameters: z.object({
          url: z.string().url().describe("The URL to check"),
        }),
        execute: async ({ url }: { url: string }) => {
          // Mocking the result for your audit tool
          await new Promise((resolve) => setTimeout(resolve, 1200));
          return {
            score: 100,
            label: "Perfect Architecture",
            details: "Next.js Pages Router + Edge Runtime is optimal.",
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
