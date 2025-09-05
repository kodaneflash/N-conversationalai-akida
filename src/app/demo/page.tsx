'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { CVIProvider } from '@/components/cvi/components/cvi-provider';
import { Conversation } from '@/components/cvi/components/conversation';

interface ConversationConfig {
  userId?: string;
  memories: boolean;
  conversationName: string;
  conversationalContext: string;
  audioOnly: boolean;
  enableRecording: boolean;
  enablePerception: boolean;
  language: string;
}

interface ConversationResponse {
  conversationUrl: string;
  conversationId: string;
}

export default function DemoPage() {
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ConversationConfig>({
    userId: '',
    memories: true,
    conversationName: 'Tavus Demo Conversation',
    conversationalContext: 'You are a helpful AI assistant demonstrating Tavus capabilities. Be engaging and showcase your ability to have natural conversations.',
    audioOnly: false,
    enableRecording: false,
    enablePerception: true,
    language: 'english'
  });

  const createConversation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/tavus/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: config.userId || undefined,
          memories: config.memories,
          conversationName: config.conversationName,
          conversationalContext: config.conversationalContext,
          audioOnly: config.audioOnly,
          enableRecording: config.enableRecording,
          enablePerception: config.enablePerception,
          language: config.language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ConversationResponse = await response.json();
      setConversationUrl(data.conversationUrl);
      setConversationId(data.conversationId);
    } catch (err) {
      console.error('Failed to create conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to create conversation');
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const handleLeave = useCallback(() => {
    setConversationUrl(null);
    setConversationId(null);
    setError(null);
  }, []);

  const handleConfigChange = useCallback((field: keyof ConversationConfig, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  }, []);

  if (conversationUrl) {
    return (
      <CVIProvider>
        <div className="w-full h-screen bg-black">
          <Conversation 
            conversationUrl={conversationUrl} 
            onLeave={handleLeave}
          />
        </div>
      </CVIProvider>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tavus Conversational AI Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the power of Tavus CVI with real-time video conversations, 
            memory persistence, perception analysis, and more.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                User ID (optional)
              </label>
              <input
                type="text"
                value={config.userId}
                onChange={(e) => handleConfigChange('userId', e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Leave empty for guest user"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Conversation Name
              </label>
              <input
                type="text"
                value={config.conversationName}
                onChange={(e) => handleConfigChange('conversationName', e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Conversational Context
              </label>
              <textarea
                value={config.conversationalContext}
                onChange={(e) => handleConfigChange('conversationalContext', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                value={config.language}
                onChange={(e) => handleConfigChange('language', e.target.value)}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="portuguese">Portuguese</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="memories"
                  checked={config.memories}
                  onChange={(e) => handleConfigChange('memories', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500"
                />
                <label htmlFor="memories" className="ml-2 text-sm text-gray-300">
                  Enable Memory Persistence
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="audioOnly"
                  checked={config.audioOnly}
                  onChange={(e) => handleConfigChange('audioOnly', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500"
                />
                <label htmlFor="audioOnly" className="ml-2 text-sm text-gray-300">
                  Audio Only Mode
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableRecording"
                  checked={config.enableRecording}
                  onChange={(e) => handleConfigChange('enableRecording', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500"
                />
                <label htmlFor="enableRecording" className="ml-2 text-sm text-gray-300">
                  Enable Recording
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enablePerception"
                  checked={config.enablePerception}
                  onChange={(e) => handleConfigChange('enablePerception', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500"
                />
                <label htmlFor="enablePerception" className="ml-2 text-sm text-gray-300">
                  Enable Perception Analysis
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Features Included</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🎥 CVI Components</h3>
              <p className="text-gray-300 text-sm">
                Pre-built React components for video calls, device selection, and media controls.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🧠 Memory Stores</h3>
              <p className="text-gray-300 text-sm">
                Cross-conversation persistence to maintain context across sessions.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">👁️ Perception Analysis</h3>
              <p className="text-gray-300 text-sm">
                Visual analysis of user behavior, emotions, and appearance.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">📡 Webhooks</h3>
              <p className="text-gray-300 text-sm">
                Real-time callbacks for system events, transcripts, and recordings.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🎙️ Recording</h3>
              <p className="text-gray-300 text-sm">
                Optional conversation recording with S3 integration.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">🌍 Multi-language</h3>
              <p className="text-gray-300 text-sm">
                Support for 30+ languages with natural conversation flow.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-200">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={createConversation}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Conversation...
                </span>
              ) : (
                'Start Tavus Conversation'
              )}
            </button>
          </div>

          {conversationId && (
            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Conversation ID: <code className="bg-white/20 px-2 py-1 rounded">{conversationId}</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
