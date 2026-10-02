"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { PARTS, PART_ORDER, type PartId } from "@/lib/parts";
import {
  KIT,
  DOTS,
  CLIP_MIN,
  CLIP_MAX,
  PRINT_TOP,
  kitPoints,
  isSteel,
  traceLayer,
  type Prim,
} from "./print/kit";

// ── Timing ──────────────────────────────────────────────
const PRINT_SECONDS = 12; // a full print, from the empty plate
const EASE = 1.6; // layers slow as the print nears the top
const FLASH_SECONDS = 1.2;
const NOZZLE_SPEED = 1.7; // scene units per second along the layer outline
const ORBIT_SPEED = 0.06; // radians per second of idle turntable

/**
 * Height fraction (0-1) the print opens on: both legs standing, the top bar
 * a third closed. public/images/print-poster-*.png are rendered at this exact
 * frame, so the canvas takes over from the poster without a visible jump.
 */
export const HERO_HEIGHT = 0.833;
const POSTER_NOZZLE = 0.44; // poster nozzle: on the top bar's front edge

const TARGET = new THREE.Vector3(0, 0.3, 0.1);
const VIEW_DIR = new THREE.Vector3(3.0, 2.0, 4.0).normalize();
const FOV = 26;

const heightToClip = (h: number) => CLIP_MIN + h * (CLIP_MAX - CLIP_MIN);
const timeToHeight = (u: number) => 1 - Math.pow(1 - u, EASE);
const heightToTime = (h: number) => 1 - Math.pow(1 - h, 1 / EASE);

const FIT_STEPS = 48;

/**
 * Distance at which the whole kit fits the frame, per turntable angle. The
 * rig follows this table as the kit turns, so the frame stays full without
 * ever cropping a part against the stage edge.
 */
function fitTable(aspect: number): Float32Array {
  const cam = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 100);
  const corners = kitPoints().map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const p = new THREE.Vector3();
  const table = new Float32Array(FIT_STEPS);
  for (let k = 0; k < FIT_STEPS; k++) {
    const dir = VIEW_DIR.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), (k / FIT_STEPS) * Math.PI * 2);
    let lo = 1.5, hi = 30;
    for (let i = 0; i < 22; i++) {
      const d = (lo + hi) / 2;
      cam.position.copy(TARGET).addScaledVector(dir, d);
      cam.lookAt(TARGET);
      cam.updateMatrixWorld();
      const fits = corners.every((c) => {
        p.copy(c).project(cam);
        return Math.abs(p.x) <= 0.9 && Math.abs(p.y) <= 0.84;
      });
      if (fits) hi = d;
      else lo = d;
    }
    table[k] = hi;
  }
  return table;
}

const START_AZIMUTH = Math.atan2(VIEW_DIR.x, VIEW_DIR.z);

/** Fit distance at the camera's current turntable angle, interpolated. */
function fitAt(table: Float32Array, azimuth: number): number {
  let a = (azimuth - START_AZIMUTH) / (Math.PI * 2);
  a = ((a % 1) + 1) % 1;
  const f = a * FIT_STEPS;
  const i = Math.floor(f) % FIT_STEPS;
  const j = (i + 1) % FIT_STEPS;
  return table[i] + (table[j] - table[i]) * (f - Math.floor(f));
}

// ── Camera rig: placement, zoom, turntable ──────────────
function Rig({
  zoom,
  spinning,
}: {
  zoom: number;
  spinning: boolean;
}) {
  const { camera, size, controls } = useThree();
  const table = useMemo(() => fitTable(size.width / Math.max(1, size.height)), [size.width, size.height]);
  const placed = useRef(false);
  const offset = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const target = (controls as unknown as { target?: THREE.Vector3 } | null)?.target ?? TARGET;
    if (!placed.current) {
      const want = fitAt(table, START_AZIMUTH) / zoom;
      camera.position.copy(target).addScaledVector(VIEW_DIR, want);
      camera.lookAt(target);
      placed.current = true;
      return;
    }
    offset.copy(camera.position).sub(target);
    if (spinning) offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), ORBIT_SPEED * dt);
    const want = fitAt(table, Math.atan2(offset.x, offset.z)) / zoom;
    const d = offset.length();
    const next = THREE.MathUtils.damp(d, want, 7, dt);
    camera.position.copy(target).addScaledVector(offset.normalize(), next);
    camera.lookAt(target);
  });

  return null;
}

