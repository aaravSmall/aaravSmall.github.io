// The climbing puzzle behind the mitbo.ai demo: a small wall, a stick-figure
// climber, the rules for what counts as a legal move, and a solver that finds
// the shortest way to the top from wherever the climber currently is.
// Pure functions only, so the component stays about drawing and dragging.

export type Pt = { x: number; y: number };
export type Kind = "jug" | "crimp" | "sloper" | "pinch" | "chip";
export type Hold = Pt & { kind: Kind; finish?: boolean };
export type Limb = "lh" | "rh" | "lf" | "rf";
export type State = Record<Limb, number>; // limb -> hold index

export const W = 340;
export const H = 420;

export const ARM = 100; // max shoulder-to-hand reach
export const LEG = 110; // max hip-to-foot reach
const TORSO = 32; // half the shoulder-to-hip distance
const SHOULDER = 14;
const HIP = 10;
const HAND_LOW = 18; // how far below the shoulders a hand may sit
const FOOT_HIGH = 12; // how far below the hips a foot must stay

export const LIMBS: Limb[] = ["lh", "rh", "lf", "rf"];
export const LIMB_NAME: Record<Limb, string> = {
  lh: "Left hand",
  rh: "Right hand",
  lf: "Left foot",
  rf: "Right foot",
};
export const isHand = (l: Limb) => l === "lh" || l === "rh";

// Bottom-left start, finish jug top-right. Index order is just authoring order.
export const HOLDS: Hold[] = [
  { x: 52, y: 392, kind: "chip" }, // 0  start foot
  { x: 104, y: 384, kind: "chip" }, // 1  start foot
  { x: 46, y: 238, kind: "jug" }, // 2  start hand
  { x: 104, y: 252, kind: "jug" }, // 3  start hand
  { x: 150, y: 346, kind: "chip" }, // 4
  { x: 88, y: 342, kind: "chip" }, // 5
  { x: 152, y: 196, kind: "crimp" }, // 6
  { x: 82, y: 168, kind: "pinch" }, // 7
  { x: 196, y: 280, kind: "chip" }, // 8
  { x: 206, y: 158, kind: "sloper" }, // 9
  { x: 132, y: 122, kind: "crimp" }, // 10
  { x: 160, y: 254, kind: "chip" }, // 11
  { x: 252, y: 214, kind: "chip" }, // 12
  { x: 258, y: 128, kind: "pinch" }, // 13
  { x: 190, y: 92, kind: "crimp" }, // 14
  { x: 298, y: 160, kind: "chip" }, // 15
  { x: 282, y: 74, kind: "jug", finish: true }, // 16 finish
  { x: 40, y: 118, kind: "sloper" }, // 17 decoy, out left
  { x: 304, y: 300, kind: "chip" }, // 18 decoy, out right
];

export const FINISH = HOLDS.findIndex((h) => h.finish);
export const START: State = { lh: 2, rh: 3, lf: 0, rf: 1 };

export const isTop = (s: State) => s.lh === FINISH && s.rh === FINISH;
export const key = (s: State) => `${s.lh},${s.rh},${s.lf},${s.rf}`;

export const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

export type Body = {
  head: Pt;
  neck: Pt;
  hipC: Pt;
  up: Pt; // unit vector up the spine
  right: Pt; // unit vector to the climber's right
  anchor: Record<Limb, Pt>; // shoulder for hands, hip for feet
};

// The torso is a fixed-length segment centred between the hands and the feet,
// tilted to point from the feet toward the hands.
export function bodyFor(pts: Record<Limb, Pt>): Body {
  const hx = (pts.lh.x + pts.rh.x) / 2;
  const hy = (pts.lh.y + pts.rh.y) / 2;
  const fx = (pts.lf.x + pts.rf.x) / 2;
  const fy = (pts.lf.y + pts.rf.y) / 2;
  const mx = (hx + fx) / 2;
  const my = (hy + fy) / 2;
  const len = Math.hypot(hx - fx, hy - fy) || 1;
  // Unit vector up the spine, kept mostly upright so the climber never lies flat.
  let ux = (hx - fx) / len;
  let uy = (hy - fy) / len;
  ux *= 0.6;
  const n = Math.hypot(ux, uy) || 1;
  ux /= n;
  uy /= n;
  // Perpendicular, pointing to the climber's right.
  const rx = -uy;
  const ry = ux;
  const neck = { x: mx + ux * TORSO, y: my + uy * TORSO };
  const hipC = { x: mx - ux * TORSO, y: my - uy * TORSO };
  const at = (p: Pt, w: number, down = 0) => ({ x: p.x + rx * w - ux * down, y: p.y + ry * w - uy * down });
  return {
    neck,
    hipC,
    up: { x: ux, y: uy },
    right: { x: rx, y: ry },
    head: { x: neck.x + ux * 20, y: neck.y + uy * 20 },
    anchor: {
      lh: at(neck, -SHOULDER, 4),
      rh: at(neck, SHOULDER, 4),
      lf: at(hipC, -HIP),
      rf: at(hipC, HIP),
    },
  };
}

export const pointsOf = (s: State): Record<Limb, Pt> => ({
  lh: HOLDS[s.lh],
  rh: HOLDS[s.rh],
  lf: HOLDS[s.lf],
  rf: HOLDS[s.rf],
});

export const reachOf = (l: Limb) => (isHand(l) ? ARM : LEG);

