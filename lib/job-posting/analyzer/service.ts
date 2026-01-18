import { generateText, Output } from "ai";
import type { OpenAIProvider } from "@ai-sdk/openai";
import {
  jobPostingExtractSchema,
  type JobPosting,
} from "@/lib/cv/schemas";
import { buildExtractionPrompt } from "@/lib/job-posting/analyzer/prompts";
import { DEFAULT_MODEL } from "@/lib/openai";

export class JobPostingAnalyzerService {
  private openai: OpenAIProvider;

  constructor(openai: OpenAIProvider) {
    this.openai = openai;
  }

  async analyzeFromText(content: string): Promise<JobPosting> {
    const prompt = buildExtractionPrompt(content);

    const { output } = await generateText({
      model: this.openai(DEFAULT_MODEL),
      prompt,
      output: Output.object({ schema: jobPostingExtractSchema }),
    });

    return output;
  }
}
