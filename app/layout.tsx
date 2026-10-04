import type { Metadata, Viewport } from "next";
import { Archivo, Lexend, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { C4Credit } from "@/components/C4Credit";
import { CartProvider } from "@/lib/cart";
import { getSiteUrlObject } from "@/lib/site-url";

// Lexend carries the box's lettering: a geometric sans with round O's, set
// semibold at normal width like the WOOSTER CORE print (Montserrat-like on the
// box, which C4 does not use as a brand face). Archivo sets the body text;
// Martian Mono is kept for part codes, quantities and readouts.
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#222531",
};

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: "Wooster Core | Performance Big Air Handle",
  description:
    "Precision 3D-printed kitesurfing handle engineered for maximum grip and control during big air sessions. Engineered by Arty Design.",
  alternates: {
    canonical: "/",
  },
  // C4 concept build: concepts are never indexable. next.config.ts sends the
  // matching X-Robots-Tag header so images and non-HTML routes are covered too.
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  keywords: [
    "kitesurfing",
    "kitesurf handle",
    "big air",
    "wooster core",
    "3D printed",
    "performance handle",
    "arty design",
    "woo mount",
  ],
  openGraph: {
    title: "Wooster Core | Performance Big Air Handle",
    description:
      "Precision 3D-printed kitesurfing handle engineered for maximum grip and control during big air sessions.",
    url: "/",
    type: "website",
    images: ["/images/hero-product.jpg"],
  },
};

// Direction contract (impeccable). Kept in the emitted HTML so the finish
// review can audit the render against it.
const DIRECTION_CONTRACT = `<!--
THESIS: The site is the Wooster Core box, opened. The lid's line drawing is the live WebGL print, and the kit sits in its foam. It refuses the dark action-sports store with a neon accent.
OWN-WORLD: Blue-charcoal lid with the box's silver ink, kraft tray fields, the grey pick foam in the real photos, Signal Orange only where the product is orange. Lexend semibold like the box lettering, Archivo for reading, Martian Mono for codes and readouts.
STORY: A rider watches the handle print, opens the box to see every part and price, reads the spec panel, then adds the handle, the mount or the bundle to the cart.
FIRST VIEWPORT: The whole lid. WOOSTER CORE across the top in silver over a rule and PERFORMANCE BIG AIR, the live print in the middle band, the handle price and Add to cart bottom-left, ENGINEERED BY ARTY DESIGN bottom-right.
FORM: The Box and its Foam, #1 of 7 (Impeccable's pick, chosen by Caleb 2 Oct 2026), seed 02f7b57c.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${lexend.variable} ${archivo.variable} ${martianMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a
          href="#main"
          className="type-label fixed left-3 top-3 z-[100] -translate-y-24 bg-silver-hi px-4 py-3 text-xs text-lid focus:translate-y-0"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navigation />
          <main id="main">{children}</main>
          <C4Credit />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
