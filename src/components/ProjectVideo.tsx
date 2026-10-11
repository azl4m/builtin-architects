"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Play, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { getAutoPosterUrl, parseVideoEmbed } from "@/lib/video";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectReel } from "@/sanity/lib/types";

function ReelPlayer({ reel, title }: { reel: ProjectReel; title: string }) {
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const embed = parseVideoEmbed(reel.url);
  const poster = urlFor(reel.posterImage)?.width(720).url() || getAutoPosterUrl(reel.url) || undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const active = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      setVisible(active);
      if (active) setLoaded(true);
    }, { threshold: [0, 0.35] });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    const update = () => {
      if (visible && !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        void video.play().catch(() => { /* Native play control remains available. */ });
      } else video.pause();
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => { document.removeEventListener("visibilitychange", update); video.pause(); };
  }, [visible, loaded]);

  if (!embed) return null;
  const iframeUrl = embed.type !== "file" ? `${embed.embedUrl.replace("autoplay=1", "autoplay=0")}&${embed.type === "youtube" ? "mute=1&playsinline=1" : "muted=1&playsinline=1"}` : "";
  return (
    <div ref={container} className="relative mx-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl bg-black shadow-2xl sm:max-w-[390px]">
      {failed ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center text-white">
          <p>This film couldn&apos;t load.</p>
          <a href={reel.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/40 px-5 py-3 text-sm underline">Open video</a>
        </div>
      ) : embed.type === "file" ? (
        <video ref={player} src={loaded ? embed.url : undefined} poster={poster} muted playsInline controls preload="none" onError={() => setFailed(true)} aria-label={`${title}: ${reel.title || "Project film"}`} className="absolute inset-0 h-full w-full object-contain">
          Your browser doesn&apos;t support video playback.
        </video>
      ) : loaded && (
        <iframe src={visible ? iframeUrl.replace("autoplay=0", "autoplay=1") : iframeUrl} title={`${title}: ${reel.title || "Project film"}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}

export default function ProjectVideo({ videos, title }: { videos: ProjectReel[]; title: string }) {
  const [selected, setSelected] = useState(0);
  const reels = videos.filter((video) => parseVideoEmbed(video.url)).slice(0, 3);
  const active = reels[selected] || reels[0];
  if (!active) return null;
  return (
    <div className="overflow-hidden rounded-3xl border border-hairline bg-alt p-5 sm:p-8 lg:p-12">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
        <ReelPlayer key={`${active._key}-${active.url}`} reel={active} title={title} />
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[2px] text-accent uppercase"><Film size={16} /> In motion</div>
          <h3 className="font-display text-2xl leading-tight font-semibold text-ink lg:text-3xl">A closer look at {title}</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-body">Explore the spaces, materials, and details through our project films.</p>
          <div className="mt-7 flex flex-col gap-3" role="group" aria-label="Select a project film">
            {reels.map((reel, index) => {
              const cover = urlFor(reel.posterImage) || getAutoPosterUrl(reel.url);
              const isSelected = reel === active;
              return (
                <button key={reel._key || reel.url} type="button" onClick={() => setSelected(index)} aria-pressed={isSelected} className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${isSelected ? "border-ink bg-ink text-white" : "border-hairline bg-white text-ink hover:border-accent"}`}>
                  {cover ? <SmartImage image={reel.posterImage} fallbackSrc={getAutoPosterUrl(reel.url)} alt="" label="" sizes="56px" className="h-[76px] w-[48px] shrink-0 rounded-md" /> : <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isSelected ? "bg-white/15" : "bg-alt"}`}><Play size={18} /></span>}
                  <span className="min-w-0 flex-1"><span className={`block text-[10px] tracking-[1.5px] uppercase ${isSelected ? "text-white/65" : "text-muted"}`}>Film {String(index + 1).padStart(2, "0")}</span><span className="mt-1 block break-words text-sm font-semibold">{reel.title || `Project reel ${index + 1}`}</span></span>
                  <ArrowUpRight size={18} className="shrink-0" />
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted">Use the player controls for sound, pause, or fullscreen.</p>
        </div>
      </div>
    </div>
  );
}
