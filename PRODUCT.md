# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Riders (primary).** Kitesurfers who ride big air and want a handle on the board, with a mount for a WOO jump sensor. They need to see what the handle is, what comes in the box and what each item costs, then buy the handle, the mount or the bundle. *Inferred* from the box ("Performance Big Air"), the WOO mount products and the "Built by Riders" framing; Caleb confirmed on 2 Oct 2026 that Arty Design sells the product.
- **Showcase visitors (secondary).** People browsing the C4 Studios Concepts showcase on c4studios.com.au. They first see the site as a captured image in a 3D carousel, then may click through and judge it as craft. *Source:* `C4-Internal/concept-collateral/wooster-core.md`.

## Product Purpose

Wooster Core is a 3D-printed kitesurfing handle made by Arty Design, with an add-on mount that carries a WOO sensor. This site is its storefront. It shows the object and its parts, and it sells four items through Stripe Checkout. Success means a rider understands the system and adds it to the cart, and a showcase visitor remembers the live print.

## Positioning

The handle is printed layer by layer in PETG/ASA, and the system has a precision-fit cradle for the WOO sensor. The site's signature is a real-time WebGL FDM print that builds the parts in front of the visitor. A moulded or machined handle cannot truthfully show itself being printed.

## Operating Context

- **Catalogue** (`lib/products.ts`, confirmed real by Caleb on 2 Oct 2026):
  - Wooster Core, WC-100, A$149, Stealth Black. In the box: the handle, stainless steel bolts and washers, and mounting clips.
  - Woo Mount Add-on, WC-200, A$49, Stealth Black or Signal Orange.
  - Standalone Woo Mount, WC-250, A$59.
  - Ultimate Bundle, WC-BNDL, A$179: one handle plus one Woo Mount.
  - Coming soon, price TBC: Wooster Lite, Wooster Carbon and Wooster XL.
- **Parts seen in the product photos** (`public/images/*.jpg`):
  - the arch-shaped handle with flared feet and an inlay across the top bar (it reads "PULL THE ..."; the last word can't be read in the photos, so don't quote it);
  - a square mount base plate and an elongated mount cradle with a clip;
  - two hook-profile retention clips;
  - **4 bolts and 4 washers**, with the washers stamped "316".
- **Packaging:** charcoal corrugated box with silver print reading "WOOSTER CORE / PERFORMANCE BIG AIR". It carries a line drawing of the handle and "ENGINEERED BY ARTY DESIGN". Inside is a kraft tray with a grey foam insert cut to each part. The bundle box also lists "1 x Wooster Core Handle, 1 x Wooster System Woo Mount".
- **Commerce:** `/api/checkout` creates a Stripe Checkout session, with prices resolved on the server from the catalogue. It returns 503 without `STRIPE_SECRET_KEY`. Never touch keys or env values. Shipping countries: AU, NZ, US, GB.
- **Hosting:** Vercel project `wooster`, live at https://wooster-henna.vercel.app. Repo `calebscott1892-bot/Wooster`, branch `master`.

## Capabilities and Constraints

- **Cart:** a cart drawer, a /cart page, Stripe checkout and /checkout/success. Variant selection exists for the Woo Mount colour.
- **Spec claims already in the repo**, approved by Caleb on 2 Oct 2026 as they stand:
  - PETG/ASA;
  - 316 stainless hardware;
  - M5×25 bolts;
  - 0.2 mm layers;
  - 245 °C nozzle;
  - "Universal Kite Bar" compatibility;
  - "Engineered in Australia".
- **Part counts** follow the photos: 4 bolts and 4 washers.
- **Concept rule:** the site is a C4 concept, so it is never indexable. It ships robots noindex in the metadata API plus an X-Robots-Tag header.
- **Showcase constraints** (`wooster-core.md`):
  - never a blank canvas on first paint, so a poster frame comes first;
  - a deterministic first view;
  - a well-composed hero moment at roughly 70% built;
  - smooth print with no heat;
  - a fallback image without WebGL;
  - no layout shift;
  - verify at 1440×900 and 390×844.
- **Undecided:** the "Built by Riders" facts (who designed it, who rides it, where it was tested, how many prototype rounds). The section (`components/RiderStory.tsx`) is held out of the page until Arty Design supplies them; no placeholders or invented riders go public (4 Oct 2026).
- **Missing assets:** `products.ts` points at `/images/product-core.jpg`, `product-mount.jpg`, `product-standalone.jpg` and `bundle-ultimate.jpg`, which do not exist in `public/images`.

## Brand Commitments

- Name: **Wooster Core**. Maker credit: **Engineered by Arty Design** (printed on the box).
- Box line: **Performance Big Air**.
- Colourway names: **Stealth Black**, and **Signal Orange** for the mount.
- The WebGL print animation and the exploded parts view are to be kept and built on (Caleb, 2 Oct 2026).
- The C4 Studios footer credit (`components/c4-footer-credit`) stays on every page.

## Evidence on Hand

- **Product photos** in `public/images`:
  - `hero-product.jpg` is the open bundle box, with the orange mount parts in the foam;
  - `exploded-view.jpg` is every part laid out on white beside the box;
  - `product-detail.jpg` is the open box from above;
  - `product-boxes.jpg` is two closed boxes.
- The catalogue in `lib/products.ts`.
- **Absent:** no testimonials, reviews, rider names, test data, press, jump heights or sales figures exist. Never fabricate them. The three "Rider Review / Beta Tester" quotes were removed on 2 Oct 2026 for this reason.
- `hello@artydesign.com.au` and `instagram.com/arty_dsgn` were in the original repo but are unverified, so the site no longer shows them (4 Oct 2026).

## Product Principles

1. The object is the proof. Show the real parts and the real print before saying anything about them.
2. Every claim traces to the catalogue, the photos, the box or Caleb. Unknowns ship as visible placeholders, never as plausible filler.
3. The buy path stays one decision deep. Handle, mount or bundle, with the price beside the object.
4. Speak like the people who ride and print it. Plain, specific and dry, with no hype.

## Accessibility & Inclusion

WCAG 2.2 AA, the C4 standard. The 3D view needs keyboard and single-pointer alternatives to dragging (2.5.7), and reduced motion must stop the print animation and leave a finished, readable frame.
