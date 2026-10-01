import { AIProvider } from "../ai/provider";
import {
  MemoryCueBatchSchema,
  REMEMBERED_CLUE_TYPES,
  FORGOTTEN_INFO_TYPES,
} from "../ai/schemas/clues";

/**
 * Stage 7: Memory cue analysis — extract what users remember vs forget (§6.1, §6.2).
 */
export async function analyzeMemoryCues(
  ai: AIProvider,
  text: string
): Promise<{
  rememberedCues: { cueType: string; cueValue: string; confidence: number }[];
  forgottenInfo: { infoType: string; description: string; confidence: number }[];
}> {
  const cueTypes = REMEMBERED_CLUE_TYPES.join(", ");
  const forgottenTypes = FORGOTTEN_INFO_TYPES.join(", ");

  const prompt = `You are analyzing a user statement about trying to find a specific photo. Extract what the user REMEMBERED and what they FORGOT about the target photo.

User statement:
"${text}"

Remembered clue types (§6.1): ${cueTypes}
Forgotten info types (§6.2): ${forgottenTypes}

For each remembered clue, specify:
- cueType: one of the types above (or "other")
- cueValue: the specific detail remembered
- confidence: 0.0-1.0

For each forgotten piece of info, specify:
- infoType: one of the types above (or "other")
- description: what was forgotten
- confidence: 0.0-1.0

Respond with JSON:
{
  "rememberedCues": [{"cueType": "...", "cueValue": "...", "confidence": 0.8}],
  "forgottenInfo": [{"infoType": "...", "description": "...", "confidence": 0.8}]
}`;

  try {
    const result = await ai.generateStructured(prompt, MemoryCueBatchSchema, {
      temperature: 0.1,
    });
    return result;
  } catch (error) {
    console.error("Memory cue analysis failed:", error);
    return { rememberedCues: [], forgottenInfo: [] };
  }
}
