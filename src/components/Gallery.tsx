"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import type { Shot } from "@/data/photos";

// A photo grid that opens a full-screen viewer. Arrow keys move between
// photos, Escape closes it.
export function Gallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)), [shots.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const cur = open === null ? null : shots[open];

  return (
    <>
      <ul className="gallery">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button type="button" className="gallery-item" onClick={() => setOpen(i)} aria-label={`Open ${s.video ? "video" : "photo"}: ${s.alt}`}>
              {s.video ? (
                <>
                  <video src={s.video} poster={s.src} muted loop autoPlay playsInline preload="metadata" aria-hidden="true" />
                  <span className="gallery-badge">Video</span>
                </>
              ) : (
                <img src={s.src} alt={s.alt} loading={i < 6 ? "eager" : "lazy"} />
              )}
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div className="viewer" role="dialog" aria-modal="true" aria-label={cur.alt} onClick={close}>
          <figure className="viewer-figure" onClick={(e) => e.stopPropagation()}>
            {cur.video ? (
              <video key={cur.video} src={cur.video} poster={cur.src} controls autoPlay playsInline aria-label={cur.alt} />
            ) : (
              <img src={cur.src} alt={cur.alt} />
            )}
            {(cur.caption || cur.place) && (
              <figcaption>
                {cur.caption && <span>{cur.caption}</span>}
                {cur.place && <span className="viewer-place">{cur.place}</span>}
              </figcaption>
            )}
          </figure>
          <button type="button" className="viewer-btn viewer-close" onClick={close} aria-label="Close" autoFocus>
            ✕
          </button>
          {shots.length > 1 && (
            <>
              <button type="button" className="viewer-btn viewer-prev" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Previous photo">
                ‹
              </button>
              <button type="button" className="viewer-btn viewer-next" onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Next photo">
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
