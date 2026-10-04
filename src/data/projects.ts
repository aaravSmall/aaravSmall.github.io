// Add a project by copying one of these objects.
// `featured: true` gives a project the wide slot at the top of the list.
// Leave `repo` or `live` out if there's no public link yet.
// `image` is optional: drop a file in public/projects/ and set image: "/projects/name.png".
// `art` picks one of the small built-in illustrations for a card (see ProjectArt.tsx).

import type { ArtKey } from "@/components/ProjectArt";

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "Live" | "In progress" | "Shipped";
  repo?: string;
  live?: string;
  image?: string;
  art?: ArtKey;
  featured?: boolean;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    name: "mitbo.ai",
    tagline: "A bouldering coach that watches you climb.",
    description:
      "Point a laptop camera at the wall. mitbo tracks your hands, feet and hips, recognizes the problem from the first holds you touch, works out a beta around the crux and your height, then talks you through each move out loud.",
    stack: ["Computer vision", "Pose estimation", "Text-to-speech", "LLM planning"],
    status: "In progress",
    repo: "https://github.com/aaravSmall/mitbo.ai",
    featured: true,
    highlights: [
      "Real-time body tracking for hands, feet and hips",
      "Beta generation that adapts to climber height",
      "Spoken cues like “left hand up to the hold above it”",
    ],
  },
  {
    name: "Britney.ai",
    tagline: "An autonomous trading agent that runs unattended, 24/7.",
    description:
      "Risk-tiered portfolio rebalancing across three strategies, with live stock discovery, a multi-gate classifier and emergency stop-losses. A GPT-4o-mini assistant answers questions grounded in the real trade ledger.",
    stack: ["Python", "FastAPI", "Postgres", "Flutter", "OpenAI API", "systemd"],
    status: "Live",
    repo: "https://github.com/aaravSmall/britney-ai",
    art: "britney",
    highlights: [
      "Beat the market by 7% on average in its first month live",
      "183-test pytest suite, including property-based tests",
    ],
  },
  {
    name: "AI overlay",
    tagline: "A desktop assistant that sees your screen and hears the room.",
    description:
      "An always-on-top Electron overlay with hotkeys, screen capture and vision, backed by a from-scratch Express/TypeScript server. Transcription and inference can run fully local.",
    stack: ["Electron", "TypeScript", "Express", "Claude API", "whisper.cpp", "Ollama"],
    status: "Shipped",
    art: "overlay",
  },
  {
    name: "Been",
    tagline: "Your travel history, rebuilt from photos you already took.",
    description:
      "A Flutter app that scans your photo library for geotagged shots, reverse-geocodes them and groups them into trips: every country and city you've visited, with dates, a world map and the photos from each stay. It all runs on-device, so no photo ever leaves your phone.",
    stack: ["Flutter", "Dart", "photo_manager", "Geocoding", "Material 3"],
    status: "In progress",
    repo: "https://github.com/aaravSmall/roamly",
    art: "been",
    highlights: [
      "Splits trips by place and time gaps, so two visits to one city stay separate",
      "Detects your home city and filters out everyday photos taken near it",
    ],
  },
  {
    name: "Find My College",
    tagline: "Your odds at a school, before you apply.",
    description:
      "A mobile app that runs a predictive model on an applicant's profile to estimate their chance of acceptance, so students get a data-driven read on where they stand. Built end to end, from the data pipeline to the Flutter UI.",
    stack: ["Flutter", "Dart", "Python", "Jupyter", "MySQL"],
    status: "Shipped",
    art: "college",
    highlights: ["Prediction model with 94% accuracy", "MySQL-backed architecture wired straight into the app"],
  },
];
