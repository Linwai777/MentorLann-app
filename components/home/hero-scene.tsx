"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  Group,
  MathUtils,
  Mesh,
  Points,
  Vector3,
} from "three";
import { Flag } from "lucide-react";
import { ROUTE_STEPS } from "@/components/home/hero-nodes-data";
import { HeroNodesSvg } from "@/components/home/hero-nodes-svg";

// Pointer position in the range -1..1 on both axes (0,0 = screen center).
type Pointer = { x: number; y: number };

const LAST = ROUTE_STEPS.length - 1;
const PARTICLE_COUNT = 24;
const INTRO_DELAY = 0.4; // seconds before the route starts drawing
const INTRO_DURATION = 1.8; // seconds to draw the whole route

// One reusable vector for maths inside useFrame (creating new objects 60
// times per second would make work for the garbage collector).
const temp = new Vector3();

// Read a brand color from our CSS variables so the 3D scene uses the same
// tokens as the rest of the site (no hardcoded hex in components).
function readCssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

// A soft round dot drawn once on a small canvas, used for the light particles.
function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new CanvasTexture(canvas);
}

// ---------------------------------------------------------------------------
// Glass shader (fresnel): see-through in the middle, bright at the rim, plus a
// sharp highlight. Real three.js "transmission" glass cannot see the HTML
// background behind our transparent canvas, so we fake glass this way.
// ---------------------------------------------------------------------------
const glassVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const glassFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec3 normal = normalize(vNormal);
    float rim = pow(1.0 - max(dot(normal, vViewDir), 0.0), 2.5);
    vec3 lightDir = normalize(vec3(-0.5, 0.7, 1.0));
    float highlight = pow(max(dot(reflect(-lightDir, normal), vViewDir), 0.0), 60.0);
    float alpha = clamp(0.06 + rim * 0.85 + highlight, 0.0, 1.0);
    gl_FragColor = vec4(uColor + highlight, alpha);
  }
