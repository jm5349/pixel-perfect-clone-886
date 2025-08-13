import React, { useCallback, useRef, useState } from "react";

interface BeforeAfterCompareProps {
  beforeSrc: string;
  afterSrc: string;
  title?: string;
  description?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

const clamp = (val: number, min = 0, max = 100) => Math.min(max, Math.max(min, val));

const BeforeAfterCompare: React.FC<BeforeAfterCompareProps> = ({
  beforeSrc,
  afterSrc,
  title = "Before & After",
  description = "Drag the handle to compare the original vehicle with the upgraded look.",
  beforeLabel = "Before",
  afterLabel = "After",
  beforeAlt = "Before image",
  afterAlt = "After image"
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50); // percent

  const handlePointer = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = clamp((x / rect.width) * 100);
    setPosition(percent);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPosition(p => clamp(p - step));
    if (e.key === "ArrowRight") setPosition(p => clamp(p + step));
  };

  return (
    <section aria-label="Before and after comparison" className="w-full">
      <header className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground mt-2">{description}</p>
        )}
      </header>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg border border-border bg-card select-none"
        onPointerDown={handlePointer}
        onPointerMove={e => {
          if ((e.buttons & 1) === 1) handlePointer(e);
        }}
      >
        {/* Base (Before) */}
        <img
          src={beforeSrc}
          alt={beforeAlt}
          loading="lazy"
          className="block w-full h-[260px] md:h-[420px] object-cover"
        />

        {/* Overlay (After) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ width: `${position}%` }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            loading="lazy"
            className="block w-full h-full object-cover"
          />
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 text-xs md:text-sm px-2 py-1 rounded bg-background/80 border border-border text-foreground">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 text-xs md:text-sm px-2 py-1 rounded bg-background/80 border border-border text-foreground">
          {afterLabel}
        </span>

        {/* Divider + Handle */}
        <div
          className="absolute inset-y-0"
          style={{ left: `calc(${position}% - 1px)` }}
        >
          <div className="absolute inset-y-0 w-0.5 bg-border" />
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-background/90 border border-border shadow-sm" />
        </div>

        {/* Accessible slider */}
        <input
          type="range"
          aria-label="Comparison slider"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(clamp(Number(e.target.value)))}
          onKeyDown={onKeyDown}
          className="absolute inset-x-0 bottom-3 mx-auto w-[60%] h-1 appearance-none bg-border/70 rounded outline-none cursor-ew-resize [--thumb-size:20px] md:[--thumb-size:24px]"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${position}%, transparent ${position}%)`
          }}
        />
      </div>
    </section>
  );
};

export default BeforeAfterCompare;
