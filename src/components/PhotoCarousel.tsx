"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Photo } from "@/data/profile";

const INTERVAL = 5000;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Photos stack in the frame; the active one wipes in over the last with a slanted
// edge, like a livery stripe. Auto-advances, pauses on hover/focus, swipes on touch,
// and responds to arrow keys.
export function PhotoCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const still = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const touchX = useRef<number | null>(null);
  const count = photos.length;

  const go = useCallback(
    (next: number, direction: 1 | -1) => {
      const target = ((next % count) + count) % count;
      if (target === index) return;
      setPrev(index);
      setDir(direction);
      setIndex(target);
    },
    [count, index],
  );
  const step = useCallback((d: 1 | -1) => go(index + d, d), [go, index]);

  // Auto-advance (not for reduced-motion visitors, and not while paused).
  useEffect(() => {
    if (count < 2 || paused || still) return;
    const t = setTimeout(() => step(1), INTERVAL);
    return () => clearTimeout(t);
  }, [count, paused, still, step, index]);

  if (count === 0) return null;
  const caption = photos[index].caption?.trim();

  return (
    <div
      className="carousel"
      data-dir={dir}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        touchX.current = null;
        setPaused(false);
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="carousel-track">
        {photos.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            className={`carousel-slide${i === index ? " is-active" : ""}${i === prev ? " is-prev" : ""}`}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            width={800}
            height={1000}
          />
        ))}
      </div>

      {caption && (
        <p className="carousel-caption" key={`cap-${index}`} aria-live="polite">
          {caption}
        </p>
      )}

      {count > 1 && (
        <div className="carousel-bar">
          <span className="carousel-count" aria-live="polite">
            <b>{String(index + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
          </span>
          <div className="carousel-dots" role="tablist" aria-label="Choose photo">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Photo ${i + 1}`}
                className={i === index ? "is-active" : ""}
                onClick={() => go(i, i > index ? 1 : -1)}
              >
                {i === index && !paused && !still && (
                  <span className="carousel-timer" key={index} style={{ animationDuration: `${INTERVAL}ms` }} />
                )}
              </button>
            ))}
          </div>
          <div className="carousel-arrows">
            <button type="button" aria-label="Previous photo" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
              </svg>
            </button>
            <button type="button" aria-label="Next photo" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
