"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

// A song cover that plays a short preview when clicked, like Spotify's.
// One shared <audio> element means starting a song stops whichever was playing.

const CLIP = 15; // seconds
const FADE = 1.2; // fade-out at the end, in seconds

let audio: HTMLAudioElement | null = null;
let playingId: string | null = null;
let timer = 0;
const listeners = new Set<(id: string | null) => void>();
const announce = (id: string | null) => {
  playingId = id;
  listeners.forEach((fn) => fn(id));
};

function stop() {
  cancelAnimationFrame(timer);
  audio?.pause();
  announce(null);
}

function play(id: string, src: string, start: number) {
  stop();
  audio ??= new Audio();
  const a = audio;
  a.src = src;
  a.volume = 1;
  const begin = () => {
    a.currentTime = Math.min(start, Math.max(0, (a.duration || 30) - CLIP));
    const from = a.currentTime;
    a.play().then(
      () => {
        announce(id);
        const tick = () => {
          const t = a.currentTime - from;
          a.volume = Math.max(0, Math.min(1, (CLIP - t) / FADE));
          if (t >= CLIP || a.ended) stop();
          else timer = requestAnimationFrame(tick);
        };
        timer = requestAnimationFrame(tick);
      },
      () => announce(null)
    );
  };
  if (a.readyState >= 1) begin();
  else a.addEventListener("loadedmetadata", begin, { once: true });
  a.load();
}

export function SongPreview({
  id,
  cover,
  preview,
  start = 0,
  label,
}: {
  id: string;
  cover: string | null;
  preview: string;
  start?: number;
  label: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fn = (cur: string | null) => setOn(cur === id);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
      if (playingId === id) stop();
    };
  }, [id]);

  return (
    <button
      type="button"
      className={`preview${on ? " is-playing" : ""}`}
      onClick={() => (on ? stop() : play(id, preview, start))}
      aria-pressed={on}
      aria-label={on ? `Stop preview of ${label}` : `Play a ${CLIP}-second preview of ${label}`}
      style={{ "--clip": `${CLIP}s` } as React.CSSProperties}
    >
      {cover ? (
        <img className="music-cover" src={cover} alt="" width={56} height={56} loading="lazy" />
      ) : (
        <span className="music-cover music-cover-empty" aria-hidden="true">
          {label.replace(/[^A-Za-z0-9]/g, "").slice(0, 1).toUpperCase()}
        </span>
      )}
      <span className="preview-icon" aria-hidden="true">
        {on ? (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        )}
      </span>
      {on && <span className="preview-bar" aria-hidden="true" />}
    </button>
  );
}
