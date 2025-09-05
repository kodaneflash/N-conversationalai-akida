export interface TavusConversationResponse {
  conversation_id: string;
  conversation_name: string;
  conversation_url: string;
  status: string;
  callback_url: string;
  replica_id: string;
  persona_id: string;
  created_at: string;
}

// Webhook Event Types
export interface TavusWebhookEvent {
  properties: Record<string, unknown>;
  conversation_id: string;
  webhook_url: string;
  event_type: string;
  message_type: "system" | "application";
  timestamp: string;
}

export interface SystemReplicaJoinedEvent extends TavusWebhookEvent {
  event_type: "system.replica_joined";
  message_type: "system";
  properties: {
    replica_id: string;
  };
}

export interface SystemShutdownEvent extends TavusWebhookEvent {
  event_type: "system.shutdown";
  message_type: "system";
  properties: {
    replica_id: string;
    shutdown_reason: string;
  };
}

export interface TranscriptionReadyEvent extends TavusWebhookEvent {
  event_type: "application.transcription_ready";
  message_type: "application";
  properties: {
    replica_id: string;
    transcript: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }>;
  };
}

export interface RecordingReadyEvent extends TavusWebhookEvent {
  event_type: "application.recording_ready";
  message_type: "application";
  properties: {
    replica_id: string;
    s3_key: string;
  };
}

export interface PerceptionAnalysisEvent extends TavusWebhookEvent {
  event_type: "application.perception_analysis";
  message_type: "application";
  properties: {
    replica_id: string;
    analysis: string;
  };
}

// Additional webhook event types for comprehensive coverage
export interface ConversationUtteranceEvent extends TavusWebhookEvent {
  event_type: "conversation.utterance";
  message_type: "application";
  properties: {
    replica_id: string;
    speech: string;
    role: "user" | "assistant";
    timestamp: string;
  };
}

export interface ConversationRespondEvent extends TavusWebhookEvent {
  event_type: "conversation.respond";
  message_type: "application";
  properties: {
    replica_id: string;
    text: string;
    timestamp: string;
  };
}

export interface ConversationInterruptEvent extends TavusWebhookEvent {
  event_type: "conversation.interrupt";
  message_type: "application";
  properties: {
    replica_id: string;
    text: string;
    timestamp: string;
  };
}

export interface ConversationToolCallEvent extends TavusWebhookEvent {
  event_type: "conversation.toolcall";
  message_type: "application";
  properties: {
    replica_id: string;
    tool_name: string;
    tool_args: Record<string, unknown>;
    tool_result?: unknown;
    timestamp: string;
  };
}

export interface ConversationEchoEvent extends TavusWebhookEvent {
  event_type: "conversation.echo";
  message_type: "application";
  properties: {
    replica_id: string;
    text: string;
    timestamp: string;
  };
}

export interface ConversationOverwriteContextEvent extends TavusWebhookEvent {
  event_type: "conversation.overwrite_context";
  message_type: "application";
  properties: {
    replica_id: string;
    context: string;
    timestamp: string;
  };
}

export interface ConversationSensitivityEvent extends TavusWebhookEvent {
  event_type: "conversation.sensitivity";
  message_type: "application";
  properties: {
    replica_id: string;
    sensitivity_level: "low" | "medium" | "high";
    content: string;
    timestamp: string;
  };
}

export interface ConversationReplicaStartedStoppedSpeakingEvent extends TavusWebhookEvent {
  event_type: "conversation.replica.started_speaking" | "conversation.replica.stopped_speaking";
  message_type: "application";
  properties: {
    replica_id: string;
    timestamp: string;
  };
}

export interface ConversationUserStartedStoppedSpeakingEvent extends TavusWebhookEvent {
  event_type: "conversation.user.started_speaking" | "conversation.user.stopped_speaking";
  message_type: "application";
  properties: {
    replica_id: string;
    timestamp: string;
  };
}

export interface ConversationReplicaInterruptedEvent extends TavusWebhookEvent {
  event_type: "conversation.replica.interrupted";
  message_type: "application";
  properties: {
    replica_id: string;
    interrupted_at: string;
    timestamp: string;
  };
}

export interface ConversationPerceptionToolCallEvent extends TavusWebhookEvent {
  event_type: "conversation.perception_tool_call";
  message_type: "application";
  properties: {
    replica_id: string;
    tool_name: string;
    visual_data: string;
    analysis_result: string;
    timestamp: string;
  };
}

// Union type for all webhook events
export type AllTavusWebhookEvents = 
  | SystemReplicaJoinedEvent
  | SystemShutdownEvent
  | TranscriptionReadyEvent
  | RecordingReadyEvent
  | PerceptionAnalysisEvent
  | ConversationUtteranceEvent
  | ConversationRespondEvent
  | ConversationInterruptEvent
  | ConversationToolCallEvent
  | ConversationEchoEvent
  | ConversationOverwriteContextEvent
  | ConversationSensitivityEvent
  | ConversationReplicaStartedStoppedSpeakingEvent
  | ConversationUserStartedStoppedSpeakingEvent
  | ConversationReplicaInterruptedEvent
  | ConversationPerceptionToolCallEvent;


