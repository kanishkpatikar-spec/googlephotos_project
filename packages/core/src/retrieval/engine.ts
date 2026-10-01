import { extractClues } from "./clue-extractor";
import { generateCandidates } from "./candidate-generator";
import { fuseResults } from "./fusion";
import { db } from "@google-photos/db";
import { photoAssets, photoMetadata } from "@google-photos/db";
import { eq, inArray } from "drizzle-orm";

export async function executeSearch(query: string) {
  // 1. Understand Query
  const clues = await extractClues(query);

  // 2. Multi-signal Candidate Generation
  const candidates = await generateCandidates(query, clues);

  // 3. Fusion
  const fusedCandidates = fuseResults(candidates.vectorResults, candidates.keywordResults);

  if (fusedCandidates.length === 0) {
    return { results: [], clues };
  }

  // 4. Fetch full details for top results
  const topIds = fusedCandidates.slice(0, 15).map(c => c.id);
  
  const photos = await db.select().from(photoAssets).where(inArray(photoAssets.id, topIds));
  const metadatas = await db.select().from(photoMetadata).where(inArray(photoMetadata.assetId, topIds));

  // Combine and sort by fusion score
  const results = photos.map(photo => {
    const meta = metadatas.find(m => m.assetId === photo.id);
    const scoreInfo = fusedCandidates.find(c => c.id === photo.id);
    return {
      photo,
      metadata: meta,
      score: scoreInfo?.score || 0,
      matchReason: `Matched based on semantic similarity and keyword presence.`
    };
  }).sort((a, b) => b.score - a.score);

  return { results, clues };
}
