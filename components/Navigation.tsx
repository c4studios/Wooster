"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { BoxIcon, CloseIcon, MenuIcon } from "./icons";

const SECTIONS = [
  { id: "print", label: "The print" },
  { id: "kit", label: "In the box" },
  { id: "specs", label: "Specs" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { totalItems, openCart } = useCart();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Escape closes the menu and returns focus to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        solid ? "border-b border-lid-line bg-lid/95 backdrop-blur-[6px]" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[var(--nav-h)] max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link
          href="/"
          className="type-wide text-[0.95rem] font-semibold uppercase tracking-[0.03em] text-ink"
        >
          Wooster <span className="text-[0.72em]">Core</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              className={`relative px-3 py-2 text-[0.875rem] transition-colors ${
                activeSection === id ? "text-silver-hi" : "text-silver-lo hover:text-silver-hi"
              }`}
            >
              {label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-silver-hi transition-transform duration-300 ${
                  activeSection === id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
          <CartButton count={totalItems} onClick={openCart} />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartButton count={totalItems} onClick={openCart} />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center text-silver"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-lid-line bg-lid-deep md:hidden"
      >
        <ul className="px-4 py-3 sm:px-6">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="type-wide flex min-h-12 items-center border-b border-lid-line text-[1.05rem] font-semibold uppercase text-silver last:border-b-0"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-1 inline-flex h-11 items-center gap-2 px-2.5 text-silver transition-colors hover:text-silver-hi"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <BoxIcon />
      <span className="type-mono text-[0.75rem]" aria-hidden="true">
        {count}
      </span>
    </button>
  );
}
