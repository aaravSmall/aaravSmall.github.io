/* eslint-disable @next/next/no-img-element */
import { spotify, topArtists, topSongs } from "@/data/music";
import { artistCover, songCover } from "@/lib/artwork";

const sortKey = (s: string) => s.toLowerCase();
const byText = (a: string, b: string) => sortKey(a).localeCompare(sortKey(b), "en", { numeric: true });

export async function Music() {
  const artists = [...topArtists].sort(byText);
  const songs = [...topSongs].sort((a, b) => byText(a.artist, b.artist) || byText(a.title, b.title));

  const [artistArt, songArt] = await Promise.all([
    Promise.all(artists.map((a) => artistCover(a))),
    Promise.all(songs.map((s) => songCover(s.title, s.artist))),
  ]);

  return (
    <section className="section" id="music" aria-labelledby="music-h">
      <div className="wrap">
        <h2 id="music-h" className="h2">
          Top artists &amp; songs
        </h2>
        <div className="music">
          <div className="music-col">
            <h3 className="music-label">Top artists</h3>
            <ol className="music-list">
              {artists.map((a, i) => (
                <li key={a}>
                  <Cover src={artistArt[i]} label={a} round />
                  <span className="music-text">
                    <span className="music-title">{a}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="music-col">
            <h3 className="music-label">Top songs</h3>
            <ol className="music-list">
              {songs.map((s, i) => (
                <li key={s.title + s.artist}>
                  <Cover src={songArt[i]} label={s.title} />
                  <span className="music-text">
                    <span className="music-title">{s.title}</span>
                    <span className="music-artist">{s.artist}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
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
  );
}

function Cover({ src, label, round }: { src: string | null; label: string; round?: boolean }) {
  const cls = `music-cover${round ? " music-cover-round" : ""}`;
  if (src) return <img className={cls} src={src} alt="" width={56} height={56} loading="lazy" />;
  return (
    <span className={`${cls} music-cover-empty`} aria-hidden="true">
      {label.replace(/[^A-Za-z0-9]/g, "").slice(0, 1).toUpperCase()}
    </span>
  );
}
