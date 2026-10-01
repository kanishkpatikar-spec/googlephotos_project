/**
 * Stage 2: Near-duplicate detection using SimHash.
 * Uses a simple rolling hash to detect near-duplicates in a batch.
 */

function simhash(text: string): bigint {
  const tokens = text.toLowerCase().split(/\s+/);
  const bits = 64;
  const counts = new Array(bits).fill(0);

  for (const token of tokens) {
    let hash = BigInt(0);
    for (let i = 0; i < token.length; i++) {
      hash = (hash * BigInt(31) + BigInt(token.charCodeAt(i))) & BigInt("0xFFFFFFFFFFFFFFFF");
    }

    for (let i = 0; i < bits; i++) {
      if ((hash >> BigInt(i)) & BigInt(1)) {
        counts[i]++;
      } else {
        counts[i]--;
      }
    }
  }

  let fingerprint = BigInt(0);
  for (let i = 0; i < bits; i++) {
    if (counts[i] > 0) {
      fingerprint |= BigInt(1) << BigInt(i);
    }
  }

  return fingerprint;
}

function hammingDistance(a: bigint, b: bigint): number {
  let xor = a ^ b;
  let distance = 0;
  while (xor > BigInt(0)) {
    distance += Number(xor & BigInt(1));
    xor >>= BigInt(1);
  }
  return distance;
}

export interface DeduplicateResult {
  /** Indices of unique items to keep */
  uniqueIndices: number[];
  /** Pairs of duplicate indices: [kept, removed] */
  duplicatePairs: [number, number][];
}

/**
 * Deduplicate a batch of texts using SimHash.
 * @param texts - Array of normalized text strings
 * @param threshold - Max Hamming distance to consider as duplicate (default: 3)
 */
export function deduplicateTexts(
  texts: string[],
  threshold: number = 3
): DeduplicateResult {
  const hashes = texts.map((t) => simhash(t));
  const removed = new Set<number>();
  const duplicatePairs: [number, number][] = [];

  for (let i = 0; i < hashes.length; i++) {
    if (removed.has(i)) continue;
    for (let j = i + 1; j < hashes.length; j++) {
      if (removed.has(j)) continue;
      if (hammingDistance(hashes[i], hashes[j]) <= threshold) {
        removed.add(j);
        duplicatePairs.push([i, j]);
      }
    }
  }

  const uniqueIndices = texts
    .map((_, i) => i)
    .filter((i) => !removed.has(i));

  return { uniqueIndices, duplicatePairs };
}
