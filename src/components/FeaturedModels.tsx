import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeaturedModels = () => {
  const models = [
    {
      title: "G8X M3 M4",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Latest generation BMW M3/M4 performance parts"
    },
    {
      title: "G87 M2", 
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "High-performance components for the new M2"
    },
    {
      title: "F8X M3 M4",
      image: "https://images.unsplash.com/photo-1617654112329-d9a11d7faa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      description: "Premium upgrades for F80/F82/F83 models"
    },
    {
      title: "F87 M2",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Performance enhancements for first-gen M2"
    },
    {
      title: "TESLA",
      image: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Electric performance and aesthetic modifications"
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-automotive text-foreground mb-4 tracking-tight">
            DISCOVER FEATURED MODELS
          </h2>
          <p className="text-xl text-muted-foreground">
            Premium parts for your specific vehicle platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {models.map((model, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer h-96"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={model.image}
                  alt={model.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="text-xl font-automotive text-foreground mb-2 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {model.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {model.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                >
                  View Parts
                </Button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;