/**
 * The parts of the Wooster Core system, shared by the 3D print callouts and
 * the "In the box" tray. Codes and descriptions come from the repo's original
 * 3D labels (approved by Caleb, 2 Oct 2026); counts follow the product photos
 * (public/images/exploded-view.jpg shows 4 bolts and 4 washers stamped 316).
 */
export type PartId = "handle" | "clips" | "bolts" | "washers" | "base" | "cradle";

export interface Part {
  id: PartId;
  code: string;
  name: string;
  qty: number;
  /** Size or material line, where the repo states one. */
  spec?: string;
  description: string;
}

export const PARTS: Record<PartId, Part> = {
  handle: {
    id: "handle",
    code: "WC-100",
    name: "Core handle",
    qty: 1,
    spec: "PETG/ASA",
    description: "The grip. A one-piece frame printed in PETG/ASA.",
  },
  clips: {
    id: "clips",
    code: "WC-310",
    name: "Retention clips",
    qty: 2,
    description:
      "Hook-profile clips that lock the mounting plates to the board rail.",
  },
  bolts: {
    id: "bolts",
    code: "WC-410",
    name: "Bolts",
    qty: 4,
    spec: "M5×25, 316 stainless",
    description: "Torque-rated fasteners in marine-grade 316 stainless steel.",
  },
  washers: {
    id: "washers",
    code: "WC-420",
    name: "Washers",
    qty: 4,
    spec: "M5, 316 stainless",
    description:
      "Load-distribution washers that prevent composite delamination.",
  },
  base: {
    id: "base",
    code: "WC-210",
    name: "Mount base",
    qty: 1,
    description:
      "Sensor base plate with a locating dowel and the retention clip interface.",
  },
  cradle: {
    id: "cradle",
    code: "WC-220",
    name: "Mount cradle",
    qty: 1,
    description: "An elongated cradle that holds the WOO sensor with a snap fit.",
  },
};

/** Which parts each purchasable product puts in the box. */
export const PRODUCT_PARTS: Record<string, PartId[]> = {
  "wooster-core": ["handle", "clips", "bolts", "washers"],
  "woo-mount": ["base", "cradle"],
  "ultimate-bundle": ["handle", "clips", "bolts", "washers", "base", "cradle"],
  // The standalone mount's parts are not documented anywhere yet.
  "standalone-woo-mount": [],
};

export const PART_ORDER: PartId[] = [
  "handle",
  "clips",
  "bolts",
  "washers",
  "base",
  "cradle",
];
