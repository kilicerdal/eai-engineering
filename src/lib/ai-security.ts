import { NextRequest, NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      prefix: "erdal-ai:rate-limit",
      analytics: true,
    })
  : null;

export async function protectAIRequest(
  request: NextRequest,
  message: unknown
): Promise<NextResponse | null> {
  // Reject cross-origin browser POST requests.
  // Origin checks supplement rate limiting; they are not authentication.
  if (request.method === "POST") {
    const origin = request.headers.get("origin");

    if (origin) {
      try {
        const requestOrigin = new URL(request.url).origin;

        if (new URL(origin).origin !== requestOrigin) {
          return NextResponse.json(
            { error: "Cross-origin requests are not allowed." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid request origin." },
          { status: 403 }
        );
      }
    }
  }

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 }
    );
  }

  if (message.length > 3000) {
    return NextResponse.json(
      { error: "Message exceeds the 3,000-character limit." },
      { status: 413 }
    );
  }

  if (!limiter) {
    console.error("AI rate limiter is not configured.");

    return NextResponse.json(
      { error: "AI service configuration is incomplete." },
      { status: 503 }
    );
  }

  // On Vercel, prefer the platform-provided client IP header.
  // Other deployments must configure a trusted proxy before relying
  // on forwarded client IP headers.
  const ip = ipAddress(request);

  if (!ip) {
    console.error("Unable to identify client IP for rate limiting.");

    return NextResponse.json(
      { error: "Unable to verify request origin." },
      { status: 503 }
    );
  }

  try {
    const result = await limiter.limit(ip);

    if (!result.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((result.reset - Date.now()) / 1000)
      );

      return NextResponse.json(
        {
          error:
            "You've reached the AI usage limit. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    return null;
  } catch {
    console.error("AI rate-limit check failed.");

    return NextResponse.json(
      { error: "AI service temporarily unavailable." },
      { status: 503 }
    );
  }
}

export function logAIRequest(
  endpoint: string,
  status: number,
  startedAt: number
) {
  console.info(
    JSON.stringify({
      event: "ai_request",
      endpoint,
      status,
      durationMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    })
  );
}
