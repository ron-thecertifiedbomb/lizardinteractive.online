import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // 1. Await conversion (Required in AI SDK 6.0+)
    const convertedMessages = await convertToModelMessages(messages);

    // 2. Initialize the stream
    const result = streamText({
      model: google("gemini-2.5-flash-lite"), // Use stable model ID
      messages: convertedMessages,
    });

    // 3. Return the specific UI stream response
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
