import { HERO_NODES } from "@/components/home/hero-nodes-data";

// Static picture of the same path nodes, used instead of the 3D scene when
// the visitor prefers reduced motion, the device is weak, or WebGL is missing.
// The viewBox uses the same units as the 3D scene, so the shapes match.
// scale(1,-1) flips the y axis, because in SVG "down" is positive.
export function HeroNodesSvg() {
  const points = HERO_NODES.map(([x, y]) => `${x},${y}`).join(" ");
  const last = HERO_NODES.length - 1;

  return (
    <svg
      viewBox="-2.4 -1.75 4.8 3.5"
      className="size-full text-white"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="scale(1,-1)">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.35}
          strokeWidth={0.02}
        />
        {/* Same "glass orb" look as the 3D version: a faint see-through
            bubble with a bright rim, and a solid core in the middle. */}
        {HERO_NODES.map(([x, y], i) => {
          const isGoal = i === last;
          const radius = isGoal ? 0.22 : 0.14;
          return (
            <g key={i} className={isGoal ? "text-green-light" : "text-white"}>
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
              <circle cx={x} cy={y} r={radius * 0.32} fill="currentColor" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
