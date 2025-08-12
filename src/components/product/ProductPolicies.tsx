import React from "react";
import { Card } from "@/components/ui/card";

export default function ProductPolicies() {
  return (
    <section aria-label="Shipping, returns, and warranty" className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 bg-card border-border">
          <h3 className="mb-2 text-base font-medium text-foreground">Shipping</h3>
          <p className="text-sm text-muted-foreground">
            In-stock items usually ship within 24–48 hours. Large body parts may ship in multiple boxes or via freight. You’ll receive a tracking link once your order is dispatched.
          </p>
        </Card>
        <Card className="p-5 bg-card border-border">
          <h3 className="mb-2 text-base font-medium text-foreground">Returns</h3>
          <p className="text-sm text-muted-foreground">
            Returns are accepted on unused, uninstalled items in original packaging within 14 days of delivery. Custom-finished items may be final sale. Please contact support before returning.
          </p>
        </Card>
        <Card className="p-5 bg-card border-border">
          <h3 className="mb-2 text-base font-medium text-foreground">Warranty & Disclaimer</h3>
          <p className="text-sm text-muted-foreground">
            Covered against manufacturing defects. Slight color variations may occur across batches. Always test-fit before paint or film application—mounted or modified items are not eligible for return.
          </p>
        </Card>
      </div>
    </section>
  );
}
