// Newest first. Add a new object at the top of the list for a new role.

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "Bristol Myers Squibb",
    title: "AI Engineer Intern",
    start: "Jun 2026",
    end: "Aug 2026",
    points: [
      "Embedded with drug-discovery scientists, product and engineering to scope and ship 30+ features on a full-stack Claude Agent SDK platform (React, TypeScript, Node.js, Express), from ambiguous problem framing to production.",
      "Built a Claude-driven self-service support system (custom SSE endpoint, intent detection, autofix pipeline) so non-technical scientists could resolve bugs and feature requests without waiting on engineering.",
      "Added a self-learning observability layer and startup preflight checks that catch silent pipeline failures before data is lost.",
    ],
  },
  {
    company: "Niramai Thermalytix",
    title: "Mobile & Web App Developer Intern",
    start: "Aug 2025",
    end: "Oct 2025",
    points: [
      "Built a cross-platform mobile app with offline image-quality checks for clinics with poor connectivity.",
      "Integrated a thermal breast-cancer screening model into the web app, wrote the Node.js services behind it, and deployed on AWS and Azure.",
    ],
  },
];
