'use client';

import { useCallback, useEffect } from 'react';
import { useAppMessage } from '@daily-co/daily-react';

export interface CVIEvent {
  event_type: string;
  properties: Record<string, unknown>;
  conversation_id?: string;
  timestamp: string;
}

export interface SendAppMessageProps {
  type: 'echo' | 'respond' | 'interrupt' | 'context' | 'toolcall';
  payload: Record<string, unknown>;
}

/**
 * A React hook that listens for CVI app messages and provides a callback mechanism 
 * for handling various conversation events.
 */
export function useObservableEvent(callback: (event: CVIEvent) => void) {
  const sendAppMessage = useAppMessage();

  // Handle incoming app messages
  useEffect(() => {
    const handleAppMessage = (event: MessageEvent) => {
      if (event?.data && typeof event.data === 'object') {
        const cviEvent: CVIEvent = {
          event_type: event.data.event_type || 'unknown',
          properties: event.data.properties || {},
          conversation_id: event.data.conversation_id,
          timestamp: event.data.timestamp || new Date().toISOString(),
        };
        
        callback(cviEvent);
      }
    };

    // Listen for Daily.co app messages
    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleAppMessage);
      return () => window.removeEventListener('message', handleAppMessage);
    }
  }, [callback]);

  return { sendAppMessage };
}

/**
 * A React hook that provides a function to send CVI app messages to other participants.
 */
export function useSendAppMessage() {
  const sendAppMessage = useAppMessage();

  const sendMessage = useCallback((message: SendAppMessageProps) => {
    if (!sendAppMessage) {
      console.warn('sendAppMessage is not available');
      return;
    }

    try {
      sendAppMessage({
        type: message.type,
        payload: message.payload,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to send app message:', error);
    }
  }, [sendAppMessage]);

  return sendMessage;
}
