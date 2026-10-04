// Small line illustrations for the project cards. Each one is a simple sketch
// of what the project does, drawn in the site palette.

export type ArtKey = "britney" | "overlay" | "roamly" | "college" | "fantasy";

export function ProjectArt({ art }: { art: ArtKey }) {
  const Art = ARTS[art];
  return (
    <div className="card-art" aria-hidden="true">
      <svg viewBox="0 0 320 120">
        <rect width="320" height="120" className="art-bg" />
        <Art />
      </svg>
    </div>
  );
}

// A price line climbing past a stop-loss, with buy and sell markers.
function Britney() {
  const line = "M16 92 L48 84 L72 88 L100 70 L128 76 L156 58 L184 64 L212 44 L240 50 L270 30 L304 24";
  return (
    <>
      {[30, 60, 90].map((y) => (
        <line key={y} x1="16" x2="304" y1={y} y2={y} className="art-grid" />
      ))}
      <line x1="16" x2="304" y1="104" y2="104" className="art-stop" />
      <text x="304" y="100" className="art-label" textAnchor="end">
        stop-loss
      </text>
      <path d={`${line} L304 104 L16 104Z`} className="art-fill" />
      <path d={line} className="art-line" />
      {[
        [72, 88],
        [184, 64],
      ].map(([x, y]) => (
        <path key={x} d={`M${x} ${y + 8} l-6 9 h12z`} className="art-buy" />
      ))}
      <path d="M270 21 l-6 -9 h12z" className="art-sell" />
      <circle cx="304" cy="24" r="4" className="art-dot" />
    </>
  );
}

// A desktop window with the overlay panel floating over it.
function Overlay() {
  return (
    <>
      <rect x="22" y="12" width="276" height="100" rx="4" className="art-window" />
      <line x1="22" x2="298" y1="26" y2="26" className="art-grid" />
      {[32, 42, 52].map((x) => (
        <circle key={x} cx={x} cy="19" r="2.5" className="art-muted" />
      ))}
      {[40, 52, 64, 76].map((y, i) => (
        <rect key={y} x="38" y={y} width={[120, 96, 132, 80][i]} height="5" rx="2" className="art-muted" />
      ))}
      <rect x="178" y="34" width="104" height="64" rx="4" className="art-panel" />
      <rect x="190" y="46" width="64" height="5" rx="2" className="art-text" />
      <rect x="190" y="57" width="80" height="5" rx="2" className="art-text" />
      <path
        d="M190 82 q4 -10 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0"
        className="art-wave"
      />
      <rect x="38" y="92" width="34" height="11" rx="2" className="art-key" />
      <text x="55" y="100" className="art-keytext" textAnchor="middle">
        ⌘ ↵
      </text>
    </>
  );
}

// Photos turning into pins on a map, joined by the trips between them.
function Roamly() {
  const pins: [number, number][] = [
    [56, 78],
    [132, 46],
    [206, 70],
    [272, 38],
  ];
  return (
    <>
      {Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 19 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={16 + c * 16} cy={14 + r * 16} r="1.4" className="art-muted" />
        ))
      )}
      <path d="M56 78 Q90 30 132 46 Q170 60 206 70 Q240 40 272 38" className="art-trip" />
      {pins.map(([x, y]) => (
        <path key={x} d={`M${x} ${y} c-6 -8 -9 -12 -9 -16 a9 9 0 0 1 18 0 c0 4 -3 8 -9 16z`} className="art-pin" />
      ))}
      <g transform="translate(232 76) rotate(6)">
        <rect width="40" height="34" rx="2" className="art-photo" />
        <rect x="4" y="4" width="32" height="20" className="art-photo-in" />
      </g>
      <g transform="translate(20 84) rotate(-5)">
        <rect width="40" height="34" rx="2" className="art-photo" />
        <rect x="4" y="4" width="32" height="20" className="art-photo-in" />
      </g>
    </>
  );
}

// An acceptance-odds gauge next to a short list of schools.
function College() {
  return (
    <>
      <path d="M40 98 A56 56 0 0 1 152 98" className="art-track" />
      <path d="M40 98 A56 56 0 0 1 133 58" className="art-arc" />
      <line x1="96" y1="98" x2="132" y2="62" className="art-needle" />
      <circle cx="96" cy="98" r="5" className="art-dot" />
      <path d="M34 16 l20 8 -20 8 -20 -8z" className="art-cap" />
      <path d="M48 26 v8 q-14 6 -28 0 v-8" className="art-cap-band" />
      {[34, 58, 82].map((y, i) => (
        <g key={y}>
          <rect x="180" y={y} width="56" height="6" rx="2" className="art-muted" />
          <rect x="246" y={y - 2} width={[56, 38, 20][i]} height="10" rx="2" className={i === 0 ? "art-bar-hi" : "art-bar"} />
        </g>
      ))}
    </>
  );
}

// A pitch with a 3-4-3 lineup attacking left to right, the striker you're
// picking highlighted.
function Fantasy() {
  const gk: [number, number] = [30, 60];
  const outfield: [number, number][] = [
    // back three
    [78, 32],
    [72, 60],
    [78, 88],
    // midfield four: wing-backs pushed up, two central mids
    [150, 18],
    [132, 46],
    [132, 74],
    [150, 102],
    // front three
    [218, 28],
    [218, 92],
  ];
  const striker: [number, number] = [238, 60];
  return (
    <>
      <rect x="16" y="8" width="288" height="104" className="art-pitch" />
      <line x1="160" x2="160" y1="8" y2="112" className="art-pitch-line" />
      <circle cx="160" cy="60" r="18" className="art-pitch-line" />
      <rect x="16" y="30" width="34" height="60" className="art-pitch-line" />
      <rect x="16" y="46" width="12" height="28" className="art-pitch-line" />
      <rect x="270" y="30" width="34" height="60" className="art-pitch-line" />
      <rect x="292" y="46" width="12" height="28" className="art-pitch-line" />
      <circle cx={gk[0]} cy={gk[1]} r="5" className="art-keeper" />
      {outfield.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" className="art-player" />
      ))}
      <circle cx={striker[0]} cy={striker[1]} r="7" className="art-player-hi" />
      <circle cx={striker[0]} cy={striker[1]} r="13" className="art-pick" />
    </>
  );
}

const ARTS: Record<ArtKey, () => React.JSX.Element> = {
  britney: Britney,
  overlay: Overlay,
  roamly: Roamly,
  college: College,
  fantasy: Fantasy,
};
