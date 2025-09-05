import React from 'react';
import { cn } from "@/lib/utils";

interface HeroTextProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function HeroText({ 
  title = "The AI Companion\nwho cares",
  subtitle = "Meet Akira.\nAlways here to listen and talk.\nAlways on your side",
  className 
}: HeroTextProps) {
  return (
    <div className={cn(
      "relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto",
      className
    )}>
      {/* Main heading with improved hierarchy */}
      <h1 className="text-[42px] md:text-[56px] lg:text-[68px] xl:text-[72px] font-bold text-primary whitespace-pre-line leading-[0.85] md:leading-[0.9] tracking-tight mb-6 md:mb-8">
        {title}
      </h1>
      
      {/* Subtitle with better spacing */}
      <p className="text-clean-subtext whitespace-pre-line mb-12 md:mb-16">
        {subtitle}
      </p>
      
      {/* Disclaimer - much smaller and less prominent */}
      <p className="text-xs md:text-sm text-muted/60 font-medium tracking-wide uppercase opacity-50 mt-auto">
        DISCLAIMER: This website is not completed yet. This is not the final result
      </p>
    </div>
  );
}
