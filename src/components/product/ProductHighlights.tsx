import React from "react";
import type { ShopifyProduct } from "@/lib/shopify";
import { Card } from "@/components/ui/card";

interface Props {
  product: ShopifyProduct;
}

export default function ProductHighlights({ product }: Props) {
  const title = product?.title || "This product";
  const vendor = product?.vendor || "our shop";

  return (
    <section aria-label="Highlights and what's included" className="mt-8">
      <h2 className="sr-only">Highlights</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 bg-card border-border">
          <h3 className="mb-3 text-base font-medium text-foreground">Key Highlights</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Model-specific aero styling for a clean, aggressive look</li>
            <li>Durable ABS/FRP or carbon fiber construction for daily use</li>
            <li>Paint-matched or two-tone finish options (when available)</li>
            <li>Pre-drilled mounting points for straightforward install</li>
            <li>Engineered for stability at highway speeds</li>
          </ul>
        </Card>

        <Card className="p-5 bg-card border-border">
          <h3 className="mb-3 text-base font-medium text-foreground">What's in the Box</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{title} main piece</li>
            <li>Hardware kit and fasteners (when applicable)</li>
            <li>Installation guide or QR code for instructions</li>
            <li>Protective packaging for safe delivery</li>
          </ul>
        </Card>

        <Card className="p-5 bg-card border-border">
          <h3 className="mb-3 text-base font-medium text-foreground">Install & Fitment</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Recommended: professional install or experienced DIY</li>
            <li>Test-fit prior to paint/film installation</li>
            <li>Minor adjustments may be needed depending on vehicle tolerances</li>
            <li>Contact {vendor} support for fitment questions</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
