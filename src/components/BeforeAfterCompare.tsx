import React, { useCallback, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, ShoppingBag } from "lucide-react";
interface Hotspot {
  id: string;
  x: number; // 0-100 (% from left)
  y: number; // 0-100 (% from top)
  title: string;
  price?: string;
  handle?: string; // /products/:handle
  imageSrc?: string;
  description?: string;
}

interface BeforeAfterCompareProps {
  beforeSrc: string;
  afterSrc: string;
  title?: string;
  description?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  hotspots?: Hotspot[];
  shopLabel?: string;
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
  afterAlt = "After image",
  hotspots = [],
  shopLabel = "Shop the look"
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
const [position, setPosition] = useState(50); // percent
  const [active, setActive] = useState<Hotspot | null>(null);
  const [open, setOpen] = useState(false);

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
        {/* Hotspots overlay (After side only) */}
        {hotspots.length > 0 && (
          <div
            className="absolute inset-0"
            style={{ width: `${position}%` }}
            aria-label={shopLabel}
          >
            {/* Label */}
            <span className="pointer-events-none absolute bottom-3 right-3 text-[11px] md:text-xs px-2 py-1 rounded bg-background/80 border border-border text-muted-foreground">
              {shopLabel}
            </span>
            {/* Pins */}
            {hotspots.map(h => (
              <button
                key={h.id}
                type="button"
                onClick={() => { setActive(h); setOpen(true); }}
                aria-label={`Shop ${h.title}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto grid place-items-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground shadow-sm border border-primary/40 hover:opacity-90 transition"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <Plus className="w-4 h-4" />
              </button>
            ))}
          </div>
        )}

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

        {/* Shop the look dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                {active?.title || "Selected product"}
              </DialogTitle>
              {active?.description && (
                <DialogDescription>{active.description}</DialogDescription>
              )}
            </DialogHeader>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <div className="w-full aspect-square overflow-hidden rounded border border-border bg-muted/30">
                  <img
                    src={active?.imageSrc || afterSrc}
                    alt={active?.title || "Product image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-span-2 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{active?.price || ""}</p>
                </div>
                <div className="mt-3 flex gap-2">
                  {active?.handle ? (
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link to={`/products/${active.handle}`}>View & Buy</Link>
                    </Button>
                  ) : null}
                  <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BeforeAfterCompare;
