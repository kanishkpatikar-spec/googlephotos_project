# MVP Technical Architecture

The Consumer Search MVP is designed to resolve vague, multi-cue queries.

## 1. Frontend (web-mvp)
- Next.js App Router
- Tailwind CSS v4 (Glassmorphism "Optics Lab" design system)
- React Server Components

## 2. LLM Inference Layer (Groq)
- Uses `llama3-70b-8192` via Groq for ultra-low latency query parsing.
- Extracts Entities, Temporal markers, and Visual context from natural language.

## 3. Embedding & Vector DB
- Google Gemini `text-embedding-004` for vectorizing query fragments.
- PostgreSQL + pgvector (or ChromaDB) for ANN similarity search.

## 4. UI Flow
User types vague query -> Groq extracts structured clues -> Gemini embeds clues -> Vector DB returns candidates -> UI displays results with highlight ribbons.