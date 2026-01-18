export type RetrievedContent = {
  url: string;
  title: string;
  content: string;
  retrievedAt: Date;
};

export type JobRetrieverConfig = {
  apiKey?: string;
  /** Cache TTL in milliseconds (default: 1 hour) */
  cacheTtl?: number;
};

export type CacheEntry = {
  content: RetrievedContent;
  expiresAt: number;
};
