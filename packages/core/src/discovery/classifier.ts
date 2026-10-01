import { AIProvider } from "../ai/provider";
import {
  RelevanceClassificationSchema,
  type RelevanceClassification,
} from "../ai/schemas/evidence";

/**
 * Stage 3: LLM-based retrieval relevance classification.
 * Determines if a user statement is about photo/media retrieval difficulty.
 */
export async function classifyRelevance(
  ai: AIProvider,
  text: string
): Promise<RelevanceClassification> {
  const prompt = `You are analyzing user statements about photo and media management apps.

Classify whether this statement describes a **vague-memory retrieval problem** — meaning the user is trying to find a specific photo or media asset that they vaguely remember but cannot precisely describe or locate through standard search.

User statement:
"${text}"

Respond with JSON:
{
  "isRetrievalRelated": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation"
}

A statement IS retrieval-related if it describes:
- Searching for a specific photo the user remembers but can't find
- Difficulty describing a photo to a search system
- Frustration with photo search returning wrong results
- Scrolling through thousands of photos to find one specific image
- Workarounds for finding remembered photos

A statement is NOT retrieval-related if it's about:
- General photo management (organizing, deleting, storage)
- Photo editing or sharing
- Camera features
- Unrelated app complaints`;

  return ai.generateStructured(prompt, RelevanceClassificationSchema, {
    temperature: 0.1,
  });
}

/**
 * Classify a batch of texts. Returns parallel array of classifications.
 */
export async function classifyRelevanceBatch(
  ai: AIProvider,
  texts: string[]
): Promise<RelevanceClassification[]> {
  const results: RelevanceClassification[] = [];
  for (const text of texts) {
    try {
      const result = await classifyRelevance(ai, text);
      results.push(result);
    } catch (error) {
      console.error("Classification failed for text:", text.slice(0, 50), error);
      results.push({
        isRetrievalRelated: false,
        confidence: 0,
        reasoning: "Classification failed",
      });
    }
  }
  return results;
}
