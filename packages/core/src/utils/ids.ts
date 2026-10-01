import { nanoid } from "nanoid";

/**
 * Generate a unique ID with an optional prefix.
 * Uses nanoid with 21 characters (default).
 *
 * @param prefix - Optional prefix (e.g., "ev", "mc", "fm")
 * @returns A unique identifier string
 */
export function generateId(prefix?: string): string {
  const id = nanoid();
  return prefix ? `${prefix}_${id}` : id;
}

/**
 * Generate a short ID (12 characters) for human-readable contexts.
 */
export function generateShortId(prefix?: string): string {
  const id = nanoid(12);
  return prefix ? `${prefix}_${id}` : id;
}
