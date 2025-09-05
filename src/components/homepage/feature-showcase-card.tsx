import React from 'react';

export interface FeatureShowcaseCardProps {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  gradientFrom?: string;
  gradientTo?: string;
  /** How the media should fit the frame for images (videos always cover). */
  mediaFit?: 'cover' | 'contain';
  /** If true, do not upscale image beyond its intrinsic size when using contain. */
  preventUpscale?: boolean;
}

/**
 * FeatureShowcaseCard
 * - Matches visual language of cards in `features-grid.tsx`
 * - Layout specs per request (1320 max-w, 28px radius, soft shadow, responsive grid)
 */
export function FeatureShowcaseCard({
  title = (
    <>
      The fastest, most <span className="bg-gradient-to-r from-[var(--velvet-700)] to-[var(--velvet-500)] bg-clip-text text-transparent">lifelike</span> AI companion model
    </>
  ),
  paragraphs = [
    (
      <>
        Akira mirrors how people see, think, and respond, in real time.
      </>
    ),
    (
      <>
        By combining facial rendering, vision, speech, and emotional intelligence, our human simulation models enable face-to-face AI conversations that capture intent, nuance, and presence.
      </>
    ),
    (
      <>
        Responses land in under 600 ms, with data retrieval in 30 ms, up to 15× faster than leading RAG systems.
      </>
    ),
  ],
  imageSrc = '/transform.webp',
  videoSrc,
  imageAlt = 'Akira preview',
  gradientFrom = 'oklch(0.3_0_0_/_0.30)',
  gradientTo = 'oklch(0.15_0_0_/_0.30)'
  ,
  mediaFit = 'contain',
  preventUpscale = true
}: FeatureShowcaseCardProps) {
  return (
    <section className="max-w-[1320px] mx-auto">
      <div
        className={[
          // Base visual language aligned with FeaturesGrid cards
          'bg-[oklab(0.205_0_0_/_0.7)]',
          'border border-[oklab(0.371_0_0_/_0.5)]',
          // Layout & effects per spec
          'rounded-[28px]',
          'shadow-[0_20px_80px_rgba(0,0,0,.08)]',
          'p-6 lg:p-12',
        ].join(' ')}
        role="region"
        aria-label="Feature showcase"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h2 className="font-heading text-white tracking-tight text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {paragraphs?.map((para, idx) => (
              <p
                key={idx}
                className="font-sans text-[oklch(0.708_0_0)] text-base lg:text-lg leading-[1.65] mt-4"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Right: Media */}
          <div
            className="relative w-full aspect-[16/10] lg:h-[440px] lg:aspect-auto rounded-[24px] overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
            }}
          >
            {/* Optional inset stroke */}
            <div className="pointer-events-none absolute inset-0 ring-inset ring-1 ring-black/5" />

            {videoSrc ? (
              <video
                src={videoSrc}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                aria-label={imageAlt}
              />
            ) : imageSrc ? (
              mediaFit === 'cover' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={`${preventUpscale ? 'w-auto h-auto max-w-full max-h-full' : 'w-full h-full object-contain'}`}
                    loading="lazy"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


