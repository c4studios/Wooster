"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ProductImage } from "@/components/ProductImage";
import { CloseIcon, MinusIcon, PlusIcon } from "./icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** The cart as the packing slip that goes in the box. */
export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Dialog behaviour: focus in, Tab stays inside, Escape closes, focus returns.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus()
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeCart();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus?.({ preventScroll: true });
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-[#0e0f14]/70"
            aria-hidden="true"
          />

          <motion.div
            key="slip"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="surface-slip fixed inset-y-0 right-0 z-[70] flex w-full max-w-[27rem] flex-col bg-slip text-lid shadow-[-24px_0_48px_-24px_rgb(0_0_0/0.6)]"
          >
            <div className="flex items-start justify-between border-b-2 border-lid px-5 pb-4 pt-5 sm:px-6">
              <div>
                <h2 id="cart-title" className="type-wide text-[1.5rem] font-semibold uppercase leading-none">
                  Your cart
                  <span className="type-mono ml-2 align-middle text-[0.8125rem] font-normal">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                </h2>
              </div>
              <button
                type="button"
                data-autofocus
                onClick={closeCart}
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-lid/80 hover:text-lid"
                aria-label="Close cart"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-start justify-center gap-4 py-12">
                  <p className="type-wide text-[1.15rem] font-semibold uppercase">Nothing in the box yet</p>
                  <p className="max-w-[20rem] text-[0.9375rem] leading-relaxed text-lid/80">
                    The handle kit, the Woo Mount and the bundle are all listed under In the box.
                  </p>
                  <a href="#kit" onClick={closeCart} className="btn btn-line">
                    See what&apos;s in the box
                  </a>
                </div>
              ) : (
                <ul>
                  {items.map((item) => {
                    const key = `${item.product.id}-${item.variant?.id ?? "default"}`;
                    const image = item.variant?.image ?? item.product.image ?? "";
                    return (
                      <li key={key} className="grid grid-cols-[4rem_1fr_auto] gap-x-4 border-b border-slip-line py-4">
                        <div className="relative h-16 w-16 overflow-hidden bg-lid">
                          <ProductImage src={image} alt="" fill sizes="64px" className="object-cover" compactFallback />
                        </div>
                        <div className="min-w-0">
                          <p className="type-wide truncate text-[0.875rem] font-semibold uppercase">
                            {item.product.name}
                          </p>
                          <p className="mt-0.5 text-[0.8125rem] text-lid/75">
                            {item.variant && item.product.variants && item.product.variants.length > 1
                              ? `${item.variant.name} · `
                              : ""}
                            <span className="type-mono text-[0.6875rem]">{item.product.sku}</span>
                          </p>
                          <div className="mt-2 flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                              className="inline-flex h-9 w-9 items-center justify-center border border-lid/30 hover:border-lid"
                              aria-label={`One fewer ${item.product.name}`}
                            >
                              <MinusIcon size={16} />
                            </button>
                            <span className="type-mono w-8 text-center text-[0.8125rem]" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                              className="inline-flex h-9 w-9 items-center justify-center border border-lid/30 hover:border-lid"
                              aria-label={`One more ${item.product.name}`}
                            >
                              <PlusIcon size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id, item.variant?.id)}
                              className="ml-2 inline-flex min-h-9 items-center px-1 text-[0.8125rem] text-lid/75 underline underline-offset-4 hover:text-lid"
                            >
                              Remove<span className="sr-only"> {item.product.name}</span>
                            </button>
                          </div>
                        </div>
                        <p className="type-wide text-right text-[0.9375rem] font-semibold">
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t-2 border-lid px-5 pb-6 pt-4 sm:px-6">
                <div className="flex items-baseline justify-between">
                  <span className="type-label text-[0.75rem]">Total</span>
                  <span className="type-wide text-[1.6rem] font-semibold">{formatPrice(totalPrice, "AUD")}</span>
                </div>
                <p className="mt-1 text-[0.8125rem] text-lid/75">Shipping is calculated at checkout.</p>
                <CheckoutButton label="Checkout" className="btn btn-ink mt-4 w-full" />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
