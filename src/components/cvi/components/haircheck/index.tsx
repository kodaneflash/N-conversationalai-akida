'use client';

import React, { useState, useCallback } from 'react';
import { useDevices, useLocalSessionId, DailyVideo } from '@daily-co/daily-react';
import { useLocalCamera } from '../../hooks/use-local-camera';
import { useLocalMicrophone } from '../../hooks/use-local-microphone';
import { MicSelectBtn, CameraSelectBtn } from '../device-select';

import styles from './haircheck.module.css';

interface HairCheckProps {
  onComplete: () => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
}

export const HairCheck = React.memo(({ 
  onComplete, 
  onCancel, 
  title = "Check your setup",
  subtitle = "Make sure your camera and microphone are working properly before joining the conversation."
}: HairCheckProps) => {
  const localSessionId = useLocalSessionId();
  const { cameras, microphones, hasCamError, hasMicError } = useDevices();
  const { isCamMuted, onToggleCamera } = useLocalCamera();
  const { isMicMuted, onToggleMicrophone } = useLocalMicrophone();
  
  const [isReady, setIsReady] = useState(false);
  const [hasRequestedPermissions, setHasRequestedPermissions] = useState(false);

  const requestPermissions = useCallback(async () => {
    setHasRequestedPermissions(true);
    
    try {
      // Request camera and microphone permissions
      if (isCamMuted) {
        await onToggleCamera();
      }
      if (isMicMuted) {
        await onToggleMicrophone();
      }
      
      // Wait a moment for devices to initialize
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    } catch (error) {
      console.error('Failed to request permissions:', error);
    }
  }, [isCamMuted, isMicMuted, onToggleCamera, onToggleMicrophone]);

  const handleComplete = useCallback(() => {
    if (!hasCamError && !hasMicError) {
      onComplete();
    }
  }, [hasCamError, hasMicError, onComplete]);

  const hasDevices = (cameras?.length ?? 0) > 0 || (microphones?.length ?? 0) > 0;
  const canProceed = hasRequestedPermissions && !hasCamError && !hasMicError && hasDevices;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <div className={styles.videoContainer}>
          {hasRequestedPermissions ? (
            <div className={styles.videoPreview}>
              <DailyVideo
                sessionId={localSessionId}
                automirror
                type="video"
                className={styles.video}
              />
              {isCamMuted && (
                <div className={styles.videoPlaceholder}>
                  <div className={styles.cameraOffIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3l20 18M10.5 10.5C10 11.3 10 12.7 10 14v1c0 1.3 0 2.7.5 3.5M16 8v8M20 8v8c0 .6-.4 1-1 1h-2"/>
                      <path d="M7 3h10c.6 0 1 .4 1 1v1"/>
                    </svg>
                  </div>
                  <p>Camera is off</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.permissionPrompt}>
              <div className={styles.permissionIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <h3>Camera and microphone access needed</h3>
              <p>Please allow access to your camera and microphone to continue.</p>
            </div>
          )}
        </div>

        {hasRequestedPermissions && (
          <div className={styles.controls}>
            <div className={styles.deviceControls}>
              <CameraSelectBtn />
              <MicSelectBtn />
            </div>
          </div>
        )}

        {(hasCamError || hasMicError) && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorContent}>
              <h4>Device Access Issue</h4>
              {hasCamError && <p>• Camera access denied or unavailable</p>}
              {hasMicError && <p>• Microphone access denied or unavailable</p>}
              <p className={styles.errorHelp}>
                Please check your browser settings and ensure camera/microphone permissions are enabled.
              </p>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {!hasRequestedPermissions ? (
            <button 
              onClick={requestPermissions}
              className={styles.primaryButton}
            >
              Allow Camera & Microphone
            </button>
          ) : (
            <>
              <button 
                onClick={handleComplete}
                disabled={!canProceed}
                className={`${styles.primaryButton} ${!canProceed ? styles.disabled : ''}`}
              >
                {canProceed ? 'Join Conversation' : 'Checking devices...'}
              </button>
              {onCancel && (
                <button 
                  onClick={onCancel}
                  className={styles.secondaryButton}
                >
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

HairCheck.displayName = 'HairCheck';
