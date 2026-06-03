import OpenAI from "openai"
import type { AIMessage, AIProvider } from "../types"

export class OpenAIProvider implements AIProvider {
  name = "openai"
  private client: OpenAI

  constructor() {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set")
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }

  async complete(messages: AIMessage[]): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages,
    })
    return response.choices[0]?.message?.content ?? ""
  }
}
