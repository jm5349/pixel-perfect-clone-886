import React from 'react';
import { MapPin, Shield, Headphones, Truck } from 'lucide-react';

const BusinessInfo = () => {
  const businessInfo = [
    {
      label: 'Local Business',
      value: 'City of Industry, CA',
      icon: MapPin
    },
    {
      label: 'Warranty',
      value: '1 Year Guarantee',
      icon: Shield
    },
    {
      label: 'Support',
      value: 'US-Based Customer Service',
      icon: Headphones
    },
    {
      label: 'Fast Shipping',
      value: 'Same Day or Next Day Shipping',
      icon: Truck
    }
  ];

  return (
    <section className="bg-background border-b border-border py-6 lg:py-8 py-4">
      <div className="w-full max-w-none px-8 lg:px-8 px-4">
        {/* Desktop Business Info */}
        <div className="hidden lg:flex justify-center items-center space-x-8">
          {businessInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div key={index} className="flex items-center space-x-3 px-6 py-4 bg-card border-l-2 border-primary 
                                         hover:bg-card/80 transition-all duration-200 group">
                <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    {info.label}
                  </div>
                  <div className="text-sm font-semibold text-foreground leading-tight">
                    {info.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Business Info */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {businessInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="flex items-start space-x-2 px-2 py-2 bg-card border-l-2 border-primary">
                  <IconComponent className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium leading-tight">
                      {info.label}
                    </div>
                    <div className="text-xs font-semibold text-foreground leading-tight mt-0.5">
                      {info.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;