`;

function GlassMaterial({ color }: { color: Color }) {
  // Uniforms are the values we send from JavaScript to the shader.
  const uniforms = useMemo(() => ({ uColor: { value: color } }), [color]);
  return (
    <shaderMaterial
      vertexShader={glassVertexShader}
      fragmentShader={glassFragmentShader}
      uniforms={uniforms}
      transparent
      depthWrite={false}
    />
  );
}

function CareerRoute({
  pointer,
  labels,
}: {
  pointer: RefObject<Pointer>;
  labels: RefObject<(HTMLDivElement | null)[]>;
}) {
  const group = useRef<Group>(null);
  const tube = useRef<Mesh>(null);
  const particles = useRef<Points>(null);
  const nodes = useRef<(Group | null)[]>([]);
  const rings = useRef<(Mesh | null)[]>([]);
  const time = useRef(0);

  // Colors: white at the start, getting more royal blue step by step, and
  // the goal in green (all from our CSS tokens).
  const colors = useMemo(() => {
    const white = new Color("white");
    const royal = new Color(readCssColor("--royal", "royalblue"));
    const goal = new Color(readCssColor("--green-light", "lightgreen"));
    return ROUTE_STEPS.map((_, i) =>
      i === LAST ? goal : white.clone().lerp(royal, i / (LAST - 1)),
    );
  }, []);
  const particleColor = useMemo(
    () =>
      new Color("white").lerp(
        new Color(readCssColor("--royal", "royalblue")),
        0.25,
      ),
    [],
  );

  // A smooth curve through the 5 steps (used by the tube and the particles).
  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        ROUTE_STEPS.map(({ position: [x, y, z] }) => new Vector3(x, y, z)),
      ),
    [],
  );
  const glow = useMemo(() => makeGlowTexture(), []);
  const particlePositions = useMemo(
    () => new Float32Array(PARTICLE_COUNT * 3),
    [],
  );

  // three.js does not free GPU memory by itself.
  useEffect(() => () => glow.dispose(), [glow]);

  useFrame((state, delta) => {
    // Our own clock. min() stops a big jump after the animation was paused.
    const dt = Math.min(delta, 0.1);
    time.current += dt;
    const t = time.current;

    // 1. Intro: draw the tube from start to goal (ease-out).
    const intro = MathUtils.clamp((t - INTRO_DELAY) / INTRO_DURATION, 0, 1);
    const drawn = 1 - Math.pow(1 - intro, 3);
    const tubeMesh = tube.current;
    if (tubeMesh) {
      const total = tubeMesh.geometry.index?.count ?? 0;
      // Draw ranges must be whole triangles (multiples of 3 indices).
      tubeMesh.geometry.setDrawRange(0, Math.floor((total * drawn) / 6) * 6);
    }

    // 2. Nodes pop in as the line reaches them, float, and spin their rings.
    ROUTE_STEPS.forEach((step, i) => {
      const node = nodes.current[i];
      if (!node) return;
      const appear = MathUtils.clamp(
        (drawn * 1.15 - i / ROUTE_STEPS.length) * 4,
        0,
        1,
      );
      const pulse = i === LAST && drawn >= 1 ? 1 + Math.sin(t * 2.4) * 0.06 : 1;
      node.scale.setScalar(
        Math.max(0.001, 1 - Math.pow(1 - appear, 3)) * pulse,
      );
      node.position.y = step.position[1] + Math.sin(t * 1.1 + i * 1.3) * 0.04;

      const ring = rings.current[i];
      if (ring) {
        ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.6 + i) * 0.4;
        ring.rotation.y = t * 0.5 + i;
      }

      // Show the label once its node is fully there.
      const label = labels.current[i];
      if (label) label.style.opacity = appear > 0.9 ? "1" : "0";
    });

    // 3. Light particles travel along the route toward the goal.
    const pts = particles.current;
    if (pts) {
      pts.visible = drawn >= 1;
      if (pts.visible) {
        const position = pts.geometry.attributes.position;
        for (let k = 0; k < PARTICLE_COUNT; k++) {
          curve.getPointAt((k / PARTICLE_COUNT + t * 0.09) % 1, temp);
          position.setXYZ(k, temp.x, temp.y, temp.z);
        }
        position.needsUpdate = true;
      }
    }

    // 4. Tilt toward the mouse with damping, plus a gentle float.
    const g = group.current;
    if (g) {
      const p = pointer.current;
      g.rotation.y = MathUtils.damp(g.rotation.y, p.x * 0.5, 4, dt);
      g.rotation.x = MathUtils.damp(g.rotation.x, p.y * 0.3, 4, dt);
      g.position.y = Math.sin(t * 0.5) * 0.06;
    }

    // 5. Move each HTML label to its node's position on screen.
    //    project() turns a 3D point into -1..1 screen coordinates.
    ROUTE_STEPS.forEach((step, i) => {
      const node = nodes.current[i];
      const label = labels.current[i];
      if (!node || !label) return;
      node.getWorldPosition(temp);
      temp.x += step.labelOffset[0];
      temp.y += step.labelOffset[1];
      temp.project(state.camera);
      const x = (temp.x * 0.5 + 0.5) * state.size.width;
      const y = (-temp.y * 0.5 + 0.5) * state.size.height;
      label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
  });

  return (
    <group ref={group}>
      {/* Glass tube along the route; its draw range grows during the intro */}
      <mesh ref={tube}>
        <tubeGeometry args={[curve, 200, 0.03, 12, false]} />
        <GlassMaterial color={colors[1]} />
      </mesh>

      {ROUTE_STEPS.map((step, i) => (
        <group
          key={step.label}
          position={step.position}
          scale={0.001}
          ref={(el) => {
            nodes.current[i] = el;
          }}
        >
          {/* Glass orb */}
          <mesh>
            <sphereGeometry args={[step.radius, 48, 48]} />
            <GlassMaterial color={colors[i]} />
          </mesh>
          {/* Glowing core */}
          <mesh>
            <sphereGeometry args={[step.radius * 0.38, 24, 24]} />
            <meshBasicMaterial color={colors[i]} />
          </mesh>
          {/* Thin ring around the node */}
          <mesh
            ref={(el) => {
              rings.current[i] = el;
            }}
          >
            <torusGeometry args={[step.radius * 1.55, 0.012, 8, 64]} />
            <meshBasicMaterial color={colors[i]} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Light particles (positions are filled in every frame) */}
      <points ref={particles} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          map={glow}
          color={particleColor}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Default export so it can be lazy loaded with next/dynamic.
export default function HeroScene({ paused }: { paused: boolean }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const [onScreen, setOnScreen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Track the mouse on the whole window (the canvas itself ignores clicks,
    // so buttons on top of it keep working).
    function onPointerMove(e: PointerEvent) {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Stop rendering frames when the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    if (wrapper.current) observer.observe(wrapper.current);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapper}
      className={`relative size-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        // "never" = no new frames: used when paused or scrolled away.
        frameloop={paused || !onScreen ? "never" : "always"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        fallback={<HeroNodesSvg />}
        onCreated={() => setReady(true)}
      >
        <CareerRoute pointer={pointer} labels={labels} />
      </Canvas>

      {/* HTML labels on top of the canvas. useFrame moves them every frame to
          follow their node; they fade in when their node appears. */}
      {ROUTE_STEPS.map((step, i) => {
        const isGoal = i === LAST;
        return (
          <div
            key={step.label}
            ref={(el) => {
              labels.current[i] = el;
            }}
            className={`absolute top-0 left-0 flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 text-sm font-semibold whitespace-nowrap opacity-0 shadow-lg shadow-ink/30 transition-opacity duration-500 ${
              isGoal ? "bg-green text-white" : "bg-white/95 text-ink"
            }`}
          >
            <span
              className={`grid size-6 place-items-center rounded-full text-[11px] font-bold ${
                isGoal ? "bg-white text-green" : "bg-royal/10 text-royal"
              }`}
            >
              {isGoal ? (
                <Flag aria-hidden="true" className="size-3.5" />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            {step.label}
          </div>
        );
      })}
    </div>
  );
}
