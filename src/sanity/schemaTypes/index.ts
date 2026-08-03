import type { SchemaTypeDefinition } from "sanity";

import project from "./project";
import testimonial from "./testimonial";
import service from "./service";
import siteSettings from "./siteSettings";
import ctaBand from "./ctaBand";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import servicesPage from "./servicesPage";
import projectsPage from "./projectsPage";
import contactPage from "./contactPage";
import { statItem, processStep } from "./objects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents (list-able content)
    project,
    testimonial,
    service,
    // Singletons (site + page copy)
    siteSettings,
    ctaBand,
    homePage,
    aboutPage,
    servicesPage,
    projectsPage,
    contactPage,
    // Reusable objects
    statItem,
    processStep,
  ],
};
