// Edit this file to change your name, headline, links and bio.

export const profile = {
  name: "Aarav Samal",
  firstName: "Aarav",
  lastName: "Samal",
  roles: ["AI engineer", "Forward deployed engineer", "Full-stack developer"],
  intro:
    "I embed with teams, find the real problem, and ship software that solves it, usually with an AI agent somewhere in the loop.",
  school: "Purdue University",
  campus: "West Lafayette",
  degree: "B.S. Computer & Information Technology, John Martinson Honors College",
  minor: "Minor in Communications",
  graduation: "May 2027",
  email: "aaravsamal@gmail.com",
  github: "https://github.com/aaravSmall",
  linkedin: "https://www.linkedin.com/in/aarav-samal-570201224",
  // Replace public/resume.pdf with a new file of the same name to update your resume.
  resume: "/resume.pdf",
};

// The About section.
// Photos: drop image files into public/about/ and list them below, in the order
// they should play. Portraits (roughly 4:5, at least 800px wide) fit the frame
// best; anything else is cropped to fill it. Entries whose file doesn't exist
// yet are skipped, and with no photos at all the frame shows a placeholder.
export type Photo = { src: string; alt: string; caption?: string };

export const about = {
  photos: [
    { src: "/about/1.jpg", alt: "Aarav in a Purdue hoodie at sunset", caption: "" },
    { src: "/about/2.jpg", alt: "Aarav taking a mirror selfie", caption: "" },
    { src: "/about/3.jpg", alt: "Aarav crouching in front of a race car in the pit garage", caption: "" },
    { src: "/about/4.jpg", alt: "Aarav sitting on rocks beside a mountain stream", caption: "" },
    { src: "/about/5.jpg", alt: "Aarav in a Purdue hoodie in front of snow-capped mountains", caption: "" },
    { src: "/about/6.jpg", alt: "Aarav in a Roma home jersey on a volcanic crater floor", caption: "" },
    { src: "/about/7.jpg", alt: "Aarav smiling in front of the Taj Mahal", caption: "" },
  ] as Photo[],
  paragraphs: [
    "I'm a Computer and Information Technology student in Purdue's John Martinson Honors College, with a minor in Communications. The pairing fits how I like to work: understand the people and the problem first, then build the thing that actually helps.",
    "This summer I was an AI Engineer Intern at Bristol Myers Squibb, embedded with drug-discovery scientists and shipping features on a full-stack Claude Agent SDK platform. Before that I built mobile and web apps for clinics at Niramai Thermalytix.",
  ],
  facts: [
    { label: "Studying", value: "B.S. CIT, Purdue Honors, Class of 2027" },
    { label: "Focus", value: "AI engineering, forward deployed, full-stack" },
    { label: "Building", value: "mitbo.ai, an AI bouldering coach" },
    { label: "On campus", value: "F1 @ Purdue socials, Honors Mentor" },
  ] as { label: string; value: string; wide?: boolean }[],
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