// ── A part's callout dot ────────────────────────────────
function Dot({
  id,
  clipPlane,
  active,
  pulse,
  hoverable,
  onActivate,
}: {
  id: PartId;
  clipPlane: THREE.Plane;
  active: boolean;
  pulse: boolean;
  hoverable: boolean;
  onActivate: (id: PartId | null, pinned: boolean) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        clippingPlanes: [clipPlane],
      }),
    [clipPlane]
  );
  const hitMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        clippingPlanes: [clipPlane],
      }),
    [clipPlane]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const base = active ? 1.45 : 1;
    ref.current.scale.setScalar(pulse ? base + Math.sin(clock.getElapsedTime() * 3) * 0.18 : base);
  });

  return (
    <group position={DOTS[id]}>
      <mesh ref={ref} material={mat}>
        <sphereGeometry args={[0.035, 16, 12]} />
      </mesh>
      {/* Larger invisible target so the dot is easy to hit with a finger.
          Raycasts ignore clipping, so parts not yet printed are skipped here. */}
      <mesh
        material={hitMat}
        onClick={(e) => {
          if (clipPlane.constant < DOTS[id][1]) return;
          e.stopPropagation();
          onActivate(active ? null : id, true);
        }}
        onPointerOver={(e) => {
          if (clipPlane.constant < DOTS[id][1]) return;
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          if (hoverable) onActivate(id, false);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
          if (hoverable) onActivate(null, false);
        }}
      >
        <sphereGeometry args={[0.1, 10, 8]} />
      </mesh>
    </group>
  );
}

// ── The callout card for the active part ────────────────
function Callout({ id }: { id: PartId }) {
  const part = PARTS[id];
  const { camera } = useThree();
  const [side, setSide] = useState<"right" | "left">("right");
  const v = useMemo(() => new THREE.Vector3(), []);

  // Flip the card to the dot's left when the dot is on the right of the frame.
  useFrame(() => {
    v.set(...DOTS[id]).project(camera);
    const next = v.x > 0.12 ? "left" : "right";
    if (next !== side) setSide(next);
  });

  return (
    <Html position={DOTS[id]} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
      <div className={`callout callout-${side}`} key={`${id}-${side}`}>
        <span className="callout-run" />
        <span className="callout-rise" />
        <span className="callout-shelf" />
        <div className="callout-card">
          <p className="callout-name">{part.name}</p>
          <p className="callout-code">
            {part.code}
            {part.spec ? ` · ${part.spec}` : ""} · ×{part.qty}
          </p>
          <p className="callout-text">{part.description}</p>
        </div>
      </div>
    </Html>
  );
}

