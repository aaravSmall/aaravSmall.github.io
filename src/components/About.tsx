import { existsSync } from "node:fs";
import { join } from "node:path";
import { about, profile } from "@/data/profile";
import { jerseys, outside } from "@/data/leadership";
import { PhotoCarousel } from "@/components/PhotoCarousel";

// Runs at build time: only photos whose files exist in public/ make it into the carousel.
const photos = about.photos.filter((p) => existsSync(join(process.cwd(), "public", p.src)));

export function About() {
  return (
    <section className="section section-raised" id="about" aria-labelledby="about-h">
      <div className="wrap about">
        <figure className="about-photo">
          {photos.length > 0 ? (
            <PhotoCarousel photos={photos} />
          ) : (
            <div className="about-placeholder" role="img" aria-label="Photo coming soon">
              <span>
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
            </div>
          )}
        </figure>

        <div className="about-text">
          <h2 id="about-h" className="h2">
            About
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="about-p">
              {p}
            </p>
          ))}
          <p className="outside">{outside}</p>
          <div className="kits">
            <p className="kits-label">Favorite kits in the collection</p>
            <ul className="kits-list">
              {jerseys.map((j) => (
                <li key={j.kit}>
                  <span className="kit-name">{j.kit}</span>
                  {j.name && <span className="kit-print">{j.name}</span>}
                </li>
              ))}
            </ul>
          </div>
          <dl className="about-facts">
            {about.facts.map((f) => (
              <div key={f.label} className={f.wide ? "about-fact-wide" : undefined}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
