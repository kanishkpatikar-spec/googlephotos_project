import { AIProvider } from "../ai/provider";
import { ThemeExtractionSchema } from "../ai/schemas/clues";

/**
 * Stage 5: Theme detection via LLM cluster summarization.
 */
export async function detectThemes(
  ai: AIProvider,
  items: { id: string; text: string }[]
): Promise<{ themes: { label: string; description: string; evidenceIds: string[]; confidence: number }[] }> {
  if (items.length === 0) return { themes: [] };

  const itemList = items
    .map((item, i) => `[${item.id}] "${item.text}"`)
    .join("\n");

  const prompt = `You are analyzing a set of user statements about photo retrieval difficulties. Identify the major recurring THEMES across these statements.

Statements:
${itemList}

Group these statements into 3-8 themes. For each theme, provide:
- A short, descriptive label
- A one-sentence description
- The IDs of supporting evidence items
- A confidence score (0-1)

Respond with JSON:
{
  "themes": [
    {
      "label": "Theme name",
      "description": "One-sentence description",
      "evidenceIds": ["id1", "id2"],
      "confidence": 0.8
    }
  ]
}

Focus on themes related to HOW and WHY photo retrieval fails. Allow new themes to emerge — do not force all items into predefined categories.`;

  return ai.generateStructured(prompt, ThemeExtractionSchema, {
    temperature: 0.3,
  });
}
