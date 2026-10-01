import { AIProvider } from "../ai/provider";

/**
 * Generate text embedding.
 * Wrapper around the AIProvider's embedding capability.
 */
export async function generateEmbedding(ai: AIProvider, text: string): Promise<number[]> {
  if (!text.trim()) {
    throw new Error("Cannot generate embedding for empty text");
  }
  return ai.generateEmbedding(text);
}
