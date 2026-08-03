"use client";

import { useState } from "react";
import SmartImage from "@/components/SmartImage";
import { getAutoPosterUrl, parseVideoEmbed } from "@/lib/video";
import type { SanityImageValue } from "@/sanity/lib/types";

interface ProjectVideoProps {
  videoUrl: string | null;
  posterImage: SanityImageValue | null;
  title: string;
}

function PlayGlyph() {
  return (
    <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-ivory/90 transition-transform group-hover:scale-105">
      <span className="ml-1.5 h-0 w-0 border-y-[16px] border-l-[26px] border-y-transparent border-l-ink" />
    </span>
  );
}

export default function ProjectVideo({ videoUrl, posterImage, title }: ProjectVideoProps) {
  const [playing, setPlaying] = useState(false);
  const embed = videoUrl ? parseVideoEmbed(videoUrl) : null;
  const autoPosterUrl = videoUrl ? getAutoPosterUrl(videoUrl) : null;

  if (playing && embed) {
    return (
      <div className="relative h-[560px] w-full overflow-hidden rounded-[4px] bg-ink max-md:h-[320px]">
        {embed.type === "file" ? (
          <video src={embed.url} controls autoPlay className="h-full w-full object-contain">
            Your browser doesn&apos;t support embedded video.
          </video>
        ) : (
          <iframe
            src={embed.embedUrl}
            title={`${title} walkthrough video`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[4px]">
      <SmartImage
        image={posterImage}
        fallbackSrc={autoPosterUrl}
        alt={`${title} walkthrough video`}
        label="Video poster image"
        className="h-[560px] w-full max-md:h-[320px]"
      />
      {embed ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play project video"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <PlayGlyph />
        </button>
      ) : (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <PlayGlyph />
        </div>
      )}
    </div>
  );
}
