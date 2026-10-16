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
  // A playable demo shown in place of the illustration when the card opens.
  demo?: "climb";
};

export const projects: Project[] = [
  {
    name: "Calorie Tracker",
    tagline: "A free, open-source calorie tracker with nothing behind a paywall.",
    description:
      "An iPhone app in the spirit of Lose It, with every feature unlocked. Log food by searching a database built from USDA and Open Food Facts data, creating your own meals, or snapping a nutrition label that fills itself in. Workouts flow in from Apple Health, and the app nudges toward healthy habits instead of punishing a bad day.",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Postgres", "HealthKit", "Vision LLM"],
    status: "In progress",
    featured: true,
    highlights: [
      "Label scanning measured, not assumed: a hand-labeled photo set scores every field and runs in CI",
      "Re-runnable import pipeline that merges USDA and Open Food Facts, normalizes units and rejects bad rows",
      "Gentle guardrails: caring warnings on aggressive goals, and streaks that count logging, not undereating",
    ],
  },
  {
    name: "mitbo.ai",
    tagline: "A bouldering coach that watches you climb.",
    description:
      "Prop your phone up facing the wall. mitbo tracks your hands, feet and hips, picks out the problem from the start holds you settle on, plans a beta around your height and wingspan, calls out the crux, then talks you through each move out loud.",
    stack: ["Flutter", "ML Kit pose detection", "Computer vision", "Geometry-based planning", "Text-to-speech"],
    status: "Live",
    repo: "https://github.com/aaravSmall/mitbo.ai",
    demo: "climb",
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
      "Fault-tolerant systemd scheduling with offline fallbacks for every external API",
      "190-test pytest suite in CI, including property-based tests",
    ],
  },
  {
    name: "Deki.ai",
    tagline: "A desktop assistant that sees your screen and hears the room.",
    description:
      "An always-on-top Electron overlay that captures your screen and system audio, transcribes speech with whisper.cpp and streams back an answer from local Ollama models. A from-scratch Express/TypeScript server ties it together, and everything runs on your machine: no cloud APIs, no API keys.",
    stack: ["Electron", "TypeScript", "Express", "whisper.cpp", "Ollama"],
    status: "Live",
    repo: "https://github.com/aaravSmall/Deki.ai",
    art: "overlay",
    highlights: [
      "Two-stage pipeline: a small vision model captions the screen, a text model reasons over the caption and transcript",
      "Global hotkeys to toggle the overlay or force an instant screen read",
    ],
  },
  {
    name: "Roamly",
    tagline: "Your travel history, rebuilt from photos you already took.",
    description:
      "A Flutter app that scans your photo library for geotagged shots, reverse-geocodes them and groups them into trips: every country and city you've visited, with dates, a world map and the photos from each stay. It all runs on-device, so no photo ever leaves your phone.",
    stack: ["Flutter", "Dart", "photo_manager", "Geocoding", "Material 3"],
    status: "Live",
    repo: "https://github.com/aaravSmall/roamly",
    art: "roamly",
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
    status: "Live",
    art: "college",
    highlights: ["Admission-odds model trained in Python and served to the app", "MySQL-backed architecture wired straight into the app"],
  },
  {
    name: "Euro 24 Fantasy",
    tagline: "A fantasy football app built for the Euro 2024 tournament.",
    description:
      "Sign in with Google, pick a squad in the formation you want, and earn points from your players' goals, assists and clean sheets. Players can be searched and sorted by goals, assists, clean sheets, cards and price, alongside a group-stage tracker and fixtures.",
    stack: ["Flutter", "Dart", "Firebase Auth", "Firebase Realtime Database", "Google Sign-In"],
    status: "Live",
    repo: "https://github.com/aaravSmall/Euro24FantasyApp",
    art: "fantasy",
    highlights: [
      "Squads saved per user in Firebase, so a team follows you across devices",
      "Player leaderboard ranked by fantasy points",
    ],
  },
];
