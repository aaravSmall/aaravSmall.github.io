// Add a project by copying one of these objects.
// `featured: true` gives a project the wide slot at the top of the list.
// Leave `repo` or `live` out if there's no public link yet.
// `image` is optional: drop a file in public/projects/ and set image: "/projects/name.png".

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "Live" | "In progress" | "Shipped";
  repo?: string;
  live?: string;
  image?: string;
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
  },
];
