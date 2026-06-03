import type { AIProvider } from "./types"

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER ?? "groq"

  switch (provider) {
    case "groq": {
      const { GroqProvider } = require("./providers/groq")
      return new GroqProvider()
    }
    case "grok": {
      const { GrokProvider } = require("./providers/grok")
      return new GrokProvider()
    }
    case "openai": {
      const { OpenAIProvider } = require("./providers/openai")
      return new OpenAIProvider()
    }
    default:
      throw new Error(`Unknown AI provider: "${provider}". Set AI_PROVIDER to "groq", "grok", or "openai".`)
  }
}
