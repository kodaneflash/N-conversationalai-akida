export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { createConversation } from "@/lib/tavus";
import { reserveSlot, promoteReservation, releaseByReservation } from "@/lib/concurrency";

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

    // 1) Atomically reserve capacity with TTL (2 minutes safety window)
    const reservationId = await reserveSlot(120);
    if (!reservationId) {
      return Response.json(
        { error: 'BUSY', message: 'All of our replicas are busy chatting' },
        { status: 429 }
      );
    }

    try {
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

      // 2) Promote reservation -> conversation with longer TTL (15m)
      await promoteReservation(reservationId, conversationId, 15 * 60);

      return Response.json({ conversationUrl, conversationId });
    } catch (err) {
      // 3) On failure, release the reserved slot so others can proceed
      await releaseByReservation(reservationId);
      const message = err instanceof Error ? err.message : 'Unknown error creating conversation';
      return Response.json({ error: message }, { status: 502 });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error creating conversation';
    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}


