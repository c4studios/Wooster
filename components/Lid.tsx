"use client";

import { useCart } from "@/lib/cart";
import { bundles, formatPrice, getProduct } from "@/lib/products";
import { PrintStage } from "./PrintStage";
import { ArrowDownIcon, BoxIcon } from "./icons";

/**
 * The first viewport is the Wooster Core box lid, laid out the way the real
 * box is printed: the name across the top over a rule, the line drawing in
 * the middle (here the live print), the contents bottom-left and the maker
 * bottom-right.
 */
export function Lid() {
  return (
    <section id="print" aria-labelledby="lid-title" className="material-lid relative">
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-4 pb-10 pt-[calc(var(--nav-h)+0.75rem)] sm:px-6 lg:px-12 lg:pb-8 lg:pt-[calc(var(--nav-h)+1.25rem)]">
        <header>
          <h1
            id="lid-title"
            className="type-wide flex items-baseline gap-[0.3em] font-semibold uppercase leading-[0.84] text-ink"
          >
            <span className="text-[clamp(2.5rem,10vw,5.6rem)] tracking-[0.01em]">Wooster</span>
            <span className="text-[clamp(1.15rem,4.4vw,2.5rem)] tracking-[0.03em]">Core</span>
          </h1>
          <div className="mt-3 flex flex-col gap-3 border-t border-silver-lo/45 pt-3 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="type-wide text-[clamp(0.95rem,3.4vw,1.95rem)] font-normal uppercase leading-none tracking-[0.2em] text-ink">
              Performance Big Air
            </p>
            <p className="max-w-[36rem] text-[0.9375rem] leading-snug text-silver">
              A kitesurfing handle printed layer by layer in PETG/ASA. Add the Woo Mount and it
              carries your WOO sensor.
            </p>
          </div>
        </header>

        <div className="mt-5 flex flex-1 flex-col justify-center md:mt-6">
          <PrintStage buy={<BuyBlock />} credit={<MakerCredit />} />
        </div>
      </div>
    </section>
  );
}

function BuyBlock() {
  const { addItem } = useCart();
  const handle = getProduct("wooster-core");
  const bundle = bundles[0];
  if (!handle) return null;

  return (
    <div>
      <p className="type-label text-[0.6875rem] text-silver-lo">
        Wooster Core handle <span className="type-mono ml-1 tracking-normal">{handle.sku}</span>
      </p>
      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="type-wide text-[1.9rem] font-semibold leading-none text-ink">
          {formatPrice(handle.price, handle.currency)}
        </span>
        <span className="text-[0.8125rem] text-silver-lo">Handle, 4 bolts, 4 washers, 2 clips</span>
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          className="btn btn-silver"
          onClick={() => addItem(handle, handle.variants?.[0])}
        >
          <BoxIcon />
          Add to cart
        </button>
        {bundle && (
          <a
            href="#kit"
            className="inline-flex min-h-10 items-center gap-2 text-[0.875rem] text-silver underline decoration-silver-lo/60 hover:text-silver-hi hover:decoration-silver-hi"
          >
            Bundle with the Woo Mount, {formatPrice(bundle.price, bundle.currency)}
            <ArrowDownIcon size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

function MakerCredit() {
  return (
    <p className="text-left md:text-right">
      <span className="type-label block text-[0.6875rem] tracking-[0.22em] text-silver-lo">
        Engineered by
      </span>
      <span className="type-wide mt-1 block text-[1.3rem] font-semibold uppercase leading-[0.95] text-ink">
        Arty
        <br />
        Design
      </span>
    </p>
  );
}
