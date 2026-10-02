"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/stripe";

interface CheckoutButtonProps {
  className: string;
  label: string;
}

export function CheckoutButton({ className, label }: CheckoutButtonProps) {
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0 || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = await createCheckoutSession(items);
      window.location.assign(url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Checkout isn't available right now. Please try again later."
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={items.length === 0 || isLoading}
        aria-busy={isLoading}
        className={className}
      >
        {isLoading ? "Opening checkout…" : label}
      </button>
      <p role="alert" className="mt-3 text-[0.875rem] leading-snug text-[#a3290f] empty:hidden">
        {error}
      </p>
    </>
  );
}
