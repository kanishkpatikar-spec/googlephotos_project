import { AIProviderFactory } from "@google-photos/core";
import { z } from "zod";

const ProblemDefinitionSchema = z.object({
  targetSegment: z.string(),
  scenario: z.string(),
  memoryCues: z.string(),
  searchableAttributes: z.string(),
  rootCause: z.string(),
  failureBehavior: z.string(),
  workaround: z.string(),
  consequence: z.string(),
  productBehavior: z.string(),
  retrievalComponent: z.string(),
});

export type ProblemDefinitionFields = z.infer<typeof ProblemDefinitionSchema>;

export async function generateProblemDefinition(
  synthesisData: { quotes: any[]; observations: any[] }
): Promise<ProblemDefinitionFields> {
  const ai = AIProviderFactory.getDefault();

  const prompt = `You are a UX researcher tasked with defining a core problem statement based on synthesized research data.
Analyze the following quotes and observations from our research synthesis.

Quotes:
${JSON.stringify(synthesisData.quotes.slice(0, 20))}

Observations:
${JSON.stringify(synthesisData.observations.slice(0, 30))}

Based on this data, fill in the blanks for the following problem statement template:
For [target segment],
when they are trying to retrieve [scenario],
they often remember [memory cues]
but have forgotten [searchable attributes].
Because [root cause],
their initial retrieval attempt results in [failure behavior].
Users then resort to [workaround],
creating [consequence].
Improving [product behavior]
should increase [retrieval component].

Keep your answers concise and punchy (1-5 words max for most fields, maybe a short phrase for others).`;

  return ai.generateStructured(prompt, ProblemDefinitionSchema, {
    temperature: 0.3,
  });
}