// ── Print scene ─────────────────────────────────────────
function PrintScene({
  startHeight,
  posterCapture,
  reduced,
  printKey,
  activePart,
  hoverable,
  onActivate,
  onProgress,
  onFirstFrame,
}: {
  startHeight: number;
  posterCapture: boolean;
  reduced: boolean;
  printKey: number;
  activePart: PartId | null;
  hoverable: boolean;
  onActivate: (id: PartId | null, pinned: boolean) => void;
  onProgress?: (percent: number, done: boolean) => void;
  onFirstFrame?: () => void;
}) {
  const clipPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), heightToClip(startHeight)),
    [startHeight]
  );
  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        clippingPlanes: [clipPlane],
      }),
    [clipPlane]
  );
  const steelMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xd8d1c4,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        clippingPlanes: [clipPlane],
      }),
    [clipPlane]
  );

  // Hot layer: the outline being laid at the clip height.
  const trace = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const buf = new Float32Array(6 * 900);
    geom.setAttribute("position", new THREE.BufferAttribute(buf, 3));
    geom.setDrawRange(0, 0);
    const mat = new THREE.LineBasicMaterial({ color: 0xff6b00 });
    return { geom, buf, mat };
  }, []);

  const nozzleRef = useRef<THREE.Group>(null);
  const nozzleMat = useMemo(
    () => new THREE.MeshBasicMaterial({ wireframe: true, color: 0xb7bcc6, transparent: true, opacity: 0.85 }),
    []
  );

  const st = useRef({
    u: reduced && !posterCapture ? 1 : heightToTime(startHeight),
    done: reduced && !posterCapture,
    flash: -1,
    frames: 0,
    pct: -1,
    reportedDone: false,
    s: 0,
  });

  // Reprint from the empty plate.
  const firstKey = useRef(printKey);
  useEffect(() => {
    if (printKey === firstKey.current) return;
    st.current.u = 0;
    st.current.done = false;
    st.current.flash = -1;
    st.current.s = 0;
    wireMat.color.set(0xffffff);
    wireMat.opacity = 0.55;
  }, [printKey, wireMat]);

  useFrame((_, rawDt) => {
    const s = st.current;
    const dt = Math.min(rawDt, 1 / 30);

    if (!posterCapture && !s.done) {
      s.u = Math.min(1, s.u + dt / PRINT_SECONDS);
      if (s.u >= 1) {
        s.done = true;
        s.flash = reduced ? -1 : 0;
      }
    }

    const clipY = heightToClip(timeToHeight(s.u));
    clipPlane.constant = clipY;
    const printing = !s.done || posterCapture;

    // Completion flash: the wireframe runs hot orange, then cools to white.
    if (s.flash >= 0) {
      s.flash += dt;
      const f = Math.min(s.flash / FLASH_SECONDS, 1);
      wireMat.color.setRGB(1, 0.42 + f * 0.58, f);
      wireMat.opacity = 0.55 + (1 - f) * 0.3;
      if (f >= 1) {
        wireMat.color.set(0xffffff);
        wireMat.opacity = 0.65;
        s.flash = -1;
      }
    }

    // Hot layer outline + nozzle.
    const pos = trace.geom.getAttribute("position") as THREE.BufferAttribute;
    if (printing) {
      const n = traceLayer(clipY - 0.002, trace.buf);
      trace.geom.setDrawRange(0, n / 3);
      pos.needsUpdate = true;

      const nozzle = nozzleRef.current;
      if (nozzle) {
        let total = 0;
        for (let i = 0; i < n; i += 6) {
          total += Math.hypot(trace.buf[i + 3] - trace.buf[i], trace.buf[i + 5] - trace.buf[i + 2]);
        }
        nozzle.visible = total > 0;
        if (total > 0) {
          s.s = posterCapture ? total * POSTER_NOZZLE : (s.s + NOZZLE_SPEED * dt) % total;
          let left = s.s;
          for (let i = 0; i < n; i += 6) {
            const ax = trace.buf[i], az = trace.buf[i + 2];
            const bx = trace.buf[i + 3], bz = trace.buf[i + 5];
            const len = Math.hypot(bx - ax, bz - az);
            if (left <= len) {
              const t = len === 0 ? 0 : left / len;
              nozzle.position.set(ax + (bx - ax) * t, clipY, az + (bz - az) * t);
              break;
            }
            left -= len;
          }
        }
      }
    } else {
      trace.geom.setDrawRange(0, 0);
      if (nozzleRef.current) nozzleRef.current.visible = false;
    }

    const pct = Math.round(Math.min(1, Math.max(0, (clipY - CLIP_MIN) / (PRINT_TOP - CLIP_MIN))) * 100);
    // Report each new percent, and the moment the print finishes (the
    // percentage reaches 100 a little before the last layer is laid).
    if (pct !== s.pct || s.done !== s.reportedDone) {
      s.pct = pct;
      s.reportedDone = s.done;
      onProgress?.(pct, s.done);
    }

    s.frames += 1;
    if (s.frames === 2) onFirstFrame?.();
  });

  return (
    <>
      {/* Build plate */}
      <gridHelper args={[3.2, 24, 0x3d4253, 0x2c303d]} position={[0, -0.006, 0.09]} />

      {KIT.map((prim, i) => (
        <KitMesh key={i} prim={prim} material={isSteel(prim.part) ? steelMat : wireMat} />
      ))}

      <lineSegments geometry={trace.geom} material={trace.mat} />

      {/* Nozzle: heater block, cone and a hot tip on the layer */}
      <group ref={nozzleRef}>
        <mesh position={[0, 0.115, 0]} material={nozzleMat}>
          <boxGeometry args={[0.1, 0.06, 0.08]} />
        </mesh>
        <mesh position={[0, 0.045, 0]} rotation={[Math.PI, 0, 0]} material={nozzleMat}>
          <coneGeometry args={[0.03, 0.07, 10, 1, true]} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.011, 10, 8]} />
          <meshBasicMaterial color={0xff6b00} />
        </mesh>
      </group>

      {PART_ORDER.map((id) => (
        <Dot
          key={id}
          id={id}
          clipPlane={clipPlane}
          active={activePart === id}
          pulse={!reduced && !posterCapture}
          hoverable={hoverable && !posterCapture}
          onActivate={onActivate}
        />
      ))}

      {!posterCapture && activePart && <Callout id={activePart} />}
    </>
  );
}

