// Positions of the "path nodes" in 3D units: [x, y, z].
// The path rises from bottom-left to top-right, like a career growing step by
// step. The last node is the goal. Both the 3D scene and the static SVG
// fallback read this list, so they always show the same shape.
export type NodePosition = [x: number, y: number, z: number];

export const HERO_NODES: NodePosition[] = [
  [-1.8, -1.25, 0],
  [-1.05, -0.55, 0.35],
  [-0.35, -0.75, -0.25],
  [0.35, 0.05, 0.2],
  [1.0, 0.35, -0.3],
  [1.75, 1.2, 0.15],
];
