// The career route shown in the hero: 5 steps rising from bottom-left to
// top-right. Both the 3D scene and the static SVG fallback read this list,
// so they always show the same shape and the same words.
export type NodePosition = [x: number, y: number, z: number];

export type RouteStep = {
  label: string;
  position: NodePosition; // in 3D units
  radius: number; // the goal is the biggest
  labelOffset: [x: number, y: number]; // where the label sits, in 3D units
};

export const ROUTE_STEPS: RouteStep[] = [
  {
    label: "Start",
    position: [-1.9, -1.5, 0.3],
    radius: 0.14,
    labelOffset: [0, -0.42],
  },
  {
    label: "Learn",
    position: [-0.85, -0.6, -0.3],
    radius: 0.17,
    labelOffset: [-0.66, 0],
  },
  {
    label: "Practice",
    position: [0.1, -0.1, 0.35],
    radius: 0.19,
    labelOffset: [0.72, 0],
  },
  {
    label: "Mentor",
    position: [0.85, 0.68, -0.2],
    radius: 0.21,
    labelOffset: [-0.7, 0],
  },
  {
    label: "Career",
    position: [1.6, 1.35, 0.2],
    radius: 0.28,
    labelOffset: [0, -0.62],
  },
];
