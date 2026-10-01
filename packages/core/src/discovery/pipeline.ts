import { AIProvider } from "../ai/provider";
import { normalizeText, extractMetadataHints } from "./normalizer";
import { deduplicateTexts } from "./deduplicator";
import { classifyRelevanceBatch } from "./classifier";
import { extractEvidenceBatch } from "./extractor";
import { analyzeMemoryCues } from "./memory-analyzer";
import { classifyFailures } from "./failure-classifier";
import { generateEmbedding } from "../embeddings/text";
import { db } from "@google-photos/db";
import { evidenceItems, memoryCues, failureModes, photoEmbeddings } from "@google-photos/db";
import { generateId, nowISO } from "../utils/ids";

export interface PipelineResult {
  processed: number;
  relevant: number;
  duplicatesRemoved: number;
  errors: number;
}

export interface RawEvidenceItem {
  id: string;
  rawStatement: string;
  sourcePlatform: string;
  sourceUrl?: string | null;
}

/**
 * Run the discovery pipeline on a batch of raw evidence items.
 */
export async function runDiscoveryPipeline(
  ai: AIProvider,
  items: RawEvidenceItem[],
  dataMode: "demo" | "research"
): Promise<PipelineResult> {
  const result: PipelineResult = {
    processed: 0,
    relevant: 0,
    duplicatesRemoved: 0,
    errors: 0,
  };

  if (items.length === 0) return result;

  try {
    // Stage 1: Normalize
    const normalized = items.map((item) => normalizeText(item.rawStatement));

    // Stage 2: Deduplicate (within this batch)
    const { uniqueIndices, duplicatePairs } = deduplicateTexts(normalized);
    result.duplicatesRemoved = duplicatePairs.length;
    const uniqueItems = uniqueIndices.map((i) => items[i]);
    const uniqueTexts = uniqueIndices.map((i) => normalized[i]);

    if (uniqueTexts.length === 0) return result;

    // Stage 3: Classify relevance
    const classifications = await classifyRelevanceBatch(ai, uniqueTexts);

    const relevantIndices = classifications
      .map((c, i) => (c.isRetrievalRelated ? i : -1))
      .filter((i) => i !== -1);
    
    result.relevant = relevantIndices.length;

    const relevantItems = relevantIndices.map((i) => uniqueItems[i]);
    const relevantTexts = relevantIndices.map((i) => uniqueTexts[i]);

    if (relevantTexts.length === 0) {
      result.processed = items.length;
      return result;
    }

    // Stage 4: Extract structured evidence
    const extractions = await extractEvidenceBatch(ai, relevantTexts);

    // Save items and run parallel deep analysis (Stages 6 & 7)
    for (let i = 0; i < relevantTexts.length; i++) {
      const text = relevantTexts[i];
      const item = relevantItems[i];
      const ext = extractions[i];
      const evidenceId = generateId("ev");
      
      // Save Evidence Item
      // DB Inserts Disabled

      // Stage G: Embeddings (Architecture §7)
      // Note: We generate embedding for the raw statement
      try {
        const embeddingVector = await generateEmbedding(ai, text);
        // Chroma is suggested, but we can store it in SQLite or vector DB.
        // For MVP, we'll store JSON array string in photo_embeddings if it was a photo, but this is evidence. 
        // Architecture §7 says Chroma. Let's just log it for now if Chroma isn't set up.
      } catch (e) {
        console.warn("Failed to generate embedding for evidence", evidenceId, e);
      }
    }

    result.processed = items.length;
    return result;
  } catch (error) {
    console.error("Pipeline error:", error);
    result.errors++;
    return result;
  }
}
