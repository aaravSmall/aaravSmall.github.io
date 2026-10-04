"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import {
  FINISH,
  H,
  HOLDS,
  LIMBS,
  LIMB_NAME,
  START,
  W,
  bodyFor,
  canMove,
  cue,
  dist,
  isHand,
  isTop,
  joint,
  pointsOf,
  reachOf,
  solve,
  type Hold,
  type Limb,
  type Pt,
  type State,
} from "@/lib/climb";

// mitbo.ai, playable: drag the climber's hands and feet onto holds and work out
// the problem yourself, or ask mitbo for the next move.

const BEST = solve(START)?.length ?? 0;
const SNAP = 26; // how close a drop has to land to a hold to grab it
const INTRO = "Drag a hand or foot to a new hold. Get both hands on the top jug.";

type Override = { limb: Limb; pt: Pt } | null;

export function ClimbDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<State>(START);
  const [count, setCount] = useState(0);
  const [help, setHelp] = useState(false);
  const [msg, setMsg] = useState(INTRO);
  const [drag, setDrag] = useState<Limb | null>(null);
  const [override, setOverride] = useState<Override>(null);
  const raf = useRef(0);

  const plan = useMemo(() => solve(state), [state]);
  const hint = help && plan && plan.length > 0 ? plan[0] : null;
  const topped = isTop(state);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const pts = pointsOf(state);
  const live: Record<Limb, Pt> = { ...pts };
  if (override) live[override.limb] = override.pt;
  // The body follows the limb being moved, the way a climber stands up or leans
  // in to reach, while the other three stay on their holds.
  const body = bodyFor(live);

  const animate = useCallback((limb: Limb, from: Pt, to: Pt, done: () => void) => {
    cancelAnimationFrame(raf.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const ms = reduce ? 0 : 240;
    const step = (now: number) => {
      const t = ms ? Math.min((now - t0) / ms, 1) : 1;
      const e = 1 - (1 - t) ** 3;
      setOverride({ limb, pt: { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e } });
      if (t < 1) raf.current = requestAnimationFrame(step);
      else {
        setOverride(null);
        done();
      }
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const commit = useCallback(
    (limb: Limb, hold: number) => {
      const before = plan?.length ?? 0;
      const next = { ...state, [limb]: hold };
      const after = solve(next)?.length ?? 0;
      const n = count + 1;
      setState(next);
      setCount(n);
      if (isTop(next)) {
        setMsg(
          n <= BEST
            ? `Sent in ${n} moves. That's mitbo's beta, move for move.`
            : `Sent in ${n} moves! mitbo's beta gets there in ${BEST}.`
        );
      } else if (help) {
        const h = solve(next)?.[0];
        setMsg(h ? cue(next, h.limb, h.hold) : INTRO);
      } else if (after < before) {
        setMsg(`Good move. That's what mitbo would do. ${after} to go.`);
      } else {
        setMsg(`That works, but it doesn't get you any closer. ${after} moves from the top.`);
      }
    },
    [plan, state, count, help]
  );

  const toSvg = (e: { clientX: number; clientY: number }): Pt | null => {
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  };

  // Keep the dragged hand or foot within a real reach of its shoulder or hip.
  // The shoulder or hip moves with the limb, so settle it over a few passes.
  const clampReach = (limb: Limb, p: Pt): Pt => {
    const r = reachOf(limb) + SNAP;
    let q = p;
    for (let i = 0; i < 6; i++) {
      const a = bodyFor({ ...pts, [limb]: q }).anchor[limb];
      const d = dist(a, p);
      if (d <= r) break;
      q = { x: a.x + ((p.x - a.x) / d) * r, y: a.y + ((p.y - a.y) / d) * r };
    }
    return { x: Math.max(6, Math.min(W - 6, q.x)), y: Math.max(6, Math.min(H - 6, q.y)) };
  };

  const onDown = (limb: Limb) => (e: RPointerEvent<SVGElement>) => {
    if (topped) return;
    e.preventDefault();
    cancelAnimationFrame(raf.current);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    setDrag(limb);
    setOverride({ limb, pt: pts[limb] });
  };

  const onMove = (e: RPointerEvent<SVGElement>) => {
    if (!drag) return;
    const p = toSvg(e);
    if (p) setOverride({ limb: drag, pt: clampReach(drag, p) });
  };

  const onUp = () => {
    if (!drag || !override) return setDrag(null);
    const limb = drag;
    const at = override.pt;
    setDrag(null);
    const home = HOLDS[state[limb]];

    let best = -1;
    let bestD = SNAP;
    HOLDS.forEach((h, i) => {
      const d = dist(h, at);
      if (d < bestD) {
        best = i;
        bestD = d;
      }
    });

    if (best === -1 || best === state[limb]) {
      if (best === -1) setMsg("Missed. Let go right on top of a hold to grab it.");
      return animate(limb, at, home, () => {});
    }
    const why = canMove(state, limb, best);
    if (why) {
      setMsg(why);
      return animate(limb, at, home, () => {});
    }
    animate(limb, at, HOLDS[best], () => commit(limb, best));
  };

  const toggleHelp = () => {
    const on = !help;
    setHelp(on);
    if (topped) return;
    setMsg(on && plan?.[0] ? cue(state, plan[0].limb, plan[0].hold) : INTRO);
  };

  const doIt = () => {
    if (!hint) return;
    animate(hint.limb, pts[hint.limb], HOLDS[hint.hold], () => commit(hint.limb, hint.hold));
  };

  const reset = () => {
    cancelAnimationFrame(raf.current);
    setOverride(null);
    setState(START);
    setCount(0);
    setMsg(help && BEST ? cue(START, solve(START)![0].limb, solve(START)![0].hold) : INTRO);
  };

  const target = hint ? HOLDS[hint.hold] : null;

  return (
    <div className="climb">
      <svg
        ref={svgRef}
        className="climb-wall"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="A climbing wall with a stick-figure climber. Drag the climber's hands and feet onto holds to climb to the top."
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <rect width={W} height={H} className="pose-wall" />
        <WallTexture />

        {HOLDS.map((h, i) => (
          <HoldShape key={i} hold={h} />
        ))}
        <g className="climb-top" transform={`translate(${HOLDS[FINISH].x} ${HOLDS[FINISH].y})`}>
          <circle r="21" />
          <text y="-28">TOP</text>
        </g>

        {target && (
          <circle cx={target.x} cy={target.y} r="20" className="climb-target" />
        )}

        {drag && (
          <circle
            cx={body.anchor[drag].x}
            cy={body.anchor[drag].y}
            r={reachOf(drag)}
            className="climb-reach"
          />
        )}

        <Climber body={body} live={live} />

        {LIMBS.map((l) => (
          <g
            key={l}
            className={`climb-grip${drag === l ? " is-drag" : ""}${hint?.limb === l ? " is-hint" : ""}`}
            onPointerDown={onDown(l)}
          >
            <circle cx={live[l].x} cy={live[l].y} r="20" className="climb-hit" />
            <circle cx={live[l].x} cy={live[l].y} r={isHand(l) ? 7 : 6.5} className="climb-end" />
            <title>{LIMB_NAME[l]}</title>
          </g>
        ))}
      </svg>

      <p className="climb-cue" aria-live="polite">
        <span className="climb-cue-tag">{topped ? "Sent" : help ? "mitbo" : `Move ${count}`}</span>
        {msg}
      </p>

      <div className="climb-actions">
        <button type="button" className={`btn ${help ? "btn-red" : "btn-line"} climb-btn`} onClick={toggleHelp} aria-pressed={help}>
          {help ? "Hide mitbo's help" : "Get mitbo's help"}
        </button>
        {help && !topped && (
          <button type="button" className="btn btn-line climb-btn" onClick={doIt}>
            Show me
          </button>
        )}
        <button type="button" className="btn btn-line climb-btn" onClick={reset}>
          {topped ? "Climb again" : "Reset"}
        </button>
      </div>
    </div>
  );
}

function Climber({ body, live }: { body: ReturnType<typeof bodyFor>; live: Record<Limb, Pt> }) {
  const segs = LIMBS.map((l) => {
    const a = body.anchor[l];
    const j = joint(l, a, live[l], body);
    return { l, a, j, e: live[l] };
  });
  const sh = [body.anchor.lh, body.anchor.rh];
  const hp = [body.anchor.lf, body.anchor.rf];
  return (
    <g className="climb-body" aria-hidden="true">
      <line x1={sh[0].x} y1={sh[0].y} x2={sh[1].x} y2={sh[1].y} className="pose-bone" />
      <line x1={hp[0].x} y1={hp[0].y} x2={hp[1].x} y2={hp[1].y} className="pose-bone" />
      <line x1={body.neck.x} y1={body.neck.y} x2={body.hipC.x} y2={body.hipC.y} className="pose-bone" />
      {segs.map(({ l, a, j, e }) => (
        <polyline key={l} points={`${a.x},${a.y} ${j.x},${j.y} ${e.x},${e.y}`} className="pose-bone climb-limb" />
      ))}
      <circle cx={body.head.x} cy={body.head.y} r="11" className="pose-head" />
      {segs.map(({ l, j }) => (
        <circle key={l} cx={j.x} cy={j.y} r="3.5" className="pose-joint" />
      ))}
    </g>
  );
}

function HoldShape({ hold: h }: { hold: Hold }) {
  const cls = `climb-hold climb-${h.kind}`;
  switch (h.kind) {
    case "jug":
      return <path className={cls} d={`M${h.x - 14} ${h.y + 3} Q${h.x} ${h.y - 16} ${h.x + 14} ${h.y + 3} Q${h.x} ${h.y + 9} ${h.x - 14} ${h.y + 3}Z`} />;
    case "crimp":
      return <rect className={cls} x={h.x - 10} y={h.y - 3.5} width="20" height="7" rx="2.5" />;
    case "sloper":
      return <ellipse className={cls} cx={h.x} cy={h.y} rx="13" ry="10" />;
    case "pinch":
      return <ellipse className={cls} cx={h.x} cy={h.y} rx="5.5" ry="13" />;
    default:
      return <circle className={cls} cx={h.x} cy={h.y} r="5" />;
  }
}

// Bolt holes in a grid, like a real wall panel.
function WallTexture() {
  const dots: Pt[] = [];
  for (let y = 20; y < H; y += 40) for (let x = 20; x < W; x += 40) dots.push({ x, y });
  return (
    <g className="climb-bolts" aria-hidden="true">
      {dots.map((d) => (
        <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="1.6" />
      ))}
    </g>
  );
}
