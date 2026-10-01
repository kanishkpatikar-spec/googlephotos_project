# Edge Cases — Google Photos Vague-Memory Retrieval

> Comprehensive catalog of corner scenarios, boundary conditions, and defensive handling across every subsystem. Each edge case includes the scenario, expected behavior, and implementation guidance.
>
> **Reference**: [problemstatement.md](file:///d:/DRIVE%20F/GRAD_GOOGLEPICS/DOCS/problemstatement.md) · [architecture.md](file:///d:/DRIVE%20F/GRAD_GOOGLEPICS/DOCS/architecture.md) · [implementation-plan.md](file:///d:/DRIVE%20F/GRAD_GOOGLEPICS/DOCS/implementation-plan.md)

---

## Table of Contents

- [1. Evidence Ingestion](#1-evidence-ingestion)
- [2. Discovery Pipeline](#2-discovery-pipeline)
- [3. AI Provider Layer](#3-ai-provider-layer)
- [4. Research & Interviews](#4-research--interviews)
- [5. Photo Library & Indexing](#5-photo-library--indexing)
- [6. Retrieval Engine](#6-retrieval-engine)
- [7. Uncertainty & Confidence Handling](#7-uncertainty--confidence-handling)
- [8. Testing Framework](#8-testing-framework)
- [9. Results & Metrics](#9-results--metrics)
- [10. Data Modes & Labeling](#10-data-modes--labeling)
- [11. Database & Storage](#11-database--storage)
- [12. UI / UX](#12-ui--ux)
- [13. Security & Privacy](#13-security--privacy)
- [14. Configuration & Environment](#14-configuration--environment)

---

## 1. Evidence Ingestion

### 1.1 Text Input

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E1.1.1 | **Empty text submission** | Reject with validation error: "Evidence text is required." Do not create a record. | High |
| E1.1.2 | **Whitespace-only text** | Trim, detect empty after trim, reject as above. | High |
| E1.1.3 | **Extremely long text** (>50,000 chars) | Truncate to max field length with warning: "Text was truncated to 50,000 characters. Consider splitting into multiple entries." Store full text if DB allows, truncate only for LLM processing. | Medium |
| E1.1.4 | **Text with HTML/script tags** | Strip all HTML tags during normalization. Never render raw HTML. Sanitize with allowlist. | Critical |
| E1.1.5 | **Text in non-English language** | Accept and store. AI extraction may have reduced accuracy — set `ai_confidence` lower. Flag for human review. | Medium |
| E1.1.6 | **Text with emojis/special Unicode** | Preserve in raw storage. Strip emojis before embedding generation if model doesn't support them. | Low |
| E1.1.7 | **Duplicate exact text** submitted again | Deduplicator catches exact duplicates. Show warning: "This evidence appears to be a duplicate of [ID]." Allow force-add with confirmation. | Medium |
| E1.1.8 | **Near-duplicate text** (minor wording changes) | SimHash deduplicator flags similarity > 0.9. Show warning: "Similar evidence already exists: [ID]. Add anyway?" | Medium |
| E1.1.9 | **Text contains personal information** (names, phone numbers, emails) | Display privacy notice before ingestion. Do not auto-scrub — researcher decides. Flag if PII patterns detected. | High |
| E1.1.10 | **Text is not about photo retrieval at all** | Pipeline stage 3 (relevance classification) marks `is_retrieval_related = false`. Store but archive — visible via filter but excluded from analysis by default. | Low |

### 1.2 CSV Upload

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E1.2.1 | **CSV with missing headers** | Reject with error: "Required columns missing: [list]. Expected: source_platform, raw_statement." Show expected format. | High |
| E1.2.2 | **CSV with extra unknown columns** | Ignore unknown columns silently. Process known columns. Log warning. | Low |
| E1.2.3 | **CSV with mixed encodings** (UTF-8 BOM, Latin-1) | Attempt UTF-8 first, fallback to Latin-1, then Windows-1252. If all fail, reject with encoding error. | Medium |
| E1.2.4 | **CSV with 0 data rows** (only headers) | Reject: "CSV contains headers but no data rows." | Medium |
| E1.2.5 | **CSV with 10,000+ rows** | Accept but process in batches of 100 (per `MAX_BATCH_SIZE`). Show progress bar. Warn that AI processing may take significant time. | Medium |
| E1.2.6 | **CSV row with empty `raw_statement`** | Skip row with warning: "Row [N] skipped — missing required field 'raw_statement'." Continue processing remaining rows. | Medium |
| E1.2.7 | **CSV with malformed dates** | Store raw date string. Attempt parsing with multiple formats (ISO, US, EU). If unparseable, set date to `null` and flag for manual correction. | Low |
| E1.2.8 | **CSV file exceeds upload size limit** | Reject before processing: "File exceeds maximum upload size of [MAX_UPLOAD_SIZE_MB]MB." | High |
| E1.2.9 | **Non-CSV file with .csv extension** | Validate file content. If parsing fails completely, reject: "File does not appear to be valid CSV." | Medium |
| E1.2.10 | **CSV with fields containing newlines/commas** | Use proper CSV parser (`papaparse`) that handles quoted fields. Never split on commas naively. | High |

### 1.3 JSON Upload

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E1.3.1 | **Invalid JSON syntax** | Reject with error showing line/position of syntax error. | High |
| E1.3.2 | **JSON is array vs object** | Accept both: if array, treat each element as evidence item. If object, look for `items` or `evidence` key. If neither, reject with format guidance. | Medium |
| E1.3.3 | **JSON items missing required fields** | Validate each item against schema. Skip invalid items, report: "3 of 50 items skipped due to missing fields: [list]." | Medium |
| E1.3.4 | **JSON with nested objects where strings expected** | Flatten or stringify nested values. Log warning per field. | Low |
| E1.3.5 | **Extremely large JSON file** (>100MB) | Reject before parsing: "File too large for JSON upload. Consider splitting or using CSV." Stream parsing if feasible. | Medium |

### 1.4 URL + Content Input

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E1.4.1 | **URL provided but content field empty** | Reject: "Please paste the content from the URL. We do not automatically scrape URLs for reliability and legal reasons." | High |
| E1.4.2 | **Invalid URL format** | Accept with warning: "URL format appears invalid. Stored as-is for reference." Do not block ingestion. | Low |
| E1.4.3 | **Content doesn't match URL** (user pastes wrong content) | Cannot detect automatically. Store as-is. Human review will catch mismatches. | Low |
| E1.4.4 | **URL points to a private/login-gated page** | Not our concern — we store the URL for reference only. Content is user-pasted. | Low |

---

## 2. Discovery Pipeline

### 2.1 Normalization

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E2.1.1 | **Text is entirely HTML markup** (no readable text) | After stripping HTML, if result is empty/whitespace, mark as `unprocessable`. Skip further pipeline stages. | Medium |
| E2.1.2 | **Text contains code snippets** (false positive from tech forums) | Preserve code blocks in raw text. Normalizer should not strip code syntax. Relevance classifier will likely mark `is_retrieval_related = false`. | Low |
| E2.1.3 | **Mixed languages in single evidence** | Keep as-is. LLM handles multilingual. May reduce extraction confidence. | Low |

### 2.2 Deduplication

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E2.2.1 | **Same user complaint posted on multiple platforms** | SimHash detects near-duplicate. Link as related but keep both (different `source_platform`). Merge in analysis but retain provenance. | Medium |
| E2.2.2 | **Similar complaints from different users** | Not duplicates — different users reporting the same problem is a signal of prevalence. Keep both. SimHash threshold must distinguish "same post" from "similar complaint." Threshold: 0.95 for duplicate, 0.80–0.94 for "similar." | High |
| E2.2.3 | **Dedup across batches** | Dedup must check against existing database, not just within current batch. Use persistent hash index. | Medium |

### 2.3 Relevance Classification

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E2.3.1 | **Ambiguously relevant evidence** (mentions photos but not retrieval) | LLM classifies. If confidence < 0.5, mark as `uncertain_relevance` and include in manual review queue. Do not auto-discard. | Medium |
| E2.3.2 | **Evidence about Google Photos features unrelated to search** (storage, sharing, editing) | Mark `is_retrieval_related = false`. Archive but keep accessible. These may contain secondary insights. | Low |
| E2.3.3 | **Evidence about competing products** (Apple Photos, Samsung Gallery) | Mark as relevant if about vague-memory retrieval behavior — the behavior is transferable even if the product differs. Tag `source_platform` correctly. | Medium |
| E2.3.4 | **Evidence in sarcastic/ironic tone** | LLM may misinterpret sarcasm. Lower confidence score. Flag for human review. | Low |

### 2.4 Structured Extraction

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E2.4.1 | **LLM returns malformed JSON** | Retry once with stricter prompt. If still fails, store raw text with `ai_confidence = 0` and flag for manual extraction. Never crash the pipeline. | High |
| E2.4.2 | **LLM hallucinates fields** (invents information not in source text) | Validate extraction against source text where possible. If extracted query mentions specifics not in raw text, flag with `ai_confidence` penalty. Always show raw text alongside extraction. | High |
| E2.4.3 | **Evidence describes multiple retrieval incidents** | Extract all incidents as separate structured records linked to the same `evidence_id`. Each incident gets its own `MemoryCue` and `FailureMode` records. | Medium |
| E2.4.4 | **Extraction returns "unknown" for most fields** | Accept — sparse extraction is valid. Some evidence is too brief or vague for complete extraction. Don't force-fill fields. | Low |
| E2.4.5 | **Asset type not in predefined enum** | Use `"other"` with a free-text description field. Log for potential taxonomy expansion. | Low |
| E2.4.6 | **Evidence is a feature request, not a retrieval story** | Classify as low-relevance. May still contain implicit retrieval behavior. Extract what's available but mark as `indirect_evidence`. | Low |

### 2.5 Clustering & Themes

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E2.5.1 | **Fewer than 5 evidence items** (too few to cluster) | Skip clustering. Show individual items without cluster grouping. Display message: "Insufficient evidence for pattern detection. Add more evidence." | Medium |
| E2.5.2 | **All evidence falls into one cluster** | Reduce k. If k=1 is the best fit, show single theme. Suggest ingesting more diverse sources. | Low |
| E2.5.3 | **Cluster contains conflicting evidence** | Allow — clusters are semantic similarity, not agreement. Theme detection should note internal contradictions. Show confidence as lower. | Medium |
| E2.5.4 | **New evidence added after initial clustering** | Re-cluster incrementally or on demand. Provide "Re-analyze" button. Don't auto-invalidate previous themes — show as "may need refresh." | Medium |

### 2.6 Opportunity Generation

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E2.6.1 | **AI generates overlapping opportunities** | Researcher can merge opportunities manually. Show similarity score between opportunities. | Low |
| E2.6.2 | **AI generates opportunities that don't map to any evidence** | Reject hallucinated opportunities. Every opportunity must link to ≥1 evidence item. Show warning if AI suggests unsupported opportunity. | High |
| E2.6.3 | **Zero opportunities generated** | Display: "No clear opportunity areas identified from current evidence. Consider adding more evidence or reviewing evidence classification." | Medium |

---

## 3. AI Provider Layer

### 3.1 API Failures

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E3.1.1 | **API key missing or invalid** | At startup: log warning, disable AI features, enable manual-only mode. Show banner: "AI features disabled — configure API key in .env." | Critical |
| E3.1.2 | **API rate limit hit** (429 error) | Exponential backoff: wait 1s, 2s, 4s, 8s, max 30s. After 5 retries, queue remaining items for later. Show progress: "Rate limited. Retrying in [N]s…" | High |
| E3.1.3 | **API timeout** (>30s response) | Timeout at 30s. Retry once. If still times out, mark item as `processing_failed` and continue batch. | High |
| E3.1.4 | **API returns 500 internal server error** | Retry up to 3 times with backoff. If persistent, log error and skip item. Never crash the pipeline. | High |
| E3.1.5 | **API returns empty/null response** | Treat as extraction failure for that item. Set `ai_confidence = 0`. Flag for manual processing. | Medium |
| E3.1.6 | **Provider API deprecates model** | Config uses model name from env var. Changing model only requires env update. Log model version in each extraction for reproducibility. | Medium |
| E3.1.7 | **Mid-batch provider switch** (change AI_PROVIDER while pipeline running) | Use provider resolved at pipeline start. Don't hot-swap mid-batch. New provider applies to next batch. | Low |
| E3.1.8 | **Structured output violates Zod schema** | Catch Zod validation error. Retry once with stricter prompt. If still invalid, store raw LLM response in `processing_notes` and flag for manual review. | High |

### 3.2 Embedding Failures

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E3.2.1 | **Embedding API returns wrong dimension** | Validate dimension matches expected (e.g., 768 or 1536). If mismatch, reject and log error — likely model mismatch. | Critical |
| E3.2.2 | **Empty text for embedding** | Skip embedding generation. Log warning. Don't store zero vector. | Medium |
| E3.2.3 | **Text exceeds embedding model token limit** | Truncate text to model's max tokens. Log truncation. For long evidence, embed first N tokens and store truncation flag. | Medium |
| E3.2.4 | **Chroma connection failure** | Retry connection 3 times. If Chroma unavailable, skip embedding storage, continue pipeline. Show warning: "Vector search unavailable. Evidence stored but not searchable by similarity." | High |
| E3.2.5 | **CLIP model fails to load** (OOM, missing model files) | Fall back to text-only embeddings. Disable image similarity search. Show warning: "Image embeddings unavailable. Text-based retrieval only." | High |

---

## 4. Research & Interviews

### 4.1 Participant Management

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E4.1.1 | **Delete participant with linked interviews** | Soft delete: mark as inactive but retain data. Prevent deletion with warning: "This participant has [N] interviews. Archive instead?" | High |
| E4.1.2 | **Duplicate participant alias** | Warn but allow — aliases are not unique identifiers. Internal ID is the primary key. | Low |
| E4.1.3 | **Participant with no segment assigned** | Allow creation. Show "Unassigned" badge. Prompt researcher to assign segment. | Low |

### 4.2 Interview Data Entry

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E4.2.1 | **Transcript paste with 100,000+ characters** | Accept. Store full text. For AI analysis, process in chunks (e.g., 8,000 token windows with overlap). | Medium |
| E4.2.2 | **Quote selected with no text highlighted** | Disable "Add Quote" button when no text is selected. Show tooltip: "Select text in the transcript to tag a quote." | Low |
| E4.2.3 | **Quote overlaps with existing quote** | Allow overlapping quotes — same text can be tagged with multiple themes. Show visual overlap indicator. | Low |
| E4.2.4 | **Interview saved without transcript** | Allow — researcher may add transcript later. Show "Incomplete" status badge. All fields except participant ID and date are optional for saving drafts. | Medium |
| E4.2.5 | **AI-assisted coding on empty transcript** | Disable "Analyze" button. Show: "Enter transcript text before running AI analysis." | Low |
| E4.2.6 | **AI-assisted coding generates wrong labels** | AI suggestions always labeled `AI_INTERPRETATION`. Researcher can accept (converts to `RESEARCHER_OBSERVATION`) or reject (deleted). Never auto-confirmed. | High |
| E4.2.7 | **Interview for a demo-mode participant submitted in research mode** | Warn: "This participant was created in demo mode. Interview data will be tagged as demo." Or allow upgrade to research mode with confirmation. | Medium |

### 4.3 Cross-Interview Synthesis

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E4.3.1 | **Only 1 interview exists** | Show individual interview data. Disable "Cross-Interview Patterns" section with message: "At least 2 interviews required for pattern analysis." | Medium |
| E4.3.2 | **Interviews have no coded themes** | Show: "No coded themes found. Run AI-assisted coding or manually tag quotes and observations first." | Medium |
| E4.3.3 | **All participants show same pattern** | Display as strong signal. Note: "Pattern observed in all [N] participants — strong qualitative signal." Still do not claim statistical generalizability per §16. | Low |
| E4.3.4 | **Contradictory findings between participants** | Highlight contradictions explicitly. Show both sides. Mark as "Divergent finding — requires further investigation." Do not suppress contradictions per §46. | High |

---

## 5. Photo Library & Indexing

### 5.1 Photo Upload

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E5.1.1 | **Non-image file uploaded** (PDF, .exe, .txt) | Reject with error: "Unsupported file type: [ext]. Accepted: JPEG, PNG, WEBP, GIF, BMP, TIFF." | High |
| E5.1.2 | **Corrupted image file** (valid extension but broken data) | Detect during `sharp` processing. Skip file, log error: "File [name] could not be processed — file may be corrupted." Continue batch. | Medium |
| E5.1.3 | **Very large image** (>20MP, >20MB) | Resize to max 2048px longest edge for processing/display. Store original if storage allows. Warn if file exceeds `MAX_UPLOAD_SIZE_MB`. | Medium |
| E5.1.4 | **Zero-byte file** | Reject immediately: "File [name] is empty (0 bytes)." | High |
| E5.1.5 | **Image with no EXIF data** | Accept. Set all EXIF fields to `null`. Many screenshots and downloaded images have no EXIF. This is normal. | Low |
| E5.1.6 | **EXIF date in future** | Accept but flag: "Date appears to be in the future — may be incorrect." Store as-is. | Low |
| E5.1.7 | **EXIF GPS coordinates at (0,0)** (null island) | Treat as missing location. Some cameras write 0,0 as default. Set location to `null`. | Medium |
| E5.1.8 | **Duplicate photo upload** (same file hash) | Detect via file hash. Warn: "This photo appears identical to [existing ID]." Allow re-upload with confirmation (may have different metadata). | Medium |
| E5.1.9 | **Batch upload of 1,000+ photos** | Accept. Process in batches of 50. Show progress: "Uploading: 250/1000. Indexing: 150/1000." Allow cancellation mid-batch. | Medium |
| E5.1.10 | **Image with sensitive content** | Not automatically filtered in MVP. Privacy notice on upload screen. Researcher is responsible for content. | Low |
| E5.1.11 | **HEIC/HEIF format** (iPhone default) | Convert to JPEG using `sharp` before processing. If conversion fails, reject with format guidance. | Medium |
| E5.1.12 | **Animated GIF / multi-frame image** | Use first frame only for indexing and embedding. Store original file. Note: "Animated image — indexed on first frame only." | Low |

### 5.2 Image Indexing

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E5.2.1 | **OCR on photo with no text** | Tesseract returns empty string. Store `ocr_text = ""`. This is normal for most photos. | Low |
| E5.2.2 | **OCR on handwritten text** | Tesseract may produce garbled output. Store whatever is extracted. Low confidence. Multimodal LLM caption may do better. | Low |
| E5.2.3 | **OCR on screenshot with dense text** | May produce very long OCR output (>10,000 chars). Truncate for embedding but store full text in metadata. | Low |
| E5.2.4 | **Captioning API timeout** | Retry once. If fails, store `semantic_caption = null`. Photo is still searchable via CLIP embedding, OCR, and metadata. | Medium |
| E5.2.5 | **Caption contains hallucinated details** | Cannot fully prevent. Caption is one of multiple signals — retrieval uses fusion, so hallucinated captions don't dominate if other signals disagree. | Medium |
| E5.2.6 | **CLIP embedding for black/white/solid-color image** | CLIP will still produce an embedding, but it may be low-quality. These images cluster together. Not a problem for retrieval if other signals compensate. | Low |
| E5.2.7 | **Re-indexing an already-indexed photo** | Overwrite existing metadata and embeddings. Update timestamps. Idempotent operation. | Low |
| E5.2.8 | **Indexing interrupted mid-batch** (crash, restart) | Track indexing status per photo: `pending`, `indexing`, `indexed`, `failed`. Resume from `pending`/`failed` items on restart. | High |
| E5.2.9 | **Photo deleted while indexing** | Check file existence before each indexing step. If file missing, mark as `deleted` and skip. Remove from vector store. | Medium |
| E5.2.10 | **Transformers.js CLIP model first-time download** | First run downloads ~400MB model. Show progress: "Downloading CLIP model (first time only)…" Cache in `node_modules/.cache`. | Medium |

---

## 6. Retrieval Engine

### 6.1 Query Input

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E6.1.1 | **Empty query** | Reject: "Please describe what you remember about the photo." | High |
| E6.1.2 | **Single-word query** (e.g., "dog") | Accept. Clue extractor produces single clue `{type: "object", value: "dog", confidence: 1.0}`. Retrieve using that clue alone. Results may be broad — this is expected. | Low |
| E6.1.3 | **Extremely long query** (>2,000 chars) | Accept. Truncate for LLM processing at token limit. Use full text for embedding. Log truncation. | Low |
| E6.1.4 | **Query in non-English** | Accept. LLM handles multilingual. CLIP embeddings are language-specific — may reduce quality for non-English. Caption search relies on English captions. Warn: "Best results with English queries." | Medium |
| E6.1.5 | **Query contains no retrievable clues** (e.g., "I don't remember anything") | Clue extractor returns empty clue list. Return: "I couldn't identify specific clues from your description. Try mentioning people, places, times, objects, or events you might remember." | Medium |
| E6.1.6 | **Query is a question** (e.g., "Where is my passport photo?") | Clue extractor should handle interrogative form. Extract clues: `{type: "document", value: "passport photo"}`. | Low |
| E6.1.7 | **Query mentions dates explicitly** (e.g., "January 15, 2023") | Extract as high-confidence temporal clue. Apply as hard filter. | Low |
| E6.1.8 | **Query mentions dates vaguely** (e.g., "last summer", "a few months ago") | Extract as low-confidence temporal clue. Resolve relative dates against current date. Apply as soft filter with wide range. | Medium |
| E6.1.9 | **Query mentions a person not in any photo** | No candidates match on person. Other signals (objects, places, time) still produce candidates. Person clue simply doesn't contribute. | Low |
| E6.1.10 | **Adversarial/nonsense query** (e.g., "asdfghjkl") | Clue extractor returns empty/low-confidence clues. Return: "I couldn't understand your description. Try describing what you remember in natural language." | Low |

### 6.2 Candidate Generation

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E6.2.1 | **No candidates from any signal** | Return empty results with message: "No matching photos found. Try describing different details you remember, or browse the library." | Medium |
| E6.2.2 | **Only one signal returns candidates** (e.g., only CLIP matches) | Proceed with single-signal candidates. RRF fusion works with any number of signals. Note lower confidence in results. | Low |
| E6.2.3 | **Thousands of candidates** (broad query on large library) | Cap candidate generation at 200 per signal. After fusion, return top 50. Pagination for remaining. | Medium |
| E6.2.4 | **Temporal filter eliminates all candidates** (wrong year) | If hard filter returns 0, automatically fall back to soft filter. Show message: "No exact matches for [time]. Showing approximate results." | Medium |
| E6.2.5 | **Location filter with misspelled place name** | LLM clue extraction normalizes place names. If no match, try fuzzy match against `location_name` field. If still no match, skip location signal. | Medium |
| E6.2.6 | **OCR search query doesn't match OCR output** (different wording) | OCR search uses FTS (full-text search). Semantic caption search and CLIP compensate when OCR fails. | Low |
| E6.2.7 | **Photo library is empty** (no indexed photos) | Return immediately: "No photos in the library. Upload photos or load the demo library first." | High |

### 6.3 Fusion & Ranking

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E6.3.1 | **All signals return the same photo as #1** | Perfect agreement. Photo gets very high fused score. This is a strong positive signal. | Low |
| E6.3.2 | **Signals completely disagree** (no overlap in top-20) | RRF handles this naturally — photos with multi-signal support rank higher. Results will be lower confidence overall. | Low |
| E6.3.3 | **Reranker reverses order from fusion** | Allow — reranker has additional context. But log the reversal for analysis. If reversal is extreme, may indicate prompt issue. | Low |
| E6.3.4 | **Reranker API call fails** | Fall back to fusion ranking without reranking. Display results from RRF directly. Log the failure. | Medium |
| E6.3.5 | **Score ties in fusion** | Break ties by: (1) number of signals that contributed, (2) recency (newer photos first), (3) arbitrary but stable (sort by asset ID). | Low |

### 6.4 Refinement

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E6.4.1 | **User refines with contradictory information** (first: "in Goa", then: "not in Goa") | Accept latest refinement as override. Clear previous conflicting clue. Show: "Updated: removed 'Goa' as location." | Medium |
| E6.4.2 | **User refines without changing anything** | Detect no change. Return same results. Show: "No new information detected. Try adding more details about what you remember." | Low |
| E6.4.3 | **User refines 20+ times** without finding target | After 10 refinements, suggest: "Having trouble? Try browsing the library by time or category instead." Track as abandonment risk. | Medium |
| E6.4.4 | **Refinement narrows to 0 results** | Show: "No photos match all your criteria. Relaxing some filters…" Auto-relax the lowest-confidence clue and retry. | Medium |
| E6.4.5 | **User provides completely new query (not a refinement)** | Detect if new query shares < 20% clue overlap with previous. Treat as new search session, not refinement. Start fresh retrieval. | Low |

---

## 7. Uncertainty & Confidence Handling

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E7.1 | **All clues are uncertain** ("maybe", "I think", "around") | All clues become soft signals. Retrieval is broad but still ranked. Show: "Your description is quite uncertain. Results are ranked by best guess." | Medium |
| E7.2 | **Mix of certain and uncertain clues** | Certain clues: hard filter. Uncertain: soft boost. If hard filter returns 0 candidates, promote to soft and retry. | Medium |
| E7.3 | **User expresses negative certainty** ("it was NOT in Delhi") | Extract as negative hard filter: exclude candidates matching Delhi. Harder to implement — requires negative filtering in each signal. If not implemented, treat as soft penalty. | Medium |
| E7.4 | **User expresses temporal range** ("between 2021 and 2023") | Extract as range filter, not point filter. Apply as hard filter with inclusive bounds. | Low |
| E7.5 | **User says "I'm sure" about incorrect information** | System treats as certain (hard filter). Target may be excluded from results. This is a known limitation. After failed retrieval, suggest: "Try relaxing your filters — you might be misremembering some details." | Medium |
| E7.6 | **Hedge language detection fails** (LLM doesn't catch "perhaps") | Maintain a supplementary regex/keyword list for hedge terms as a safety net alongside LLM detection: `maybe|perhaps|I think|around|roughly|approximately|not sure|might have been|could be|possibly`. | Medium |
| E7.7 | **Confidence score exactly 0.5** (boundary between certain and uncertain) | Treat as uncertain (soft signal). Threshold for "certain" is `>= 0.7`. Below that = uncertain. | Low |

---

## 8. Testing Framework

### 8.1 Test Session Management

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E8.1.1 | **Test session with no tasks assigned** | Allow creation but show warning: "No retrieval tasks assigned. Add tasks before starting the session." Prevent "Start" until ≥1 task assigned. | Medium |
| E8.1.2 | **Task target photo not in library** | Validate at task creation: if `target_asset_id` doesn't exist in `photo_assets`, reject with error. Prevent creating impossible tasks. | High |
| E8.1.3 | **Participant is already in an active test session** | Warn: "Participant [alias] already has an active session [ID]. Complete or cancel it first, or create parallel session with confirmation." | Medium |
| E8.1.4 | **Session started but never completed** (browser closed, crash) | Sessions in `started` state for >2 hours → mark as `incomplete`. Researcher can resume or cancel. Partial event data preserved. | Medium |
| E8.1.5 | **Participant sees the target asset ID** (data leak) | Target ID must never appear in participant-facing UI. Only show in researcher's admin view. Validate rendering: no target ID in search results, no target highlight until selection. | Critical |
| E8.1.6 | **Participant selects wrong photo as target** | Record as `retrieval_failed`. Store selected asset ID. Post-task survey captures why they selected it. This is valid data. | Low |
| E8.1.7 | **Same task given to same participant twice** | Allow with warning: "This task was previously completed by this participant." Second attempt data is still valuable (learning effect measurement). | Low |

### 8.2 Event Tracking

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E8.2.1 | **Events arrive out of order** (network delay) | Sort by `timestamp`, not arrival order. Accept late events. | Medium |
| E8.2.2 | **Duplicate event** (double-click, retry) | Deduplicate by `session_id` + `event_type` + `timestamp` (within 500ms window). Keep first, discard duplicate. | Medium |
| E8.2.3 | **Missing `retrieval_started` event** (logging bug) | Synthesize from first `query_submitted` event timestamp. Log warning for debugging. | Low |
| E8.2.4 | **Session ends without `retrieval_success` or `retrieval_abandoned`** | After timeout (session marked incomplete), infer `retrieval_abandoned`. Flag for researcher to confirm. | Medium |
| E8.2.5 | **Latency measurement is negative** (clock skew) | Clamp to 0. Log anomaly. Use server-side timestamps as fallback. | Low |
| E8.2.6 | **Extremely high latency recorded** (>60s) | Accept but flag as outlier. May indicate user left the tab open. Researcher can exclude from analysis. | Low |

### 8.3 Post-Task Survey

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E8.3.1 | **Participant skips all survey questions** | Allow — all questions are optional. Store empty responses. Record that survey was presented but skipped. | Low |
| E8.3.2 | **Participant provides very long response** (>5,000 chars) | Accept and store. Truncate only for display (show "Read more" expander). Full text always accessible. | Low |
| E8.3.3 | **Survey submitted twice for same task** | Accept second submission as update. Overwrite previous answers. Log both versions in audit trail. | Low |

---

## 9. Results & Metrics

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E9.1 | **Zero test sessions completed** | Results page shows: "No test sessions completed yet. Run tests in the Testing section first." All metric values show "—" (not zero). | Medium |
| E9.2 | **Only baseline sessions, no MVP sessions** (or vice versa) | Show available data for one mode. Comparison columns show "No data" for missing mode. Don't show misleading comparison. | Medium |
| E9.3 | **All test sessions are successful** (100% success rate) | Display honestly. Note: "All retrieval tasks succeeded. Consider adding harder tasks to differentiate baseline from MVP." | Low |
| E9.4 | **All test sessions failed** (0% success rate) | Display honestly. Critical signal. Highlight: "No retrieval tasks succeeded. Review the retrieval pipeline for issues." | High |
| E9.5 | **Division by zero in metric computation** (e.g., 0 sessions) | All metric formulas must check denominator ≠ 0. Return `null` / "—" if denominator is zero. Never show `NaN`, `Infinity`, or crash. | Critical |
| E9.6 | **Metric values change when new test sessions are added** | Recalculate on each page load from raw events. No cached metric values. Show "Last computed: [timestamp]". | Low |
| E9.7 | **Comparing sessions with different task sets** | Warn: "Baseline and MVP sessions used different tasks. Comparison may not be directly meaningful." Show per-task breakdown. | Medium |
| E9.8 | **Only 1 participant tested** | Allow results display. Prominent disclaimer: "Results based on 1 participant. Minimum recommended: 3." (§28) | Medium |
| E9.9 | **Metric formula references unavailable data** | Show "Data not available" for that metric. Don't show 0 — that implies measurement happened but result was zero. | Medium |
| E9.10 | **Subjective difficulty not recorded** (survey skipped) | Exclude from comparison. Show "Not reported" instead of average. Don't skew average with missing data. | Low |

---

## 10. Data Modes & Labeling

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E10.1 | **Switch from demo to research mode with existing demo data** | Demo data remains but is filtered out of research views by default. Toggle: "Show demo data" in evidence explorer. Demo records keep `⚠️ DEMO` badge always. | High |
| E10.2 | **Switch from research to demo mode** | Research data is hidden in demo mode. Protected from accidental deletion. Toggle back to research mode to see it. | High |
| E10.3 | **Research data accidentally created in demo mode** | Allow researcher to manually change `data_mode` on individual records: "Mark as research data." Requires confirmation. | Medium |
| E10.4 | **Demo data mixed into research analysis** | All aggregation queries must filter by `data_mode`. Dashboard counts should only include current mode's data. Cross-mode contamination is a bug. | Critical |
| E10.5 | **Label missing on quote/observation** | Enforce at creation — label is required field (NOT NULL). API rejects creation without label. Default to `HYPOTHESIS` if label must be auto-assigned. | High |
| E10.6 | **User tries to change evidence label from EVIDENCE to HYPOTHESIS** | Allow — researcher may reconsider classification. Log the change with timestamp for audit. | Low |
| E10.7 | **AI Interpretation label on AI-generated content** | Automatically set to `AI_INTERPRETATION`. Cannot be overridden to `EVIDENCE` or `DIRECT_QUOTE` — those require human action. Can be promoted to `RESEARCHER_OBSERVATION` via explicit researcher confirmation. | High |
| E10.8 | **Confidence badge missing** | Default to 🟡 Medium if not explicitly set. Log warning that confidence was not computed. | Low |

---

## 11. Database & Storage

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E11.1 | **SQLite database file locked** (concurrent access) | Enable WAL (Write-Ahead Logging) mode at connection time. Retry writes with 100ms delay, 5 attempts. Next.js dev mode may cause multiple connections. | High |
| E11.2 | **Database file deleted while app is running** | Detect on next query. Re-create database and run migrations. Show: "Database was reset. Seed demo data?" Unfortunate but recoverable. | High |
| E11.3 | **Database file exceeds 1GB** | SQLite handles this fine technically. Performance may degrade for complex queries. Log DB size periodically. Suggest archiving old demo data. | Low |
| E11.4 | **Migration fails** (schema conflict) | Drizzle Kit should handle this. If migration fails, show error with instructions: "Run `npx drizzle-kit push` to apply schema changes." | Medium |
| E11.5 | **Foreign key constraint violation** | Return specific error: "Cannot delete [entity] because [N] related [records] exist." Suggest cascading options. | Medium |
| E11.6 | **File system full** (photo uploads) | Detect during upload. Return: "Insufficient disk space. Free up space or reduce library size." Don't corrupt existing data. | High |
| E11.7 | **Chroma vector store out of sync with SQLite** | Provide "Rebuild vector index" button. Drops Chroma collection and re-indexes from SQLite data. | Medium |
| E11.8 | **Data reset (/api/system/reset) called accidentally** | Require confirmation: "This will permanently delete ALL data including research data. Type 'RESET' to confirm." | Critical |
| E11.9 | **Transaction rollback during batch processing** | Use transactions for batch operations. On failure, rollback entire batch. Show: "Batch failed — no partial data written. [Error details]." | High |
| E11.10 | **Orphaned photo files** (DB record deleted, file remains) | Periodic cleanup: compare files on disk vs `photo_assets` table. Offer to delete orphans. | Low |

---

## 12. UI / UX

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E12.1 | **Page with 0 items** (empty state) | Every screen must have a meaningful empty state. Not just "No data" — include guidance on what to do next. Example: Evidence Explorer → "No evidence yet. Start by ingesting evidence from the Evidence Ingestion page." with a link. | High |
| E12.2 | **Page with 10,000+ items** (performance) | Paginate all lists at 50 items per page. Use cursor-based pagination for consistent ordering. Virtual scrolling for grids (photo results). | High |
| E12.3 | **Chart with all zero values** | Show the chart structure with 0-height bars. Don't hide the chart. Label: "No data yet — values will appear after processing." | Medium |
| E12.4 | **Chart with single data point** | Show the single point. Don't draw misleading trend lines from a single point. | Low |
| E12.5 | **Very long text in table cells** | Truncate at 200 chars with ellipsis. Full text on hover tooltip or click-to-expand. | Medium |
| E12.6 | **Browser back/forward navigation** | All filter states persisted in URL via `nuqs`. Browser back restores previous filter state. No state lost. | Medium |
| E12.7 | **Slow API response** (loading states) | Every data fetch shows loading skeleton/spinner. Timeout at 30s with retry option: "Request timed out. Retry?" | High |
| E12.8 | **JavaScript disabled** | Progressive enhancement where possible. Server-rendered pages work for viewing. Interaction requires JS — show notice. | Low |
| E12.9 | **Screen width below 1024px** | Show responsive warning: "This application is designed for screens 1024px or wider. Some layouts may not display correctly on smaller screens." Don't hard-block access. | Low |
| E12.10 | **Dark mode** | Not required for MVP. If implemented, ensure all evidence labels, confidence badges, and mode indicators have adequate contrast in both modes. | Low |
| E12.11 | **Form submission with validation errors** | Highlight invalid fields with red border + error message. Don't clear valid fields. Scroll to first error. Keep form data on re-render. | High |
| E12.12 | **Concurrent editing** (two tabs editing same record) | Last-write-wins for MVP. No real-time collaboration needed (single researcher). Warn if `updated_at` changed since page load: "This record was modified since you opened it. Reload to see changes." | Low |

---

## 13. Security & Privacy

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E13.1 | **API key exposed in client-side code** | All AI API calls happen server-side (API routes / server actions). Never import API keys in client components. Build-time check: fail if `NEXT_PUBLIC_` prefix on API key vars. | Critical |
| E13.2 | **Photo served without auth** | In MVP (single-user), photos served via API route (not static files). No direct filesystem path exposure. For production: add auth middleware. | Medium |
| E13.3 | **Path traversal in photo file serving** | Validate that requested file path is within `data/demo-library/` or `data/uploads/`. Reject paths containing `..`. Use `path.resolve` and check prefix. | Critical |
| E13.4 | **Uploaded photo contains EXIF with home address** | Display privacy notice before upload: "Uploaded photos may contain location data. This data stays on your local machine." Offer optional EXIF stripping toggle. | High |
| E13.5 | **XSS via evidence text** | All user-provided text rendered through React's built-in escaping (JSX). Never use `dangerouslySetInnerHTML` on user content. CSP headers set. | Critical |
| E13.6 | **SQL injection via filters** | All queries use Drizzle ORM parameterized queries. Never concatenate user input into SQL strings. | Critical |
| E13.7 | **User photo sent to AI API without consent** | Image analysis (captioning) requires explicit user action ("Index Photos" button). Show which API receives the data. Offer local-only mode (CLIP only, no cloud captioning). | High |
| E13.8 | **AI provider logs/trains on user photos** | Display notice from provider's data usage policy. Recommend providers with no-training guarantees for sensitive use. | Medium |
| E13.9 | **System reset doesn't delete photo files** | `/api/system/reset` must: (1) truncate all DB tables, (2) clear Chroma collections, (3) delete uploaded files from `data/uploads/`. Demo library files are preserved. | High |
| E13.10 | **`.env.local` committed to git** | `.gitignore` must include `.env.local`, `.env.*.local`. Pre-commit hook or CI check to detect secrets. | Critical |

---

## 14. Configuration & Environment

| # | Edge Case | Expected Behavior | Severity |
|---|-----------|-------------------|----------|
| E14.1 | **App started with no `.env.local` file** | Use defaults from config module. `APP_MODE=demo`, AI features disabled. Show setup wizard on first visit: "Welcome! Configure your environment to get started." | Medium |
| E14.2 | **Invalid `AI_PROVIDER` value** | Zod validation catches at startup. Error: "Invalid AI_PROVIDER: 'xyz'. Expected: gemini, openai, or groq." Exit with code 1. | High |
| E14.3 | **`DATABASE_URL` points to non-existent directory** | Create directory recursively before SQLite initialization. Log: "Created database directory: [path]." | Medium |
| E14.4 | **Port already in use** | Next.js handles this automatically (increments port). Log: "Port 3000 in use, trying 3001." | Low |
| E14.5 | **Node.js version too old** (< 18) | Check in `package.json` engines field. Show error at `npm install`: "Node.js >= 18 required. Current: [version]." | Medium |
| E14.6 | **`MAX_UPLOAD_SIZE_MB` set to 0** | Clamp to minimum 1MB. Log warning: "MAX_UPLOAD_SIZE_MB was 0, using minimum 1MB." | Low |
| E14.7 | **`MAX_BATCH_SIZE` set extremely high** (100,000) | Clamp to maximum 1,000. Log warning. Prevent OOM during batch AI processing. | Medium |
| E14.8 | **Multiple AI provider keys configured** | Use the one specified by `AI_PROVIDER`. Others are available for manual provider switching via UI settings (future feature). | Low |
| E14.9 | **Chroma server not running** (when using external Chroma) | Detect at first vector operation. Fall back to in-memory vectors for the session. Warning: "Vector store unavailable. Semantic search using in-memory fallback. Data will not persist." | High |
| E14.10 | **`.env.example` out of sync with actual config** | CI check: compare variables in `.env.example` against `ConfigSchema` Zod definition. Fail if mismatch. | Low |

---

## Summary: Severity Distribution

| Severity | Count | Handling Priority |
|----------|-------|-------------------|
| 🔴 **Critical** | ~15 | Must handle before any release. Security, data integrity, privacy. |
| 🟠 **High** | ~45 | Must handle in the phase where the feature is built. UX, reliability. |
| 🟡 **Medium** | ~55 | Should handle during the phase. Graceful degradation, edge recovery. |
| 🟢 **Low** | ~35 | Handle during Phase 9 polish or accept as known limitations. |

---

## Edge Case Testing Strategy

### Per-Phase Testing Approach

| Phase | Edge Case Focus | Test Method |
|-------|----------------|-------------|
| Phase 1 | DB constraints, empty states, layout | Unit tests + manual UI review |
| Phase 2 | Pipeline failures, AI errors, dedup | Integration tests with mock AI, batch test data |
| Phase 3 | Label enforcement, transcript handling | Unit tests on validation, UI review |
| Phase 4 | Template completeness, evidence linking | Manual review |
| Phase 5 | File format handling, indexing failures | Integration tests with diverse image set |
| Phase 6 | Query edge cases, empty library, no results | E2E tests with scripted queries |
| Phase 7 | Event ordering, session management | Integration tests with simulated sessions |
| Phase 8 | Division by zero, missing data, comparisons | Unit tests on metric calculators |
| Phase 9 | Cross-cutting: modes, labels, privacy | Full regression |

### Recommended Test Data Set

| Category | Items | Purpose |
|----------|-------|---------|
| Valid evidence (retrieval-related) | 20 | Normal pipeline processing |
| Valid evidence (non-retrieval) | 10 | Relevance classification |
| Duplicate evidence pairs | 5 pairs | Dedup testing |
| Malformed CSV | 3 files | CSV error handling |
| Invalid JSON | 3 files | JSON error handling |
| Corrupted images | 3 files | Upload error handling |
| HEIC images | 2 files | Format conversion |
| Images with rich EXIF | 5 files | EXIF parsing |
| Pure text screenshots | 5 files | OCR quality |
| Photos with no text | 10 files | OCR empty case |
| Near-duplicate photos | 3 pairs | Visual dedup |
| Blank/solid-color images | 2 files | CLIP edge case |
