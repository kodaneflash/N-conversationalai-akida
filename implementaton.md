### Implementation Overview

- **Environment loader** (`src/env/index.ts`)
  - Typed `env` object; throws at boot if `TAVUS_API_KEY`, `TAVUS_PERSONA_ID`, or `TAVUS_REPLICA_ID` is missing. Defaults `NEXT_PUBLIC_APP_NAME`.
  - Note: Only import on the server to avoid leaking secrets.

- **Types** (`src/types/tavus.ts`)
  - `TavusConversationResponse` with `conversation_url` for minimal API mapping.

- **Tavus client** (`src/lib/tavus.ts`)
  - `createConversation({ userId?, withMemories? })` → `Promise<{ conversationUrl: string }>`.
  - POST `https://api.tavus.io/conversations` with headers and JSON body: `{ persona_id, replica_id, memory_stores? }`.
  - Generates `crypto.randomUUID()` when `withMemories` is true and no `userId` provided.
  - Error handling: logs upstream response text on non-OK; improved network error logging for DNS/TLS/connect timeouts.
  - TODOs: optional fields for recordings/transcripts; webhook subscription helpers; future LiveKit routing switch.

- **API route** (`src/app/api/tavus/new/route.ts`)
  - `POST` with optional `{ userId?, memories? }` body.
  - Calls `createConversation` and returns `{ conversationUrl }` or `{ error }` with `500` on failure.
  - `export const dynamic = 'force-dynamic'` to avoid caching.

- **Webhook stub** (`src/app/api/webhooks/tavus/route.ts`)
  - Accepts `POST` and immediately responds `200`.
  - TODOs: signature validation and event handling for recordings/transcripts.

- **UI** (`src/app/page.tsx`)
  - Minimal client page with two buttons: “Start AI Video Chat” and “Start with Memories”.
  - On click, `POST /api/tavus/new` (optionally `{ memories: true }`), then render `<iframe>` full-viewport.
  - `<iframe>` attributes: `allow="camera; microphone; clipboard-write; autoplay; fullscreen; display-capture"`, `referrerPolicy="no-referrer"`.
  - Basic error state and focusable controls; minimal inline styles.

- **Docs** (`README.md`)
  - How to run, `.env.local` template, usage steps, and links to Tavus docs.

Notes
- Lint/type checks pass.
- Network errors to Tavus are surfaced clearly in server logs and as a concise client error message.

### Modification #2: Webhook System & Enhanced Configuration

- **Updated Types** (`src/types/tavus.ts`)
  - Full `TavusConversationResponse` with `conversation_id`, `conversation_name`, `status`, `replica_id`, `persona_id`, `created_at`.
  - Complete webhook event types: `TavusWebhookEvent`, `SystemReplicaJoinedEvent`, `SystemShutdownEvent`, `TranscriptionReadyEvent`, `RecordingReadyEvent`, `PerceptionAnalysisEvent`.

- **Enhanced Tavus client** (`src/lib/tavus.ts`)
  - `createConversation` now returns `{ conversationUrl, conversationId }`.
  - Added parameters: `callbackUrl`, `conversationName`, `conversationalContext`, `audioOnly`, `enableRecording`, recording S3 config, call timeouts, `language`, `enableClosedCaptions`, `applyGreenscreen`.
  - Correct endpoint: `https://tavusapi.com/v2/conversations` with `x-api-key` header.
  - Properties object for recording config: `enable_recording`, `recording_s3_bucket_name`, `recording_s3_bucket_region`, `aws_assume_role_arn`.
  - `cache: "no-store"` for fresh requests.

- **Updated API route** (`src/app/api/tavus/new/route.ts`)
  - `export const runtime = "nodejs"` to avoid Edge runtime socket issues.
  - Auto-constructs `callbackUrl` from request host: `https://${host}/api/webhooks/tavus`.
  - Accepts additional body params: `conversationName`, `conversationalContext`, `audioOnly`.
  - Returns both `conversationUrl` and `conversationId`.

- **Webhook handler** (`src/app/api/webhooks/tavus/route.ts`)
  - Node runtime, handles all 5 Tavus event types with proper TypeScript discrimination.
  - System events: `replica_joined` (replica ready), `shutdown` (conversation ended with reason).
  - Application events: `transcription_ready` (full transcript), `recording_ready` (S3 key), `perception_analysis` (visual behavior analysis).
  - Structured logging with conversation stats and event details.
  - TODOs for database storage, analytics, user notifications.

- **Test utilities** (`src/lib/webhook-test.ts`)
  - Mock webhook events for all event types with realistic data.
  - `sendTestWebhook()` and `testAllWebhooks()` functions for local testing.
  - Supports localhost and production testing.

**Critical Wiring Notes:**
- Webhooks only fire if `callback_url` is set during conversation creation ✅ (auto-added).
- Recording webhooks require S3 configuration in `properties` object ✅ (supported).
- Transcripts and perception analysis arrive post-conversation, not during ✅ (documented).

### TODO: Full Tavus CVI Capabilities Implementation
t
 how 