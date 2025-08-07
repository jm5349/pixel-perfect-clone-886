import React from 'react';

const BusinessInfo = () => {
  const businessInfo = [
    {
      label: 'Business Hours',
      value: 'Mon-Fri 8AM-6PM EST'
    },
    {
      label: 'Warranty',
      value: '2 Year Guarantee'
    },
    {
      label: 'Support',
      value: 'US-Based Customer Service'
    },
    {
      label: 'Shipping',
      value: 'Ship From US Warehouse'
    }
  ];

  return (
    <section className="bg-background border-b border-border py-6">
      <div className="w-full max-w-none px-6">
        {/* Desktop Business Info */}
        <div className="hidden lg:flex justify-center items-center space-x-6">
          {businessInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-card border-l-2 border-primary 
                                       hover:bg-card/80 transition-all duration-200 group">
              <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-110 transition-transform duration-200"></div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {info.label}
                </div>
                <div className="text-xs font-semibold text-foreground leading-tight">
                  {info.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Business Info */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            {businessInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-card border-l-2 border-primary">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                    {info.label}
                  </div>
                  <div className="text-xs font-semibold text-foreground leading-tight">
                    {info.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfo;