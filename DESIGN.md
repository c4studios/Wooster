---
name: Wooster Core
description: The Wooster Core box, opened. A storefront for a 3D-printed kitesurfing handle, built from its own carton.
colors:
  lid: "#222531"
  lid-deep: "#191b24"
  lid-line: "#363b4b"
  ink: "#8b95a4"
  silver: "#b7bcc6"
  silver-hi: "#e1e4e9"
  silver-lo: "#8e95a1"
  signal: "#ff6b00"
  kraft: "#b99860"
  slip: "#eeefeb"
  slip-line: "#cfd1cb"
  stealth: "#16171b"
typography:
  display:
    fontFamily: "Lexend, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 10vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 0.84
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Lexend, Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.4rem)"
    fontWeight: 600
    lineHeight: 0.9
  title:
    fontFamily: "Lexend, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: '"tnum"'
  label:
    fontFamily: "Lexend, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.14em"
  mono:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    fontFeature: '"tnum"'
  button:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 650
    letterSpacing: "0.02em"
    fontVariation: '"wdth" 112'
rounded:
  button: "2px"
  full: "9999px"
spacing:
  gutter: "1rem"
  gutter-sm: "1.5rem"
  gutter-lg: "3rem"
  section: "4rem"
  section-md: "6rem"
  column-gap: "3rem"
  nav: "4rem"
  container: "90rem"
components:
  button-silver:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.lid}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0.7rem 1.25rem"
    height: "2.75rem"
  button-silver-hover:
    backgroundColor: "{colors.silver-hi}"
  button-ink:
    backgroundColor: "{colors.lid}"
    textColor: "{colors.silver-hi}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0.7rem 1.25rem"
    height: "2.75rem"
  button-ink-hover:
    backgroundColor: "{colors.lid-deep}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.silver-hi}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0.7rem 1.25rem"
    height: "2.75rem"
  stage-control:
    textColor: "{colors.silver-lo}"
    size: "2.5rem"
  stage-control-hover:
    textColor: "{colors.silver-hi}"
  nav-bar:
    backgroundColor: "{colors.lid}"
    textColor: "{colors.silver-lo}"
    height: "{spacing.nav}"
  nav-link-current:
    textColor: "{colors.silver-hi}"
  part-dot:
    backgroundColor: "{colors.signal}"
    rounded: "{rounded.full}"
    size: "8px"
  tray-marker:
    backgroundColor: "{colors.signal}"
    rounded: "{rounded.full}"
    size: "10px"
  callout-card:
    backgroundColor: "{colors.lid-deep}"
    textColor: "{colors.silver}"
    padding: "0.6rem 0.85rem 0.7rem"
  colour-swatch:
    rounded: "{rounded.full}"
    size: "20px"
  qty-stepper:
    textColor: "{colors.lid}"
    size: "2.25rem"
  packing-slip:
    backgroundColor: "{colors.slip}"
    textColor: "{colors.lid}"
    padding: "2.5rem"
  cart-drawer:
    backgroundColor: "{colors.slip}"
    textColor: "{colors.lid}"
    width: "27rem"
---

# Design System: Wooster Core

## Overview

**Creative North Star: "The Box and its Foam"**

The site is the Wooster Core box, opened. The first screen is the lid, laid out the way the real carton is printed: WOOSTER CORE in silver across the top, a rule, PERFORMANCE BIG AIR, the line drawing in the middle, the price bottom-left and ENGINEERED BY ARTY DESIGN bottom-right. On this lid the line drawing is the live WebGL print. It builds the kit in white wireframe with a Signal Orange hot layer. Below the lid is the kraft tray, where each part is found in its cut-out and the packing list sells it. The cart is the packing slip that goes in the box.

Every colour is sampled from the product photos. Surfaces are flat fields of the box's materials, and depth only appears where paper lies on board. Type behaves like carton print: a big name, one heading size and a lot of small, exact print for codes, counts and specs. The lid gives most of its height to the print, and the lists below it are dense like a spec panel. The live print is the one authored moment. Everything else on the page is a short change of state.

The world rejects the dark action-sports store with a neon accent. Orange appears only where the product is orange or hot, and every button is the box's own silver or charcoal. The grey pick foam of the name lives in the photographs. Its CSS material is held out with the unreleased rider section, so no shipped surface is drawn in foam.

