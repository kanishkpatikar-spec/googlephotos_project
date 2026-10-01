import { AIProvider } from "../ai/provider";
import {
  EvidenceExtractionSchema,
  type EvidenceExtraction,
} from "../ai/schemas/evidence";

/**
 * Stage 4: LLM structured extraction.
 * Extracts all §5 schema fields from a retrieval-related user statement.
 */
export async function extractEvidence(
  ai: AIProvider,
  text: string
): Promise<EvidenceExtraction> {
  const prompt = `You are analyzing a user statement about difficulty finding a specific photo or media asset.

Extract structured information from this statement. Be precise — only extract what is explicitly stated or strongly implied. If information is not present, omit the field.

User statement:
"${text}"

Extract the following fields as JSON:
{
  "isRetrievalRelated": boolean,
  "targetDescription": "what the user was looking for",
  "assetType": "photo|video|screenshot|document|receipt|other",
  "rememberedCues": ["list of things the user remembers about the target"],
  "forgottenInfo": ["list of things the user forgot"],
  "uncertainInfo": ["things the user was unsure about"],
  "attemptedQuery": "what search or action the user tried",
  "systemResponse": "what the system returned",
  "failurePoint": "where retrieval broke down",
  "nextAction": "what the user tried next",
  "userSucceeded": boolean or null,
  "workaround": "any workaround used",
  "userCost": "time|effort|frustration|abandonment|no_result",
  "failureCategory": "from taxonomy: memory_articulation_failure, query_formulation_failure, intent_understanding_failure, semantic_matching_failure, metadata_failure, ranking_failure, candidate_overload, recognition_failure, refinement_failure, browsing_burden, abandonment",
  "opportunityCategory": "identified opportunity area",
  "aiConfidence": 0.0-1.0
}`;

  return ai.generateStructured(prompt, EvidenceExtractionSchema, {
    temperature: 0.1,
  });
}

/**
 * Extract evidence from a batch of texts.
 */
export async function extractEvidenceBatch(
  ai: AIProvider,
  texts: string[]
): Promise<EvidenceExtraction[]> {
  const results: EvidenceExtraction[] = [];
  for (const text of texts) {
    try {
      const result = await extractEvidence(ai, text);
      results.push(result);
    } catch (error) {
      console.error("Extraction failed for:", text.slice(0, 50), error);
      results.push({
        isRetrievalRelated: true,
        aiConfidence: 0,
      });
    }
  }
  return results;
}
