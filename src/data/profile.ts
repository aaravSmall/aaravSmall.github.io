// Edit this file to change your name, headline, links and bio.

export const profile = {
  name: "Aarav Samal",
  firstName: "Aarav",
  lastName: "Samal",
  roles: ["AI engineer", "Forward deployed engineer", "Full-stack developer"],
  intro:
    "I embed with teams, find the real problem, and ship software that solves it, usually with an AI agent somewhere in the loop.",
  school: "Purdue University",
  degree: "B.S. Computer & Information Technology, John Martinson Honors College",
  minor: "Minor in Communications",
  graduation: "May 2027",
  email: "aaravsamal@gmail.com",
  github: "https://github.com/aaravSmall",
  linkedin: "https://www.linkedin.com/in/aarav-samal-570201224",
  // Replace public/resume.pdf with a new file of the same name to update your resume.
  resume: "/resume.pdf",
};

// The About section. To add your photo, put it at public/me.jpg (a portrait,
// roughly 4:5, at least 800px wide). Until that file exists the page shows a
// placeholder frame instead.
export const about = {
  photo: "/me.jpg",
  photoAlt: "Aarav Samal",
  paragraphs: [
    "I'm a Computer and Information Technology student in Purdue's John Martinson Honors College, with a minor in Communications. The pairing fits how I like to work: understand the people and the problem first, then build the thing that actually helps.",
    "This summer I was an AI Engineer Intern at Bristol Myers Squibb, embedded with drug-discovery scientists and shipping features on a full-stack Claude Agent SDK platform. Before that I built mobile and web apps for clinics at Niramai Thermalytix.",
  ],
  facts: [
    { label: "Studying", value: "B.S. CIT, Purdue Honors, class of 2027" },
    { label: "Focus", value: "AI engineering, forward deployed, full-stack" },
    { label: "Building", value: "mitbo.ai, an AI bouldering coach" },
    { label: "Also", value: "F1 @ Purdue, honors mentor" },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI & agents",
    items: ["Claude Agent SDK", "Model Context Protocol", "OpenAI API", "LLM tool use", "Semantic search"],
  },
  {
    group: "Languages",
    items: ["TypeScript", "Python", "JavaScript", "Dart", "SQL", "Java", "C++", "C#"],
  },
  {
    group: "Frameworks",
    items: ["React", "Node.js", "Express", "FastAPI", "Flutter", "Vite", "SQLAlchemy"],
  },
  {
    group: "Cloud & infra",
    items: ["AWS", "Azure", "GCP", "Docker", "GitHub Actions", "DigitalOcean", "Linux"],
  },
  {
    group: "Testing",
    items: ["pytest", "Hypothesis", "Playwright", "Vitest"],
  },
];
