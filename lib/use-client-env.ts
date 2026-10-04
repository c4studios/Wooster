"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Browser facts read through useSyncExternalStore, so the server render and
 * hydration agree (every value is false on the server) without setting state
 * inside an effect.
 */

const noSubscribe = () => () => {};

/** True once rendering in the browser; false during the server render. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false
  );
}

/** Live result of a media query; false on the server. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

let webglSupport: boolean | null = null;

function detectWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Whether this browser can create a WebGL context; false on the server. */
export function useWebGLSupport(): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => (webglSupport ??= detectWebGL()),
    () => false
  );
}
