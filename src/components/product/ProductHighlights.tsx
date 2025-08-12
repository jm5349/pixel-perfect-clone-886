import React from "react";
import type { ShopifyProduct } from "@/lib/shopify";
import { Card } from "@/components/ui/card";
interface Props {
  product: ShopifyProduct;
}
export default function ProductHighlights({
  product
}: Props) {
  const title = product?.title || "This product";
  const vendor = product?.vendor || "our shop";
  return <section aria-label="Highlights and what's included" className="mt-8">
      <h2 className="sr-only">Highlights</h2>
      
    </section>;
}