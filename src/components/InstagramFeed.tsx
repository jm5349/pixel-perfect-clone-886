import React from 'react';
import { Card } from '@/components/ui/card';
import { Instagram } from 'lucide-react';

const InstagramFeed = () => {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "Ferrari F12 TDF Conversion sitting pretty 💕 Looking to elevate your build? We've got you covered."
    },
    {
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      caption: "Your favorite E92 M3 is currently loading…..⏳ We offer a WIDE range of services."
    },
    {
      image: "https://images.unsplash.com/photo-1617654112329-d9a11d7faa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "This Mercedes E450 came in for the full treatment. We completed a comprehensive makeover."
    },
    {
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "A90 Supra in for a full maintenance overhaul and fresh tires. Ready for the road ahead."
    },
    {
      image: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "The journey officially begins. We're proud to finally reveal this incredible build."
    },
    {
      image: "https://images.unsplash.com/photo-1619067900965-2efb8642dd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "No matter the platform, style, or stage of the build, we get it done right."
    },
    {
      image: "https://images.unsplash.com/photo-1617654112267-b634a7adba33?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "We're slowly dialing in this beautiful F30 340i, one detail at a time."
    },
    {
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "This finish still hits just as hard today 💛 We wrapped this beauty to perfection."
    },
  ];

  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-automotive text-foreground tracking-tight">
              FOLLOW US ON INSTAGRAM
            </h2>
          </div>
          <p className="text-lg text-primary font-semibold tracking-wider">
            #BUILTBYETERNA
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer aspect-square"
            >
              {/* Post Image */}
              <div className="absolute inset-0">
                <img 
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Instagram Icon Overlay */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm text-foreground line-clamp-3 bg-background/90 backdrop-blur-sm rounded-lg p-3">
                  {post.caption}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Instagram className="h-5 w-5" />
            Follow @eternamotorworks
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;