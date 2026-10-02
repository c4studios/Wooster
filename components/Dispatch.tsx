"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart";
import { bundleProducts, bundles, formatPrice, getProduct } from "@/lib/products";
import { BoxIcon } from "./icons";

/** The close: the box as it leaves, and the two ways to fill it. */
export function Dispatch() {
  const { addItem } = useCart();
  const handle = getProduct("wooster-core");
  const bundle = bundleProducts.find((p) => p.id === bundles[0]?.id);

  return (
    <section aria-labelledby="dispatch-title" className="material-lid border-t border-lid-line">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-x-12 gap-y-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-12">
        <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7">
          <Image
            src="/images/product-boxes.jpg"
            alt="Two closed Wooster Core boxes on kraft paper, printed in silver with the handle drawing and Engineered by Arty Design."
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-5">
          <h2
            id="dispatch-title"
            className="type-wide text-[clamp(2rem,5vw,3.4rem)] font-extrabold uppercase leading-[0.9] text-silver-hi"
          >
            Ready to ship
          </h2>
          <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-silver">
            Packed in the Wooster Core box, each part in its own cut-out.
          </p>

          <ul className="mt-8 border-t border-silver-lo/45">
            {[handle, bundle].map((p) =>
              p ? (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-lid-line py-4">
                  <div>
                    <p className="type-wide text-[1rem] font-extrabold uppercase text-silver-hi">{p.name}</p>
                    <p className="mt-0.5 text-[0.875rem] text-silver-lo">
                      {p.id === "wooster-core" ? "Handle, 4 bolts, 4 washers, 2 clips" : "Handle and Woo Mount"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="type-wide text-[1.3rem] font-bold text-silver-hi">
                      {formatPrice(p.price, p.currency)}
                    </span>
                    <button
                      type="button"
                      className={`btn ${p.id === "wooster-core" ? "btn-signal" : "btn-line text-silver-hi"}`}
                      onClick={() => addItem(p, p.variants?.[0])}
                    >
                      <BoxIcon />
                      Add to cart
                      <span className="sr-only">: {p.name}</span>
                    </button>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
