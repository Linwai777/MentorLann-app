import { ROUTE_STEPS } from "@/components/home/hero-nodes-data";

// Static picture of the same career route, used instead of the 3D scene when
// the visitor prefers reduced motion, the device is weak, or WebGL is missing.
// The viewBox uses the same units as the 3D scene, so the shapes match.
// scale(1,-1) flips the y axis, because in SVG "down" is positive; the labels
// are placed outside that flip so their text is not upside down.
export function HeroNodesSvg() {
  const points = ROUTE_STEPS.map(({ position: [x, y] }) => `${x},${y}`).join(
    " ",
  );
  const last = ROUTE_STEPS.length - 1;

  return (
    <svg
      viewBox="-2.6 -1.95 5.2 3.9"
      className="size-full text-white"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="scale(1,-1)">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={0.03}
          strokeLinecap="round"
        />
        {/* Same "glass orb" look as 3D: faint bubble, bright rim, solid core */}
        {ROUTE_STEPS.map(({ label, position: [x, y], radius }, i) => (
          <g
            key={label}
            className={i === last ? "text-green-light" : "text-white"}
          >
            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="currentColor"
              fillOpacity={0.08}
              stroke="currentColor"
              strokeOpacity={0.7}
              strokeWidth={0.015}
            />
            <circle cx={x} cy={y} r={radius * 0.38} fill="currentColor" />
          </g>
        ))}
      </g>

      {/* Labels, positioned with the same offsets as in 3D (y flipped) */}
      {ROUTE_STEPS.map(
        ({ label, position: [x, y], labelOffset: [dx, dy] }, i) => (
          <text
            key={label}
            x={x + dx}
            y={-(y + dy)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={0.15}
            fontWeight={600}
            className={i === last ? "fill-green-light" : "fill-white"}
          >
            {label}
          </text>
        ),
      )}
    </svg>
  );
}
