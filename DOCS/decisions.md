# Product & Technical Decision Log

> This is a living document capturing material decisions for the Google Photos Vague-Memory Retrieval project. It tracks both evidence-backed product decisions and foundational engineering architecture choices. 
> 
> **Status Options:** `Proposed`, `Accepted`, `Rejected`, `Superseded`

---

## Table of Contents

### Engineering & Architecture
- [DEC-001: Single Integrated Application for Research & MVP](#dec-001-single-integrated-application-for-research--mvp)
- [DEC-002: AI Provider Abstraction Layer](#dec-002-ai-provider-abstraction-layer)
- [DEC-003: Multi-Signal Reciprocal Rank Fusion (RRF) Retrieval](#dec-003-multi-signal-reciprocal-rank-fusion-rrf-retrieval)

### Privacy & Data Integrity
- [DEC-004: Local-First Processing & Explicit AI Consent](#dec-004-local-first-processing--explicit-ai-consent)
- [DEC-005: Strict Data Mode Separation (Demo vs. Research)](#dec-005-strict-data-mode-separation-demo-vs-research)

### Product Scope & Research Methodology
- [DEC-006: Manual Opportunity Selection (No Auto-Winner)](#dec-006-manual-opportunity-selection-no-auto-winner)
- [DEC-007: Solution-Agnostic MVP Architecture](#dec-007-solution-agnostic-mvp-architecture)
- [DEC-008: Evaluating Retrieval Success vs. Engagement](#dec-008-evaluating-retrieval-success-vs-engagement)

---

## Engineering & Architecture

### DEC-001: Single Integrated Application for Research & MVP
**Status:** `Accepted`

* **Context:** The project requires building both an AI-powered discovery engine (for researchers) and a functional AI-native retrieval prototype (for end-users).
* **Reviewer Requirement:** Requirement 1 (Discovery Engine) & Requirement 5 (MVP)
* **Available Evidence:** Managing two separate repositories increases overhead, complicates data sharing (e.g., test session tracking), and creates setup friction for reviewers.
* **Alternatives Considered:** 
  1. Separate repositories for the Research Platform and the MVP.
  2. Research done in Jupyter Notebooks; MVP built as a web app.
* **Selected Decision:** Build a single Next.js application that houses both the researcher-facing dashboard tools and the user-facing MVP, separated by navigation routes and modes.
* **Rationale:** A unified app ensures reviewers can seamlessly walk through the 12-step flow (from problem definition to MVP testing) without switching contexts or setting up multiple environments.
* **Trade-offs:** Increases the complexity of the codebase and routing; mixes researcher UI components with consumer UI components.
* **Risks:** The MVP might feel like a "dashboard" rather than a consumer product if UI boundaries blur.
* **Validation:** Reviewer flow testing (can a reviewer navigate from research insights directly to the MVP without friction?).
* **Revisit When:** The MVP needs to be deployed as a standalone mobile application for actual consumer testing.

---

### DEC-002: AI Provider Abstraction Layer
**Status:** `Accepted`

* **Context:** The system relies heavily on LLMs for evidence extraction, theme clustering, and query intent parsing.
* **Reviewer Requirement:** Technology guidelines (Architecture §7)
* **Available Evidence:** LLM capabilities, pricing, and availability change rapidly. Hardcoding a specific provider risks vendor lock-in and limits flexibility.
* **Alternatives Considered:** 
  1. Tightly couple the system to Groq.
  2. Tightly couple to Gemini.
* **Selected Decision:** Implement a provider-agnostic `AIProvider` interface with adapters for Gemini, OpenAI, and Groq.
* **Rationale:** Ensures resilience against API downtime, allows swapping models based on cost/performance, and avoids hard dependency on a single vendor.
* **Trade-offs:** Requires writing lowest-common-denominator prompts or maintaining multiple prompt variations per provider.
* **Risks:** Advanced features unique to one provider (e.g., specific multimodal function calling) cannot be easily utilized without breaking abstraction.
* **Validation:** Run the discovery pipeline using Gemini, then switch the environment variable to Groq and verify the pipeline still completes successfully.
* **Revisit When:** A specific provider releases a highly specialized API (e.g., native video-memory understanding) that becomes critical to the MVP.

---

### DEC-003: Multi-Signal Reciprocal Rank Fusion (RRF) Retrieval
**Status:** `Accepted`

* **Context:** Users retrieve photos using vague memories that span visual, temporal, spatial, and semantic domains.
* **Reviewer Requirement:** Requirement 5 (Functional AI-native MVP)
* **Available Evidence:** No single embedding model effectively captures exact dates, precise locations, *and* visual semantics perfectly. LLM embeddings struggle with precise metadata filtering.
* **Alternatives Considered:** 
  1. Pure CLIP semantic search.
  2. Vectorizing all metadata into a single massive text chunk for embedding.
* **Selected Decision:** Use independent retrieval signals (CLIP, OCR FTS, Caption embeddings, Metadata filters) and combine their results using Reciprocal Rank Fusion (RRF), followed by an LLM reranker. Apply "uncertain" clues as soft boosts rather than hard filters.
* **Rationale:** Maximizes recall by allowing different signals to compensate for each other's weaknesses. Uncertainty handling prevents a single misremembered detail from eliminating the correct target.
* **Trade-offs:** Increases retrieval latency and complexity; requires indexing photos multiple times across different pipelines.
* **Risks:** Slower response times; RRF calibration requires tuning weights.
* **Validation:** Multi-signal ablation testing (evaluating Recall@10 with all signals vs. single signals).
* **Revisit When:** Latency exceeds 5 seconds for a library of 200 photos, or if a single multimodal model proves capable of handling all intent types simultaneously.

---

## Privacy & Data Integrity

### DEC-004: Local-First Processing & Explicit AI Consent
**Status:** `Accepted`

* **Context:** Photo libraries are deeply personal, and users are highly sensitive to their images being uploaded to third-party AI services.
* **Reviewer Requirement:** Requirement 8 (Identify Risks and Mitigations)
* **Available Evidence:** Industry backlash against unconsented AI training on user data.
* **Alternatives Considered:** 
  1. Automatically send all uploaded photos to a cloud vision API for processing.
  2. Build a completely offline system (too heavy/complex for a web prototype).
* **Selected Decision:** Store photos locally. Process EXIF, OCR (via Tesseract.js), and CLIP embeddings locally. Require explicit user consent via a UI trigger before sending any photo to a cloud AI provider for advanced captioning.
* **Rationale:** Strictly enforces privacy guardrails while still allowing advanced AI features. Honors the "no silent external API calls" requirement.
* **Trade-offs:** Limits the intelligence of the default search if the user declines cloud processing.
* **Risks:** The baseline local-only search might appear too weak to impress reviewers if the cloud features are never triggered.
* **Validation:** Network audit during photo upload verifying no outbound requests are made to AI providers until the "Enhance with AI" button is explicitly clicked.
* **Revisit When:** Running powerful multimodal models directly in the browser via WebGPU becomes feasible for the required scale.

---

### DEC-005: Strict Data Mode Separation (Demo vs. Research)
**Status:** `Accepted`

* **Context:** The application must function for development and demonstration before real user research is conducted, but must not falsify academic findings.
* **Reviewer Requirement:** Requirement 3 (Validate via interviews), Academic Integrity Rules
* **Available Evidence:** Mixing synthetic data with real participant data invalidates user research and violates the problem statement's guardrails against fabrication.
* **Alternatives Considered:** 
  1. Use separate databases for demo and research.
  2. Do not use demo data at all (blocks development until research is done).
* **Selected Decision:** Implement a `data_mode` column (`demo` | `research`) on all primary tables. Globally filter queries based on the `APP_MODE` environment variable. Visually label all synthetic data with a `⚠️ DEMO` badge.
* **Rationale:** Allows parallel development of the UI/pipelines using synthetic data without corrupting the integrity of the real research data gathered later.
* **Trade-offs:** Requires discipline in every database query to ensure the mode filter is applied.
* **Risks:** Accidental contamination if a query omits the `data_mode` filter.
* **Validation:** End-to-end data integrity tests verifying that changing the `APP_MODE` hides/shows the appropriate records, and that no unlabelled demo data appears in research views.
* **Revisit When:** The project graduates from a prototype to a production consumer application (demo mode can be fully removed).

---

## Product Scope & Research Methodology

### DEC-006: Manual Opportunity Selection (No Auto-Winner)
**Status:** `Accepted`

* **Context:** The AI discovery engine clusters evidence and generates opportunity areas based on user failure patterns.
* **Reviewer Requirement:** Requirement 1 (Discovery Engine) & Requirement 4 (Define the problem)
* **Available Evidence:** AI is excellent at pattern recognition but lacks product strategy context (e.g., business goals, technical feasibility, market positioning).
* **Alternatives Considered:** 
  1. AI auto-selects the "best" opportunity based on frequency and confidence.
* **Selected Decision:** The AI generates and compares opportunities, but explicitly requires the human researcher to select the priority opportunity to pursue.
* **Rationale:** Preserves human agency in product strategy. Aligns with the directive that AI should not replace human decision-making where strategic context is required.
* **Trade-offs:** Adds a manual step to the workflow.
* **Risks:** Reviewers might perceive the AI engine as "incomplete" if it doesn't make the final choice.
* **Validation:** UX audit ensuring the UI provides enough comparative data (evidence counts, confidence scores) for the researcher to make an informed choice.
* **Revisit When:** N/A. Human-in-the-loop for strategy is a core project principle.

---

### DEC-007: Solution-Agnostic MVP Architecture
**Status:** `Proposed` *(Pending User Research)*

* **Context:** The form factor of the MVP (e.g., chat interface, filter bar, smart folders) should not be predetermined before user interviews reveal how people actually attempt vague-memory retrieval.
* **Reviewer Requirement:** Requirement 5 (Functional AI-native MVP)
* **Available Evidence:** Awaiting Phase 3 (User Interviews). Currently, we do not know if users prefer conversational agents, visual browsing, or parametric filtering when stuck.
* **Alternatives Considered:** 
  1. Commit to building a Chatbot UI immediately.
  2. Commit to a traditional Search Bar + Filters immediately.
* **Selected Decision:** Build a headless retrieval API (Phase 5) that can accept intents and return candidates, but delay building the final MVP UI (Phase 6) until cross-interview synthesis (Phase 3) is complete.
* **Rationale:** Prevents "solution-jumping" (building an LLM chatbot just because it's an AI project). Ensures the final product is directly backed by observed user behavior.
* **Trade-offs:** Delays frontend development of the MVP screen.
* **Risks:** Timeline compression if research takes longer than expected, leaving less time to build the MVP UI.
* **Validation:** The final Problem Definition (Req 4) must explicitly justify the chosen UI pattern based on interview evidence.
* **Revisit When:** N/A.

---

### DEC-008: Evaluating Retrieval Success vs. Engagement
**Status:** `Accepted`

* **Context:** The system needs a primary North Star metric to determine if the AI-native MVP is better than the baseline.
* **Reviewer Requirement:** Requirement 7 (Define success metrics)
* **Available Evidence:** In retrieval tasks, increased time spent is often a signal of friction, not delight. Optimizing for engagement (time-on-app) contradicts the goal of finding a forgotten photo quickly.
* **Alternatives Considered:** 
  1. Primary Metric: Session length / Time-in-app.
  2. Primary Metric: Number of AI interactions per session.
* **Selected Decision:** The primary success metric is the **Vague-Memory Retrieval Success Rate** (did they find the target photo?). Leading metrics include *Time to Target* (lower is better) and *Interactions to Target* (lower is better).
* **Rationale:** Aligns the metric directly with user intent. If the AI is truly intelligent, it should reduce the time and effort required to complete the task.
* **Trade-offs:** Makes the product look "less engaging" to traditional ad-based metrics.
* **Risks:** A very fast, successful retrieval might trigger an "abandonment" false positive if logging is not precise.
* **Validation:** Post-task surveys during User Testing (Req 6) correlating low "Time to Target" with low "Subjective Difficulty".
* **Revisit When:** The product expands to include serendipitous browsing or memory-rediscovery features, where time spent exploring *is* a positive signal.
