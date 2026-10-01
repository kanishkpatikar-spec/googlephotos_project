import { db } from "@google-photos/db";
import { photoAssets, photoMetadata, photoEmbeddings } from "@google-photos/db";
import { AIProviderFactory } from "../ai/factory";
import { ExtractedClues } from "./clue-extractor";

function cosineSimilarity(vecA: number[], vecB: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function generateCandidates(query: string, clues: ExtractedClues) {
  const ai = AIProviderFactory.getDefault();
  
  // 1. Semantic Search (Vector)
  let vectorResults: Array<{ id: string, score: number }> = [];
  try {
    const queryEmbedding = await ai.generateEmbedding(query);
    
    // Fetch all embeddings from DB
    const allEmbeddings = await db.select().from(photoEmbeddings);
    
    vectorResults = allEmbeddings.map(emb => {
      if (!emb.embeddingVector) return { id: emb.assetId, score: 0 };
      const vec = JSON.parse(emb.embeddingVector) as number[];
      const score = cosineSimilarity(queryEmbedding, vec);
      return { id: emb.assetId, score };
    }).sort((a, b) => b.score - a.score).slice(0, 30); // Top 30 vector candidates
  } catch (e) {
    console.error("Vector search failed:", e);
  }

  // 2. Keyword/OCR Search
  let keywordResults: Array<{ id: string, score: number }> = [];
  try {
    const allMetadata = await db.select().from(photoMetadata);
    const keywords = [
      ...clues.objects, 
      clues.scene_type || "", 
      clues.text_in_image || ""
    ].filter(Boolean).map(k => k.toLowerCase());

    keywordResults = allMetadata.map(meta => {
      let score = 0;
      const textToSearch = [meta.semanticCaption, meta.ocrText, meta.detectedObjects].join(" ").toLowerCase();
      
      keywords.forEach(kw => {
        if (textToSearch.includes(kw)) score += 1;
      });

      return { id: meta.assetId, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);
  } catch (e) {
    console.error("Keyword search failed:", e);
  }

  return {
    vectorResults,
    keywordResults
  };
}
