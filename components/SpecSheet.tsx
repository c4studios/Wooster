import Image from "next/image";

/**
 * The box's side panel. Every line is from the repo's original spec list and
 * 3D labels (approved by Caleb, 2 Oct 2026), with the hardware counts taken
 * from the product photos. Sources for the notes: "Every handle is printed to
 * exact specifications" and "complex geometries impossible with traditional
 * methods" are the original SpecsSection copy (pre-redesign commit d206cd7);
 * "printed in one piece" is its 3D label "monolithic frame".
 */
const SPECS: [string, string][] = [
  ["Construction", "3D printed"],
  ["Material", "PETG/ASA polymer"],
  ["Layer height", "0.2 mm"],
  ["Nozzle", "245 °C"],
  ["Hardware", "316 stainless steel"],
  ["Bolts", "M5×25, 4 per kit"],
  ["Washers", "M5, 4 per kit"],
  ["Finish", "Matte black"],
  ["WOO mount", "Integrated system"],
  ["Compatibility", "Universal kite bar"],
  ["Tested", "Real-world conditions"],
  ["Origin", "Engineered in Australia"],
];

export function SpecSheet() {
  return (
    <section id="specs" aria-labelledby="specs-title" className="material-lid border-t border-lid-line">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-x-12 gap-y-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <h2
            id="specs-title"
            className="type-wide text-[clamp(2rem,5vw,3.4rem)] font-semibold uppercase leading-[0.9] text-ink"
          >
            Specs
          </h2>
          <dl className="mt-8 border-t border-silver-lo/45">
            {SPECS.map(([term, value]) => (
              <div
                key={term}
                className="grid grid-cols-[minmax(8.5rem,40%)_1fr] gap-4 border-b border-lid-line py-2.5"
              >
                <dt className="type-label pt-0.5 text-[0.6875rem] text-silver-lo">{term}</dt>
                <dd className="text-[0.9375rem] text-silver-hi">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Evidence from the real parts, close up. */}
        <div className="grid grid-cols-6 content-start gap-x-4 gap-y-8 lg:col-span-7 lg:pt-[4.6rem]">
          <figure className="col-span-6">
            <div className="relative aspect-[700/170] overflow-hidden">
              <Image
                src="/images/macro-layers.jpg"
                alt="Close-up of the handle's top bar, showing fine horizontal print layers in black PETG."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <span className="type-label text-[0.6875rem] text-silver-hi">Actual print, 0.2 mm layers</span>
              <span className="max-w-[34rem] text-[0.9375rem] leading-relaxed text-silver">
                PETG/ASA is a high-impact polymer blend. It resists UV and chemicals, and it is made to
                handle salt water.
              </span>
            </figcaption>
          </figure>

          <figure className="col-span-3">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/macro-washers.jpg"
                alt="Four stainless washers, each stamped 316."
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <span className="type-label block text-[0.6875rem] text-silver-hi">316 stainless</span>
              <span className="mt-1 block text-[0.875rem] leading-relaxed text-silver">
                Marine-grade bolts and washers that resist corrosion. The washers carry the 316 stamp.
              </span>
            </figcaption>
          </figure>

          <figure className="col-span-3">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/macro-leg.jpg"
                alt="One leg of the handle, with the Wooster script logo raised in the print."
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover object-[50%_55%]"
              />
            </div>
            <figcaption className="mt-3">
              <span className="type-label block text-[0.6875rem] text-silver-hi">Printed in one piece</span>
              <span className="mt-1 block text-[0.875rem] leading-relaxed text-silver">
                Printing layer by layer allows shapes a mould can&apos;t make. Every handle is printed to
                exact specifications.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
