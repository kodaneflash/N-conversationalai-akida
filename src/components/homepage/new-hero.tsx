"use client";

import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import { useRouter } from "next/navigation";
import { TelegramLogo } from "@/components/Logos/TelegramLogo";
import { AkiraTagline } from "@/components/ui/tagline-text";

export function TelegramPill() {
  return (
    <a
      href="https://t.me/akiraonsol"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Join our Telegram"
      className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.439_0_0/0.5)] px-3 py-1 text-[oklch(0.87_0_0)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.708_0_0)]/60"
    >
      <TelegramLogo className="h-5 w-5" />
      <span className="whitespace-nowrap">Join our Telegram</span>
    </a>
  );
}

export function HeroSectionWithBeamsAndGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <div
      ref={parentRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-40"
    >
      <BackgroundGrids />
      <CollisionMechanism
        beamOptions={{
          initialX: -400,
          translateX: 600,
          duration: 7,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: -200,
          translateX: 800,
          duration: 4,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 200,
          translateX: 1200,
          duration: 5,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        containerRef={containerRef}
        parentRef={parentRef}
        beamOptions={{
          initialX: 400,
          translateX: 1400,
          duration: 6,
          repeatDelay: 3,
        }}
      />

      <div className="relative z-50 mb-6 flex justify-center">
        <TelegramPill />
      </div>

      <h2 className="relative z-50 mx-auto mb-4 mt-4 max-w-4xl text-balance text-center text-3xl font-semibold tracking-tight md:text-7xl" style={{ color: 'var(--text-primary)' }}>
        <Balancer>
          Meet your AI companion,{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(236,_90,_122,_0.3))]">
            <div className="bg-gradient-to-r from-[var(--velvet-700)] to-[var(--velvet-500)] bg-clip-text text-transparent">
              <span className="">Akira.</span>
            </div>
          </div>
        </Balancer>
      </h2>
      <div className="relative z-50 mx-auto mt-4 max-w-lg px-4">
        <AkiraTagline variant="hero" />
      </div>
      <div className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20">
        <button
          onClick={() => router.push('/chat')}
          className="btn-primary group relative z-20 flex h-12 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg px-6 py-3 text-center text-sm font-semibold leading-6 text-white no-underline transition duration-200 hover:scale-105 sm:w-52"
        >
          Launch App
        </button>
        <button
          onClick={() => {
            window.open('https://x.com/myakirasol', '_blank', 'noopener,noreferrer');
          }}
          className="group relative z-20 flex h-12 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg px-6 py-3 text-sm font-semibold leading-6 no-underline transition duration-200 hover:-translate-y-0.5 sm:w-52 border-2 hover:scale-105"
          style={{ 
            backgroundColor: 'var(--obsidian-800)', 
            color: 'var(--text-primary)',
            borderColor: 'var(--velvet-600)'
          }}
        >
          Follow our
          <svg 
            className="w-5 h-5 ml-1" 
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
            />
          </svg>
        </button>
      </div>
      <div
        ref={containerRef}
        className="relative mx-auto max-w-7xl rounded-[32px] border p-2 backdrop-blur-lg md:p-4"
        style={{ 
          borderColor: 'var(--border)', 
          backgroundColor: 'var(--obsidian-800)' 
        }}
      >
        <div 
          className="rounded-[24px] border p-2" 
          style={{ 
            borderColor: 'var(--border)', 
            backgroundColor: 'var(--obsidian-900)' 
          }}
        >
          <video
            src="/gigi.mp4"
            className="rounded-[20px] w-full h-auto"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

const BackgroundGrids = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full -rotate-45 transform select-none grid-cols-2 gap-10 md:grid-cols-4">
      <div className="relative h-full w-full">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="left-auto right-0" />
      </div>
      <div className="relative h-full w-full">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="left-auto right-0" />
      </div>
      <div 
        className="relative h-full w-full bg-gradient-to-b from-transparent to-transparent"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, transparent, var(--obsidian-800), transparent)` 
        }}
      >
        <GridLineVertical className="left-0" />
        <GridLineVertical className="left-auto right-0" />
      </div>
      <div className="relative h-full w-full">
        <GridLineVertical className="left-0" />
        <GridLineVertical className="left-auto right-0" />
      </div>
    </div>
  );
};

const CollisionMechanism = ({
  containerRef,
  parentRef,
  beamOptions = {},
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  beamOptions?: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
}) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({ detected: false, coordinates: null });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });
          setCycleCollisionDetected(true);
          if (beamRef.current) {
            beamRef.current.style.opacity = "0";
          }
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
        // Set beam opacity to 0
        if (beamRef.current) {
          beamRef.current.style.opacity = "1";
        }
      }, 2000);

      // Reset the beam animation after a delay
      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || -45,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "800px",
            translateX: beamOptions.translateX || "700px",
            rotate: beamOptions.rotate || -45,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-96 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t to-transparent",
          beamOptions.className,
        )}
        style={{
          backgroundImage: `linear-gradient(to top, var(--velvet-700), var(--velvet-500), transparent)`
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x + 20}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-[4px] w-10 rounded-full blur-sm"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, var(--velvet-600), transparent)`
        }}
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{ x: span.directionX, y: span.directionY, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, var(--velvet-600), var(--velvet-500))`
          }}
        />
      ))}
    </div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "var(--obsidian-950)",
          "--color": "rgba(236, 90, 122, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(236, 90, 122, 0.3)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
