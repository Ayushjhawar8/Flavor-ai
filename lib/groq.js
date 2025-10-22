import { createOpenAI } from "@ai-sdk/openai";

/**
 * Configuration for Groq AI API client
 * Groq is used as an alternative to OpenAI for generating recipe content
 * It uses the llama3-8b-8192 model which is optimized for text generation
 */
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const model = groq("gemma2-9b-it");
