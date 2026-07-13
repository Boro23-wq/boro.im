import { Redis } from "@upstash/redis";

export type PostType = "blog" | "project";

export type Draft = {
  type: PostType;
  slug: string;
  isNew: boolean;
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string;
  image?: string;
  content: string;
  savedAt: string;
};

const DRAFTS_KEY = "admin:drafts";

function field(type: PostType, slug: string) {
  return `${type}:${slug}`;
}

function parseDraft(value: unknown): Draft | null {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Draft;
    } catch {
      return null;
    }
  }
  return value as Draft;
}

export async function getDraft(type: PostType, slug: string): Promise<Draft | null> {
  const redis = Redis.fromEnv();
  const value = await redis.hget(DRAFTS_KEY, field(type, slug));
  return parseDraft(value);
}

export async function listDrafts(): Promise<Draft[]> {
  const redis = Redis.fromEnv();
  const all = await redis.hgetall(DRAFTS_KEY);
  if (!all) return [];
  return Object.values(all)
    .map(parseDraft)
    .filter((d): d is Draft => d !== null)
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

export async function saveDraft(draft: Draft): Promise<void> {
  const redis = Redis.fromEnv();
  await redis.hset(DRAFTS_KEY, { [field(draft.type, draft.slug)]: JSON.stringify(draft) });
}

export async function deleteDraft(type: PostType, slug: string): Promise<void> {
  const redis = Redis.fromEnv();
  await redis.hdel(DRAFTS_KEY, field(type, slug));
}
