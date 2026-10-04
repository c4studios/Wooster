import Link from "next/link";

/**
 * The bottom flap. The old newsletter form showed "You're on the list"
 * without sending anything, and the company links pointed at "#"; both are
 * gone until there is something real behind them. Arty Design's email and
 * Instagram are left out until they are verified.
 */
export function Footer() {
  return (
    <footer className="border-t border-lid-line bg-lid-deep">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-7">
          <Link
            href="/"
            className="type-wide text-[1.4rem] font-extrabold uppercase leading-none text-silver-hi"
          >
            Wooster <span className="text-[0.7em] text-silver">Core</span>
          </Link>
          <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-silver">
            A 3D-printed kitesurfing handle for big air. Engineered by Arty Design.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-5">
          <h2 className="type-label text-[0.6875rem] text-silver-lo">On this page</h2>
          <ul className="mt-3 space-y-1">
            {[
              ["#print", "The print"],
              ["#kit", "In the box"],
              ["#specs", "Specs"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-9 items-center text-[0.9375rem] text-silver hover:text-silver-hi hover:underline">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/cart" className="inline-flex min-h-9 items-center text-[0.9375rem] text-silver hover:text-silver-hi hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-[0.8125rem] text-silver-lo md:col-span-12">
          © {new Date().getFullYear()} Arty Design. Prices in AUD.
        </p>
      </div>
    </footer>
  );
}
