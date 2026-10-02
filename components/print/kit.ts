import type { PartId } from "@/lib/parts";

/**
 * The printed kit as world-space primitives. The WebGL scene builds its meshes
 * from this list, and the "hot layer" trace (the orange outline where the
 * nozzle is laying plastic) is computed from the same list, so the two can
 * never drift apart. Units are scene units; the handle stands ~1.16 tall.
 */
export type Vec3 = [number, number, number];

export type Prim =
  | { kind: "box"; part: PartId; p: Vec3; s: Vec3; seg?: Vec3 }
  | { kind: "cyl"; part: PartId; p: Vec3; r: number; h: number; radial: number; hseg?: number }
  | { kind: "ring"; part: PartId; p: Vec3; R: number; r: number };

const box = (part: PartId, p: Vec3, s: Vec3, seg?: Vec3): Prim => ({ kind: "box", part, p, s, seg });

// Clips: two mirrored hook profiles laid flat behind the handle.
const clip = (x: number, dir: 1 | -1): Prim[] => [
  box("clips", [x, 0.03, -0.75], [0.3, 0.06, 0.1], [2, 1, 1]),
  box("clips", [x + dir * 0.1, 0.11, -0.75], [0.08, 0.14, 0.1], [1, 2, 1]),
  box("clips", [x + dir * 0.06, 0.17, -0.75], [0.1, 0.04, 0.1]),
];

// Four bolts standing head-up, four washers lying flat (counts from the photos).
const BOLTS: [number, number][] = [
  [-1.17, -0.55],
  [-1.01, -0.48],
  [-1.2, -0.3],
  [-1.03, -0.25],
];
const WASHERS: [number, number][] = [
  [1.1, -0.5],
  [1.25, -0.42],
  [1.05, -0.32],
  [1.21, -0.25],
];

export const KIT: Prim[] = [
  // Handle: two legs with flared feet, the top bar, the inlay ridge.
  box("handle", [-0.52, 0.44, 0], [0.18, 0.88, 0.34], [1, 10, 1]),
  box("handle", [-0.52, 0.44, -0.12], [0.22, 0.88, 0.12], [1, 10, 1]),
  box("handle", [-0.52, 0.04, 0], [0.3, 0.08, 0.46]),
  box("handle", [0.52, 0.44, 0], [0.22, 0.88, 0.38], [1, 10, 1]),
  box("handle", [0.52, 0.04, 0], [0.28, 0.08, 0.44]),
  box("handle", [0.38, 0.04, 0.14], [0.06, 0.08, 0.14]),
  box("handle", [0, 1.0, 0], [1.26, 0.28, 0.38], [5, 3, 1]),
  box("handle", [0.48, 1.0, 0.04], [0.32, 0.28, 0.46], [1, 3, 1]),
  box("handle", [0.1, 1.15, 0], [0.8, 0.02, 0.3], [3, 1, 1]),

  // Woo Mount: base plate with its locating dowel, and the cradle.
  box("base", [-0.25, 0.06, 0.85], [0.28, 0.12, 0.28], [2, 1, 2]),
  { kind: "cyl", part: "base", p: [-0.25, 0.13, 0.85], r: 0.035, h: 0.02, radial: 10 },
  box("cradle", [0.32, 0.06, 0.85], [0.58, 0.12, 0.26], [3, 1, 1]),
  box("cradle", [0.32, 0.14, 0.74], [0.58, 0.05, 0.04], [3, 1, 1]),
  box("cradle", [0.32, 0.14, 0.96], [0.58, 0.05, 0.04], [3, 1, 1]),
  box("cradle", [0.54, 0.14, 0.85], [0.1, 0.08, 0.16]),
  box("cradle", [0.58, 0.06, 0.73], [0.06, 0.12, 0.04]),

  ...clip(-0.18, 1),
  ...clip(0.18, -1),

  ...BOLTS.flatMap(([x, z]): Prim[] => [
    { kind: "cyl", part: "bolts", p: [x, 0.18, z], r: 0.028, h: 0.34, radial: 6, hseg: 5 },
    { kind: "cyl", part: "bolts", p: [x, 0.37, z], r: 0.06, h: 0.04, radial: 6 },
  ]),
  ...WASHERS.map(([x, z]): Prim => ({ kind: "ring", part: "washers", p: [x, 0.015, z], R: 0.055, r: 0.015 })),
];

