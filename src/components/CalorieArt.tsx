// Featured art for the calorie tracker: a sketch of the app's Today screen in a
// phone frame. Summary ring (eaten / remaining / burned), then the food timeline.

const R = 46;
const C = 2 * Math.PI * R;
const EATEN = 0.62; // share of the day's budget eaten so far

const ROWS: { time: string; name: string; kcal: string; w: number }[] = [
  { time: "8:10", name: "Greek yogurt, berries", kcal: "240", w: 112 },
  { time: "12:35", name: "Chicken pesto pasta", kcal: "610", w: 104 },
  { time: "3:50", name: "Apple, peanut butter", kcal: "290", w: 108 },
];

export function CalorieArt() {
  return (
    <svg viewBox="0 0 360 400" className="cal-art" aria-hidden="true">
      <rect width="360" height="400" className="art-bg" />
      {/* faint grid behind the phone */}
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={20 + c * 46} cy={22 + r * 46} r="1.4" className="art-muted" />
        ))
      )}

      <g transform="translate(90 20)">
        <rect width="180" height="360" rx="26" className="cal-phone" />
        <rect x="70" y="12" width="40" height="9" rx="4.5" className="cal-notch" />

        <text x="18" y="48" className="cal-h">
          Today
        </text>
        <rect x="126" y="38" width="38" height="13" rx="6.5" className="cal-chip" />
        <text x="145" y="48" className="cal-chip-t" textAnchor="middle">
          12 days
        </text>

        {/* summary card */}
        <rect x="12" y="62" width="156" height="128" rx="10" className="cal-card" />
        <g transform="translate(90 120) rotate(-90)">
          <circle r={R} className="cal-track" />
          <circle r={R} className="cal-ring" strokeDasharray={`${C * EATEN} ${C}`} />
          <circle r={R} className="cal-burn" strokeDasharray={`${C * 0.1} ${C}`} strokeDashoffset={-C * EATEN} />
        </g>
        <text x="90" y="118" className="cal-big" textAnchor="middle">
          760
        </text>
        <text x="90" y="132" className="cal-small" textAnchor="middle">
          remaining
        </text>
        <text x="24" y="182" className="cal-small">
          eaten 1,140
        </text>
        <text x="156" y="182" className="cal-small" textAnchor="end">
          burned 210
        </text>

        {/* food timeline */}
        {ROWS.map((r, i) => {
          const y = 206 + i * 40;
          return (
            <g key={r.time}>
              <rect x="12" y={y} width="156" height="32" rx="7" className="cal-row" />
              <text x="22" y={y + 20} className="cal-time">
                {r.time}
              </text>
              <text x="54" y={y + 20} className="cal-name">
                {r.name}
              </text>
              <text x="160" y={y + 20} className="cal-kcal" textAnchor="end">
                {r.kcal}
              </text>
            </g>
          );
        })}

        {/* tab bar */}
        <line x1="12" x2="168" y1="330" y2="330" className="art-grid" />
        {[36, 72, 108, 144].map((x, i) =>
          i === 1 ? (
            <g key={x}>
              <circle cx={x} cy="344" r="10" className="cal-add" />
              <path d={`M${x - 4} 344 h8 M${x} 340 v8`} className="cal-plus" />
            </g>
          ) : (
            <circle key={x} cx={x} cy="344" r="4" className={i === 0 ? "art-dot" : "art-muted"} />
          )
        )}
      </g>

      {/* label scan, floating off the phone */}
      <g transform="translate(274 236) rotate(6) scale(0.86)">
        <rect width="78" height="96" rx="3" className="art-photo" />
        <text x="7" y="15" className="cal-label-h">
          Nutrition Facts
        </text>
        <line x1="7" x2="71" y1="20" y2="20" className="cal-label-rule" />
        {[30, 42, 54, 66, 78].map((y, i) => (
          <rect key={y} x="7" y={y} width={[52, 40, 46, 34, 44][i]} height="4" rx="1" className="cal-label-line" />
        ))}
        <path d="M-4 8 v-12 h12 M74 -4 h12 v12 M86 88 v12 h-12 M8 100 h-12 v-12" className="cal-frame" />
      </g>
    </svg>
  );
}