function KitMesh({ prim, material }: { prim: Prim; material: THREE.Material }) {
  if (prim.kind === "box") {
    const [sx, sy, sz] = prim.s;
    const [gx, gy, gz] = prim.seg ?? [1, 1, 1];
    return (
      <mesh position={prim.p} material={material}>
        <boxGeometry args={[sx, sy, sz, gx, gy, gz]} />
      </mesh>
    );
  }
  if (prim.kind === "cyl") {
    return (
      <mesh position={prim.p} material={material}>
        <cylinderGeometry args={[prim.r, prim.r, prim.h, prim.radial, prim.hseg ?? 1]} />
      </mesh>
    );
  }
  return (
    <mesh position={prim.p} rotation={[Math.PI / 2, 0, 0]} material={material}>
      <torusGeometry args={[prim.R, prim.r, 4, 16]} />
    </mesh>
  );
}

// ── Main export ─────────────────────────────────────────
export interface PrintAnimation3DProps {
  /** Freeze on the opening frame with a readable drawing buffer, for the poster. */
  posterCapture?: boolean;
  reducedMotion?: boolean;
  /** Turntable paused by the visitor. */
  paused?: boolean;
  /** 1 frames the whole kit; above 1 moves in. */
  zoom?: number;
  /** Increment to reprint from the empty plate. */
  printKey?: number;
  activePart?: PartId | null;
  onActivePart?: (id: PartId | null, pinned: boolean) => void;
  onProgress?: (percent: number, done: boolean) => void;
  onFirstFrame?: () => void;
  /** False while the stage is scrolled out of view: rendering stops. */
  visible?: boolean;
}

export default function PrintAnimation3D({
  posterCapture = false,
  reducedMotion = false,
  paused = false,
  zoom = 1,
  printKey = 0,
  activePart = null,
  onActivePart,
  onProgress,
  onFirstFrame,
  visible = true,
}: PrintAnimation3DProps) {
  const [finePointer, setFinePointer] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const spinning = !posterCapture && !reducedMotion && !paused && !dragging && !activePart;

  return (
    <Canvas
      frameloop={visible || posterCapture ? "always" : "never"}
      dpr={posterCapture ? 1 : [1, 2]}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: posterCapture }}
      camera={{ fov: FOV, near: 0.1, far: 60, position: TARGET.clone().addScaledVector(VIEW_DIR, 9).toArray() }}
      style={{ position: "absolute", inset: 0, touchAction: finePointer ? "none" : "pan-y" }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Rig zoom={zoom} spinning={spinning} />
      <PrintScene
        startHeight={HERO_HEIGHT}
        posterCapture={posterCapture}
        reduced={reducedMotion}
        printKey={printKey}
        activePart={activePart}
        hoverable={finePointer}
        onActivate={(id, pinned) => onActivePart?.(id, pinned)}
        onProgress={onProgress}
        onFirstFrame={onFirstFrame}
      />
      {/* Drag to turn on mouse and trackpad. On touch the stage stays
          scrollable; the dots still open on tap. */}
      {finePointer && !posterCapture && (
        <OrbitControls
          makeDefault
          target={TARGET}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI / 2.1}
          onStart={() => setDragging(true)}
          onEnd={() => setDragging(false)}
        />
      )}
    </Canvas>
  );
}
