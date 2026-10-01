import { AIProvider } from "../ai/provider";
import { OpportunityBatchSchema, type OpportunityExtraction } from "../ai/schemas/clues";

/**
 * Stage 8: Synthesize themes and failure patterns into opportunity areas.
 */
export async function generateOpportunities(
  ai: AIProvider,
  themes: { label: string; description: string; evidenceIds: string[] }[],
  failureSummary: string,
  memorySummary: string
): Promise<OpportunityExtraction[]> {
  if (themes.length === 0) return [];

  const themesText = themes
    .map((t) => `- ${t.label}: ${t.description} (${t.evidenceIds.length} evidence items)`)
    .join("\n");

  const prompt = `You are a product researcher analyzing photo retrieval failures. Based on the research themes and patterns below, identify concrete OPPORTUNITY AREAS for improving vague-memory photo retrieval.

Themes discovered:
${themesText}

Failure patterns:
${failureSummary}

Memory patterns:
${memorySummary}

Generate 3-6 opportunity areas. For each:
- title: Short, actionable name
- description: 1-2 sentences explaining what could be improved
- evidenceSummary: Brief summary of supporting evidence
- confidenceScore: 0.0-1.0 based on strength of evidence

IMPORTANT:
- Do NOT automatically select a "best" opportunity
- Each opportunity should be distinct and evidence-backed
- Focus on the gap between what users remember and what they can search for

Respond with JSON:
{
  "opportunities": [
    {
      "title": "...",
      "description": "...",
      "evidenceSummary": "...",
      "confidenceScore": 0.8
    }
  ]
}`;

  try {
    const result = await ai.generateStructured(prompt, OpportunityBatchSchema, {
      temperature: 0.3,
    });
    return result.opportunities;
  } catch (error) {
    console.error("Opportunity generation failed:", error);
    return [];
  }
}
