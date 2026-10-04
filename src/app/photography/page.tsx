import Link from "next/link";
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/data/profile";
import { photography } from "@/data/photos";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: `Photography | ${profile.name}`,
  description: `Photos taken by ${profile.name}.`,
};

// Runs at build time: only photos whose files exist in public/ are shown.
const shots = photography.shots.filter((s) => existsSync(join(process.cwd(), "public", s.src)));

export default function Photography() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link href="/" className="nav-mark" aria-label="Home">
            AS
          </Link>
          <nav aria-label="Sections">
            <Link href="/">Home</Link>
            <Link href="/#projects">Projects</Link>
            <Link href="/photography" aria-current="page">
              Photography
            </Link>
            <Link href="/#contact">Contact</Link>
            <a href={profile.resume} className="nav-resume" target="_blank" rel="noopener">
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="section photo-page">
        <div className="wrap">
          <Link href="/" className="back">
            ← Back to {profile.firstName}&rsquo;s site
          </Link>
          <h1 className="h2">Photography</h1>
          <p className="section-blurb">{photography.intro}</p>
          {shots.length > 0 ? (
            <Gallery shots={shots} />
          ) : (
            <p className="photo-empty">Photos are on their way. Check back soon.</p>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
        </div>
      </footer>
    </>
  );
}
