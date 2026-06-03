import OpenAI from "openai"
import type { AIMessage, AIProvider } from "../types"

export class GrokProvider implements AIProvider {
  name = "grok"
  private client: OpenAI

  constructor() {
    if (!process.env.GROK_API_KEY) throw new Error("GROK_API_KEY is not set")
    this.client = new OpenAI({
      apiKey: process.env.GROK_API_KEY,
      baseURL: "https://api.x.ai/v1",
    })
  }

  async complete(messages: AIMessage[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: process.env.GROK_MODEL ?? "grok-3-mini",
      messages,
    })
    return response.choices[0]?.message?.content ?? ""
  }
}
