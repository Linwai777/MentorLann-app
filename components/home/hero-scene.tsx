"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Color,
  Group,
  MathUtils,
  Mesh,
  Vector3,
} from "three";
import { HERO_NODES } from "@/components/home/hero-nodes-data";
import { HeroNodesSvg } from "@/components/home/hero-nodes-svg";

// Pointer position in the range -1..1 on both axes (0,0 = screen center).
type Pointer = { x: number; y: number };

// Read a brand color from our CSS variables so the 3D scene uses the same
// tokens as the rest of the site (no hardcoded hex in components).
function readCssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

// ---------------------------------------------------------------------------
// Glass shader
// Our canvas is transparent and sits on top of the video, so three.js
// "real glass" (transmission) cannot see the video and looks milky.
// Instead we fake glass the way many sites do, with the "fresnel effect":
// real glass is almost invisible where you look straight through it, and
// bright at the edges where you look at it at a steep angle.
// ---------------------------------------------------------------------------

// Runs once per vertex: passes the surface direction (normal) and the
// direction toward the camera to the fragment shader.
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

// Runs once per pixel: decides color and transparency.
const glassFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec3 normal = normalize(vNormal);
    // 0 when facing the camera, 1 at the edges: the fresnel rim.
    float rim = pow(1.0 - max(dot(normal, vViewDir), 0.0), 2.5);
    // A sharp highlight from an imaginary light at the top-left.
    vec3 lightDir = normalize(vec3(-0.5, 0.7, 1.0));
    float highlight = pow(max(dot(reflect(-lightDir, normal), vViewDir), 0.0), 60.0);
    // Mostly see-through in the middle, solid at the rim and the highlight.
    float alpha = clamp(0.06 + rim * 0.85 + highlight, 0.0, 1.0);
    gl_FragColor = vec4(uColor + highlight, alpha);
  }
`;

function GlassMaterial({ color }: { color: string }) {
  // Uniforms are the values we send from JavaScript to the shader.
  // useMemo keeps the same object, so React does not rebuild it every render.
  const uniforms = useMemo(
    () => ({ uColor: { value: new Color(color) } }),
    [color],
  );
  return (
    <shaderMaterial
      vertexShader={glassVertexShader}
      fragmentShader={glassFragmentShader}
      uniforms={uniforms}
      transparent
      depthWrite={false} // see-through objects should not hide each other
    />
  );
}

function PathNodes({ pointer }: { pointer: RefObject<Pointer> }) {
  const group = useRef<Group>(null);
  const nodes = useRef<(Group | null)[]>([]);
  const goalCore = useRef<Mesh>(null);
  const spin = useRef(0);
  const goalColor = useMemo(() => readCssColor("--green-light", "white"), []);

  // A smooth curve through all node positions, used for the glass tube.
  const curve = useMemo(
    () =>
      new CatmullRomCurve3(HERO_NODES.map(([x, y, z]) => new Vector3(x, y, z))),
    [],
  );

  // Runs every frame (about 60 times per second). Never call setState here;
  // we change the three.js objects directly, which is cheap.
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current;
    const t = state.clock.elapsedTime;

    // 1. Slow continuous spin around the vertical axis (one turn ~50s).
    spin.current += delta * 0.12;

    // 2. Mouse follow on top of the spin. damp() eases toward the target, so
    //    it glides instead of jumping. 4 = how fast it catches up.
    g.rotation.y = MathUtils.damp(
      g.rotation.y,
      spin.current + p.x * 0.6,
      4,
      delta,
    );
    g.rotation.x = MathUtils.damp(g.rotation.x, p.y * 0.4, 4, delta);
    // 3. Parallax: the whole path also slides a little toward the mouse.
    g.position.x = MathUtils.damp(g.position.x, p.x * 0.3, 4, delta);
    g.position.y = MathUtils.damp(g.position.y, -p.y * 0.2, 4, delta);

    // 4. Each node bobs on its own rhythm (offset by its index), so the
    //    path feels alive instead of moving as one stiff block.
    nodes.current.forEach((node, i) => {
      if (node)
        node.position.y = HERO_NODES[i][1] + Math.sin(t * 1.2 + i) * 0.04;
    });

    // 5. The goal's light gently pulses.
    goalCore.current?.scale.setScalar(1 + Math.sin(t * 2) * 0.15);
  });

  return (
    <group ref={group}>
      {/* Glass tube along the path (instead of a 1px line) */}
      <mesh>
        <tubeGeometry args={[curve, 160, 0.03, 16, false]} />
        <GlassMaterial color="white" />
      </mesh>

      {HERO_NODES.map((position, i) => {
        const isGoal = i === HERO_NODES.length - 1;
        const radius = isGoal ? 0.22 : 0.14;
        const color = isGoal ? goalColor : "white";
        return (
          <group
            key={i}
            position={position}
            ref={(el) => {
              nodes.current[i] = el;
            }}
          >
            {/* Outer glass orb */}
            <mesh>
              <sphereGeometry args={[radius, 48, 48]} />
              <GlassMaterial color={color} />
            </mesh>
            {/* Small glowing core inside, so each orb reads clearly on video */}
            <mesh ref={isGoal ? goalCore : undefined}>
              <sphereGeometry args={[radius * 0.32, 24, 24]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Default export so it can be lazy loaded with next/dynamic.
export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
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
      className={`size-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        dpr={[1, 1.5]} // cap pixel density: sharp enough, much cheaper on 4K screens
        // Camera a bit further back, so tilting nodes never touch the edges
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        fallback={<HeroNodesSvg />} // shown if the browser has no WebGL
        onCreated={() => setReady(true)} // fade in once the first frame is ready
      >
        <PathNodes pointer={pointer} />
      </Canvas>
    </div>
  );
}
