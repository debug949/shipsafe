import OpenAI from "openai"
import type { AIMessage, AIProvider } from "../types"

export class GroqProvider implements AIProvider {
  name = "groq"
  private client: OpenAI

  constructor() {
    if (!process.env.GROK_API_KEY) throw new Error("GROK_API_KEY is not set")
    this.client = new OpenAI({
      apiKey: process.env.GROK_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    })
  }

  async complete(messages: AIMessage[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      messages,
      temperature: 0.3,
    })
    return response.choices[0]?.message?.content ?? ""
  }
}
