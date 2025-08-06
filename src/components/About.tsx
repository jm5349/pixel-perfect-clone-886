import React from 'react';
import { Button } from '@/components/ui/button';
const About = () => {
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Image */}
          <div className="mb-16">
            
          </div>

          {/* Company Title */}
          <h2 className="text-4xl md:text-5xl font-automotive text-foreground mb-8 tracking-tight">
            Eterna Motorworks
          </h2>

          {/* Main Description */}
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed mb-8">
            <p className="text-xl mb-6">
              Eterna Motorworks is more than a brand, it's the standard in premium aftermarket automotive parts and services. With over a decade of hands-on experience in the automotive industry, we've earned the trust of thousands of car enthusiasts and professional builders worldwide by delivering unmatched quality, precision fitment, and long-term credibility.
            </p>
            
            <p className="text-lg mb-6">
              We're built for those who expect more — more refinement, more presence, more purpose. Every product and service we provide reflects our relentless pursuit of excellence across the aftermarket space.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-automotive text-primary italic mb-8 border-l-4 border-primary pl-6">
            "We don't follow trends in car culture, we set them."
          </blockquote>

          {/* Closing Statement */}
          <p className="text-xl text-muted-foreground mb-8">
            If you're searching for a trusted partner to set your build apart — welcome to the team.
          </p>

          {/* CTA Button */}
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold tracking-wide shadow-glow transition-all duration-300 hover:shadow-glow hover:scale-105">
            JOIN THE TEAM
          </Button>
        </div>
      </div>
    </section>;
};
export default About;