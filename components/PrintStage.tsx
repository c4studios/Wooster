"use client";

import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import { PARTS, PART_ORDER, type PartId } from "@/lib/parts";
import { MinusIcon, PauseIcon, PlusIcon, ReprintIcon, TurnIcon } from "./icons";

const PrintAnimation3D = dynamic(() => import("./PrintAnimation3D"), {
  ssr: false,
  loading: () => null,
});

/**
 * The poster frames are the canvas's opening frame, rendered ahead of time
 * from the same scene so first paint is never an empty bed and the hand-off to
 * WebGL lands on an identical frame. To regenerate after changing the model or
 * camera: render <PrintAnimation3D posterCapture /> in a 2000x1000 and a
 * 1200x900 box, then save each canvas with toDataURL("image/png") as
 * public/images/print-poster-wide.png and print-poster-tall.png.
 */
const POSTER_ALT =
  "The Wooster Core kit printing in white wireframe on the print bed. The handle's legs are done and the top bar is part way up, with the mount, clips, bolts and washers around it.";

function posterSources() {
  const common = { alt: POSTER_ALT, sizes: "(min-width: 1024px) 86vw, 100vw" };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: "/images/print-poster-wide.png", width: 2000, height: 1000 });
  const {
    props: { srcSet: tall, ...rest },
  } = getImageProps({ ...common, src: "/images/print-poster-tall.png", width: 1200, height: 900 });
  return { wide, tall, rest };
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** If WebGL fails after mounting, the poster simply stays. */
class StageBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 1.8;

/**
 * The live print, laid out like the box lid: the drawing in the middle, the
 * printer's readout and controls across the top, the price and contents
 * bottom-left (`buy`), the maker's credit bottom-right (`credit`).
 */