/** Top of the tallest printed feature (the inlay ridge). */
export const PRINT_TOP = 1.16;
export const CLIP_MIN = -0.01;
export const CLIP_MAX = 1.19;

/** Where each part's callout dot sits. */
export const DOTS: Record<PartId, Vec3> = {
  handle: [0, 1.0, 0.2],
  clips: [-0.12, 0.19, -0.75],
  bolts: [-1.17, 0.39, -0.55],
  washers: [1.1, 0.03, -0.5],
  base: [-0.25, 0.14, 0.85],
  cradle: [0.32, 0.12, 0.85],
};

/** Steel parts read in a warmer grey than the printed PETG. */
export const isSteel = (part: PartId) => part === "bolts" || part === "washers";

/** Axis-aligned bounds of the whole kit, for framing the camera. */
export const KIT_BOUNDS = { min: [-1.3, 0, -0.82] as Vec3, max: [1.32, PRINT_TOP, 1.0] as Vec3 };

/**
 * Cross-section outlines of every primitive at height y, as line-segment
 * pairs (x,y,z,x,y,z...). Boxes give rectangles, bolts give circles, flat
 * washers give two concentric rings. Returns the number of floats written.
 */
export function traceLayer(y: number, out: Float32Array, circleSegs = 20): number {
  let n = 0;
  const push = (ax: number, az: number, bx: number, bz: number) => {
    if (n + 6 > out.length) return;
    out[n++] = ax; out[n++] = y; out[n++] = az;
    out[n++] = bx; out[n++] = y; out[n++] = bz;
  };
  const circle = (cx: number, cz: number, r: number) => {
    for (let i = 0; i < circleSegs; i++) {
      const a0 = (i / circleSegs) * Math.PI * 2;
      const a1 = ((i + 1) / circleSegs) * Math.PI * 2;
      push(cx + Math.cos(a0) * r, cz + Math.sin(a0) * r, cx + Math.cos(a1) * r, cz + Math.sin(a1) * r);
    }
  };
  for (const prim of KIT) {
    if (prim.kind === "box") {
      const [px, py, pz] = prim.p, [sx, sy, sz] = prim.s;
      if (y <= py - sy / 2 || y >= py + sy / 2) continue;
      const x0 = px - sx / 2, x1 = px + sx / 2, z0 = pz - sz / 2, z1 = pz + sz / 2;
      push(x0, z0, x1, z0); push(x1, z0, x1, z1); push(x1, z1, x0, z1); push(x0, z1, x0, z0);
    } else if (prim.kind === "cyl") {
      const [px, py, pz] = prim.p;
      if (y <= py - prim.h / 2 || y >= py + prim.h / 2) continue;
      circle(px, pz, prim.r);
    } else {
      const [px, py, pz] = prim.p;
      const dy = y - py;
      if (Math.abs(dy) >= prim.r) continue;
      const w = Math.sqrt(prim.r * prim.r - dy * dy);
      circle(px, pz, prim.R - w);
      circle(px, pz, prim.R + w);
    }
  }
  return n;
}

/** Points on the kit's real surfaces (box corners, rim samples), for framing. */
export function kitPoints(): Vec3[] {
  const pts: Vec3[] = [];
  const ring = (cx: number, y: number, cz: number, r: number) => {
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      pts.push([cx + Math.cos(a) * r, y, cz + Math.sin(a) * r]);
    }
  };
  for (const prim of KIT) {
    const [px, py, pz] = prim.p;
    if (prim.kind === "box") {
      const [sx, sy, sz] = prim.s;
      for (const dx of [-0.5, 0.5])
        for (const dy of [-0.5, 0.5])
          for (const dz of [-0.5, 0.5]) pts.push([px + dx * sx, py + dy * sy, pz + dz * sz]);
    } else if (prim.kind === "cyl") {
      ring(px, py - prim.h / 2, pz, prim.r);
      ring(px, py + prim.h / 2, pz, prim.r);
    } else {
      ring(px, py, pz, prim.R + prim.r);
    }
  }
  return pts;
}
