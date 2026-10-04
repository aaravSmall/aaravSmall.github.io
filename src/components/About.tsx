/* eslint-disable @next/next/no-img-element */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { about, profile } from "@/data/profile";
import { outside } from "@/data/leadership";

// Runs at build time: show the photo once public/me.jpg exists, a placeholder until then.
const hasPhoto = existsSync(join(process.cwd(), "public", about.photo));

export function About() {
  return (
    <section className="section section-raised" id="about" aria-labelledby="about-h">
      <div className="wrap about">
        <figure className="about-photo">
          {hasPhoto ? (
            <img src={about.photo} alt={about.photoAlt} width={800} height={1000} />
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
          <dl className="about-facts">
            {about.facts.map((f) => (
              <div key={f.label}>
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
