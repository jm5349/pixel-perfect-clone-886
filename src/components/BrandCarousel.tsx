import React from 'react';

const BrandCarousel = () => {
  const brands = [
    { name: 'ADRO', logo: 'ADRO' },
    { name: 'MV FORGED', logo: 'MV' },
    { name: 'TNEER', logo: 'TNEER' },
    { name: 'VORSTEINER', logo: 'VOR' },
    { name: 'VALVETRONIC', logo: 'VT' },
    { name: 'GEEX', logo: 'GEEX' },
    { name: 'ZESTEK', logo: 'ZK' },
    { name: 'STREETFIGHTER', logo: 'SF' },
  ];

  return (
    <section className="py-16 bg-card/50 border-y border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-automotive text-center text-foreground mb-12 tracking-wide">
          TRUSTED BY LEADING BRANDS
        </h2>
        
        {/* Scrolling Brand Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="flex-shrink-0 mx-8 flex items-center justify-center w-32 h-24 bg-background/80 rounded-lg border border-border hover:border-primary/50 transition-colors duration-300 group cursor-pointer"
              >
                <span className="text-lg font-automotive text-muted-foreground group-hover:text-primary transition-colors duration-300 tracking-wider">
                  {brand.logo}
                </span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div 
                key={`duplicate-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center w-32 h-24 bg-background/80 rounded-lg border border-border hover:border-primary/50 transition-colors duration-300 group cursor-pointer"
              >
                <span className="text-lg font-automotive text-muted-foreground group-hover:text-primary transition-colors duration-300 tracking-wider">
                  {brand.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandCarousel;