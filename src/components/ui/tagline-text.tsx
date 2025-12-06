import React from 'react';

interface TaglineTextProps {
  variant?: 'hero' | 'features';
  className?: string;
  children?: React.ReactNode;
}

export function TaglineText({ 
  variant = 'hero', 
  className = '',
  children 
}: TaglineTextProps) {
  const baseStyles = "font-sans leading-relaxed";
  
  const variantStyles = {
    hero: "text-center text-base/6 text-[oklch(0.708_0_0)]",
    features: "text-xl text-[oklch(0.708_0_0)] max-w-4xl mx-auto"
  };

  return (
    <p className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </p>
  );
}

// Highlighted text component for emphasis
export function HighlightedText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[oklch(0.922_0_0)] font-semibold">
      {children}
    </span>
  );
}

// Pre-built tagline content
export function ReaperTagline({ variant = 'hero' }: { variant?: 'hero' | 'features' }) {
  if (variant === 'hero') {
    return (
      <TaglineText variant="hero">
        Meet Reaper,<br />
        Always here to listen and talk.<br />
        Always on your side.
      </TaglineText>
    );
  }

  return (
    <TaglineText variant="features">
      Always here to{" "}
      <HighlightedText>listen and talk</HighlightedText>
      .{" "}
      <HighlightedText>Always on your side</HighlightedText>
      .
    </TaglineText>
  );
}
