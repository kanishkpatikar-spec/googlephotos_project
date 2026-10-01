import { z } from "zod";

export const InterviewAnalysisSchema = z.object({
  rememberedCues: z.array(z.string()).describe("Cues the user remembered (e.g., date, location, people)"),
  forgottenInfo: z.array(z.string()).describe("Information the user forgot or struggled to articulate"),
  failureStages: z.array(z.string()).describe("Stages where retrieval broke down (e.g., query formulation, browsing)"),
  workaroundsUsed: z.array(z.string()).describe("Actions taken to bypass the failure (e.g., asked a friend, used WhatsApp)"),
  emotionalContext: z.array(z.string()).describe("Emotional state during retrieval (e.g., frustrated, anxious)"),
  keyMoments: z.array(z.string()).describe("Aha moments or critical realizations"),
});

export type InterviewAnalysis = z.infer<typeof InterviewAnalysisSchema>;
