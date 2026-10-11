"use client";

import { useState, useSyncExternalStore } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface HeroVideoProps {
  playbackId: string;
  className?: string;
}

/**
 * Autoplaying, muted, looped background video for the hero section.
 * Designed for luxury/premium user experience:
 * - Keeps high-res hero image visible underneath with zero flash or black void.
 * - Smoothly crossfades (1000ms ease-out) only after video actively starts playing.
 * - Checks reduced motion & save-data preferences.
 * - Enforces GPU acceleration and disables pointer interaction/controls.
 */
function videoAllowed() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
}

function subscribeToPreferences(update: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
  motion.addEventListener("change", update);
  connection?.addEventListener("change", update);
  return () => {
    motion.removeEventListener("change", update);
    connection?.removeEventListener("change", update);
  };
}

const serverSnapshot = () => false;

export default function HeroVideo({ playbackId, className = "" }: HeroVideoProps) {
  const canPlayVideo = useSyncExternalStore(subscribeToPreferences, videoAllowed, serverSnapshot);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!canPlayVideo || hasError) return null;

  return (
    <div
      className={`pointer-events-none overflow-hidden transition-opacity duration-1000 ease-out ${
        isPlaying ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        transform: "translateZ(0)",
        willChange: "opacity",
      }}
    >
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay="muted"
        muted
        loop
        preload="auto"
        playsInline
        thumbnailTime={0}
        poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=0&width=1920`}
        onPlaying={() => setIsPlaying(true)}
        onCanPlay={() => {
          if (!isPlaying) {
            setIsPlaying(true);
          }
        }}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
        style={
          {
            "--controls": "none",
            "--media-object-fit": "cover",
            "--media-object-position": "center",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            pointerEvents: "none",
          } as React.CSSProperties & Record<`--${string}`, string>
        }
      />
    </div>
  );
}

