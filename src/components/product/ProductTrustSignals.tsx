import React from "react";
import { DollarSign, Truck, Wrench, BadgeCheck, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    icon: DollarSign,
    title: "Reasonable Pricing",
    desc: "Competitive prices on premium quality parts",
  },
  {
    icon: ShieldCheck,
    title: "Money Back Guarantee",
    desc: "30 day return policy for your peace of mind",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "In-stock items ship within 24-48 hours",
  },
  {
    icon: BadgeCheck,
    title: "Premium Material",
    desc: "High-quality construction for lasting durability",
  },
];

export default function ProductTrustSignals() {
  return (
    <section aria-label="Trust and guarantees" className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {trustItems.map(({ icon: Icon, title, desc }, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
          >
            <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
