import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BespokeServices = () => {
  const services = [
    {
      icon: "🔧",
      title: "Custom Fabrication",
      description: "Bespoke parts designed and manufactured to your exact specifications"
    },
    {
      icon: "🎨", 
      title: "Paint & Wrapping",
      description: "Professional paint work and premium vinyl wrapping services"
    },
    {
      icon: "⚡",
      title: "Performance Tuning", 
      description: "ECU tuning and performance optimization for maximum power"
    },
    {
      icon: "🛠️",
      title: "Installation Services",
      description: "Expert installation by certified automotive technicians"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Professional automotive customization workspace"
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-automotive"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-2xl"></div>
          </div>

          {/* Right Column - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-automotive text-foreground mb-6 tracking-tight">
              BESPOKE
              <span className="block text-primary">SERVICES</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your premier source for automotive customization solutions. From concept to completion, we bring your vision to life with precision craftsmanship and attention to detail.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {services.map((service, index) => (
                <Card key={index} className="p-6 bg-background/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-automotive text-foreground mb-2 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold tracking-wide shadow-glow transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              GET A QUOTE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BespokeServices;