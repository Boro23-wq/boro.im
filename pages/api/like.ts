import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export const config = {
  runtime: "edge",
};

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

async function hashIp(ip: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function like(req: NextRequest): Promise<NextResponse> {
  if (req.method === "GET") {
    const slug = new URL(req.url).searchParams.get("slug");
    if (!slug) {
      return new NextResponse("Slug not found", { status: 400 });
    }

    const likes = (await redis.get<number>(["likes", "projects", slug].join(":"))) ?? 0;

    const ip = getIp(req);
    const liked = ip
      ? Boolean(await redis.get(["liked", await hashIp(ip), slug].join(":")))
      : false;

    return NextResponse.json({ likes, liked });
  }

  if (req.method !== "POST") {
    return new NextResponse("use GET or POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  const slug: string | undefined = "slug" in body ? body.slug : undefined;
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  const ip = getIp(req);
  if (!ip) {
    return new NextResponse("Could not identify visitor", { status: 400 });
  }

  const hash = await hashIp(ip);
  const likedKey = ["liked", hash, slug].join(":");
  const countKey = ["likes", "projects", slug].join(":");

  const alreadyLiked = await redis.get(likedKey);

  if (alreadyLiked) {
    await redis.del(likedKey);
    const likes = await redis.decr(countKey);
    return NextResponse.json({ liked: false, likes: Math.max(likes, 0) });
  }

  await redis.set(likedKey, true);
  const likes = await redis.incr(countKey);
  return NextResponse.json({ liked: true, likes });
}
