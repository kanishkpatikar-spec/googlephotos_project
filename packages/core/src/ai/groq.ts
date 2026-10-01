import Groq from "groq-sdk";
import {
  AIProvider,
  GenerateOptions,
  ChatMessage,
  parseStructured,
} from "./provider";
import { ZodSchema } from "zod";
import { GeminiProvider } from "./gemini";

export class GroqProvider implements AIProvider {
  private client: Groq;
  private model: string;
  private geminiFallback: GeminiProvider | null = null;

  constructor(apiKey: string, model?: string) {
    if (!apiKey) throw new Error("GROQ_API_KEY is required");
    this.client = new Groq({ apiKey });
    this.model = model || "llama3-70b-8192";

    // Setup fallback for embeddings
    if (process.env.GEMINI_API_KEY) {
      this.geminiFallback = new GeminiProvider(process.env.GEMINI_API_KEY);
    }
  }

  async generateText(
    prompt: string,
    options?: GenerateOptions
  ): Promise<string> {
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [];
    if (options?.systemPrompt) {
      messages.push({ role: "system", content: options.systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    const result = await this.client.chat.completions.create({
      model: this.model,
      messages,
      temperature: options?.temperature ?? 0.2,
      max_tokens: options?.maxTokens ?? 4096,
    });

    return result.choices[0]?.message?.content || "";
  }

  async generateStructured<T>(
    prompt: string,
    schema: ZodSchema<T>,
    options?: GenerateOptions
  ): Promise<T> {
    const structuredPrompt = `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanations.`;
    const text = await this.generateText(structuredPrompt, {
      ...options,
      temperature: options?.temperature ?? 0.1,
    });
    return parseStructured(text, schema);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (this.geminiFallback) {
      return this.geminiFallback.generateEmbedding(text);
    }
    
    throw new Error(
      "Groq does not support embeddings. Please provide GEMINI_API_KEY in your environment for embedding generation."
    );
  }

  async analyzeImage(_image: Buffer, _prompt: string): Promise<string> {
    throw new Error(
      "Groq does not support image analysis. Use Gemini or OpenAI."
    );
  }

  async chat(
    messages: ChatMessage[],
    options?: GenerateOptions
  ): Promise<string> {
    const groqMessages: Groq.Chat.ChatCompletionMessageParam[] = messages.map(
      (m) => ({
        role: m.role as "system" | "user" | "assistant",
        content: m.content,
      })
    );

    const result = await this.client.chat.completions.create({
      model: this.model,
      messages: groqMessages,
      temperature: options?.temperature ?? 0.2,
      max_tokens: options?.maxTokens ?? 4096,
    });

    return result.choices[0]?.message?.content || "";
  }
}
