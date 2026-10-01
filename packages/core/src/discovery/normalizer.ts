/**
 * Stage 1: Text normalization.
 * Clean raw text: strip HTML, normalize whitespace, trim.
 */
export function normalizeText(raw: string): string {
  let text = raw;

  // Strip HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // Decode HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Normalize whitespace (collapse multiple spaces/newlines)
  text = text.replace(/\s+/g, " ");

  // Trim
  text = text.trim();

  return text;
}

/**
 * Extract metadata hints from text (e.g., mentions of platforms, dates).
 */
export function extractMetadataHints(text: string): {
  mentionedPlatforms: string[];
  mentionedDates: string[];
} {
  const platforms: string[] = [];
  const platformKeywords = [
    "google photos", "icloud", "amazon photos", "dropbox",
    "instagram", "facebook", "whatsapp", "telegram",
  ];
  const lowerText = text.toLowerCase();
  for (const p of platformKeywords) {
    if (lowerText.includes(p)) platforms.push(p);
  }

  // Simple date pattern matching
  const datePatterns = text.match(
    /\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2},?\s+\d{4}\b/gi
  );

  return {
    mentionedPlatforms: platforms,
    mentionedDates: datePatterns || [],
  };
}
