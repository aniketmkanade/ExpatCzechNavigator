import OpenAI from "openai";

// Custom error for unauthorized access
export class UnauthorizedError extends Error {
  constructor(message = "Premium subscription required") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
export async function generateChatResponse(messages: Array<{ role: "user" | "assistant" | "system"; content: string }>, isPremium: boolean): Promise<string> {
  if (!isPremium) {
    throw new UnauthorizedError();
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for expats in the Czech Republic. You provide accurate information about visas, universities, accommodation, and daily life in the Czech Republic. Keep responses concise and practical.",
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response.";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    // Handle rate limit errors specifically
    if (error.status === 429) {
      throw new Error("The AI service is currently busy. Please try again in a few minutes.");
    }

    throw new Error("Failed to generate response. Please try again later.");
  }
}