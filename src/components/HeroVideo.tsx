"use client";

import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface HeroVideoProps {
  playbackId: string;
  className?: string;
}

/**
 * Autoplaying, muted, looped background video for the hero section.
 * Sits above the hero image (kept mounted underneath as the poster/fallback)
 * and only renders once the client confirms the visitor hasn't asked for
 * reduced motion — the hero image alone covers that case and SSR.
 */
export default function HeroVideo({ playbackId, className = "" }: HeroVideoProps) {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) setCanPlayVideo(true);
  }, []);

  if (!canPlayVideo) return null;

  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay="muted"
      muted
      loop
      preload="auto"
      thumbnailTime={0}
      className={className}
      style={
        {
          "--controls": "none",
          "--media-object-fit": "cover",
          "--media-object-position": "center",
          width: "100%",
          height: "100%",
        } as React.CSSProperties & Record<`--${string}`, string>
      }
    />
  );
}
