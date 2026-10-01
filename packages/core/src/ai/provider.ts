import { z, ZodSchema } from "zod";

// ─── Types ────────────────────────────────────

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// ─── AIProvider Interface (Architecture §7) ───

export interface AIProvider {
  /** Generate free-form text from a prompt. */
  generateText(prompt: string, options?: GenerateOptions): Promise<string>;

  /** Generate structured output validated against a Zod schema. */
  generateStructured<T>(
    prompt: string,
    schema: ZodSchema<T>,
    options?: GenerateOptions
  ): Promise<T>;

  /** Generate a text embedding vector. */
  generateEmbedding(text: string): Promise<number[]>;

  /** Analyze an image with a text prompt (multimodal). */
  analyzeImage(image: Buffer, prompt: string): Promise<string>;

  /** Multi-turn chat. */
  chat(messages: ChatMessage[], options?: GenerateOptions): Promise<string>;
}

/**
 * Parse a JSON string from an LLM response, handling markdown code fences.
 */
export function extractJson(text: string): string {
  // Strip markdown code fences if present
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (fenceMatch) return fenceMatch[1].trim();
  
  // Try to find raw JSON object or array
  const jsonMatch = text.match(/[\[{][\s\S]*[\]}]/);
  if (jsonMatch) return jsonMatch[0];

  return text.trim();
}

/**
 * Safely parse structured JSON from LLM output and validate against a Zod schema.
 */
export function parseStructured<T>(text: string, schema: ZodSchema<T>): T {
  const jsonStr = extractJson(text);
  const parsed = JSON.parse(jsonStr);
  return schema.parse(parsed);
}
