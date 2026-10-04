"use client";

import { useEffect } from "react";

// Scroll + hover motion for the whole page. The page itself stays server-rendered;
// this component tags elements, splits some text into words or letters, watches
// everything with an IntersectionObserver and writes a few scroll-linked CSS
// variables. All the visuals live in globals.css under `.motion`.

// up/left/right/scale/pop/wipe: the element itself moves in.
// words/chars: the text is split and rises in piece by piece.
// none: the element stays put but its lines/decoration draw in (CSS keys off `.in`).
type Variant = "up" | "left" | "right" | "scale" | "pop" | "wipe" | "photo" | "words" | "chars" | "none";

// [selector, variant, stagger siblings?]
const TARGETS: [string, Variant, boolean?][] = [
  [".section", "none"],
  [".section .h2", "wipe"],

  // About
  [".about-photo", "photo"],
  [".about-p", "up", true],
  [".about-facts > div", "left", true],

  // Experience
  [".tl-row", "none"],
  [".tl-when", "left"],
  [".tl-body .h3", "words"],
  [".tl-title", "up"],
  [".tl-body > .muted", "up"],
  [".points li", "left", true],

  // Projects
  [".status", "left"],
  [".feature-name", "chars"],
  [".tagline", "up"],
  [".feature-text > p:not([class])", "up"],
  [".stack li", "pop", true],
  [".links", "up"],
  [".feature-art", "right"],
  [".proj-head", "left"],
  [".proj-list > li", "up", true],
  [".more", "up"],
  [".section-blurb", "up"],

  // Toolbox
  [".skill-row", "none"],
  [".skills dt", "left"],
  [".skills dd", "words"],

  // Leadership
  [".lead-item", "up", true],
  [".lead-item .h3", "words"],
  [".lead-item .muted", "up"],
  [".outside", "words"],

  // Music
  [".music-label", "left"],
  [".music-list li", "up", true],
  [".spotify", "scale"],

  // Contact + footer
  [".contact-lede", "words"],
  [".contact-email", "chars"],
  [".contact .hero-actions > *", "up", true],
  [".footer p", "up"],
];

// Elements whose position in the viewport drives a continuous effect (--p, 0 to 1).
const SCRUB = ".section, .section .h2, .feature-art, .about-photo";

function splitText(el: HTMLElement, mode: "words" | "chars") {
  if (el.dataset.split || el.children.length > 0) return;
  const text = el.textContent ?? "";
  el.dataset.split = mode;
  el.textContent = "";
  let n = 0;
  for (const token of text.split(/(\s+)/)) {
    if (!token) continue;
    if (/^\s+$/.test(token)) {
      el.append(document.createTextNode(token));
      continue;
    }
    const word = document.createElement("span");
    word.className = "w";
    if (mode === "words") {
      const inner = document.createElement("span");
      inner.className = "wi";
      inner.textContent = token;
      inner.style.setProperty("--n", String(Math.min(n++, 40)));
      word.append(inner);
    } else {
      word.setAttribute("aria-hidden", "true");
      for (const ch of token) {
        const c = document.createElement("span");
        c.className = "ci";
        c.textContent = ch;
        c.style.setProperty("--n", String(Math.min(n++, 40)));
        word.append(c);
      }
    }
    el.append(word);
  }
  if (mode === "chars") el.setAttribute("aria-label", text);
}

export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion");

    // 1. Giant outlined section titles that slide sideways behind each section.
    const ghosts: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>(".section").forEach((section) => {
      const title = section.querySelector(".h2")?.textContent;
      if (!title || section.querySelector(".ghost")) return;
      const ghost = document.createElement("span");
      ghost.className = "ghost";
      ghost.setAttribute("aria-hidden", "true");
      ghost.textContent = title;
      section.prepend(ghost);
      ghosts.push(ghost);
    });

    // 2. Tag reveal targets. Siblings that enter together get a stagger index.
    const tagged: HTMLElement[] = [];
    for (const [sel, variant, stagger] of TARGETS) {
      const groups = new Map<Element | null, number>();
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.dataset.reveal) return;
        el.dataset.reveal = variant;
        if (variant === "words" || variant === "chars") splitText(el, variant);
        if (stagger) {
          const i = groups.get(el.parentElement) ?? 0;
          groups.set(el.parentElement, i + 1);
          el.style.setProperty("--i", String(Math.min(i, 12)));
        }
        tagged.push(el);
      });
    }

    // 3. Reveal on the way in, hide again on the way out, so it plays every pass.
    //    Clip-path wipes start with zero visible area, which the observer can read
    //    as "not on screen", so those are watched through their parent instead.
    const watchers = new Map<Element, HTMLElement[]>();
    for (const el of tagged) {
      const target = el.dataset.reveal === "wipe" && el.parentElement ? el.parentElement : el;
      watchers.set(target, [...(watchers.get(target) ?? []), el]);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          for (const el of watchers.get(e.target) ?? []) el.classList.toggle("in", e.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    watchers.forEach((_, target) => io.observe(target));

    // 4. Scroll-linked values: progress bar, hero split, and per-element --p.
    const hero = document.querySelector<HTMLElement>(".hero");
    const scrubbed = Array.from(document.querySelectorAll<HTMLElement>(SCRUB));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      if (hero) {
        const p = Math.min(Math.max(window.scrollY / (hero.offsetHeight || 1), 0), 1);
        hero.style.setProperty("--hero", p.toFixed(4));
      }
      for (const el of scrubbed) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const p = (vh - r.top) / (vh + r.height);
        el.style.setProperty("--p", Math.min(Math.max(p, 0), 1).toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // 5. Featured project art tilts toward the cursor.
    const arts = Array.from(document.querySelectorAll<HTMLElement>(".feature-art:not(.feature-art-play)"));
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
      ghosts.forEach((g) => g.remove());
      tagged.forEach((el) => {
        delete el.dataset.reveal;
        el.classList.remove("in");
      });
      root.classList.remove("motion");
    };
  }, []);

  return null;
}
