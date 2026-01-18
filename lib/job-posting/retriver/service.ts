import { env } from "@/env";
import type {
  RetrievedContent,
  JobRetrieverConfig,
  CacheEntry,
} from "@/lib/job-posting/retriver/types";

const JINA_BASE_URL = "https://r.jina.ai";
const DEFAULT_CACHE_TTL = 60 * 60 * 1000; // 1 hour

const cache = new Map<string, CacheEntry>();

export class JobPostingRetrieverService {
  private readonly apiKey: string | undefined;
  private readonly cacheTtl: number;

  constructor(config: JobRetrieverConfig = {}) {
    this.apiKey = config.apiKey ?? env.JINAAI_API_KEY;
    this.cacheTtl = config.cacheTtl ?? DEFAULT_CACHE_TTL;
  }

  async retrieve(url: string): Promise<RetrievedContent> {
    const cached = this.getFromCache(url);
    if (cached) {
      return cached;
    }

    const encodedUrl = encodeURI(url);
    const readerUrl = `${JINA_BASE_URL}/${encodedUrl}`;

    const headers: Record<string, string> = {
      Accept: "text/markdown",
    };

    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(readerUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to retrieve: ${response.status} ${response.statusText}`
      );
    }

    const content = await response.text();

    const result: RetrievedContent = {
      url,
      title: this.extractTitle(content),
      content,
      retrievedAt: new Date(),
    };

    this.setInCache(url, result);

    return result;
  }

  private getFromCache(url: string): RetrievedContent | null {
    const entry = cache.get(url);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      cache.delete(url);
      return null;
    }

    return entry.content;
  }

  private setInCache(url: string, content: RetrievedContent): void {
    cache.set(url, {
      content,
      expiresAt: Date.now() + this.cacheTtl,
    });

    if (cache.size > 100) {
      this.cleanupCache();
    }
  }

  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (now > entry.expiresAt) {
        cache.delete(key);
      }
    }
  }

  private extractTitle(content: string): string {
    return content.match(/^#\s+(.+)$/m)?.[1] ?? "";
  }
}
