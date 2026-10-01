import { AIProviderFactory } from "../ai/factory";
import { z } from "zod";

const ExtractedCluesSchema = z.object({
  is_vague: z.boolean(),
  objects: z.array(z.string()),
  scene_type: z.string().optional(),
  text_in_image: z.string().optional(),
  people: z.array(z.string()).optional(),
  timeframe: z.string().optional()
});

export type ExtractedClues = z.infer<typeof ExtractedCluesSchema>;

export async function extractClues(query: string): Promise<ExtractedClues> {
  const ai = AIProviderFactory.getDefault();
  
  const prompt = `You are an expert at parsing vague memory queries for a photo retrieval system.
A user is trying to find a specific photo but only remembers vague details.
Extract the core searchable clues from their query.

Query: "${query}"

Return a JSON object matching the schema. If a field is not mentioned, omit it or leave it empty.
Think carefully about what is explicitly stated versus implied.`;

  return ai.generateStructured(prompt, ExtractedCluesSchema, { temperature: 0.1 });
}