export function PrintStage({ buy, credit }: { buy: ReactNode; credit: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [live, setLive] = useState(false); // WebGL available and mounted
  const [ready, setReady] = useState(false); // first frame drawn
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const [printKey, setPrintKey] = useState(0);
  const [active, setActive] = useState<PartId | null>(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState({ pct: 85, done: false });

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setLive(hasWebGL());
    setMounted(true);
  }, []);

  // Stop rendering while the stage is off screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onProgress = useCallback((pct: number, done: boolean) => setProgress({ pct, done }), []);
  const onFirstFrame = useCallback(() => setReady(true), []);

  const choose = useCallback((id: PartId | null, pin: boolean) => {
    setActive(id);
    setPinned(pin && id !== null);
  }, []);

  const reprint = () => {
    choose(null, false);
    setPrintKey((k) => k + 1);
  };

  const { wide, rest } = posterSources();
  const printing = live && ready ? !progress.done : true;
  // Without WebGL the poster is a still: there is no live percentage to report.
  const still = mounted && !live;
  const activePart = active ? PARTS[active] : null;

  return (
    <div className="stage lid-grid">
      <figure className="a-stage w-full">
        <div ref={stageRef} className="relative -mx-4 aspect-[4/3] sm:mx-0 md:aspect-[2/1]">
          <picture>
            <source media="(min-width: 768px)" srcSet={wide} />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              {...rest}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
              style={{ opacity: ready ? 0 : 1 }}
            />
          </picture>

          {live && (
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: ready ? 1 : 0 }}
              aria-hidden="true"
            >
              <StageBoundary onError={() => setLive(false)}>
                <PrintAnimation3D
                  reducedMotion={reduced}
                  paused={paused}
                  zoom={zoom}
                  printKey={printKey}
                  activePart={active}
                  onActivePart={(id, pin) => {
                    if (!pin && pinned) return;
                    choose(id, pin);
                  }}
                  onProgress={onProgress}
                  onFirstFrame={onFirstFrame}
                  visible={visible}
                />
              </StageBoundary>
            </div>
          )}
        </div>
      </figure>

      {/* The printer's state prints itself in the lid's own type. */}
      <div className="a-readout knock">
        <p className="type-label text-[0.6875rem] text-silver-lo">
          {still ? (
            <span className="text-silver-hi">Print preview</span>
          ) : printing ? (
            <>
              Printing <span className="type-mono text-silver-hi">{progress.pct}%</span>
            </>
          ) : (
            <span className="text-silver-hi">Printed</span>
          )}
        </p>
        <p className="type-mono mt-1 text-[0.625rem] text-silver-lo md:text-[0.6875rem]">
          PETG/ASA · 0.2 mm layers · 245 °C
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {live && ready && progress.done ? "The print has finished." : ""}
      </p>

      <div className="a-controls flex items-center justify-end">
        {live && (
          <StageControls
            paused={paused}
            reduced={reduced}
            zoom={zoom}
            onReprint={reprint}
            onPause={() => setPaused((v) => !v)}
            onZoom={setZoom}
          />
        )}
      </div>

      <div className="a-buy knock">
        {buy}

        {/* Contents: the keyboard and touch route to every callout. */}
        <div className="mt-6 lg:mt-5">
          <p id="parts-hint" className="sr-only">
            Choose a part to mark it on the printed kit.
          </p>
          <ul
            className="-mx-2.5 flex flex-wrap lg:mx-0 lg:grid lg:w-[22rem] lg:grid-cols-2"
            aria-describedby="parts-hint"
            onMouseLeave={() => {
              if (!pinned) setActive(null);
            }}
          >
            {PART_ORDER.map((id) => {
              const part = PARTS[id];
              const on = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={on && pinned}
                    onClick={() => choose(on && pinned ? null : id, !(on && pinned))}
                    onMouseEnter={() => {
                      if (!pinned) setActive(id);
                    }}
                    onFocus={() => {
                      if (!pinned) setActive(id);
                    }}
                    onBlur={() => {
                      if (!pinned) setActive(null);
                    }}
                    className={`group inline-flex min-h-9 items-center gap-2 px-2.5 text-[0.8125rem] transition-colors lg:px-0 ${
                      on ? "text-silver-hi" : "text-silver-lo hover:text-silver"
                    }`}
                  >
                    <span
                      className={`block h-2 w-2 rounded-full transition-colors ${
                        on ? "bg-signal" : "bg-signal/50 group-hover:bg-signal/85"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="type-mono text-[0.6875rem]">{part.qty}×</span>
                    {part.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {/* On phones a floating callout would overflow, so its text prints here. */}
          <p className="mt-2 min-h-[2.8em] text-[0.8125rem] leading-snug text-silver sm:hidden" aria-live="polite">
            {activePart ? (
              <>
                <span className="type-mono text-[0.6875rem] text-signal">
                  {activePart.code}
                  {activePart.spec ? ` · ${activePart.spec}` : ""}
                </span>{" "}
                {activePart.description}
              </>
            ) : (
              <span className="text-silver-lo">Tap a part, or an orange dot on the print.</span>
            )}
          </p>
        </div>
      </div>

      <div className="a-credit knock">{credit}</div>
    </div>
  );
}

function StageControls({
  paused,
  reduced,
  zoom,
  onReprint,
  onPause,
  onZoom,
}: {
  paused: boolean;
  reduced: boolean;
  zoom: number;
  onReprint: () => void;
  onPause: () => void;
  onZoom: (z: number) => void;
}) {
  const btn =
    "inline-flex h-10 min-w-10 items-center justify-center gap-2 px-2.5 text-silver-lo transition-colors hover:text-silver-hi disabled:opacity-35 disabled:hover:text-silver-lo";
  return (
    <>
      <button type="button" className={btn} onClick={onReprint} aria-label="Reprint from the empty bed">
        <ReprintIcon />
        <span className="type-label hidden text-[0.6875rem] sm:inline" aria-hidden="true">
          Reprint
        </span>
      </button>
      {!reduced && (
        <button
          type="button"
          className={btn}
          onClick={onPause}
          aria-pressed={paused}
          aria-label={paused ? "Turn the print" : "Stop turning the print"}
        >
          {paused ? <TurnIcon /> : <PauseIcon />}
        </button>
      )}
      <button
        type="button"
        className={btn}
        onClick={() => onZoom(Math.max(ZOOM_MIN, Math.round((zoom - 0.2) * 10) / 10))}
        disabled={zoom <= ZOOM_MIN}
        aria-label="Zoom out"
      >
        <MinusIcon />
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => onZoom(Math.min(ZOOM_MAX, Math.round((zoom + 0.2) * 10) / 10))}
        disabled={zoom >= ZOOM_MAX}
        aria-label="Zoom in"
      >
        <PlusIcon />
      </button>
    </>
  );
}
