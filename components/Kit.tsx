"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import {
  bundleProducts,
  bundles,
  formatPrice,
  getBundleSavings,
  getProduct,
  products,
  type Product,
  type ProductVariant,
} from "@/lib/products";
import { PARTS, PART_ORDER, PRODUCT_PARTS, type PartId } from "@/lib/parts";
import { BoxIcon } from "./icons";

const TRAY_SRC = "/images/kit-tray.jpg"; // crop of product-detail.jpg
const TRAY_SIZES = "(min-width: 1024px) 56vw, 100vw";
const TRAY_ALT =
  "The open Wooster Core box from above: the black handle, two black retention clips, four bolts and four washers in a grey foam insert, with the orange mount base and cradle.";

/** Where each part's callout attaches on the tray photo (percent of the frame). */
const ANCHORS: Record<PartId, { x: number; y: number }> = {
  handle: { x: 52, y: 14 },
  clips: { x: 60, y: 43 },
  bolts: { x: 15, y: 27 },
  washers: { x: 86, y: 30 },
  base: { x: 38, y: 46 },
  cradle: { x: 52, y: 76 },
};

type Lit = { parts: PartId[]; focus: PartId | null };
const NONE: Lit = { parts: [], focus: null };

const partFromHash = (hash: string): PartId | null => {
  const id = hash.replace(/^#part-/, "") as PartId;
  return hash.startsWith("#part-") && id in PARTS ? id : null;
};

export function Kit() {
  const [preview, setPreview] = useState<Lit>(NONE);
  const [pinned, setPinned] = useState<PartId | null>(null);

  // Parts are addressable: #part-bolts opens the bolts, Back closes it again.
  useEffect(() => {
    const sync = () => setPinned(partFromHash(window.location.hash));
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const pin = useCallback((id: PartId) => {
    if (partFromHash(window.location.hash) === id) {
      // Close it. Step back only through entries this page created; a visitor
      // who arrived on a shared #part- link must not be sent off the site.
      if ((window.history.state as { wcPart?: string } | null)?.wcPart) {
        window.history.back();
      } else {
        window.history.replaceState(null, "", "#kit");
        setPinned(null);
      }
      return;
    }
    window.history.pushState({ ...(window.history.state ?? {}), wcPart: id }, "", `#part-${id}`);
    setPinned(id);
  }, []);

  const lit: Lit = pinned ? { parts: [pinned], focus: pinned } : preview;
  const focusPart = lit.focus ? PARTS[lit.focus] : null;

  const handle = getProduct("wooster-core");
  const mount = getProduct("woo-mount");
  const standalone = getProduct("standalone-woo-mount");
  const bundle = bundles[0];
  const bundleItem = bundleProducts.find((p) => p.id === bundle?.id);
  const comingSoon = products.filter((p) => p.status === "coming_soon");

  return (
    <section id="kit" aria-labelledby="kit-title" className="surface-kraft material-kraft text-lid">
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <header className="lg:col-span-12">
            <h2 id="kit-title" className="type-wide text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.9]">
              In the box
            </h2>
            <p className="mt-3 max-w-[38rem] text-[1rem] leading-relaxed text-lid/85">
              Every part has its own cut-out in the foam. Pick a line in the list to find it in the
              tray. Prices are in Australian dollars.
            </p>
          </header>

          {/* The tray. Sticky on small screens so the list scrolls under it. */}
          <div className="lg:col-span-7">
            <figure className="stage sticky top-[var(--nav-h)] z-10 -mx-4 bg-kraft px-4 pb-3 pt-2 sm:mx-0 sm:px-0 lg:top-[calc(var(--nav-h)+1.5rem)] lg:bg-transparent lg:p-0">
              <div
                className="relative aspect-[16/10] overflow-hidden shadow-[0_22px_40px_-24px_rgb(36_26_10/0.75)]"
                onMouseLeave={() => setPreview(NONE)}
              >
                <Image src={TRAY_SRC} alt={TRAY_ALT} fill sizes={TRAY_SIZES} className="object-cover" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#121319] transition-opacity duration-300"
                  style={{ opacity: lit.parts.length ? 0.64 : 0 }}
                />
                {PART_ORDER.map((id) => (
                  <div
                    key={id}
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      opacity: lit.parts.includes(id) ? 1 : 0,
                      maskImage: `url(/images/kit-mask-${id}.png)`,
                      WebkitMaskImage: `url(/images/kit-mask-${id}.png)`,
                      maskSize: "100% 100%",
                      WebkitMaskSize: "100% 100%",
                    }}
                  >
                    <Image src={TRAY_SRC} alt="" fill sizes={TRAY_SIZES} className="object-cover" />
                  </div>
                ))}
                {lit.focus && (
                  <div
                    className="absolute"
                    style={{ left: `${ANCHORS[lit.focus].x}%`, top: `${ANCHORS[lit.focus].y}%` }}
                    aria-hidden="true"
                  >
                    <span className="absolute -left-[5px] -top-[5px] block h-2.5 w-2.5 rounded-full bg-signal" />
                    <div
                      className={`callout ${ANCHORS[lit.focus].x > 55 ? "callout-left" : "callout-right"}`}
                      key={lit.focus}
                    >
                      <span className="callout-run" />
                      <span className="callout-rise" />
                      <span className="callout-shelf" />
                      <div className="callout-card">
                        <p className="callout-name">{focusPart?.name}</p>
                        <p className="callout-code">
                          {focusPart?.code}
                          {focusPart?.spec ? ` · ${focusPart.spec}` : ""} · ×{focusPart?.qty}
                        </p>
                        <p className="callout-text">{focusPart?.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Phones: the callout's text prints under the photo. */}
              <figcaption className="mt-2 min-h-[2.7em] text-[0.8125rem] leading-snug sm:hidden" aria-live="polite">
                {focusPart ? (
                  <>
                    <span className="type-mono text-[0.6875rem] font-semibold">
                      {focusPart.code} · ×{focusPart.qty}
                    </span>{" "}
                    {focusPart.description}
                  </>
                ) : (
                  <span className="text-lid/75">Tap a part in the list to find it in the tray.</span>
                )}
              </figcaption>
            </figure>
          </div>

          {/* The packing list. */}
          <div className="lg:col-span-5">
            <ol className="border-t-2 border-lid">
              {handle && (
                <ProductEntry
                  product={handle}
                  parts={PRODUCT_PARTS[handle.id]}
                  pinned={pinned}
                  onPreview={setPreview}
                  onPin={pin}
                />
              )}
              {mount && (
                <ProductEntry
                  product={mount}
                  parts={PRODUCT_PARTS[mount.id]}
                  pinned={pinned}
                  onPreview={setPreview}
                  onPin={pin}
                />
              )}
              {bundle && bundleItem && (
                <ProductEntry
                  product={bundleItem}
                  parts={PRODUCT_PARTS[bundle.id]}
                  pinned={pinned}
                  onPreview={setPreview}
                  onPin={pin}
                  note={`Both kits above. Save ${formatPrice(getBundleSavings(bundle), bundle.currency)} on buying them apart.`}
                />
              )}
              {standalone && (
                <ProductEntry
                  product={standalone}
                  parts={[]}
                  pinned={pinned}
                  onPreview={setPreview}
                  onPin={pin}
                  note={standalone.description}
                />
              )}
            </ol>

            {comingSoon.length > 0 && (
              <div className="mt-8">
                <h3 className="type-label text-[0.75rem] text-lid/80">Coming soon, price to be confirmed</h3>
                <ul className="mt-3 divide-y divide-lid/20 border-y border-lid/20">
                  {comingSoon.map((p) => (
                    <li key={p.id} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="type-wide shrink-0 text-[0.875rem] font-bold uppercase">{p.name}</span>
                      <span className="text-[0.875rem] text-lid/80">{p.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductEntry({
  product,
  parts,
  pinned,
  onPreview,
  onPin,
  note,
}: {
  product: Product;
  parts: PartId[];
  pinned: PartId | null;
  onPreview: (lit: Lit) => void;
  onPin: (id: PartId) => void;
  note?: string;
}) {
  const { addItem } = useCart();
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState(variants[0]?.id);
  const variant: ProductVariant | undefined = variants.find((v) => v.id === variantId);
  const isBundle = product.id === "ultimate-bundle";
  // The bundle lists the two kits; its parts are already itemised above.
  const listParts = isBundle ? [] : parts;

  return (
    <li
      className="border-b border-lid/30 py-5"
      onMouseEnter={() => parts.length && onPreview({ parts, focus: null })}
      onMouseLeave={() => onPreview(NONE)}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="type-wide text-[1.05rem] font-extrabold uppercase leading-tight">
          {product.name}
          <span className="type-mono ml-2 align-middle text-[0.6875rem] font-normal tracking-normal text-lid/75">
            {product.sku}
          </span>
        </h3>
        <p className="type-wide shrink-0 text-[1.35rem] font-bold leading-none">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      {note && <p className="mt-2 text-[0.9375rem] leading-relaxed text-lid/85">{note}</p>}

      {listParts.length > 0 && (
        <ul className="mt-3">
          {listParts.map((id) => {
            const part = PARTS[id];
            const on = pinned === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  id={`part-${id}`}
                  aria-pressed={on}
                  onClick={() => onPin(id)}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    onPreview({ parts: [id], focus: id });
                  }}
                  onMouseLeave={() => onPreview({ parts, focus: null })}
                  onFocus={() => onPreview({ parts: [id], focus: id })}
                  onBlur={() => onPreview(NONE)}
                  className={`group grid w-full scroll-mt-[calc(var(--nav-h)+16rem)] grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-2 py-1.5 text-left text-[0.9375rem] transition-colors lg:scroll-mt-[calc(var(--nav-h)+2rem)] ${
                    on ? "text-lid" : "text-lid/85 hover:text-lid"
                  }`}
                >
                  <span className="type-mono text-[0.75rem]">{part.qty}×</span>
                  <span className={`underline-offset-4 ${on ? "underline decoration-2" : "group-hover:underline"}`}>
                    {part.name}
                  </span>
                  <span className="type-mono text-right text-[0.6875rem] text-lid/70">
                    {part.spec ?? part.code}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {variants.length > 1 ? (
          <fieldset className="flex items-center gap-3">
            <legend className="sr-only">Colour for {product.name}</legend>
            {variants.map((v) => (
              <label key={v.id} className="group inline-flex min-h-10 cursor-pointer items-center gap-2 text-[0.875rem]">
                <input
                  type="radio"
                  name={`colour-${product.id}`}
                  value={v.id}
                  checked={variantId === v.id}
                  onChange={() => setVariantId(v.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="block h-5 w-5 rounded-full border border-lid/40 ring-offset-2 ring-offset-kraft peer-checked:ring-2 peer-checked:ring-lid peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-lid"
                  style={{ backgroundColor: v.color }}
                />
                <span className={variantId === v.id ? "text-lid" : "text-lid/75"}>{v.name}</span>
              </label>
            ))}
          </fieldset>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="btn btn-ink"
          onClick={() => addItem(product, variant ?? product.variants?.[0])}
        >
          <BoxIcon />
          Add to cart
          <span className="sr-only">: {product.name}{variant ? `, ${variant.name}` : ""}</span>
        </button>
      </div>
    </li>
  );
}
