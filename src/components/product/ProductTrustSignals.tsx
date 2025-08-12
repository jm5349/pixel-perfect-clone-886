import React from "react";
import { ShieldCheck, Truck, Wrench, BadgeCheck } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Professional Testing",
    desc: "Every product tested for perfect OEM integration",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    desc: "Worldwide delivery with tracking included",
  },
  {
    icon: Wrench,
    title: "Installation Guide",
    desc: "Step-by-step video tutorials available",
  },
  {
    icon: BadgeCheck,
    title: "Lifetime Support",
    desc: "Ongoing technical assistance from our experts",
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
