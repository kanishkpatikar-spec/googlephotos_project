import { AIProvider } from "./provider";
import { GeminiProvider } from "./gemini";
import { GroqProvider } from "./groq";

type ProviderName = "gemini" | "groq";

interface ProviderConfig {
  provider?: ProviderName;
  geminiApiKey?: string;
  geminiModel?: string;
  geminiEmbeddingModel?: string;
  groqApiKey?: string;
  groqModel?: string;
}

let _defaultProvider: AIProvider | null = null;

export class AIProviderFactory {
  /**
   * Create an AI provider instance from config.
   */
  static create(config: ProviderConfig): AIProvider {
    const provider = config.provider || "gemini";

    switch (provider) {
      case "gemini":
        return new GeminiProvider(
          config.geminiApiKey || process.env.GEMINI_API_KEY || "",
          config.geminiModel || process.env.GEMINI_MODEL,
          config.geminiEmbeddingModel || process.env.GEMINI_EMBEDDING_MODEL
        );

      case "groq":
        return new GroqProvider(
          config.groqApiKey || process.env.GROQ_API_KEY || "",
          config.groqModel || process.env.GROQ_MODEL
        );

      default:
        throw new Error(`Unknown AI provider: ${provider}`);
    }
  }

  /**
   * Get the default provider based on environment configuration.
   * Singleton — reuses across calls.
   */
  static getDefault(): AIProvider {
    if (!_defaultProvider) {
      const providerName = (process.env.AI_PROVIDER || "gemini") as ProviderName;
      _defaultProvider = AIProviderFactory.create({ provider: providerName });
    }
    return _defaultProvider;
  }

  /**
   * Reset the cached default provider (useful for testing).
   */
  static resetDefault(): void {
    _defaultProvider = null;
  }
}
