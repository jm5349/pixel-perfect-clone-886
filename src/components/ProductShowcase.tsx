import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const ProductShowcase = () => {
  const products = [{
    title: "BMW G90 M5 Carbon Fiber Front Lip",
    brand: "ADRO Inc",
    price: "$1,850.00",
    status: "Pre-order",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true
  }, {
    title: "BMW G90 M5 Carbon Fiber Rear Diffuser",
    brand: "ADRO Inc",
    price: "$2,450.00",
    status: "Pre-order",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true
  }, {
    title: "BMW G90 M5 Carbon Fiber Side Skirts",
    brand: "ADRO Inc",
    price: "$1,950.00",
    status: "Pre-order",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true
  }, {
    title: "BMW G90 M5 Carbon Fiber Trunk Spoiler",
    brand: "ADRO Inc",
    price: "$950.00",
    status: "Pre-order",
    image: "https://images.unsplash.com/photo-1617654112329-d9a11d7faa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    isNew: true
  }];
  return <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-automotive text-foreground mb-4 tracking-tight">
            New Release Section
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Built to Perform, Designed to Impress
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => <Card key={index} className="group bg-background border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
                {product.isNew && <Badge className="absolute top-4 left-4 bg-automotive-red text-white">
                    NEW
                  </Badge>}
                <Badge variant="secondary" className="absolute top-4 right-4 bg-primary/10 text-primary border-primary/20">
                  {product.status}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Vendor: <span className="text-primary">{product.brand}</span>
                </p>
                <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {product.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-automotive text-primary">
                    {product.price}
                  </span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    View
                  </Button>
                </div>
              </div>
            </Card>)}
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