
import { NextResponse } from "next/server";

const MODEL = "@cf/meta/llama-3.1-8b-instruct";

export async function askCloudflare(
  system: string,
  question: string
) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !token) {
    return NextResponse.json(
      { error: "AI service is not configured." },
      { status: 503 }
    );
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: system },
          { role: "user", content: question },
        ],
        max_tokens: 500,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    }
  );

  if (!response.ok) {
    const details = await response.text();

    console.error("Cloudflare AI error:", {
      status: response.status,
      details,
    });

    return NextResponse.json(
      {
        error: "AI service temporarily unavailable.",
        upstreamStatus: response.status,
      },
      { status: 502 }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    answer: data.result?.response || "No answer generated.",
    model: MODEL,
  });
}

export async function streamCloudflare(
  system: string,
  question: string
): Promise<Response> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !token) {
    return NextResponse.json(
      { error: "AI service is not configured." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: system },
            { role: "user", content: question },
          ],
          max_tokens: 700,
          stream: true,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      console.error("Cloudflare streaming failed:", response.status);

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");

        return NextResponse.json(
          {
            error: "AI request limit reached. Please try again later.",
            retryAfter,
          },
          {
            status: 429,
            headers: retryAfter
              ? { "Retry-After": retryAfter }
              : {},
          }
        );
      }

      return NextResponse.json(
        { error: "AI streaming temporarily unavailable." },
        { status: 502 }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: "AI response stream unavailable." },
        { status: 502 }
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "AI streaming request failed." },
      { status: 502 }
    );
  }
}
