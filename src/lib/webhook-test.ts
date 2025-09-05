/**
 * Test utilities for Tavus webhook integration
 * Use these to test your webhook handlers locally
 */

import type {
  SystemReplicaJoinedEvent,
  SystemShutdownEvent,
  TranscriptionReadyEvent,
  RecordingReadyEvent,
  PerceptionAnalysisEvent,
} from "@/types/tavus";

export const mockWebhookEvents = {
  replicaJoined: (): SystemReplicaJoinedEvent => ({
    properties: {
      replica_id: "r79e1c033f",
    },
    conversation_id: "c123456",
    webhook_url: "http://localhost:3000/api/webhooks/tavus",
    event_type: "system.replica_joined",
    message_type: "system",
    timestamp: new Date().toISOString(),
  }),

  systemShutdown: (reason = "end_conversation_endpoint_hit"): SystemShutdownEvent => ({
    properties: {
      replica_id: "r79e1c033f",
      shutdown_reason: reason,
    },
    conversation_id: "c123456",
    webhook_url: "http://localhost:3000/api/webhooks/tavus",
    event_type: "system.shutdown",
    message_type: "system",
    timestamp: new Date().toISOString(),
  }),

  transcriptionReady: (): TranscriptionReadyEvent => ({
    properties: {
      replica_id: "r79e1c033f",
      transcript: [
        {
          role: "system",
          content: "You are in a live video conference call with a user...",
        },
        {
          role: "user",
          content: "Hi there!",
        },
        {
          role: "assistant",
          content: "Hello! How can I help you today?",
        },
        {
          role: "user",
          content: "I'd like to know more about AI technology.",
        },
        {
          role: "assistant",
          content: "AI is fascinating! What specific area interests you most?",
        },
      ],
    },
    conversation_id: "c123456",
    webhook_url: "http://localhost:3000/api/webhooks/tavus",
    event_type: "application.transcription_ready",
    message_type: "application",
    timestamp: new Date().toISOString(),
  }),

  recordingReady: (): RecordingReadyEvent => ({
    properties: {
      replica_id: "r79e1c033f",
      s3_key: "recordings/c123456/conversation_2024_01_15.mp4",
    },
    conversation_id: "c123456",
    webhook_url: "http://localhost:3000/api/webhooks/tavus",
    event_type: "application.recording_ready",
    message_type: "application",
    timestamp: new Date().toISOString(),
  }),

  perceptionAnalysis: (): PerceptionAnalysisEvent => ({
    properties: {
      replica_id: "r79e1c033f",
      analysis: "The user appeared engaged throughout the conversation, maintaining eye contact and showing positive facial expressions. They seemed particularly interested when discussing AI applications in healthcare.",
    },
    conversation_id: "c123456",
    webhook_url: "http://localhost:3000/api/webhooks/tavus",
    event_type: "application.perception_analysis",
    message_type: "application",
    timestamp: new Date().toISOString(),
  }),
};

/**
 * Send a test webhook to your local server
 * Usage: await sendTestWebhook('transcriptionReady', 'http://localhost:3000')
 */
export async function sendTestWebhook(
  eventType: keyof typeof mockWebhookEvents,
  baseUrl = "http://localhost:3000"
) {
  const event = mockWebhookEvents[eventType]();
  
  try {
    const response = await fetch(`${baseUrl}/api/webhooks/tavus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ Test webhook sent successfully:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send test webhook:`, error);
    throw error;
  }
}

/**
 * Test all webhook event types
 */
export async function testAllWebhooks(baseUrl = "http://localhost:3000") {
  const events = Object.keys(mockWebhookEvents) as Array<keyof typeof mockWebhookEvents>;
  
  console.log(`🧪 Testing ${events.length} webhook events...`);
  
  for (const eventType of events) {
    try {
      console.log(`📨 Testing ${eventType}...`);
      await sendTestWebhook(eventType, baseUrl);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Test failed for ${eventType}:`, error);
    }
  }
  
  console.log(`✅ Webhook testing complete!`);
}
