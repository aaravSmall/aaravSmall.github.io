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

// Runs at build time: only photos whose files exist in public/ are shown,
// and sections left with nothing in them are hidden.
const exists = (p: string) => existsSync(join(process.cwd(), "public", p));
const sections = photography.sections
  .map((sec) => ({ ...sec, shots: sec.shots.filter((s) => exists(s.src) && (!s.video || exists(s.video))) }))
  .filter((sec) => sec.shots.length > 0);

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
          {sections.length > 0 ? (
            <>
              {sections.length > 1 && (
                <nav className="photo-jump" aria-label="Photo sections">
                  {sections.map((sec) => (
                    <a key={sec.id} href={`#${sec.id}`}>
                      {sec.title.replace(/ Photography$/, "")}
                      <span>{sec.shots.length}</span>
                    </a>
                  ))}
                </nav>
              )}
              {sections.map((sec, i) => (
                <section key={sec.id} id={sec.id} className="photo-section" aria-labelledby={`${sec.id}-title`}>
                  <header className="photo-section-head">
                    <span className="photo-section-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 id={`${sec.id}-title`} className="h3">
                        {sec.title}
                      </h2>
                      {sec.note && <p className="photo-section-note">{sec.note}</p>}
                    </div>
                    <span className="photo-section-count">
                      {sec.shots.length} {sec.shots.length === 1 ? "shot" : "shots"}
                    </span>
                  </header>
                  <Gallery shots={sec.shots} />
                </section>
              ))}
            </>
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
