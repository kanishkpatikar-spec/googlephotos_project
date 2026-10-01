# Google Photos Semantic Retrieval MVP

> **The Challenge:** "I have a vague memory of a photo I took, but I can't find it."

This project is a research-driven, AI-native prototype designed to solve the problem of vague-memory photo retrieval. Instead of relying purely on exact keyword matching, this system uses advanced Large Language Models (LLMs) to extract entities, contexts, and temporal cues from a user's hazy memory.

## 🚀 Technical Architecture

We use a monorepo setup powered by Turborepo, featuring two distinct frontend applications and a shared backend package:

### 1. `web-discovery` (Internal Diagnostics Dashboard)
A highly technical "Optics Lab" dashboard used by AI researchers to monitor system health, telemetry, and view the AI discovery pipeline (which parses user complaints into structured failure modes).
- **Tech Stack:** Next.js 15, React Server Components, Tailwind CSS v4, Recharts.

### 2. `web-mvp` (Consumer Search Experience)
The consumer-facing search MVP where users can type vague, natural language queries to retrieve photos.
- **Tech Stack:** Next.js 15, Tailwind CSS v4.
- **AI Stack:** 
  - **Groq (Llama-3 70b):** Ultra-fast query parsing and entity extraction.
  - **Google Gemini:** Semantic text embeddings for vector search.

## 🛠️ Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env` in the `apps/backend` or root directory.
You will need two API keys:
- **Groq API Key:** Get one at [console.groq.com](https://console.groq.com)
- **Gemini API Key:** Get one at [aistudio.google.com](https://aistudio.google.com)

### 2. Install Dependencies
Run the following from the root directory:
\`\`\`bash
npm install
\`\`\`

### 3. Run the Development Servers
You can run the entire monorepo simultaneously:
\`\`\`bash
npm run dev
\`\`\`
Or run individual apps:
- Discovery Engine: \`npm run dev --workspace=apps/web-discovery\` (Port 3000)
- MVP Search: \`npm run dev --workspace=apps/web-mvp\` (Port 3002)

## 📚 Project Documentation

As per project guidelines, all research methodologies, metric trees, and architectural details are fully documented in the \`docs/\` directory.
Key documents include:
- [Project Brief](docs/PROJECT_BRIEF.md)
- [Discovery Engine AI Pipeline](docs/DISCOVERY_ENGINE.md)
- [Metric Tree](docs/METRIC_TREE.md)
- [MVP Architecture](docs/MVP_ARCHITECTURE.md)
- [Risk Register](docs/RISKS.md)

*Note: Documents ending in \`(Template)\` are intentionally left blank or unpopulated, acting as placeholders until the 5-6 validation interviews are officially conducted (per the "No fabricated research" guideline).*

## 🔒 Privacy & Limitations
This MVP operates under strict privacy guidelines. All photo indexing and semantic vector storage is done locally via SQLite/PostgreSQL, and no images are ever transmitted to the LLM API. Only text-based memory cues are parsed through Groq.
