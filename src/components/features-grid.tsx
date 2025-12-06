import React from 'react';
import { HighlightedText } from '@/components/ui/tagline-text';

// TypeScript interfaces for component props
export interface HeaderSection {
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface LargeFeatureCard {
  id: string;
  placeholderText: string;
  gradientFrom: string;
  gradientTo: string;
  subtitle: string;
  title: string;
  description: string;
  colSpan: 'lg:col-span-4' | 'lg:col-span-2';
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
}

export interface SmallFeatureCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesGridProps {
  header: HeaderSection;
  largeCards: LargeFeatureCard[];
  smallCards: SmallFeatureCard[];
}

// Default data with actual project features
const defaultData: FeaturesGridProps = {
  header: {
    title: (
      <>
        <span className="text-white">Bring </span>
        <span className="bg-gradient-to-r from-[var(--velvet-700)] to-[var(--velvet-500)] bg-clip-text text-transparent">Reaper</span>
        <span className="text-white"> to life with</span>
        <br />
        <span className="text-white">conversational video</span>
      </>
    ),
    description: (
      <p className="font-sans text-center text-xl text-[oklch(0.708_0_0)]">
        Enjoy conversational experiences with Reaper that looks &amp; feels human.
        <br />
        Try our <HighlightedText>Conversational Video Interface</HighlightedText>.
      </p>
    ),
  },
  largeCards: [
    {
      id: "3d-avatar-system",
      placeholderText: "3D Avatar Experience",
      gradientFrom: "oklch(0.3_0_0)",
      gradientTo: "oklch(0.15_0_0)",
      subtitle: "Orchestrated Intelligence",
      title: "A face, a brain, and memories",
      description: "Reaper understands the rhythm of conversation, analyzes tone, pacing, and intent to engage naturally, pausing, interrupting, and responding with human-like timing. She continuously processing visual context, reading emotions, and responding intelligently to its environment.",
      colSpan: "lg:col-span-4",
      imageSrc: "/images/product.png",
      videoSrc: "/gigiai.mp4",
      imageAlt: "3D Avatar interface preview",
    },
    {
      id: "memory-layer",
      placeholderText: "Memory Layer System",
      gradientFrom: "oklch(0.25_0_0)",
      gradientTo: "oklch(0.18_0_0)",
      subtitle: "Unmatched Realism",
      title: "Frontier models",
      description: "Our real-time human simulation models let machines see, process visual context, read emotions, hear, respond, and even look real, enabling meaningful face-to-face conversations with people.",
      colSpan: "lg:col-span-2",
      imageSrc: "/images/ogimage.png",
      videoSrc: "/video2.mp4",
      imageAlt: "Memory layer system interface",
    },
  ],
  smallCards: [
    {
      id: "create-story-together",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      ),
      title: "Advanced Face Rendering",
      description: "Powered by the most advanced full-face rendering model ever built, Reaper has natural facial movements, micro-expressions, and real-time emotional response, making her feel truly present.",
    },
    {
      id: "chat-about-everything",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
      title: "Empathetic Visual Perception",
      description: "Reaper can see, reads expressions, visual cues, and the environment to engage in a realistic, nuanced way.",
    },
    {
      id: "always-listening",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
          />
        </svg>
      ),
      title: "Always Here to Listen",
      description: "Whether you need someone to celebrate with or a shoulder to lean on, Reaper is available 24/7 with natural voice conversations and genuine emotional support.",
    },
  ],
};

export default function FeaturesGrid({ 
  header = defaultData.header,
  largeCards = defaultData.largeCards,
  smallCards = defaultData.smallCards 
}: Partial<FeaturesGridProps> = {}) {
  return (
    <div className="bg-background text-foreground">
      {/* Header Section */}
      <div className="site-container text-center mb-12 pt-12">
        <h1 className="font-sans text-balance text-center text-3xl font-semibold tracking-tight md:text-7xl text-white mb-6 mx-auto max-w-4xl">
          {header.title}
        </h1>
        <div className="max-w-4xl mx-auto px-4">
          {header.description}
        </div>
      </div>

      {/* Features Grid Container */}
      <div className="site-container space-y-12 pb-12">
        {/* Row 1: Large feature cards */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-6 lg:grid-rows-1">
          {largeCards.map((card) => (
            <div key={card.id} className={`${card.colSpan} p-px`}>
              <div className="bg-[oklab(0.205_0_0_/_0.4)] rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl lg:hover:shadow-2xl hover:ring-1 hover:ring-neutral-600/80">
                <div 
                  className="w-full h-64 bg-gradient-to-br flex items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${card.gradientFrom}, ${card.gradientTo})`
                  }}
                >
                  {card.videoSrc ? (
                    <video
                      src={card.videoSrc}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : card.imageSrc ? (
                    <img
                      src={card.imageSrc}
                      alt={card.imageAlt ?? card.placeholderText}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="(min-width: 1024px) 66vw, 100vw"
                    />
                  ) : (
                    <div className="text-[oklch(0.7_0_0)] text-lg font-medium">{card.placeholderText}</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-[oklch(0.556_0_0)] text-xs font-semibold uppercase tracking-wider mb-2">
                    {card.subtitle}
                  </h3>
                  <h4 className="font-heading text-xl font-medium text-white mb-3">
                    {card.title}
                  </h4>
                  <p className="font-sans text-[oklch(0.708_0_0)] text-[13px] flex-1 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Three equal feature cards */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {smallCards.map((card) => (
            <div key={card.id} className="bg-[oklab(0.205_0_0_/_0.7)] border border-[oklab(0.371_0_0_/_0.5)] rounded-xl p-5 cursor-pointer hover:bg-[oklab(0.205_0_0_/_0.8)] transition-colors duration-200 flex flex-col min-h-[200px]">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg text-[oklch(0.87_0_0)]">
                  {card.icon}
                </div>
                <h3 className="font-heading text-white text-base font-bold">
                  {card.title}
                </h3>
              </div>
              <p className="font-sans text-[oklch(0.708_0_0)] text-[13px] flex-1 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
