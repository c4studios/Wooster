/**
 * Icons drawn for this site: one 1.5px stroke, square caps, 20px grid.
 * The cart is the Wooster box, lid open.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const BoxIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 8h14v9H3z" />
    <path d="M3 8l2.5-4h9L17 8" />
    <path d="M8 11h4" />
  </Svg>
);

export const ReprintIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16 10a6 6 0 1 1-1.8-4.3" />
    <path d="M16 3.5v3.2h-3.2" />
  </Svg>
);

export const PauseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 5v10M13 5v10" />
  </Svg>
);

export const TurnIcon = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="10" cy="10" rx="7" ry="3" />
    <path d="M14.5 5.8l2.5 1.7-2.4 1.9" />
  </Svg>
);

export const MinusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 10h10" />
  </Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 10h10M10 5v10" />
  </Svg>
);

export const ArrowDownIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 3.5v12M5.5 11l4.5 4.5 4.5-4.5" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 10h12M11 5.5l4.5 4.5-4.5 4.5" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 5l10 10M15 5L5 15" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7h14M3 13h14" />
  </Svg>
);

export const InstagramIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="14" height="14" rx="4" />
    <circle cx="10" cy="10" r="3.2" />
    <path d="M14.2 5.8h.01" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 5h14v10H3z" />
    <path d="M3 5l7 6 7-6" />
  </Svg>
);
