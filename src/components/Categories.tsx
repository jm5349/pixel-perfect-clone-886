import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import bodyKitsImage from '@/assets/body-kits-category.jpg';
import spoilersImage from '@/assets/spoilers-category.jpg';
import mirrorCapsImage from '@/assets/mirror-caps-category.jpg';
import drlsImage from '@/assets/drls-category.jpg';
import gfBodykitLogo from '@/assets/gf-bodykit-logo.jpg';
const Categories = () => {
  const categories = [{
    title: "Body Kits",
    image: bodyKitsImage,
    description: "Front Bumper Lip, Side Skirt Extension & Rear Diffuser"
  }, {
    title: "Spoilers",
    image: spoilersImage,
    description: "Rear Roof Spoiler & Trunk Wing"
  }, {
    title: "Mirror Caps",
    image: mirrorCapsImage,
    description: "Direct Add-on Overlay & Replacement Mirror Covers"
  }, {
    title: "DRLs & Others",
    image: drlsImage,
    description: "Sequential DRLs & other Accessories"
  }, {
    title: "Yofer Design®",
    image: "/lovable-uploads/0f062cb7-f12f-45a4-9eae-c35a32d8dffe.png",
    description: "Authentic Yofer Design Parts"
  }, {
    title: "GF Bodykit®",
    image: gfBodykitLogo,
    description: "Premium GF Design Products"
  }];
  return <section className="relative z-0 py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-automotive text-foreground mb-6 tracking-tight leading-tight">
            SHOP BY 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              CATEGORY
            </span>
          </h2>
          
          
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const isBodyKit = category.title.toLowerCase() === "body kits";
            const isSpoilers = category.title.toLowerCase() === "spoilers";
            const content = (
              <Card key={index} className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer h-40 md:h-72">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-3 md:p-6">
                  <h3 className="text-base md:text-2xl font-automotive text-foreground mb-2 md:mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
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
            
            if (isBodyKit) {
              return (
                <Link to="/collections/body-kits" key={index}>
                  {content}
                </Link>
              );
            } else if (isSpoilers) {
              return (
                <Link to="/collections/spoilers" key={index}>
                  {content}
                </Link>
              );
            } else if (category.title.toLowerCase() === "mirror caps") {
              return (
                <Link to="/collections/mirror-caps" key={index}>
                  {content}
                </Link>
              );
            } else if (category.title.toLowerCase() === "drls & others") {
              return (
                <Link to="/collections/drls-and-others" key={index}>
                  {content}
                </Link>
              );
            } else if (category.title.toLowerCase() === "yofer design®") {
              return (
                <Link to="/collections/yofer-design" key={index}>
                  {content}
                </Link>
              );
            } else if (category.title.toLowerCase() === "gf bodykit®") {
              return (
                <Link to="/collections/gf-bodykit" key={index}>
                  {content}
                </Link>
              );
            } else {
              return content;
            }
          })}
        </div>
      </div>
    </section>;
};
export default Categories;