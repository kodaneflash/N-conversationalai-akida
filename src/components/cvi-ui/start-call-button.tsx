'use client';

import React from 'react';

interface StartCallButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const StartCallButton: React.FC<StartCallButtonProps> = ({ label = 'Start Video Chat', onClick, disabled, className }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn-ring ${className ?? ''}`}>
      <span className="btn-inner gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10l4-3v10l-4-3v-4z" fill="currentColor" />
            <rect x="3" y="7" width="12" height="10" rx="3" fill="currentColor" />
          </svg>
        </span>
        <span className="font-medium">{label}</span>
      </span>
    </button>
  );
};

export default StartCallButton;


