'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { CVIProvider } from '@/components/cvi/components/cvi-provider';
import { Conversation } from '@/components/cvi/components/conversation';
import { HairCheck } from '../cvi/components/hair-check';
import { useMeetingState } from '@daily-co/daily-react';
import { StartCallButton } from './start-call-button';

interface CviModalProps {
  open: boolean;
  onClose: () => void;
  conversationUrl: string | null;
  onStart?: () => Promise<void> | void;
}

type ModalStep = 'landing' | 'preflight' | 'session';
 
const StatusPill: React.FC = () => {
  const meetingState = useMeetingState();

  const { label, dot } = useMemo(() => {
    switch (meetingState) {
      case 'joining-meeting':
      case 'loading':
        return { label: 'Calling…', dot: 'bg-yellow-400' };
      case 'joined-meeting':
        return { label: 'Connected', dot: 'bg-green-500' };
      case 'left-meeting':
        return { label: 'Ended', dot: 'bg-red-500' };
      default:
        return { label: 'Waiting', dot: 'bg-gray-400' };
    }
  }, [meetingState]);

  return (
    <div className="pointer-events-none absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-lg">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span>{label}</span>
    </div>
  );
};

export const CviModal: React.FC<CviModalProps> = ({ open, onClose, conversationUrl, onStart }) => {
  const [step, setStep] = useState<ModalStep>('landing');
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setStep('landing');
    onClose();
  }, [onClose]);

  const handleStartClick = useCallback(async () => {
    try {
      setIsStartLoading(true);
      await onStart?.();
      setStep('preflight');
    } finally {
      setIsStartLoading(false);
    }
  }, [onStart]);

  const handleJoinCall = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!conversationUrl) {
        await onStart?.();
      }
      setStep('session');
    } finally {
      setIsLoading(false);
    }
  }, [conversationUrl, onStart]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-0 md:p-8">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative h-[100svh] md:min-h-auto md:h-auto md:aspect-video max-w-dialog-w w-full md:rounded-container md:border-primary md:border-2 flex items-center justify-center shadow-container overflow-hidden bg-replica bg-center bg-cover bg-no-repeat">
        {/* Background video */}
        <video className="pointer-events-none absolute inset-0 h-full w-full object-cover" autoPlay playsInline muted loop>
          <source src="https://cdn.replica.tavus.io/conversational-dialog/rep-dem.mp4" type="video/mp4" />
        </video>
        {/* Glass veil */}
        <div className="pointer-events-none absolute inset-0 bg-[rgba(8,3,10,0.50)] backdrop-blur-[15px]" />

        {/* Close button */}
        <button aria-label="Close" onClick={handleCancel} className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white backdrop-blur-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Content by step */}
        {step === 'landing' && (
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center text-white">
            <h2 className="mx-auto mb-6 max-w-screen-md text-3xl !leading-tight lg:!text-6xl">He sees. He hears. He understands.</h2>
            <p className="mx-auto mb-10 max-w-screen-md text-base text-inverse-muted lg:text-xl">Meet Charlie, an AI agent that perceives, reacts, and engages in real conversation. Chat like he&apos;s an old friend—or a new one!</p>

            {/* CTA */}
            <StartCallButton onClick={handleStartClick} label={isStartLoading ? 'Starting…' : 'Start Video Chat'} />

            <p className="mt-6 text-xs text-inverse-muted">
              By starting a conversation, I accept the Tavus <a className="underline" href="#" rel="noreferrer">Terms of Use</a> and acknowledge the <a className="underline" href="#" rel="noreferrer">Privacy Policy</a>.
            </p>
          </div>
        )}

        {step === 'preflight' && (
          <CVIProvider>
            {/* Ensure the HairCheck area expands and allows taps across iOS overlays */}
            <div className="relative z-10 h-full w-full">
              <HairCheck isJoinBtnLoading={isLoading} onJoin={handleJoinCall} onCancel={handleCancel} />
            </div>
          </CVIProvider>
        )}

        {step === 'session' && conversationUrl && (
          <div className="relative z-10 h-full w-full">
            <CVIProvider>
              <StatusPill />
              <div className="h-full w-full">
                <Conversation conversationUrl={conversationUrl} onLeave={handleCancel} />
              </div>
            </CVIProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default CviModal;


