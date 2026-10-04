"use client";

import C4FooterCredit from "@/components/c4-footer-credit/C4FooterCredit";

/**
 * Site-wide "Designed by C4 Studios" credit band.
 *
 * Wraps the portable {@link C4FooterCredit} badge (which uses client-only
 * hooks but ships without a `"use client"` directive) so it can be rendered
 * from the server-component root layout. The badge prints its label at 50%
 * opacity in the inherited colour, so the band sets white: about 5.1:1 on
 * lid-deep (silver-lo gave 2.4:1).
 */
export function C4Credit() {
  return (
    <div className="flex justify-center border-t border-lid-line bg-lid-deep px-6 py-8 text-white">
      <C4FooterCredit size={40} colorScheme="dark" />
    </div>
  );
}
