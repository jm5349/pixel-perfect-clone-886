import React from 'react';
import { Button } from '@/components/ui/button';
import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product IDs - replace with your product IDs
  const featuredProductIds = [
    '9928841036069', // Your current product ID
    '9928841036069', // Duplicate for demo - replace with other product IDs
    '9928841036069', // Replace with actual product IDs
    '9928841036069'  // Replace with actual product IDs
  ];
  return <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          
          <h2 className="text-3xl md:text-6xl font-automotive text-foreground mb-3 md:mb-4 tracking-tight">
            NEW PRODUCT RELEASE
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
            Built to Perform, Designed to Impress
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
          {featuredProductIds.map((productId, index) => (
            <div key={`${productId}-${index}`} className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-500 min-h-[400px] flex flex-col">
              <ShopifyBuyButton 
                productId={productId} 
                className="flex-1 flex flex-col justify-between"
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold tracking-wide shadow-glow transition-all duration-300 hover:shadow-glow hover:scale-105">
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </div>
    </section>;
};
export default ProductShowcase;