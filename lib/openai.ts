import { createOpenAI, type OpenAIProvider } from "@ai-sdk/openai";
import { env } from "@/env";

export const DEFAULT_MODEL = "gpt-4o-mini-2024-07-18";

const clients = new Map<string | undefined, OpenAIProvider>();

export function getOpenAIClient(apiKey?: string): OpenAIProvider {
  const key = apiKey ?? env.OPENAI_API_KEY;

  if (!clients.has(key)) {
    clients.set(key, createOpenAI({ apiKey: key }));
  }

  return clients.get(key)!;
}
