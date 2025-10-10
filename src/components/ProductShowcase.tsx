import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ShopifyProductCard from './ShopifyProduct';
const ProductShowcase = () => {
  // Your actual Shopify product IDs
  const featuredProductIds = [
    '9928328249637', // First product  
    '9928841036069', // Second product (verified working)
    '9947187478821', // New product
    '10029639172389', // New product requested by user
    '10029639368997', // Additional product
    '9928328249637', // First product (repeated for demo)
    '9928841036069', // Second product (repeated for demo)
    '9947187478821', // Third product (repeated for demo)
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
                    <div className="px-1">
                      <ShopifyProductCard productId={productId} />
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Horizontal Scroll View */}
        <div className="relative hidden md:block">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 h-full">
              {Array.from({
              length: 8
            }).map((_, i) => <div key={i} className="border-l border-primary/20"></div>)}
            </div>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex space-x-6 p-4">
              {featuredProductIds.map((productId, index) => (
                <div key={`${productId}-${index}`} className="flex-none w-72">
                  <ShopifyProductCard productId={productId} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
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