## Tavus Conversational Video Interface (CVI) – Minimal Next.js 15 App Router Demo

This project embeds the Tavus Conversational Video Interface (CVI) using a minimal backend route and a simple UI. It is structured to enable future features like memories, recordings/transcripts with webhooks, LiveKit routing, and the Tavus React Component Library.

References:
- [Tavus CVI Conversation Overview](https://docs.tavus.io/sections/conversational-video-interface/conversation/overview)
- [Tavus CVI Memories](https://docs.tavus.io/sections/conversational-video-interface/memories)

## How to run

Scaffold (already done in this repo):

```bash
pnpm dlx create-next-app@latest
```

Set up environment variables by creating `.env.local` in the project root:

```bash
TAVUS_API_KEY=your_api_key
TAVUS_PERSONA_ID=your_persona_id
TAVUS_REPLICA_ID=your_replica_id
NEXT_PUBLIC_APP_NAME=Tavus CVI Demo
```

Install deps and start the dev server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Usage

- Click "Start AI Video Chat" to create a Tavus conversation and embed it in an iframe.
- Click "Start with Memories" to create a conversation with `memory_stores` enabled.
- The iframe is granted camera/mic permissions via the `allow` attribute and sets `referrerPolicy="no-referrer"`.

Notes:
- Your browser will prompt for camera/microphone access on first use.
- When deploying, ensure you run on `https://` so media permissions work reliably.

## Where things live

- `src/env/index.ts`: Typed env loader that throws when required variables are missing.
- `src/types/tavus.ts`: Minimal Tavus API response types.
- `src/lib/tavus.ts`: `createConversation` helper that calls Tavus API and returns `conversationUrl`.
- `src/app/api/tavus/new/route.ts`: POST route to create a conversation; accepts `{ userId?, memories? }`.
- `src/app/api/webhooks/tavus/route.ts`: Webhook stub for future recordings/transcripts callbacks.
- `src/app/page.tsx`: Minimal UI with two buttons and an iframe.

## Future work (scalable structure)

- Memories: Already supported via the `memories` boolean in the POST body (user ID defaults to a generated stable value per session if omitted).
- Recordings/Transcripts/Webhooks: Enable optional fields in `src/lib/tavus.ts` and handle callbacks in `src/app/api/webhooks/tavus/route.ts`.
- LiveKit Agent/Infra: Add a switch in `src/lib/tavus.ts` (TODO noted) to route traffic, leaving the minimal path unchanged.
- Tavus React Component Library: Swap the iframe approach for a provider + components in a new route like `app/cvi/`.

## Acceptance Criteria

- `pnpm dev` runs without type errors.
- Visiting the homepage shows buttons; clicking starts a Tavus session embedded via `<iframe>` using the `conversationUrl` from our API.
- Second button starts a session with Memories enabled (`memory_stores`).
- No auth or database required.
- Clear TODO comments exist where noted in code.

