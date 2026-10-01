export function fuseResults(
  vectorResults: Array<{ id: string, score: number }>,
  keywordResults: Array<{ id: string, score: number }>,
  k = 60
) {
  const rrfScores: Record<string, number> = {};

  // Score vector results
  vectorResults.forEach((res, rank) => {
    rrfScores[res.id] = (rrfScores[res.id] || 0) + (1 / (k + rank + 1));
  });

  // Score keyword results
  keywordResults.forEach((res, rank) => {
    rrfScores[res.id] = (rrfScores[res.id] || 0) + (1 / (k + rank + 1));
  });

  // Convert to array and sort
  const fused = Object.entries(rrfScores).map(([id, score]) => ({
    id,
    score
  }));

  fused.sort((a, b) => b.score - a.score);

  return fused.slice(0, 50); // Return top 50 fused
}
