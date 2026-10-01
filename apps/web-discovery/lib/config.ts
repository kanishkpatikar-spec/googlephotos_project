import { z } from "zod";

const ConfigSchema = z.object({
  // Application
  APP_MODE: z.enum(["demo", "research"]).default("demo"),
  APP_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().default("file:./data/app.db"),
  CHROMA_URL: z.string().default("http://localhost:8000"),
  CHROMA_COLLECTION: z.string().default("photos"),

  // AI Provider
  AI_PROVIDER: z.enum(["gemini", "openai", "groq"]).default("gemini"),

  // Gemini
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-2.0-flash"),
  GEMINI_EMBEDDING_MODEL: z.string().default("text-embedding-004"),

  // OpenAI
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o"),
  OPENAI_EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),

  // Groq
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().default("llama3-70b-8192"),

  // Image Processing
  CLIP_MODEL: z.string().default("Xenova/clip-vit-base-patch32"),
  OCR_LANGUAGE: z.string().default("eng"),

  // Feature Flags
  ENABLE_AUTO_INDEXING: z
    .string()
    .transform((v) => v === "true")
    .default("true"),
  ENABLE_AI_EXTRACTION: z
    .string()
    .transform((v) => v === "true")
    .default("true"),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().default(50),
  MAX_BATCH_SIZE: z.coerce.number().default(100),
});

export type AppConfig = z.infer<typeof ConfigSchema>;

function getConfig(): AppConfig {
  const result = ConfigSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "❌ Invalid environment configuration:",
      result.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment configuration");
  }

  return result.data;
}

/** Validated application configuration singleton */
export const config = getConfig();

/** Check if running in demo mode */
export const isDemoMode = () => config.APP_MODE === "demo";

/** Check if running in research mode */
export const isResearchMode = () => config.APP_MODE === "research";