**Key Characteristics:**
- A blue-charcoal lid is the base field. Kraft and the packing slip are the only light surfaces.
- Display lettering is the box's silver ink on charcoal, and charcoal on kraft and the slip.
- Signal Orange marks orange parts, the print's heat and the part markers. It never fills a button.
- Content sits on rules like a packing list or a spec panel. There are no cards.
- Corners are square-cut. Buttons take 2px, and circles are kept for part dots and colour swatches.
- One authored motion, the live print, which opens finished and still under reduced motion.

## Colors

The palette is the box itself: a blue-charcoal lid printed in silver, a kraft tray, a pale packing slip and one hot orange that belongs to the parts.

### Primary
- **Lid Charcoal** (#222531): The corrugated lid. Base field for the lid, the spec sheet, Ready to ship, and the cart and order pages behind their slips. It is also the browser theme colour. On kraft and the slip it becomes the ink: every word, the 2px rules, the Ink button's fill and the focus ring.
- **Lid Shadow** (#191b24): The inside of the lid. The footer, the C4 credit band, the mobile menu panel, the callout card (at 95%), the Ink button's hover and the scrollbar track.
- **Lid Score Line** (#363b4b): 1px lines on charcoal. It divides lid sections, spec rows and Ready to ship rows, edges the solid nav bar and separates mobile menu rows.

### Secondary
- **Box Silver Ink** (#8b95a4): The printed silver, measured from product-boxes.jpg. Display lettering on charcoal only: the lid name and PERFORMANCE BIG AIR, section headings, prices on the lid, wordmarks and the maker credit. At 5.03:1 on the lid it is the lowest text contrast on the site, still above AA at every size it's set. Mind the name clash in code: the `ink` token is this silver, while the Ink button is charcoal.
- **Silver** (#b7bcc6): Running text on charcoal (8.00:1), the Silver button's fill and the print nozzle.
- **Silver Highlight** (#e1e4e9): Emphasis on charcoal. Spec values, the current nav link and its underline, hovered links, the readout's state word, callout names, the Ink button's type, the Silver button's hover and the skip link.
- **Silver Lowlight** (#8e95a1): Labels and quiet text on charcoal (5.06:1). Spec terms, legend headings, nav links at rest, stage controls, contents lines, the © line and the scrollbar thumb. At 45% it draws the rule under the lid name and across the top of lid lists.

### Tertiary
- **Signal Orange** (#ff6b00): The Woo Mount's colourway and the print's heat. It draws the hot layer and the nozzle tip, the colour the wireframe flashes at completion, the part dots on the print, the callout's leader, top rule and part code, the legend dots (50% at rest, 85% on hover, full when chosen), the tray marker and the Signal Orange swatch. Beyond the product it only marks interaction: the focus ring on charcoal (5.34:1 against the lid), the text selection with Stealth Black type, and the caret.

### Neutral
- **Kraft Board** (#b99860): The tray. One full section, In the box, plus the backing behind the pinned tray photo on phones. Every word on it is Lid Charcoal (5.61:1). Dividers on kraft are charcoal at 20–30%.
- **Packing Slip** (#eeefeb): The cart drawer, the /cart sheet and the Order confirmed sheet. Type is Lid Charcoal at full strength, or 75–85% for secondary lines (6.20:1 at 75%).
- **Slip Rule** (#cfd1cb): The 1px line between items on a slip.
- **Stealth Black** (#16171b): The handle's colourway. Its colour swatch, and the type inside an orange text selection.

globals.css also declares kraft-deep, kraft-hi, foam, foam-hi, signal-deep and steel. No shipped surface uses them, and the foam pair only dresses the held-out rider section. They are not part of this system.

### Named Rules
**The Orange Part Rule.** Signal Orange appears where the product is orange or hot: the mount colourway, the print's hot layer and flash, and the dots, markers and leaders that point at parts. Its only other use is marking interaction on charcoal (focus ring, text selection, caret). It never fills a button or a surface, it never colours a heading or a sentence, and the only orange type is a part code set in mono on charcoal.

**The Charcoal-on-Kraft Rule.** Every word on kraft is full-strength Lid Charcoal. Charcoal tints are for dividers only. Kraft and the slip switch the focus ring to charcoal, because orange on kraft measures 1.05:1.

**The Sampled Colour Rule.** Every colour token comes from the product photos: the lid, its print, the tray, the handle and the mount. A new colour has to be sampled from the same evidence.

## Typography

**Display Font:** Lexend (with Arial, sans-serif)
**Body Font:** Archivo (with Arial, sans-serif)
**Label/Mono Font:** Martian Mono (with ui-monospace, monospace) for codes and readouts; labels use Lexend Medium

**Character:** Lexend, semibold at normal width, stands in for the box's geometric lettering with its round O's. Archivo does the reading, and stretched to 112% width at weight 650 it sets every button. Martian Mono prints what a printer or a parts list would print. Numerals are tabular everywhere, so prices and counts line up.

### Hierarchy
- **Display** (600, clamp(2.5rem, 10vw, 5.6rem), 0.84): The lid name only, uppercase in Box Silver Ink. WOOSTER runs at full size with CORE beside it on the same baseline at clamp(1.15rem, 4.4vw, 2.5rem). Under the rule, PERFORMANCE BIG AIR runs at weight 400, clamp(0.95rem, 3.4vw, 1.95rem), tracked 0.2em.
- **Headline** (600, clamp(2rem, 5vw, 3.4rem), 0.9): One per section (In the box, Specs, Ready to ship), uppercase. Box Silver Ink on charcoal, Lid Charcoal on kraft. Slip page titles sit a step down: clamp(1.8rem, 5vw, 2.6rem) for Your cart and clamp(1.9rem, 6vw, 2.8rem) for Order confirmed.
- **Title** (600, 1.05rem, 1.25): Product names in the packing list, uppercase, with the SKU beside them in mono. Ready to ship and the slips set names at 0.875–1rem. Prices and totals use the same face and weight, sized to their place: 0.9375–1.05rem on slip lines, 1.3–1.35rem in lists, 1.9rem on the lid and 1.6–2rem for totals.
- **Body** (Archivo 400, 0.9375rem, 1.625): Running text. Section intros step up to 1rem. Intros and captions hold to 30–38rem; short notes in the footer and empty states run narrower (20–26rem). Secondary lines drop to 0.875rem and 0.8125rem.
- **Label** (Lexend 500, 0.6875rem, 0.14em, uppercase): Names a value or a group the way the carton does. Spec terms, the product line above a price, legend groups (0.625rem, 0.12em), photo captions, the printer readout, Total, and ENGINEERED BY (0.22em, as printed on the box).
- **Mono** (Martian Mono 400, 0.6875rem, tabular): SKUs, part codes, quantities like 4×, the print settings line, the progress percentage and the cart count. Sizes run 0.625–0.8125rem.
- **Button** (Archivo 650, 0.9375rem, 0.02em, 112% width): Every filled and outlined button.

### Named Rules
**The Box-Print Ramp Rule.** Large type is kept for the lid name and the section or page headings. Below them, prices, totals, wordmarks and the maker credit run in Lexend semibold up to 2rem. Everything else is small print, mostly 10–17px.

**The Codes-in-Mono Rule.** Anything a printer or a parts list would print goes in Martian Mono: SKU, part code, count, layer height, temperature, percentage. Names and sentences never do.

## Layout

The page is a column of material fields. Each is a full-bleed section with its content held in a centred container (max 90rem). Side padding is 1rem on phones, 1.5rem from 640px and 3rem from 1024px. Sections pad 4rem top and bottom, 6rem from 768px. The fixed nav is 4rem tall, and anchor offsets and sticky positions use the same height.

From 1024px content sits on a 12-column grid with 3rem gutters, always split unevenly: tray 7 and packing list 5, spec list 5 and close-up photos 7, dispatch photo 7 and copy 5. Below 1024px every section is one column.

The lid fills the first viewport (100svh) and follows the carton at every width. Phones stack the print (4:3, edge to edge) above a row with the readout and controls, then the price, buy button and parts legend, then the maker credit. From 768px the readout and controls sit above a 2:1 print, with buy bottom-left and maker bottom-right beneath it. From 1024px the lid becomes one grid cell. The print is centred and sized to the viewport (twice the height left after 17.5rem of chrome, at least 46rem wide), and four blocks pin to its corners: readout top-left, controls top-right, price with legend bottom-left, maker bottom-right. The corner blocks pass pointer events through, so the print can still be dragged between them.

In the box pins the tray photo while the packing list scrolls. On phones it sticks right under the nav on a kraft backing, with a charcoal hairline and a warm shadow as its lower edge. From 1024px it sticks 1.5rem below the nav, beside the list.

Breakpoints are 640px (part callouts float over the images from here; below it their text prints under the image), 768px (nav links, the 2:1 print and the tablet lid) and 1024px (the corner lid and the 12-column grid).

### Named Rules
**The Carton Order Rule.** The lid always reads in the carton's order: name, rule, PERFORMANCE BIG AIR, print, price bottom-left, maker bottom-right. On wide screens no text block crosses the middle of the print; only callouts, which belong to the print, sit on it.

## Elevation & Depth

The system is flat material fields with a few paper-on-board shadows. Lid, tray and slip are solid colour. A CSS corrugated-flute pattern and a kraft noise were tried and removed in the finish review because they read as imitation board. Depth appears only where one real material lies on another, as a long, soft shadow with negative spread, tinted to the surface underneath: black on charcoal, a dark kraft brown on kraft. Buttons and lists never cast shadows.

### Shadow Vocabulary
- **Slip on the lid** (`box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.7)`): The /cart sheet and the Order confirmed sheet lying on the lid.
- **Drawer edge** (`box-shadow: -24px 0 48px -24px rgb(0 0 0 / 0.6)`): The cart drawer's leading edge over the page.
- **Photo on kraft** (`box-shadow: 0 22px 40px -24px rgb(36 26 10 / 0.75)`): The tray photo lifting off the kraft.
- **Pinned tray edge** (`box-shadow: 0 12px 16px -14px rgb(36 26 10 / 0.6)`): The lower edge of the sticky tray on phones, over a 25% charcoal hairline.
- **Lid knock-out** (`text-shadow: 0 0 10px var(--color-lid), 0 0 4px var(--color-lid), 0 0 2px var(--color-lid)`): Corner text on the lid from 1024px, so the silver print stays legible over the white wireframe.

Two scrims carry overlays. The cart backdrop is near-black charcoal (#0e0f14) at 70%. The tray spotlight dims the photo with charcoal (#121319) at 64% while the chosen part shows through a mask at full brightness. The nav bar is transparent over the lid at first. After 24px of scroll it fills with the lid at 95%, a 6px backdrop blur and a score line, so it reads as the lid's own edge.

### Named Rules
**The Paper-on-Board Rule.** A shadow means one material is lying on another, and it takes the tint of the surface below. Nothing lifts on hover, no panel floats, and no button casts a shadow.

**The Flat Board Rule.** Material fields are flat colour. Don't add flutes, grain or noise; the photographs carry the texture.

## Shapes

The world is square-cut board. Sections, photos, slips, the drawer and the callout card all have square corners. Buttons take a 2px radius, just enough to soften a die-cut edge. Circles are kept for marks that point at the product: the 8px legend dots, the 10px tray marker, the dots on the print and the 20px colour swatches.

Lines do the structural work. A 2px charcoal rule opens the packing list and marks the header and total on every slip. 1px rules divide rows, and a 45% silver rule sits under the lid name and across the top of lid lists. Callouts reach their card through an orange elbow leader (out, up, along) like a technical drawing. Icons are drawn on a 20px grid with one 1.5px stroke, square caps and mitred joins, so they match the cut of everything else.

### Named Rules
**The Square-Cut Rule.** Nothing is rounded except buttons (2px) and the round marks. Photos and sheets keep hard corners.

## Components

### Buttons
Flat ink on board, like the box's own print filled in.
- **Shape:** Nearly square (2px radius), at least 2.75rem tall, padding 0.7rem 1.25rem, with a 0.6rem gap before a leading icon.
- **Silver (`.btn-silver`):** Silver fill, Lid Charcoal type. The main action on charcoal: Add to cart on the lid and the handle row in Ready to ship. Hover brightens the fill to Silver Highlight.
- **Ink (`.btn-ink`):** Lid Charcoal fill, Silver Highlight type. The main action on kraft and the slip: the packing list's Add to cart, Checkout, Proceed to checkout and Back to Wooster Core. Hover deepens to Lid Shadow.
- **Line (`.btn-line`):** A 1px outline in the current text colour, no fill. A second action, such as the bundle row in Ready to ship or the empty drawer's way back to the tray. Hover washes 6% white on charcoal and 6% black on kraft and the slip.
- **Hover / Focus:** Colour changes over 160ms on cubic-bezier(0.22, 1, 0.36, 1). Pressing nudges the button down 1px. Focus is a 2px outline at 3px offset, orange on charcoal and charcoal on kraft and the slip. Disabled drops to 55% with a not-allowed cursor. Checkout reads "Opening checkout…" while it waits and prints any error beneath it in rust red (#a3290f, 6.31:1 on the slip).
- Every Add to cart leads with the box icon. A second action beside a filled button is a Line button or an underlined text link.

### Colour swatches
Paint chips for the two colourways. The system has no other chips.
- **Style:** A radio set of 20px circles filled with the colourway (Stealth Black, Signal Orange) with a 40% charcoal edge, the name beside in charcoal, each target at least 40px tall.
- **State:** The chosen swatch gets a 2px charcoal ring set 2px off the kraft. Keyboard focus draws a charcoal outline 4px out.

### Ruled lists
The system has no cards. Content that other stores would put in cards sits on rules.
- **Spec panel:** The term in the label voice (Silver Lowlight) and the value in body type (Silver Highlight), in a two-column row with a term column between 8.5rem and 40% wide. 1px score lines divide rows, under a 45% silver rule.
- **Packing list (on kraft):** A 2px charcoal top rule, with entries divided by 30% charcoal. Each entry has the name with its mono SKU, the price on the right, part lines in a quantity / name / spec grid, then the colour choice and the Ink button. Part lines underline on hover and keep a 2px underline when pinned.
- **Slip items:** A square thumbnail on charcoal (4rem in the drawer, 4.5–5.5rem on /cart), the name, variant and mono SKU, a quantity stepper of square buttons (36px in the drawer, 40px on /cart) with a 30% charcoal border that goes full on hover, Remove as underlined text, and the line price on the right.

### Navigation
The lid's top edge.
- **Style:** A fixed 4rem bar, transparent over the lid until 24px of scroll, then solid (see Elevation & Depth). The wordmark sits left in the display face, Box Silver Ink, with CORE at 72%.
- **Links:** Archivo 0.875rem in Silver Lowlight. Hover and the section in view turn Silver Highlight, and the current link draws a 1px underline that grows from the left over 300ms.
- **Cart:** The box icon with a mono count, labelled with the item count for screen readers.
- **Mobile:** The cart and a 44px menu toggle. The menu opens a Lid Shadow panel of uppercase display-face links in 48px rows. Escape closes it and returns focus to the toggle.
- **Skip link:** Label voice on a Silver Highlight fill with charcoal type, sliding in at the top-left on focus.

### Footer and credit band
The bottom flap.
- A Lid Shadow field under a score line holds the wordmark, one line of description, an On this page list and the © line. Links are Silver and go Silver Highlight with an underline on hover.
- The C4 Studios credit band follows on every page, also Lid Shadow, in white type. The badge prints at 50% opacity, which measures 5.18:1 there. This is the only white type in the system.

### The live print (signature)
The lid's line drawing, printing in front of the visitor.
- **Poster first:** First paint is a pre-rendered frame of the same scene at 83.3% of the print's height: both legs standing, the top bar a third closed. A 2000×1000 wide poster serves from 768px and a 1200×900 tall one serves phones, loaded eagerly at high priority. Once the canvas has drawn its second frame, the poster fades out and the canvas fades in over 300ms on a matching frame.
- **Scene:** A transparent canvas on the lid. The build plate is a 24-division grid in two lid blues (#3d4253 and #2c303d). The kit is white wireframe at 55% opacity, and the stainless bolts and washers read warmer (#d8d1c4 at 60%). The nozzle is a silver wireframe heater block and cone with an orange tip.
- **Sequence:** From the poster frame the last layers print in about 4 seconds; a full print runs 12 seconds and slows as it nears the top. The hot layer is a Signal Orange outline traced at the current height, with the nozzle running along it, while the readout counts up from 85%. At the top the wireframe flashes Signal Orange and cools to white over 1.2 seconds, settling at 65% opacity, and the readout says Printed. Screen readers hear "The print has finished."
- **Turntable:** The kit turns slowly from the first frame, through the print and after it, at 0.06 radians a second (about one turn every 105 seconds). It stops while the visitor drags, while a part is open, and when they press pause. Camera distance follows a fit table, so the whole kit stays in frame at every angle. Zoom runs from 1× to 1.8× in 0.2 steps. Drag-to-turn is for mouse and trackpad only; on touch the page keeps scrolling and dots open on tap.
- **Part dots:** An orange sphere on each part pulses gently (±18%) and grows to 1.45× when its part is open. Each has a larger invisible hit target, and a part that hasn't printed yet can't be opened. Hover previews a part on fine pointers, and a click pins it.
- **Readout and controls:** Top-left in the label voice: Printing with a mono percentage, then Printed, over a mono line of print settings (PETG/ASA · 0.2 mm layers · 245 °C). Top-right: Reprint (from the empty plate), pause or turn, zoom out and zoom in, as 40px icon buttons in Silver Lowlight that brighten on hover and fade to 35% when disabled.
- **Fallbacks:** Without WebGL the poster stays and the readout says Print preview. If WebGL fails after mounting, an error boundary keeps the poster. Rendering stops while the stage is off screen.
- **Reduced motion:** The print opens finished and holds still. There is no flash, no turntable and no dot pulse, and the pause control is removed. Reprint still replays the print on request, without the flash.

**The One Moment Rule.** The print is the only authored animation. Everything else is a state change: 160ms for buttons, about 300ms for fades, the nav underline and the drawer, and under half a second for a callout to draw. Nothing reveals on scroll, and nothing loops except the print and its dots.

### Part callout (signature)
A draughtsman's leader from a part to its label.
- **Leader:** A 1.5px Signal Orange elbow drawn in three strokes: 44px out from the dot (110ms), 34px up (from 90ms) and a 26px shelf into the card (from 180ms).
- **Card:** Lid Shadow at 95% with a 1px silver edge at 22% and a 2px Signal Orange top rule, up to 15rem wide. The part name is Lexend 600 at 0.75rem, uppercase, tracked 0.08em, in Silver Highlight. Under it a mono line in Signal Orange gives code, spec and quantity, then a short description in Archivo at 0.78rem in Silver. The card fades up 3px over 180ms, starting at 250ms.
- **Placement:** On the print the card flips to the dot's left when the dot is right of centre; on the tray it flips when the anchor is past 55% across. Below 640px callouts don't float. Their text prints under the print or under the tray photo instead.

### Tray spotlight (signature)
The real open box, lit one part at a time.
- The tray photo is a 16:10 crop of the open box from above. Choosing a part dims the photo with charcoal at 64% while a masked copy of the same photo brings that part back to full brightness, over 300ms.
- Hovering a product lights all its parts. Hovering or focusing a part line lights that part with the orange marker and its callout. A click pins the part to the address (#part-bolts), so it can be linked, and Back closes it.

### Cart drawer and slips
The packing slip that goes in the box.
- **Drawer:** Up to 27rem wide, sliding in from the right over 320ms on the shared ease (a fade under reduced motion) above the 70% charcoal scrim. A 2px charcoal rule closes the header (Your cart, with a mono item count) and opens the total. Focus moves to the close button, Tab stays inside, Escape closes, and focus returns to the opener.
- **Sheets:** /cart and Order confirmed are slips lying on the lid, 48rem and 36rem wide with 2.5rem side padding from 640px. They carry the same 2px rules, Total in the label voice and the total in the display face. Order confirmed draws its tick once over 0.6 seconds.
- **Empty:** "Nothing in the box yet", a line pointing back to the tray, and a button to see what's in the box.

### Icons and image fallback
- Icons are drawn for this site on a 20px grid with a single 1.5px stroke, square caps and mitred joins, in the current text colour. The cart is the Wooster box with its lid open.
- A missing product photo shows the box icon in Silver Lowlight on a Lid Charcoal tile. No stock photo stands in.

## Do's and Don'ts

### Do:
- **Do** set names, headings and prices in Lexend semibold uppercase: Box Silver Ink on charcoal, Lid Charcoal on kraft and the slip.
- **Do** use the Silver button on charcoal and the Ink button on kraft and the slip. A second action is a Line button or an underlined link.
- **Do** keep every word on kraft at full-strength Lid Charcoal, and switch the focus ring to charcoal on kraft and the slip.
- **Do** print codes, counts and readings in Martian Mono with tabular numerals.
- **Do** lay lists on rules: 2px charcoal to open a list or mark a slip's header and total, 1px lines between rows.
- **Do** tint a shadow to the surface it falls on, and only where one material lies on another.
- **Do** open the print on its poster frame, and give reduced motion a finished, still print.
- **Do** lead every Add to cart with the box icon, and show the box icon on charcoal where a product photo is missing.

### Don't:
- **Don't** fill a button or a surface with Signal Orange, and don't set a heading or a sentence in it.
- **Don't** use orange on kraft or the slip; it measures 1.05:1 on kraft.
- **Don't** build cards or tiles with their own fill, border or shadow. Lists sit on rules.
- **Don't** round anything except buttons (2px) and the round part marks.
- **Don't** texture the material fields. The flute pattern and the kraft noise were removed because they read as imitation board.
- **Don't** add a second authored animation. Nothing reveals on scroll and nothing lifts on hover.
- **Don't** set pure white type outside the C4 credit band.
- **Don't** build on the declared but unused tokens (kraft-deep, kraft-hi, foam, foam-hi, signal-deep, steel). signal-deep in particular would invite an orange hover state.
