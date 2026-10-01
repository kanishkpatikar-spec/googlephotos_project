import { z } from "zod";

/**
 * Taxonomy §6.1 — Remembered Clue Types
 */
export const REMEMBERED_CLUE_TYPES = [
  "person", "object", "general_location", "exact_location",
  "approximate_time", "exact_time", "trip", "event", "activity",
  "appearance", "color", "environment", "text_fragment", "purpose",
  "source", "relationship", "social_context", "before_after_event",
  "screenshot_context", "emotional_context", "document_type", "other",
] as const;

/**
 * Taxonomy §6.2 — Forgotten Information Types
 */
export const FORGOTTEN_INFO_TYPES = [
  "exact_date", "exact_place", "name", "text", "filename",
  "album", "person", "event", "year", "source", "other",
] as const;

/**
 * Taxonomy §6.3 — Retrieval Failure Points
 */
export const FAILURE_POINTS = [
  "memory_articulation_failure", "query_formulation_failure",
  "intent_understanding_failure", "semantic_matching_failure",
  "metadata_failure", "ranking_failure", "candidate_overload",
  "recognition_failure", "refinement_failure", "browsing_burden",
  "abandonment", "other",
] as const;

/**
 * Failure funnel stages (§8.4)
 */
export const FAILURE_FUNNEL_STAGES = [
  "user_remembers_photo",
  "attempts_to_express_memory",
  "creates_search_query",
  "system_interprets_query",
  "candidate_photos_retrieved",
  "user_evaluates_candidates",
  "user_refines_or_browses",
  "target_found_or_abandoned",
] as const;

export const FAILURE_FUNNEL_LABELS: Record<string, string> = {
  user_remembers_photo: "User remembers photo exists",
  attempts_to_express_memory: "Attempts to express memory",
  creates_search_query: "Creates search query",
  system_interprets_query: "System interprets query",
  candidate_photos_retrieved: "Candidate photos retrieved",
  user_evaluates_candidates: "User evaluates candidates",
  user_refines_or_browses: "User refines or browses",
  target_found_or_abandoned: "Target found / abandoned",
};

/**
 * Schema for a single extracted memory cue.
 */
export const MemoryCueExtractionSchema = z.object({
  cueType: z.string().describe("One of the remembered clue types from taxonomy §6.1"),
  cueValue: z.string().describe("The specific clue the user remembered"),
  confidence: z.number().min(0).max(1),
});

/**
 * Schema for a batch of memory cue extractions from a single evidence item.
 */
export const MemoryCueBatchSchema = z.object({
  rememberedCues: z.array(MemoryCueExtractionSchema),
  forgottenInfo: z.array(
    z.object({
      infoType: z.string().describe("One of the forgotten info types from taxonomy §6.2"),
      description: z.string(),
      confidence: z.number().min(0).max(1),
    })
  ),
});

/**
 * Schema for failure mode extraction.
 */
export const FailureModeExtractionSchema = z.object({
  failureStage: z.string().describe("One of the failure points from taxonomy §6.3"),
  funnelStage: z.string().describe("Which funnel stage (§8.4) this failure maps to"),
  description: z.string(),
  confidence: z.number().min(0).max(1),
});

export const FailureModeBatchSchema = z.object({
  failures: z.array(FailureModeExtractionSchema),
});

/**
 * Schema for opportunity generation.
 */
export const OpportunityExtractionSchema = z.object({
  title: z.string(),
  description: z.string(),
  evidenceSummary: z.string(),
  confidenceScore: z.number().min(0).max(1),
});

export const OpportunityBatchSchema = z.object({
  opportunities: z.array(OpportunityExtractionSchema),
});

/**
 * Schema for theme detection.
 */
export const ThemeExtractionSchema = z.object({
  themes: z.array(
    z.object({
      label: z.string(),
      description: z.string(),
      evidenceIds: z.array(z.string()),
      confidence: z.number().min(0).max(1),
    })
  ),
});

export type MemoryCueExtraction = z.infer<typeof MemoryCueExtractionSchema>;
export type FailureModeExtraction = z.infer<typeof FailureModeExtractionSchema>;
export type OpportunityExtraction = z.infer<typeof OpportunityExtractionSchema>;
