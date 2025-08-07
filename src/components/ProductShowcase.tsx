import React from 'react';
import { Button } from '@/components/ui/button';
import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product IDs
  const featuredProductIds = [
    '9928841036069', // Toyota Camry front lip splitter
    '9928832876837'  // Second product
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {featuredProductIds.map((productId, index) => (
            <div key={`${productId}-${index}`} className="group bg-background/50 border border-border/60 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-700 backdrop-blur-sm animate-fade-in hover-scale min-h-[500px] flex flex-col">
              <div className="bg-gradient-to-br from-background to-background/80 p-6 h-full flex flex-col">
                <ShopifyBuyButton 
                  productId={productId} 
                  className="shopify-product-card w-full h-full flex flex-col"
                />
              </div>
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