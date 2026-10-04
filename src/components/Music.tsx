/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { spotify, spotifySearch, topArtists, topSongs, type Artist } from "@/data/music";
import { artistCover, songCover } from "@/lib/artwork";

const sortKey = (s: string) => s.toLowerCase();
const byText = (a: string, b: string) => sortKey(a).localeCompare(sortKey(b), "en", { numeric: true });

export async function Music() {
  const artists = [...topArtists].sort((a, b) => byText(a.name, b.name));
  const songs = [...topSongs].sort((a, b) => byText(a.artist, b.artist) || byText(a.title, b.title));

  const [artistArt, songArt] = await Promise.all([
    Promise.all(artists.map((a) => artistCover(a.name))),
    Promise.all(songs.map((s) => (s.cover ? Promise.resolve(s.cover) : songCover(s.title, s.artist, s.album)))),
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
                <li key={a.name}>
                  <Cover src={artistArt[i]} label={a.name} round />
                  <span className="music-text">
                    <span className="music-title">
                      <ArtistLinks artist={a} />
                    </span>
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
                    <span className="music-title">
                      <SpotifyLink href={s.spotify ?? spotifySearch(`${s.title} ${s.artist}`)} label={`${s.title} by ${s.artist}`}>
                        {s.title}
                      </SpotifyLink>
                    </span>
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

function SpotifyLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a className="music-link" href={href} target="_blank" rel="noopener" aria-label={`${label} on Spotify`}>
      {children}
    </a>
  );
}

// "BoyWithUke / Chandol" becomes two links, one per name.
function ArtistLinks({ artist }: { artist: Artist }) {
  const names = artist.name.split(" / ");
  const links = Array.isArray(artist.spotify) ? artist.spotify : [artist.spotify];
  return names.map((name, i) => (
    <span key={name}>
      {i > 0 && " / "}
      <SpotifyLink href={links[i] ?? spotifySearch(name)} label={name}>
        {name}
      </SpotifyLink>
    </span>
  ));
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
