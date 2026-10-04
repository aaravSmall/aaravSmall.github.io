// The hero's livery: two sweeping bands, like paint on a race car's sidepod.
export function Livery() {
  return (
    <svg className="livery" viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      <path
        className="livery-red"
        d="M1440 150 C 1250 280, 1100 470, 860 900 L 1120 900 C 1260 640, 1340 500, 1440 410 Z"
      />
      <path className="livery-yellow" d="M1440 450 C 1360 510, 1290 620, 1165 900 L 1205 900 C 1320 660, 1380 550, 1440 490 Z" />
    </svg>
  );
}
