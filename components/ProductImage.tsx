"use client";

import Image from "next/image";
import { useState } from "react";
import { BoxIcon } from "./icons";

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  /** Icon-only fallback for small containers (cart thumbnails etc.) */
  compactFallback?: boolean;
}

/** next/image with an honest fallback: the box icon, never a stock picture. */
export function ProductImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  compactFallback,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-lid text-silver-lo ${fill ? "absolute inset-0" : ""} ${className ?? ""}`}
        style={!fill ? { width, height } : undefined}
      >
        <BoxIcon size={compactFallback ? 22 : 40} />
        {!compactFallback && <span className="sr-only">No photo yet</span>}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
