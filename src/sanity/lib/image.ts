import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import type { SanityImageValue } from "./types";

const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: SanityImageValue | undefined | null) {
  if (!builder || !source?.asset) return null;
  return builder.image(source);
}
