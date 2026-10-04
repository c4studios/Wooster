"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ProductImage } from "@/components/ProductImage";
import { MinusIcon, PlusIcon } from "@/components/icons";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="material-lid min-h-[100svh] px-4 pb-16 pt-[calc(var(--nav-h)+2rem)] sm:px-6">
      <div className="surface-slip mx-auto max-w-3xl bg-slip px-5 py-8 text-lid shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:px-10 sm:py-10">
        <h1 className="type-wide text-[clamp(1.8rem,5vw,2.6rem)] font-semibold uppercase leading-none">
          Your cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-10 border-t-2 border-lid pt-8">
            <p className="type-wide text-[1.15rem] font-semibold uppercase">Nothing in the box yet</p>
            <p className="mt-2 max-w-[26rem] text-[0.9375rem] leading-relaxed text-lid/80">
              The handle kit, the Woo Mount and the bundle are all on the home page.
            </p>
            <Link href="/#kit" className="btn btn-ink mt-6">
              See what&apos;s in the box
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 border-t-2 border-lid">
              {items.map((item) => {
                const image = item.variant?.image ?? item.product.image ?? "";
                return (
                  <li
                    key={`${item.product.id}-${item.variant?.id ?? "default"}`}
                    className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-3 border-b border-slip-line py-5 sm:grid-cols-[5.5rem_1fr_auto]"
                  >
                    <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden bg-lid sm:h-[5.5rem] sm:w-[5.5rem]">
                      <ProductImage src={image} alt="" fill sizes="88px" className="object-cover" compactFallback />
                    </div>
                    <div>
                      <h2 className="type-wide text-[1rem] font-semibold uppercase">{item.product.name}</h2>
                      <p className="mt-0.5 text-[0.875rem] text-lid/75">
                        {item.variant && item.product.variants && item.product.variants.length > 1
                          ? `${item.variant.name} · `
                          : ""}
                        <span className="type-mono text-[0.75rem]">{item.product.sku}</span> ·{" "}
                        {formatPrice(item.product.price, item.product.currency)} each
                      </p>
                      <div className="mt-3 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                          className="inline-flex h-10 w-10 items-center justify-center border border-lid/30 hover:border-lid"
                          aria-label={`One fewer ${item.product.name}`}
                        >
                          <MinusIcon size={16} />
                        </button>
                        <span className="type-mono w-9 text-center text-[0.875rem]" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                          className="inline-flex h-10 w-10 items-center justify-center border border-lid/30 hover:border-lid"
                          aria-label={`One more ${item.product.name}`}
                        >
                          <PlusIcon size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.variant?.id)}
                          className="ml-3 inline-flex min-h-10 items-center text-[0.875rem] text-lid/75 underline underline-offset-4 hover:text-lid"
                        >
                          Remove<span className="sr-only"> {item.product.name}</span>
                        </button>
                      </div>
                    </div>
                    <p className="type-wide col-start-2 text-[1.05rem] font-semibold sm:col-start-3 sm:text-right">
                      {formatPrice(item.product.price * item.quantity, item.product.currency)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-baseline justify-between border-t-2 border-lid pt-5">
              <span className="type-label text-[0.75rem]">Total</span>
              <span className="type-wide text-[2rem] font-semibold">{formatPrice(totalPrice, "AUD")}</span>
            </div>
            <p className="mt-1 text-[0.875rem] text-lid/75">Shipping is calculated at checkout.</p>
            <div className="mt-6 max-w-sm">
              <CheckoutButton label="Proceed to checkout" className="btn btn-ink w-full" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
