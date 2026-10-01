# Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| **Privacy Concerns** | High | High | All indexing occurs locally or in strict ephemeral memory. No photos are retained by LLM. |
| **Hallucination** | High | Medium | Groq is strictly constrained via system prompt to only extract, not invent, clues. |
| **API Latency** | Medium | Low | We chose Groq specifically to mitigate LLM latency, bringing parsing down to ~150ms. |
| **Embedding Drift** | Medium | Medium | Use stable Gemini text embeddings and regularly validate semantic clustering. |
| **False Positives** | Low | High | Surface confidence intervals in UI; allow user to manually toggle extracted clues on/off. |