import { z } from "zod";

/**
 * Schema for AI-extracted structured evidence (§5).
 * Maps to the evidence_items table columns.
 */
export const EvidenceExtractionSchema = z.object({
  isRetrievalRelated: z.boolean().describe("Is this about photo/media retrieval?"),
  targetDescription: z.string().optional().describe("What asset the user was looking for"),
  assetType: z.string().optional().describe("photo, video, screenshot, document, receipt, etc."),
  rememberedCues: z.array(z.string()).optional().describe("List of things the user remembers"),
  forgottenInfo: z.array(z.string()).optional().describe("List of things the user forgot"),
  uncertainInfo: z.array(z.string()).optional().describe("Information the user was unsure about"),
  attemptedQuery: z.string().optional().describe("What search query or action the user tried"),
  systemResponse: z.string().optional().describe("What the system returned or did"),
  failurePoint: z.string().optional().describe("Where retrieval broke down"),
  nextAction: z.string().optional().describe("What the user did after failure"),
  userSucceeded: z.boolean().optional().describe("Did the user eventually find the target?"),
  workaround: z.string().optional().describe("Any workaround the user employed"),
  userCost: z.enum(["time", "effort", "frustration", "abandonment", "no_result"]).optional(),
  failureCategory: z.string().optional().describe("Classified failure type from §6.3 taxonomy"),
  opportunityCategory: z.string().optional().describe("Identified opportunity area"),
  aiConfidence: z.number().min(0).max(1).describe("Confidence in this interpretation"),
});

export type EvidenceExtraction = z.infer<typeof EvidenceExtractionSchema>;

/**
 * Schema for batch extraction result.
 */
export const BatchExtractionSchema = z.object({
  items: z.array(EvidenceExtractionSchema),
});

/**
 * Schema for relevance classification.
 */
export const RelevanceClassificationSchema = z.object({
  isRetrievalRelated: z.boolean(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().optional(),
});

export type RelevanceClassification = z.infer<typeof RelevanceClassificationSchema>;
