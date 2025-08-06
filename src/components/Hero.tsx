import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-car.jpg';

const Hero = () => {
  const features = [
    {
      title: "FREE USA SHIPPING",
      subtitle: "On set items",
    },
    {
      title: "EASY FINANCING", 
      subtitle: "Apply at checkout",
    },
    {
      title: "REPUTABLE SOURCE",
      subtitle: "Leading brands",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Premium BMW M4 with carbon fiber aero"
          className="w-full h-full object-cover"
        />
        
        
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-automotive text-foreground mb-6 tracking-tight">
              PREMIUM
              <span className="block text-primary">AUTOMOTIVE</span>
              <span className="block">EXCELLENCE</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Eterna Motorworks - Where performance meets precision in every component
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold tracking-wide shadow-glow transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              EXPLORE COLLECTION
            </Button>
          </div>

          {/* Features Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-card/80 backdrop-blur-md rounded-2xl p-8 border border-border shadow-automotive">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-automotive text-foreground mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;