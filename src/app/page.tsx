import { profile, skills } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { leadership, outside } from "@/data/leadership";
import { spotify, topArtists, topSongs } from "@/data/music";
import { Livery } from "@/components/Livery";
import { PoseSketch } from "@/components/PoseSketch";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-mark" aria-label="Back to top">
            AS
          </a>
          <nav aria-label="Sections">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
            <a href={profile.resume} className="nav-resume" target="_blank" rel="noopener">
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <Livery />
          <div className="wrap hero-inner">
            <h1 className="hero-name">
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </h1>
            <ul className="hero-roles" aria-label="Roles">
              {profile.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="hero-intro">{profile.intro}</p>
            <p className="hero-school">
              {profile.school}, class of {profile.graduation.split(" ")[1]}
            </p>
            <div className="hero-actions">
              <a className="btn btn-red" href={profile.resume} target="_blank" rel="noopener">
                View resume
              </a>
              <a className="btn btn-line" href={profile.github} target="_blank" rel="noopener">
                GitHub
              </a>
              <a className="btn btn-line" href={profile.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="exp-h">
          <div className="wrap">
            <h2 id="exp-h" className="h2">
              Experience
            </h2>
            <ol className="timeline">
              {experience.map((job) => (
                <li key={job.company + job.start} className="tl-row">
                  <p className="tl-when">
                    <span>{job.start}</span>
                    <span className="tl-to">to {job.end}</span>
                  </p>
                  <div className="tl-body">
                    <h3 className="h3">{job.company}</h3>
                    <p className="tl-title">{job.title}</p>
                    <ul className="points">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li className="tl-row">
                <p className="tl-when">
                  <span>{profile.graduation}</span>
                  <span className="tl-to">expected</span>
                </p>
                <div className="tl-body">
                  <h3 className="h3">{profile.school}</h3>
                  <p className="tl-title">{profile.degree}</p>
                  <p className="muted">{profile.minor}</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section section-raised" id="projects" aria-labelledby="proj-h">
          <div className="wrap">
            <h2 id="proj-h" className="h2">
              Projects
            </h2>

            {featured.map((p) => (
              <article key={p.name} className="feature">
                <div className="feature-text">
                  <p className={`status status-${p.status.replace(" ", "-").toLowerCase()}`}>{p.status}</p>
                  <h3 className="feature-name">{p.name}</h3>
                  <p className="tagline">{p.tagline}</p>
                  <p>{p.description}</p>
                  {p.highlights && (
                    <ul className="points">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <ul className="stack" aria-label="Built with">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <ProjectLinks repo={p.repo} live={p.live} name={p.name} />
                </div>
                <div className="feature-art">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.image ? <img src={p.image} alt={`${p.name} screenshot`} /> : <PoseSketch />}
                </div>
              </article>
            ))}

            <div className="grid">
              {rest.map((p) => (
                <article key={p.name} className="card">
                  <p className={`status status-${p.status.replace(" ", "-").toLowerCase()}`}>{p.status}</p>
                  <h3 className="h3">{p.name}</h3>
                  <p className="tagline">{p.tagline}</p>
                  <p className="muted">{p.description}</p>
                  {p.highlights && (
                    <ul className="points">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <ul className="stack" aria-label="Built with">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <ProjectLinks repo={p.repo} live={p.live} name={p.name} />
                </article>
              ))}
            </div>

            <p className="more">
              More on{" "}
              <a href={profile.github} target="_blank" rel="noopener">
                GitHub
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" id="skills" aria-labelledby="skills-h">
          <div className="wrap">
            <h2 id="skills-h" className="h2">
              Toolbox
            </h2>
            <dl className="skills">
              {skills.map((g) => (
                <div key={g.group} className="skill-row">
                  <dt>{g.group}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section section-raised" id="leadership" aria-labelledby="lead-h">
          <div className="wrap">
            <h2 id="lead-h" className="h2">
              Leadership
            </h2>
            <div className="lead">
              {leadership.map((l) => (
                <div key={l.title + l.org} className="lead-item">
                  <h3 className="h3">{l.org}</h3>
                  <p className="tl-title">
                    {l.title}, {l.when}
                  </p>
                  <p className="muted">{l.detail}</p>
                </div>
              ))}
            </div>
            <p className="outside">{outside}</p>
          </div>
        </section>

        <section className="section" id="music" aria-labelledby="music-h">
          <div className="wrap">
            <h2 id="music-h" className="h2">
              On rotation
            </h2>
            {(topArtists.length > 0 || topSongs.length > 0) && (
              <div className="music">
                {topArtists.length > 0 && (
                  <div className="music-col">
                    <h3 className="music-label">Top artists</h3>
                    <ol className="music-list">
                      {topArtists.map((a) => (
                        <li key={a}>
                          <span className="music-title">{a}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {topSongs.length > 0 && (
                  <div className="music-col">
                    <h3 className="music-label">Top songs</h3>
                    <ol className="music-list">
                      {topSongs.map((s) => (
                        <li key={s.title + s.artist}>
                          <span className="music-title">{s.title}</span>
                          <span className="music-artist">{s.artist}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
            <a className="spotify" href={spotify.url} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
                <circle cx="12" cy="12" r="11" fill="currentColor" />
                <path
                  d="M6.5 9.2c3.6-1.1 8-.8 11 1M7.2 12.4c3-.8 6.6-.5 9.2 1M7.9 15.4c2.4-.6 5-.4 7.1.8"
                  stroke="var(--navy)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span>
                Follow <strong>{spotify.username}</strong> on Spotify
              </span>
            </a>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-h">
          <div className="wrap">
            <h2 id="contact-h" className="h2">
              Let&rsquo;s talk
            </h2>
            <p className="contact-lede">
              I&rsquo;m looking for roles in AI engineering, forward deployed engineering and full-stack development.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="hero-actions">
              <a className="btn btn-line" href={profile.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a className="btn btn-line" href={profile.github} target="_blank" rel="noopener">
                GitHub
              </a>
              <a className="btn btn-line" href={profile.resume} download="Aarav_Samal_Resume.pdf">
                Download resume
              </a>
            </div>
          </div>
        </section>
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

function ProjectLinks({ repo, live, name }: { repo?: string; live?: string; name: string }) {
  if (!repo && !live) return null;
  return (
    <p className="links">
      {live && (
        <a href={live} target="_blank" rel="noopener" aria-label={`${name} live site`}>
          Visit site
        </a>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noopener" aria-label={`${name} source code on GitHub`}>
          View code
        </a>
      )}
    </p>
  );
}
