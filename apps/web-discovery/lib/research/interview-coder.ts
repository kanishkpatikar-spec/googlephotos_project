import { AIProviderFactory, InterviewAnalysisSchema, type InterviewAnalysis } from "@google-photos/core";

/**
 * Extracts structured themes, cues, and failures from an interview transcript.
 */
export async function analyzeTranscript(transcript: string): Promise<InterviewAnalysis> {
  const ai = AIProviderFactory.getDefault();

  const prompt = `You are a qualitative researcher analyzing a user interview transcript about photo/media retrieval failures.
Extract structured information from this transcript based on the user's statements.

Transcript:
"""
${transcript}
"""

Extract the following arrays of strings as JSON:
{
  "rememberedCues": ["cues the user explicitly remembered, e.g. location, time"],
  "forgottenInfo": ["information they forgot"],
  "failureStages": ["where the search broke down (querying, scrolling, etc.)"],
  "workaroundsUsed": ["alternative methods they used to find the photo"],
  "emotionalContext": ["frustration, relief, etc."],
  "keyMoments": ["critical insights or quotes summarizing the struggle"]
}`;

  return ai.generateStructured(prompt, InterviewAnalysisSchema, {
    temperature: 0.2,
  });
}
