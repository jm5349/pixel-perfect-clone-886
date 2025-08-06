import React from 'react';
import { Card } from '@/components/ui/card';
import aestheticsImage from '@/assets/aesthetics-category.jpg';
import performanceImage from '@/assets/performance-category.jpg';
import wheelsImage from '@/assets/wheels-category.jpg';
import accessoriesImage from '@/assets/accessories-category.jpg';

const Categories = () => {
  const categories = [
    {
      title: "BODY KIT",
      image: aestheticsImage,
      description: "Premium body kits, carbon fiber components, and aesthetic enhancements",
    },
    {
      title: "PERFORMANCE",
      image: performanceImage,
      description: "Turbochargers, exhaust systems, and performance upgrades",
    },
    {
      title: "WHEELS",
      image: wheelsImage,
      description: "Luxury wheels, rims, and high-performance tire solutions",
    },
    {
      title: "ACCESSORIES",
      image: accessoriesImage,
      description: "Premium tools, lighting, and interior accessories",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-automotive text-foreground mb-4 tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of automotive enhancements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer h-80"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-3xl font-automotive text-foreground mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <div className="w-12 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;