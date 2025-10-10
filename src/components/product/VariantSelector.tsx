import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

interface VariantSelectorProps {
  variants: ShopifyProduct["variants"];
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
}

const getColorFromVariantTitle = (title: string): string | null => {
  const lowerTitle = title.toLowerCase();
  const colorMap: Record<string, string> = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#DC2626',
    'blue': '#2563EB',
    'green': '#16A34A',
    'yellow': '#EAB308',
    'silver': '#C0C0C0',
    'gray': '#6B7280',
    'grey': '#6B7280',
    'orange': '#EA580C',
    'purple': '#9333EA',
    'pink': '#EC4899',
    'brown': '#92400E',
    'gold': '#D97706',
  };

  for (const [colorName, colorCode] of Object.entries(colorMap)) {
    if (lowerTitle.includes(colorName)) {
      return colorCode;
    }
  }
  return null;
};

export default function VariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  if (!variants || variants.length <= 1) return null;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">
        Select Variant
      </Label>
      
      <RadioGroup
        value={selectedVariantId}
        onValueChange={onVariantChange}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {variants.map((variant) => {
          const color = getColorFromVariantTitle(variant.title);
          const isSelected = variant.id === selectedVariantId;
          const isAvailable = variant.available;

          return (
            <div key={variant.id} className="relative">
              <RadioGroupItem
                value={variant.id}
                id={variant.id}
                className="peer sr-only"
                disabled={!isAvailable}
              />
              <Label
                htmlFor={variant.id}
                className={`
                  flex flex-col items-start gap-2 rounded-lg border-2 p-3 cursor-pointer
                  transition-all duration-200
                  ${isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-card hover:border-primary/50 hover:bg-card/80'
                  }
                  ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                  peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2
                `}
              >
                {/* Variant Title and Color Swatch */}
                <div className="flex items-center gap-2 w-full">
                  {color && (
                    <div
                      className="w-5 h-5 rounded-full border-2 border-border shadow-sm flex-shrink-0"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground truncate flex-1">
                    {variant.title}
                  </span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold text-primary">
                    ${variant.price.amount}
                  </span>
                  {!isAvailable && (
                    <span className="text-xs text-destructive font-medium">
                      Out of stock
                    </span>
                  )}
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
