'use client';

import React, { useState, useCallback } from 'react';
import Launcher from '@/components/cvi-ui/launcher';
import CviModal from '@/components/cvi-ui/cvi-modal';
import { NavbarBack } from '@/components/navbar-wrapper';

interface ConversationResponse {
  conversationUrl: string;
  conversationId: string;
}

interface BusyError extends Error {
  code: 'BUSY';
}

function isBusyError(e: unknown): e is BusyError {
  if (typeof e !== 'object' || e === null) return false;
  const maybe = e as { code?: unknown };
  return maybe.code === 'BUSY';
}

export default function ChatPage() {
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage] = useState('english');

  const createConversation = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tavus/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memories: true,
          conversationName: 'Reaper AI Conversation',
          conversationalContext:
            "You are Reaper, a helpful AI companion. Be engaging, empathetic, and showcase your ability to have natural conversations while building meaningful connections.",
          audioOnly: false,
          enableRecording: false,
          enablePerception: true,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        type ErrorPayload = { error?: string; message?: string } | null;
        const errorData: ErrorPayload = await response.json().catch(() => null);
        // Propagate BUSY to modal by throwing a structured error the modal can catch
        if (response.status === 429 && errorData?.error === 'BUSY') {
          const e: BusyError = Object.assign(
            new Error(errorData.message || 'Capacity busy'),
            { code: 'BUSY' as const }
          );
          throw e;
        }
        throw new Error(errorData?.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ConversationResponse = await response.json();
      setConversationUrl(data.conversationUrl);
      return data.conversationUrl;
    } catch (err) {
      console.error('Failed to create conversation:', err);
      // For BUSY, do not show the global error banner; modal handles it
      if (!isBusyError(err)) {
        setError(err instanceof Error ? err.message : 'Failed to create conversation');
      }
      // Re-throw so modal onStart handler can branch to busy state
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [selectedLanguage]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setConversationUrl(null);
    setError(null);
  }, []);

  const handleLauncherStart = useCallback(async () => {
    setIsOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-obsidian-800">
      <NavbarBack />
      {/* Non-popup Launcher hero */}
      <div className="site-container py-12">
        <Launcher onStart={handleLauncherStart} />
      </div>

      {/* Modal */}
      <CviModal open={isOpen} onClose={handleClose} conversationUrl={conversationUrl} onStart={async () => { await createConversation(); }} />

      {/* Error and loading hints below the fold */}
      {error && (
        <div className="mx-auto my-6 w-full max-w-screen-md rounded-lg border border-red-500/50 bg-red-500/20 p-4 text-red-100">
          <strong>Error:</strong> {error}
        </div>
      )}
      {isLoading && !isOpen && (
        <div className="mx-auto my-6 w-full max-w-screen-md text-center text-white/70">
          Starting conversation…
        </div>
      )}
    </div>
  );
}
