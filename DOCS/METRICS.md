# Success Metrics Framework

How we measure the success of the new MVP.

## 1. System Latency
- **Query Parse Time:** Target < 200ms (achieved via Groq)
- **Embedding Time:** Target < 300ms (via Gemini)
- **Retrieval Time:** Target < 100ms

## 2. AI Accuracy
- **Clue Extraction F1 Score:** Does Groq correctly identify entities vs. locations?

## 3. User Success
- **Task Completion Rate:** % of users who find their target photo.
- **Time to Target:** Seconds elapsed from first keystroke to photo click.

## 4. Engagement
- **Refinement Rate:** How often users have to adjust their query (lower is better for single-shot success).