import { Compass, PencilRuler, Sofa, Palette, Hammer, Wrench, HardHat, Building2 } from "lucide-react";
import type { ServiceIconKey } from "@/sanity/lib/types";

export const SERVICE_ICONS: Record<ServiceIconKey, typeof Compass> = {
  compass: Compass,
  "pencil-ruler": PencilRuler,
  sofa: Sofa,
  palette: Palette,
  hammer: Hammer,
  wrench: Wrench,
  "hard-hat": HardHat,
  building: Building2,
};
