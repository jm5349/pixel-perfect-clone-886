import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product IDs
  const featuredProductIds = ['9928841036069',
  // Toyota Camry front lip splitter
  '9928832876837' // Second product
  ];
  return <section className="relative py-24 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="inline-block w-2 h-2 rounded-full bg-primary" aria-label="Featured products"></span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-automotive text-foreground mb-6 tracking-tight leading-tight">
            NEW PRODUCT 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              RELEASE
            </span>
          </h2>
          
          
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <div className="relative">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 h-full">
              {Array.from({
              length: 8
            }).map((_, i) => <div key={i} className="border-l border-primary/20"></div>)}
            </div>
          </div>
          
          <div className="relative grid grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 max-w-3xl mx-auto">
            {featuredProductIds.map((productId, index) => <div key={`${productId}-${index}`} className="group relative">
                {/* Product Number Badge */}
                <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Main Product Card */}
                <div className="relative bg-gradient-card backdrop-blur-xl border border-border/30 rounded-2xl overflow-hidden hover:border-primary/60 transition-premium shadow-automotive hover:shadow-glow min-h-[500px] flex flex-col">
                  {/* Enhanced Automotive Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-premium"></div>
                  
                  {/* Premium accent lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Shopify Buy Button Integration */}
                    <ShopifyBuyButton productId={productId} className="w-full flex-1 min-h-[400px]" />
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-24">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl"></div>
            <Button size="lg" className="relative bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white px-12 py-6 text-lg font-bold tracking-wider shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-2 border-primary/20 hover:border-primary/40">
              <span className="flex items-center gap-3">
                VIEW ALL PRODUCTS
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};


export default ProductShowcase;