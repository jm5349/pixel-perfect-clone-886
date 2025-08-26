import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product IDs
  const featuredProductIds = [
    '9928328249637', // First product  
    '9928841036069', // Second product (verified working)
    '9947187478821'  // New product
  ];
  return <section className="relative py-16 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="inline-block w-2 h-2 rounded-full bg-primary" aria-label="Featured products"></span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-automotive text-foreground mb-6 tracking-tight leading-tight">
            NEW PRODUCT 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              RELEASE
            </span>
          </h2>
          
          
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>

        {/* Mobile Carousel View */}
        <div className="relative md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {featuredProductIds.map((productId, index) => (
                <CarouselItem key={`${productId}-${index}`}>
                  <div className="group relative">
                    {/* Product Number Badge */}
                    <div className="absolute -top-3 -left-3 z-10 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Main Product Card */}
                    <div className="relative bg-gradient-card backdrop-blur-xl border border-border/30 rounded-xl overflow-hidden hover:border-primary/60 transition-premium shadow-automotive hover:shadow-glow min-h-[350px] flex flex-col">
                      {/* Enhanced Automotive Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-premium"></div>
                      
                      {/* Premium accent lines */}
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      
                      {/* Content Container */}
                      <div className="relative z-10 p-4 h-full flex flex-col">
                        {/* Shopify Buy Button Integration */}
                        <ShopifyBuyButton productId={productId} className="w-full flex-1 min-h-[280px]" />
                      </div>
                      
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid View */}
        <div className="relative hidden md:block">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 h-full">
              {Array.from({
              length: 8
            }).map((_, i) => <div key={i} className="border-l border-primary/20"></div>)}
            </div>
          </div>
          
          <div className="relative grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-16 max-w-3xl mx-auto">
            {featuredProductIds.map((productId, index) => <div key={`${productId}-${index}`} className="group relative">
                {/* Product Number Badge */}
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 z-10 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-lg shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Main Product Card */}
                <div className="relative bg-gradient-card backdrop-blur-xl border border-border/30 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/60 transition-premium shadow-automotive hover:shadow-glow min-h-[300px] md:min-h-[420px] flex flex-col">
                  {/* Enhanced Automotive Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-premium"></div>
                  
                  {/* Premium accent lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 p-4 md:p-6 h-full flex flex-col">
                    {/* Shopify Buy Button Integration */}
                    <ShopifyBuyButton productId={productId} className="w-full flex-1 min-h-[240px] md:min-h-[340px]" />
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl"></div>
            <Button size="lg" className="relative bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white px-10 py-5 text-base font-bold tracking-wider shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-2 border-primary/20 hover:border-primary/40">
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