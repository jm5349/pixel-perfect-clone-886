import React from 'react';
import { Button } from '@/components/ui/button';
import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product ID - showing only one product
  const featuredProductIds = [
    '9928841036069' // Your Toyota Camry front lip splitter
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

        {/* Single Product Display */}
        <div className="flex justify-center max-w-7xl mx-auto">
          <div className="group bg-background border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-lg w-full max-w-sm">
            <ShopifyBuyButton 
              productId="9928841036069" 
              className="shopify-product-card w-full h-full p-4"
            />
          </div>
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