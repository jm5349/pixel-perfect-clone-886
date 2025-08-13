import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import aestheticsImage from '@/assets/aesthetics-category.jpg';
import performanceImage from '@/assets/performance-category.jpg';
import wheelsImage from '@/assets/wheels-category.jpg';
import accessoriesImage from '@/assets/accessories-category.jpg';
const Categories = () => {
  const categories = [{
    title: "Body Kit",
    image: aestheticsImage,
    description: "Front Bumper Lip, Side Skirt Extension & Rear Diffuser"
  }, {
    title: "Spoiler",
    image: performanceImage,
    description: "Rear Roof Spoiler & Trunk Wing"
  }, {
    title: "Mirror Caps",
    image: wheelsImage,
    description: "Direct Add-on Overlay & Replacement Mirror Covers"
  }, {
    title: "DRLs & Others",
    image: accessoriesImage,
    description: "Sequential DRLs & other Accessories"
  }, {
    title: "Yofer Design®",
    image: "/lovable-uploads/0f062cb7-f12f-45a4-9eae-c35a32d8dffe.png",
    description: "Authentic Yofer Design Parts"
  }, {
    title: "GF Bodykit®",
    image: aestheticsImage,
    description: "Premium GF Design Products"
  }];
  return <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-automotive text-foreground mb-6 tracking-tight leading-tight">
            SHOP BY 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              CATEGORY
            </span>
          </h2>
          
          
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const isBodyKit = category.title.toLowerCase() === "body kit";
            const content = (
              <Card key={index} className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer h-48 md:h-80">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-8">
                  <h3 className="text-lg md:text-3xl font-automotive text-foreground mb-2 md:mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
                    {category.description}
                  </p>
                  <div className="w-12 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            );
            return isBodyKit ? (
              <Link to="/collections/body-kit" key={index}>
                {content}
              </Link>
            ) : (
              content
            );
          })}
        </div>
      </div>
    </section>;
};
export default Categories;