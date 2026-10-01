import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import {
  AIProvider,
  GenerateOptions,
  ChatMessage,
  parseStructured,
} from "./provider";
import { ZodSchema } from "zod";

export class GeminiProvider implements AIProvider {
  private client: GoogleGenerativeAI;
  private model: string;
  private embeddingModel: string;

  constructor(apiKey: string, model?: string, embeddingModel?: string) {
    if (!apiKey) throw new Error("GEMINI_API_KEY is required");
    this.client = new GoogleGenerativeAI(apiKey);
    this.model = model || "gemini-2.0-flash";
    this.embeddingModel = embeddingModel || "text-embedding-004";
  }

  private getModel(options?: GenerateOptions): GenerativeModel {
    return this.client.getGenerativeModel({
      model: this.model,
      generationConfig: {
        temperature: options?.temperature ?? 0.2,
        maxOutputTokens: options?.maxTokens ?? 4096,
      },
      ...(options?.systemPrompt
        ? { systemInstruction: options.systemPrompt }
        : {}),
    });
  }

  async generateText(
    prompt: string,
    options?: GenerateOptions
  ): Promise<string> {
    const model = this.getModel(options);
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async generateStructured<T>(
    prompt: string,
    schema: ZodSchema<T>,
    options?: GenerateOptions
  ): Promise<T> {
    const structuredPrompt = `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanations.`;
    const model = this.getModel({
      ...options,
      temperature: options?.temperature ?? 0.1,
    });
    const result = await model.generateContent(structuredPrompt);
    const text = result.response.text();
    return parseStructured(text, schema);
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const model = this.client.getGenerativeModel({
      model: this.embeddingModel,
    });
    const result = await model.embedContent(text);
    return result.embedding.values;
  }

  async analyzeImage(image: Buffer, prompt: string): Promise<string> {
    const model = this.getModel();
    const imagePart = {
      inlineData: {
        data: image.toString("base64"),
        mimeType: "image/jpeg",
      },
    };
    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  }

  async chat(
    messages: ChatMessage[],
    options?: GenerateOptions
  ): Promise<string> {
    const model = this.getModel(options);
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : ("user" as const),
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    return result.response.text();
  }
}
