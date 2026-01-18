import { generateText, Output } from "ai";
import type { OpenAIProvider } from "@ai-sdk/openai";
import {
  enrichedCvSchema,
  type CV,
  type JobPosting,
  type EnrichedCV,
} from "@/lib/cv/schemas";
import { buildOptimizationPrompt } from "@/lib/cv/optimizer/prompts";
import { DEFAULT_MODEL } from "@/lib/openai";

export class CvOptimizerService {
  private openai: OpenAIProvider;

  constructor(openai: OpenAIProvider) {
    this.openai = openai;
  }

  async optimize(cv: CV, job: JobPosting): Promise<EnrichedCV> {
    const prompt = buildOptimizationPrompt(cv, job);

    const { output } = await generateText({
      model: this.openai(DEFAULT_MODEL),
      prompt,
      output: Output.object({ schema: enrichedCvSchema }),
    });

    return output;
  }
}
