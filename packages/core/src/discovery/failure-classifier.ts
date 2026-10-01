import { AIProvider } from "../ai/provider";
import {
  FailureModeBatchSchema,
  FAILURE_POINTS,
  FAILURE_FUNNEL_STAGES,
  type FailureModeExtraction,
} from "../ai/schemas/clues";

/**
 * Stage 6: Map evidence to failure taxonomy (§6.3) and funnel stages (§8.4).
 */
export async function classifyFailures(
  ai: AIProvider,
  text: string,
  evidenceId: string
): Promise<FailureModeExtraction[]> {
  const failureList = FAILURE_POINTS.join(", ");
  const funnelList = FAILURE_FUNNEL_STAGES.join(", ");

  const prompt = `You are analyzing a user statement about photo retrieval difficulty. Identify WHERE in the retrieval process the failure occurred.

User statement:
"${text}"

Failure taxonomy (§6.3): ${failureList}

Failure funnel stages (§8.4): ${funnelList}

Identify ALL failure points present in this statement. For each failure:
- failureStage: one of the taxonomy categories above (or "other" if none fit)
- funnelStage: which funnel stage this maps to
- description: brief description of the specific failure
- confidence: 0.0-1.0

Respond with JSON:
{
  "failures": [
    {
      "failureStage": "...",
      "funnelStage": "...",
      "description": "...",
      "confidence": 0.8
    }
  ]
}

If no clear failures are identified, return { "failures": [] }.`;

  try {
    const result = await ai.generateStructured(prompt, FailureModeBatchSchema, {
      temperature: 0.1,
    });
    return result.failures;
  } catch (error) {
    console.error("Failure classification failed:", error);
    return [];
  }
}