// Why a position doesn't work, written as a coach would say it. Null means it's fine.
export function problem(s: State, moved?: Limb): string | null {
  const p = pointsOf(s);
  if (HOLDS[s.lh].kind === "chip" || HOLDS[s.rh].kind === "chip") return "That's a foot chip. Nothing there to grab.";
  if (s.lf === s.rf) return "Both feet on one chip? There's no room.";
  if (s.lf === s.lh || s.lf === s.rh || s.rf === s.lh || s.rf === s.rh)
    return "Your hand's still on that one. Feet need their own hold.";
  if (p.lh.x > p.rh.x + 8 || p.lf.x > p.rf.x + 8) return "No crossing over on this one. Keep left on the left.";

  const b = bodyFor(p);
  // Check the limb that moved last, so the message names the right one.
  const order = moved ? [moved, ...LIMBS.filter((l) => l !== moved)] : LIMBS;
  for (const l of order) {
    if (dist(p[l], b.anchor[l]) > reachOf(l)) {
      return l === moved
        ? `Too far. Your ${LIMB_NAME[l].toLowerCase()} can't get there from here.`
        : `That pulls your ${LIMB_NAME[l].toLowerCase()} off the wall. Too much of a stretch.`;
    }
  }
  if (p.lh.y > b.neck.y + HAND_LOW || p.rh.y > b.neck.y + HAND_LOW)
    return "Hands stay up by your shoulders or higher. Climbing's the other way.";
  if (p.lf.y < b.hipC.y + FOOT_HIGH || p.rf.y < b.hipC.y + FOOT_HIGH)
    return "That high-step would need a lot more flexibility.";
  return null;
}

export function moves(s: State): [Limb, number, State][] {
  const out: [Limb, number, State][] = [];
  for (const l of LIMBS) {
    for (let h = 0; h < HOLDS.length; h++) {
      if (h === s[l]) continue;
      const next = { ...s, [l]: h };
      if (!problem(next, l)) out.push([l, h, next]);
    }
  }
  return out;
}

// Breadth-first search backwards from every topped-out state would be the
// textbook move; the space is tiny (19^4 states at most), so a forward BFS per
// request is instant and simpler to read.
export function solve(from: State): { limb: Limb; hold: number }[] | null {
  if (isTop(from)) return [];
  const prev = new Map<string, [string, Limb, number] | null>([[key(from), null]]);
  const queue: State[] = [from];
  for (let i = 0; i < queue.length; i++) {
    const s = queue[i];
    for (const [l, h, next] of moves(s)) {
      const k = key(next);
      if (prev.has(k)) continue;
      prev.set(k, [key(s), l, h]);
      if (isTop(next)) {
        const path: { limb: Limb; hold: number }[] = [];
        let cur: string | undefined = k;
        while (cur) {
          const step = prev.get(cur);
          if (!step) break;
          path.unshift({ limb: step[1], hold: step[2] });
          cur = step[0];
        }
        return path;
      }
      queue.push(next);
    }
  }
  return null;
}

const KIND_NAME: Record<Kind, string> = {
  jug: "jug",
  crimp: "crimp",
  sloper: "sloper",
  pinch: "pinch",
  chip: "foot chip",
};

function direction(from: Pt, to: Pt): string {
  const dx = to.x - from.x;
  const dy = from.y - to.y; // up is positive
  const side = dx > 0 ? "right" : "left";
  if (Math.abs(dx) < 22) return dy > 0 ? "straight up" : "down";
  if (Math.abs(dy) < 22) return `across to the ${side}`;
  return dy > 0 ? `up and ${side}` : `down and ${side}`;
}

// "Right hand up and right to the crimp." in mitbo's coaching voice.
export function cue(s: State, limb: Limb, hold: number): string {
  const h = HOLDS[hold];
  const target = h.finish ? (s.lh === FINISH || s.rh === FINISH ? "match the finish jug" : "the finish jug") : `the ${KIND_NAME[h.kind]}`;
  if (h.finish && (s.lh === FINISH || s.rh === FINISH)) return `${LIMB_NAME[limb]} in to ${target}. Send it.`;
  return `${LIMB_NAME[limb]} ${direction(HOLDS[s[limb]], h)} to ${target}.`;
}

// Two-bone IK: the elbow or knee for a limb from its anchor to its end point.
// Left limbs bend to the climber's left and right limbs to the right; elbows
// also prefer to drop, the way they do when you hang off straight arms.
export function joint(limb: Limb, anchor: Pt, end: Pt, body: Body): Pt {
  const reach = reachOf(limb);
  const seg = (reach / 2) * 1.02;
  const full = dist(anchor, end) || 1;
  const d = Math.min(full, seg * 2 - 0.01);
  const h = Math.sqrt(Math.max(seg * seg - (d / 2) * (d / 2), 0));
  const mx = (anchor.x + end.x) / 2;
  const my = (anchor.y + end.y) / 2;
  const px = -(end.y - anchor.y) / full;
  const py = (end.x - anchor.x) / full;
  const side = limb === "lh" || limb === "lf" ? -1 : 1;
  const drop = isHand(limb) ? 0.8 : 0;
  const score = (c: Pt) => {
    const vx = c.x - mx;
    const vy = c.y - my;
    return side * (vx * body.right.x + vy * body.right.y) - drop * (vx * body.up.x + vy * body.up.y);
  };
  const a = { x: mx + px * h, y: my + py * h };
  const b = { x: mx - px * h, y: my - py * h };
  return score(a) >= score(b) ? a : b;
}
