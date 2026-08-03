export type VideoEmbed =
  | { type: "youtube"; embedUrl: string }
  | { type: "vimeo"; embedUrl: string }
  | { type: "file"; url: string };

function getYouTubeId(parsed: URL, host: string): string | null {
  if (host === "youtu.be") return parsed.pathname.slice(1) || null;
  if (host === "youtube.com" || host === "m.youtube.com") {
    return parsed.searchParams.get("v") ?? parsed.pathname.split("/embed/")[1]?.split("/")[0] ?? null;
  }
  return null;
}

/**
 * Turns a pasted video URL (Cloudinary delivery link, YouTube, Vimeo, or any
 * direct .mp4/.webm file) into something we know how to embed inline.
 */
export function parseVideoEmbed(url: string): VideoEmbed | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  const youtubeId = getYouTubeId(parsed, host);
  if (youtubeId) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0` };

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    if (id) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1` };
  }

  // Cloudinary delivery URLs and any other direct video file link.
  return { type: "file", url };
}

/**
 * Derives a thumbnail (first frame) straight from the video URL, so editors
 * don't have to manually upload a poster image for every project.
 * - Cloudinary: `so_0` = "start offset 0 seconds", i.e. the first frame.
 * - YouTube: YouTube's own hosted default thumbnail.
 * - Vimeo / unknown hosts: no reliable URL-only pattern, so no auto poster —
 *   a manually-uploaded poster image is the only option for those.
 */
export function getAutoPosterUrl(videoUrl: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(videoUrl);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "res.cloudinary.com" && parsed.pathname.includes("/video/upload/")) {
    const withFrameOffset = parsed.pathname.replace("/video/upload/", "/video/upload/so_0/");
    const asJpg = withFrameOffset.replace(/\.[a-z0-9]+$/i, ".jpg");
    return `${parsed.origin}${asJpg}`;
  }

  const youtubeId = getYouTubeId(parsed, host);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return null;
}
