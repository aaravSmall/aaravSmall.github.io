"use client";

import { useEffect } from "react";

// Scroll + hover motion for the whole page. The page itself stays server-rendered;
// this component only tags elements, watches them, and writes a few CSS variables.
// Everything visual lives in globals.css under `.motion`.

type Variant = "up" | "left" | "right" | "scale" | "wipe";

// [selector, variant, stagger siblings?]
const TARGETS: [string, Variant, boolean][] = [
  [".section .h2", "wipe", false],
  [".tl-row", "left", false],
  [".feature-text > *", "up", true],
  [".feature-art", "right", false],
  [".grid > .card", "up", true],
  [".skill-row", "left", true],
  [".lead-item", "up", true],
  [".outside", "left", false],
  [".music-label", "left", false],
  [".music-list li", "up", true],
  [".spotify", "scale", false],
  [".more", "up", false],
  [".contact-lede", "up", false],
  [".contact-email", "scale", false],
  [".contact .hero-actions > *", "up", true],
];

export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion");

    // 1. Tag reveal targets. Siblings that enter together get a stagger index.
    const tagged: HTMLElement[] = [];
    for (const [sel, variant, stagger] of TARGETS) {
      const groups = new Map<Element | null, number>();
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.dataset.reveal) return;
        el.dataset.reveal = variant;
        if (stagger) {
          const i = groups.get(el.parentElement) ?? 0;
          groups.set(el.parentElement, i + 1);
          el.style.setProperty("--i", String(Math.min(i, 10)));
        }
        tagged.push(el);
      });
    }

    // 2. Reveal on the way in, hide again on the way out, so it plays every pass.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("in", e.isIntersecting);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    tagged.forEach((el) => io.observe(el));

    // 3. Scroll-linked values: page progress bar and the hero name splitting apart.
    const hero = document.querySelector<HTMLElement>(".hero");
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
        if (hero) {
          const h = hero.offsetHeight || 1;
          const p = Math.min(Math.max(window.scrollY / h, 0), 1);
          hero.style.setProperty("--hero", p.toFixed(4));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 4. Featured project art tilts toward the cursor.
    const arts = Array.from(document.querySelectorAll<HTMLElement>(".feature-art"));
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const tilt = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
    };
    const untilt = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    if (fine) {
      arts.forEach((el) => {
        el.addEventListener("pointermove", tilt);
        el.addEventListener("pointerleave", untilt);
      });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      arts.forEach((el) => {
        el.removeEventListener("pointermove", tilt);
        el.removeEventListener("pointerleave", untilt);
      });
      root.classList.remove("motion");
    };
  }, []);

  return null;
}
