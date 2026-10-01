import fs from "fs";

export async function extractMetadata(filepath: string) {
  // In a real app, we'd use 'sharp' here.
  // For the MVP with SVGs, we mock this.
  try {
    const stat = fs.statSync(filepath);
    return {
      fileSize: stat.size,
      width: 800,
      height: 600,
      format: filepath.split(".").pop() || "unknown"
    };
  } catch (error) {
    console.error("Failed to extract metadata:", error);
    return { fileSize: 0, width: 0, height: 0, format: "unknown" };
  }
}
