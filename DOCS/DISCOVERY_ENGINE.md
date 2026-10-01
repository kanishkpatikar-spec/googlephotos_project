# AI Discovery Engine

The Discovery Engine is an automated pipeline that ingests raw user complaints about photo retrieval and extracts structured data.

## Pipeline Architecture
1. **Normalizer:** Cleans text and strips HTML.
2. **Deduplicator:** Uses SimHash to remove near-duplicate reports.
3. **Classifier (Groq Llama-3):** Determines if the text is relevant to "retrieval failures."
4. **Extractor (Groq Llama-3):** Pulls structured `EvidenceItem`s (what was remembered, what was forgotten).
5. **Theme Detector:** Groups items by semantic similarity using Gemini Embeddings and ChromaDB.
6. **Failure & Memory Analyzer:** Maps the text to strict taxonomies (e.g., "Contextual Cue", "Temporal Cue").
7. **Opportunity Generator:** Proposes areas for product intervention.