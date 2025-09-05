export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import type {
  AllTavusWebhookEvents,
  SystemReplicaJoinedEvent,
  SystemShutdownEvent,
  TranscriptionReadyEvent,
  RecordingReadyEvent,
  PerceptionAnalysisEvent,
  ConversationUtteranceEvent,
  ConversationRespondEvent,
  ConversationInterruptEvent,
  ConversationToolCallEvent,
  ConversationEchoEvent,
  ConversationOverwriteContextEvent,
  ConversationSensitivityEvent,
  ConversationReplicaStartedStoppedSpeakingEvent,
  ConversationUserStartedStoppedSpeakingEvent,
  ConversationReplicaInterruptedEvent,
  ConversationPerceptionToolCallEvent,
} from "@/types/tavus";

export async function POST(request: Request) {
  try {
    const event: AllTavusWebhookEvents = await request.json();
    
    console.log(`📨 Received Tavus webhook: ${event.event_type} for conversation ${event.conversation_id}`);
    
    // Handle different event types
    switch (event.event_type) {
      case "system.replica_joined":
        await handleReplicaJoined(event as SystemReplicaJoinedEvent);
        break;
        
      case "system.shutdown":
        await handleSystemShutdown(event as SystemShutdownEvent);
        break;
        
      case "application.transcription_ready":
        await handleTranscriptionReady(event as TranscriptionReadyEvent);
        break;
        
      case "application.recording_ready":
        await handleRecordingReady(event as RecordingReadyEvent);
        break;
        
      case "application.perception_analysis":
        await handlePerceptionAnalysis(event as PerceptionAnalysisEvent);
        break;
        
      // Live interaction events
      case "conversation.utterance":
        await handleConversationUtterance(event as ConversationUtteranceEvent);
        break;
        
      case "conversation.respond":
        await handleConversationRespond(event as ConversationRespondEvent);
        break;
        
      case "conversation.interrupt":
        await handleConversationInterrupt(event as ConversationInterruptEvent);
        break;
        
      case "conversation.toolcall":
        await handleConversationToolCall(event as ConversationToolCallEvent);
        break;
        
      case "conversation.echo":
        await handleConversationEcho(event as ConversationEchoEvent);
        break;
        
      case "conversation.overwrite_context":
        await handleConversationOverwriteContext(event as ConversationOverwriteContextEvent);
        break;
        
      case "conversation.sensitivity":
        await handleConversationSensitivity(event as ConversationSensitivityEvent);
        break;
        
      // Speaking events
      case "conversation.replica.started_speaking":
      case "conversation.replica.stopped_speaking":
        await handleReplicaSpeakingEvents(event as ConversationReplicaStartedStoppedSpeakingEvent);
        break;
        
      case "conversation.user.started_speaking":
      case "conversation.user.stopped_speaking":
        await handleUserSpeakingEvents(event as ConversationUserStartedStoppedSpeakingEvent);
        break;
        
      case "conversation.replica.interrupted":
        await handleReplicaInterrupted(event as ConversationReplicaInterruptedEvent);
        break;
        
      case "conversation.perception_tool_call":
        await handlePerceptionToolCall(event as ConversationPerceptionToolCallEvent);
        break;
        
      default:
        console.log(`⚠️ Unhandled event type: ${(event as AllTavusWebhookEvents).event_type}`);
    }
    
    return Response.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error processing Tavus webhook:", error);
    return Response.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

async function handleReplicaJoined(event: SystemReplicaJoinedEvent) {
  console.log(`✅ Replica ${event.properties.replica_id} joined conversation ${event.conversation_id}`);
  
  // TODO: Update conversation status in database
  // TODO: Notify frontend via WebSocket/SSE that replica is ready
  // TODO: Log analytics event
}

async function handleSystemShutdown(event: SystemShutdownEvent) {
  const { shutdown_reason } = event.properties;
  console.log(`🔚 Conversation ${event.conversation_id} ended: ${shutdown_reason}`);
  
  // TODO: Update conversation status in database
  // TODO: Trigger cleanup tasks
  // TODO: Notify frontend that conversation ended
  
  // Log different shutdown reasons for monitoring
  switch (shutdown_reason) {
    case "max_call_duration reached":
      console.log("📊 Call ended due to max duration");
      break;
    case "participant_left_timeout reached":
      console.log("👋 Call ended due to participant leaving");
      break;
    case "participant_absent_timeout reached":
      console.log("⏰ Call ended due to participant absence");
      break;
    case "end_conversation_endpoint_hit":
      console.log("🛑 Call ended via API");
      break;
    default:
      console.log(`🔍 Call ended: ${shutdown_reason}`);
  }
}

async function handleTranscriptionReady(event: TranscriptionReadyEvent) {
  const { transcript } = event.properties;
  console.log(`📝 Transcript ready for conversation ${event.conversation_id}`);
  console.log(`   Messages: ${transcript.length}`);
  
  // TODO: Store transcript in database
  // TODO: Process transcript for analytics/insights
  // TODO: Trigger post-conversation workflows
  
  // Log conversation stats
  const userMessages = transcript.filter(msg => msg.role === "user").length;
  const assistantMessages = transcript.filter(msg => msg.role === "assistant").length;
  console.log(`   User turns: ${userMessages}, Assistant turns: ${assistantMessages}`);
  
  // Example: Log first and last messages for debugging
  if (transcript.length > 0) {
    console.log(`   First message: ${transcript[0].role}: "${transcript[0].content.slice(0, 100)}..."`);
    const lastMsg = transcript[transcript.length - 1];
    console.log(`   Last message: ${lastMsg.role}: "${lastMsg.content.slice(0, 100)}..."`);
  }
}

async function handleRecordingReady(event: RecordingReadyEvent) {
  const { s3_key } = event.properties;
  console.log(`🎥 Recording ready for conversation ${event.conversation_id}`);
  console.log(`   S3 Key: ${s3_key}`);
  
  // TODO: Store recording metadata in database
  // TODO: Process recording for highlights/clips
  // TODO: Send recording link to user
  // TODO: Trigger video processing pipeline
}

async function handlePerceptionAnalysis(event: PerceptionAnalysisEvent) {
  const { analysis } = event.properties;
  console.log(`👁️ Perception analysis ready for conversation ${event.conversation_id}`);
  console.log(`   Analysis: ${analysis.slice(0, 200)}...`);
  
  // TODO: Store perception analysis in database
  // TODO: Extract insights/metrics from analysis
  // TODO: Trigger follow-up actions based on analysis
  // TODO: Send analysis to user if requested
}

// Live interaction event handlers
async function handleConversationUtterance(event: ConversationUtteranceEvent) {
  const { speech, role } = event.properties;
  console.log(`💬 Utterance from ${role} in conversation ${event.conversation_id}`);
  console.log(`   Speech: "${speech.slice(0, 100)}..."`);
  
  // TODO: Store utterance in real-time database
  // TODO: Trigger real-time UI updates
  // TODO: Process speech for sentiment analysis
}

async function handleConversationRespond(event: ConversationRespondEvent) {
  const { text } = event.properties;
  console.log(`🗣️ Replica response in conversation ${event.conversation_id}`);
  console.log(`   Response: "${text.slice(0, 100)}..."`);
  
  // TODO: Log response for analytics
  // TODO: Update conversation state
  // TODO: Trigger follow-up actions
}

async function handleConversationInterrupt(event: ConversationInterruptEvent) {
  const { text } = event.properties;
  console.log(`⚡ User interrupted in conversation ${event.conversation_id}`);
  console.log(`   Interrupt text: "${text.slice(0, 100)}..."`);
  
  // TODO: Handle conversation flow interruption
  // TODO: Log interruption patterns for analysis
  // TODO: Adjust replica behavior based on interrupts
}

async function handleConversationToolCall(event: ConversationToolCallEvent) {
  const { tool_name, tool_args, tool_result } = event.properties;
  console.log(`🔧 Tool call in conversation ${event.conversation_id}`);
  console.log(`   Tool: ${tool_name}`);
  console.log(`   Args:`, tool_args);
  if (tool_result) {
    console.log(`   Result:`, tool_result);
  }
  
  // TODO: Store tool usage analytics
  // TODO: Monitor tool performance
  // TODO: Trigger custom tool integrations
}

async function handleConversationEcho(event: ConversationEchoEvent) {
  const { text } = event.properties;
  console.log(`🔄 Echo event in conversation ${event.conversation_id}`);
  console.log(`   Echo text: "${text.slice(0, 100)}..."`);
  
  // TODO: Handle echo for testing/debugging
  // TODO: Log echo events for diagnostics
}

async function handleConversationOverwriteContext(event: ConversationOverwriteContextEvent) {
  const { context } = event.properties;
  console.log(`📝 Context overwrite in conversation ${event.conversation_id}`);
  console.log(`   New context: "${context.slice(0, 100)}..."`);
  
  // TODO: Update conversation context in database
  // TODO: Log context changes for audit
  // TODO: Trigger context-aware responses
}

async function handleConversationSensitivity(event: ConversationSensitivityEvent) {
  const { sensitivity_level, content } = event.properties;
  console.log(`⚠️ Sensitivity alert in conversation ${event.conversation_id}`);
  console.log(`   Level: ${sensitivity_level}`);
  console.log(`   Content: "${content.slice(0, 100)}..."`);
  
  // TODO: Handle sensitive content appropriately
  // TODO: Trigger moderation workflows
  // TODO: Log for compliance monitoring
  
  if (sensitivity_level === "high") {
    console.log(`🚨 High sensitivity content detected - consider intervention`);
    // TODO: Implement escalation procedures
  }
}

// Speaking event handlers
async function handleReplicaSpeakingEvents(event: ConversationReplicaStartedStoppedSpeakingEvent) {
  const isStarted = event.event_type === "conversation.replica.started_speaking";
  console.log(`🎤 Replica ${isStarted ? 'started' : 'stopped'} speaking in conversation ${event.conversation_id}`);
  
  // TODO: Update UI speaking indicators
  // TODO: Track speaking patterns and duration
  // TODO: Trigger real-time animations
}

async function handleUserSpeakingEvents(event: ConversationUserStartedStoppedSpeakingEvent) {
  const isStarted = event.event_type === "conversation.user.started_speaking";
  console.log(`👤 User ${isStarted ? 'started' : 'stopped'} speaking in conversation ${event.conversation_id}`);
  
  // TODO: Update UI speaking indicators
  // TODO: Track user engagement metrics
  // TODO: Adjust replica listening behavior
}

async function handleReplicaInterrupted(event: ConversationReplicaInterruptedEvent) {
  const { interrupted_at } = event.properties;
  console.log(`🛑 Replica interrupted in conversation ${event.conversation_id}`);
  console.log(`   Interrupted at: ${interrupted_at}`);
  
  // TODO: Handle interruption gracefully
  // TODO: Log interruption patterns
  // TODO: Adjust conversation flow
}

async function handlePerceptionToolCall(event: ConversationPerceptionToolCallEvent) {
  const { tool_name, visual_data, analysis_result } = event.properties;
  console.log(`👁️🔧 Perception tool call in conversation ${event.conversation_id}`);
  console.log(`   Tool: ${tool_name}`);
  console.log(`   Visual data: ${visual_data.slice(0, 100)}...`);
  console.log(`   Analysis: ${analysis_result.slice(0, 100)}...`);
  
  // TODO: Process visual analysis results
  // TODO: Store perception insights
  // TODO: Trigger visual-based responses
}