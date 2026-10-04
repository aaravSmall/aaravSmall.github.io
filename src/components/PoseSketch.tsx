// Placeholder art for mitbo.ai until there's a screenshot:
// a climbing wall with holds, and the tracked keypoints of a climber on it.

const holds: [number, number, number][] = [
  [110, 95, 12], [225, 120, 10], [135, 282, 11], [242, 278, 9], [150, 42, 13], [272, 58, 9],
  [58, 168, 10], [292, 196, 12], [78, 238, 8], [204, 212, 9], [40, 64, 9], [302, 118, 8],
];

// Keypoints: head, neck, shoulders, elbows, hands, hips, knees, feet
const pts = {
  head: [170, 138], neck: [170, 162],
  ls: [146, 168], rs: [194, 170],
  le: [122, 136], re: [214, 150],
  lh: [110, 95], rh: [225, 120],
  hip: [172, 230], lhip: [158, 232], rhip: [186, 232],
  lk: [126, 252], rk: [218, 250],
  lf: [135, 282], rf: [242, 278],
} as const;

const bones: [keyof typeof pts, keyof typeof pts][] = [
  ["neck", "ls"], ["neck", "rs"], ["ls", "le"], ["le", "lh"], ["rs", "re"], ["re", "rh"],
  ["neck", "hip"], ["hip", "lhip"], ["hip", "rhip"], ["lhip", "lk"], ["lk", "lf"], ["rhip", "rk"], ["rk", "rf"],
];

export function PoseSketch() {
  return (
    <svg className="pose" viewBox="0 0 340 340" role="img" aria-label="Illustration of a climber on a wall with body keypoints tracked">
      <rect x="0" y="0" width="340" height="340" className="pose-wall" />
      {holds.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} className="pose-hold" />
      ))}
      {/* next move target */}
      <circle cx="150" cy="42" r="22" className="pose-target" />
      <path d="M108 80 Q 112 52 128 46" className="pose-arrow" />
      {bones.map(([a, b]) => (
        <line key={a + b} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} className="pose-bone" />
      ))}
      <circle cx={pts.head[0]} cy={pts.head[1]} r="12" className="pose-head" />
      {Object.entries(pts).map(([k, [x, y]]) =>
        k === "head" ? null : <circle key={k} cx={x} cy={y} r="4" className="pose-joint" />
      )}
      <g className="pose-cue">
        <rect x="16" y="302" width="232" height="26" rx="2" />
        <text x="28" y="320">Left hand up to the hold above it</text>
      </g>
    </svg>
  );
}
