export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { createConversation } from "@/lib/tavus";

export async function POST(request: Request) {
  try {
    let userId: string | undefined;
    let memories = false;
    let conversationName: string | undefined;
    let conversationalContext: string | undefined;
    let audioOnly: boolean | undefined;
    
    try {
      const json = await request.json().catch(() => null);
      if (json && typeof json === 'object') {
        userId = typeof json.userId === 'string' ? json.userId : undefined;
        memories = Boolean(json.memories);
        conversationName = typeof json.conversationName === 'string' ? json.conversationName : undefined;
        conversationalContext = typeof json.conversationalContext === 'string' ? json.conversationalContext : undefined;
        audioOnly = typeof json.audioOnly === 'boolean' ? json.audioOnly : undefined;
      }
    } catch (_) {
      // ignore body parse errors; treat as no body
    }

    // Construct the callback URL for this deployment
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const callbackUrl = `${protocol}://${host}/api/webhooks/tavus`;

    const { conversationUrl, conversationId } = await createConversation({
      userId,
      withMemories: !!memories,
      callbackUrl,
      conversationName,
      conversationalContext,
      audioOnly,
    });

    return Response.json({ conversationUrl, conversationId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error creating conversation';
    // Minimal error payload with message; could include code later
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}


