'use client';

import React from 'react';
import Image from 'next/image';
import { StartCallButton } from './start-call-button';

interface LauncherProps {
  onStart: () => void;
}

export const Launcher: React.FC<LauncherProps> = ({ onStart }) => {
  return (
    <section className="relative mx-auto w-full overflow-hidden bg-black text-white rounded-lg">
      <div className="relative mx-auto w-full">
        {/* Compact hero container */}
        <div className="relative overflow-hidden rounded-lg mx-auto w-full max-w-[1000px]">
          {/* Background video */}
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay playsInline muted loop>
            <source src="/gigi.mp4" type="video/mp4" />
          </video>
          {/* Aspect wrapper - fixed size at md+, responsive below */}
          <div className="relative w-full aspect-video md:h-[562px] md:aspect-auto md:w-[1000px]">
            {/* Veil - no blur */}
            <div className="absolute inset-0 bg-[rgba(8,3,10,0.60)]" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-end gap-6 pb-8">
              <p
                className="shimmer font-medium tracking-wide text-4xl text-transparent bg-clip-text bg-[linear-gradient(90deg,_rgb(255,_255,_255),_rgba(255,_255,_255,_0.5)_50%,_rgb(255,_255,_255))] bg-stone-100"
                data-text="Gigi is calling"
              >
                Gigi is calling
              </p>

              <StartCallButton onClick={onStart} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Launcher;


