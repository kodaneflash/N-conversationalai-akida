import { env } from "@/env";
import type { TavusConversationResponse } from "@/types/tavus";

export interface CreateConversationParams {
  userId?: string;
  withMemories?: boolean;
  callbackUrl?: string;
  conversationName?: string;
  conversationalContext?: string;
  audioOnly?: boolean;
  // Recording configuration
  enableRecording?: boolean;
  recordingS3BucketName?: string;
  recordingS3BucketRegion?: string;
  awsAssumeRoleArn?: string;
  // Additional properties
  maxCallDuration?: number;
  participantLeftTimeout?: number;
  participantAbsentTimeout?: number;
  language?: string;
  enableClosedCaptions?: boolean;
  applyGreenscreen?: boolean;
}

export async function createConversation(
  params: CreateConversationParams = {}
): Promise<{ conversationUrl: string; conversationId: string }> {
  const { 
    userId, 
    withMemories, 
    callbackUrl, 
    conversationName, 
    conversationalContext, 
    audioOnly,
    enableRecording,
    recordingS3BucketName,
    recordingS3BucketRegion,
    awsAssumeRoleArn,
    maxCallDuration,
    participantLeftTimeout,
    participantAbsentTimeout,
    language,
    enableClosedCaptions,
    applyGreenscreen
  } = params;

  const memoryStores: string[] | undefined = withMemories
    ? [userId ?? `guest-${crypto.randomUUID()}`]
    : undefined;

  // Build properties object
  const properties: Record<string, unknown> = {};
  
  if (enableRecording && recordingS3BucketName && recordingS3BucketRegion && awsAssumeRoleArn) {
    properties.enable_recording = true;
    properties.recording_s3_bucket_name = recordingS3BucketName;
    properties.recording_s3_bucket_region = recordingS3BucketRegion;
    properties.aws_assume_role_arn = awsAssumeRoleArn;
  }
  
  if (maxCallDuration !== undefined) properties.max_call_duration = maxCallDuration;
  if (participantLeftTimeout !== undefined) properties.participant_left_timeout = participantLeftTimeout;
  if (participantAbsentTimeout !== undefined) properties.participant_absent_timeout = participantAbsentTimeout;
  if (language !== undefined) properties.language = language;
  if (enableClosedCaptions !== undefined) properties.enable_closed_captions = enableClosedCaptions;
  if (applyGreenscreen !== undefined) properties.apply_greenscreen = applyGreenscreen;

  const body: Record<string, unknown> = {
    persona_id: env.TAVUS_PERSONA_ID,
    replica_id: env.TAVUS_REPLICA_ID,
    ...(memoryStores ? { memory_stores: memoryStores } : {}),
    ...(callbackUrl ? { callback_url: callbackUrl } : {}),
    ...(conversationName ? { conversation_name: conversationName } : {}),
    ...(conversationalContext ? { conversational_context: conversationalContext } : {}),
    ...(audioOnly !== undefined ? { audio_only: audioOnly } : {}),
    ...(Object.keys(properties).length > 0 ? { properties } : {}),
  };

  let response: Response;
  try {
    response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.TAVUS_API_KEY,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (err) {
    // Network/TLS/DNS errors are thrown here before any response is available
    console.error("Network error calling Tavus conversations endpoint:", err);
    throw new Error("Network error reaching Tavus API (see server logs)");
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    // Log upstream error for debugging (server-side)
    console.error("Tavus createConversation error:", response.status, text);
    throw new Error(
      `Failed to create Tavus conversation: ${response.status} ${response.statusText}`
    );
  }

  const data: TavusConversationResponse = await response.json();
  const conversationUrl = data.conversation_url;
  const conversationId = data.conversation_id;
  
  if (!conversationUrl) {
    throw new Error("Tavus API did not return conversation_url");
  }
  
  if (!conversationId) {
    throw new Error("Tavus API did not return conversation_id");
  }

  return { conversationUrl, conversationId };
}

// Additional Tavus API functions for comprehensive functionality

/**
 * Get conversation details
 */
export async function getConversation(conversationId: string) {
  const response = await fetch(`https://tavusapi.com/v2/conversations/${conversationId}`, {
    method: "GET",
    headers: {
      "x-api-key": env.TAVUS_API_KEY,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("Tavus getConversation error:", response.status, text);
    throw new Error(`Failed to get Tavus conversation: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * List all conversations
 */
export async function listConversations(limit?: number, offset?: number) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());
  
  const url = `https://tavusapi.com/v2/conversations${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": env.TAVUS_API_KEY,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("Tavus listConversations error:", response.status, text);
    throw new Error(`Failed to list Tavus conversations: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * End a conversation
 */
export async function endConversation(conversationId: string) {
  const response = await fetch(`https://tavusapi.com/v2/conversations/${conversationId}/end`, {
    method: "POST",
    headers: {
      "x-api-key": env.TAVUS_API_KEY,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("Tavus endConversation error:", response.status, text);
    throw new Error(`Failed to end Tavus conversation: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Delete a conversation
 */
export async function deleteConversation(conversationId: string) {
  const response = await fetch(`https://tavusapi.com/v2/conversations/${conversationId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": env.TAVUS_API_KEY,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("Tavus deleteConversation error:", response.status, text);
    throw new Error(`Failed to delete Tavus conversation: ${response.status} ${response.statusText}`);
  }

  return response.status === 204;
}

/**
 * Memory management functions
 */
export interface MemoryStore {
  user_id: string;
  memories: Array<{
    key: string;
    value: string;
    timestamp: string;
    context?: string;
  }>;
}

/**
 * Create or update memory for a user
 */
export async function updateMemory(userId: string, key: string, value: string, context?: string) {
  // Note: This is a placeholder implementation as Tavus memory API details weren't fully specified
  // In a real implementation, this would integrate with Tavus memory stores
  
  const memoryEntry = {
    key,
    value,
    timestamp: new Date().toISOString(),
    context,
  };
  
  // TODO: Implement actual Tavus memory API calls when available
  console.log(`Updating memory for user ${userId}:`, memoryEntry);
  
  return memoryEntry;
}

/**
 * Retrieve memories for a user
 */
export async function getMemories(userId: string): Promise<MemoryStore> {
  // TODO: Implement actual Tavus memory retrieval when API is available
  console.log(`Retrieving memories for user ${userId}`);
  
  return {
    user_id: userId,
    memories: []
  };
}

/**
 * Perception analysis functions
 */
export interface PerceptionConfig {
  enableVisualAnalysis: boolean;
  enableEmotionDetection: boolean;
  enableAppearanceAnalysis: boolean;
  analysisFrequency?: 'continuous' | 'periodic' | 'on_demand';
}

/**
 * Configure perception analysis for a persona
 */
export async function configurePerception(personaId: string, config: PerceptionConfig) {
  // Note: This would integrate with Tavus persona perception configuration
  // Currently implemented as a placeholder for the actual API
  
  console.log(`Configuring perception for persona ${personaId}:`, config);
  
  // TODO: Implement actual Tavus perception configuration API
  return { success: true, personaId, config };
}

/**
 * Live interaction functions
 */
export interface InteractionMessage {
  type: 'interrupt' | 'respond' | 'echo' | 'context_override';
  content: string;
  metadata?: Record<string, unknown>;
}

/**
 * Send a live interaction message to a conversation
 */
export async function sendLiveInteraction(conversationId: string, message: InteractionMessage) {
  // TODO: Implement actual Tavus live interaction API
  console.log(`Sending live interaction to conversation ${conversationId}:`, message);
  
  return { success: true, conversationId, message };
}

// TODO: add webhook subscription creators (once we define endpoints) to handle recordings/transcripts callbacks
// TODO: add switches/params to route traffic to LiveKit in future (not used now)


