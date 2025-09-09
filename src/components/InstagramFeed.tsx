import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Instagram, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

const InstagramFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: "C908LggNB6j",
      image: "/lovable-uploads/acura-integra-square.png",
      caption: "Unveiling the GF Bodykit V1 Aero Program For Acura Integra (DE4). The Kit Includes The Following:",
      fullDescription: `Unveiling the GF Bodykit V1 Aero Program For Acura Integra (DE4).

The Kit Includes The Following:
- GF Bodykit Painted Gloss Black Front Bumper Lip Kit
- GF Bodykit Painted Gloss Black / White Pearl Side Skirt Extensions
- GF Bodykit Painted Gloss Black Rear Bumper LED Diffuser

In Addition to the GF Body Kit V1 DE4 Kit, The Car in the Post is Equipped With our Cuztomutuning Parts:
- Cuztomutuning M Horn Style Mirror Cap
- Cuztomutuning Premium Low-Profile M Style Window Visor

All The Parts Are Available For Order @cuztomutuning. Please DM Us For Details.

#cuztomutuning #teggy #integra #de4 #de5 #acuraintegra #5thgenintegra #jdmcar #teggyclub #teggygang #teggyfam`,
      username: "cuztomutuning",
      date: "July 24, 2024",
      likes: "91",
      hashtags: ["#cuztomutuning", "#teggy", "#integra", "#de4", "#de5", "#acuraintegra", "#5thgenintegra", "#jdmcar", "#teggyclub", "#teggygang", "#teggyfam"],
      url: "https://www.instagram.com/p/C908LggNB6j/"
    },
    {
      id: "C_BfVnxtMqb",
      image: "/lovable-uploads/efbe171a-865c-475b-bbb3-55b6bfacee9e.png",
      caption: "Toyota GR86 (ZN8) CTM Design Carbon Fiber Aero Kit - Taking this build to the next level",
      fullDescription: `Toyota GR86 (ZN8) CTM Design Carbon Fiber Aero Kit

This stunning blue GR86 is equipped with our premium CTM Design Carbon Fiber Aero Kit, featuring:
- Carbon fiber front lip spoiler
- Carbon fiber side skirts
- Carbon fiber rear diffuser
- Aggressive styling that enhances both performance and aesthetics

Transform your GR86 with our professional-grade aero components. Available for order now.

#toyota #gr86 #zn8 #carbonfiber #aerokit #ctmdesign #sportscar #modified #tuning #jdm`,
      username: "cuztomutuning",
      date: "August 10, 2024",
      likes: "234",
      hashtags: ["#toyota", "#gr86", "#zn8", "#carbonfiber", "#aerokit", "#ctmdesign"],
      url: "https://www.instagram.com/p/C_BfVnxtMqb/?img_index=1"
    },
    {
      id: "C1LcxgkrxIK",
      image: "/lovable-uploads/9ba40d9a-6dd3-4a3e-a379-28db606ac234.png",
      caption: "2022+ Honda Civic equipped with Yofer Design V3 Body Kit - Complete transformation",
      fullDescription: `2022+ Honda Civic equipped with Yofer Design V3 Body Kit

This stunning blue Civic showcases the complete Yofer Design V3 Body Kit transformation:
- Yofer Design V3 Front Bumper with aggressive styling
- Yofer Design V3 Side Skirts for enhanced aerodynamics
- Yofer Design V3 Rear Diffuser for complete package
- Custom wide body fender flares
- Lowered stance with premium wheel setup
- Professional paint finish in deep blue

Transform your 2022+ Civic with our complete Yofer Design V3 Body Kit. Available for order now.

#honda #civic #2022civic #yoferdesign #bodykit #widebody #jdm #modified #tuning #cuztomutuning #stance #aero`,
      username: "cuztomutuning",
      date: "January 15, 2024",
      likes: "342",
      hashtags: ["#honda", "#civic", "#2022civic", "#yoferdesign", "#bodykit", "#widebody"],
      url: "https://www.instagram.com/p/C1LcxgkrxIK/"
    },
    {
      id: "DJXj_0bh8s3",
      image: "/lovable-uploads/b4846425-c73d-4c1e-81a9-512fe130cd4c.png",
      caption: "White Camry with aggressive stance and custom aero modifications - clean build showcase",
      fullDescription: `White Camry Build Showcase

This stunning white Camry features:
- Aggressive lowered stance with air suspension
- Custom wide-body aero kit
- Premium aftermarket wheels with deep dish design
- Sleek front lip and side skirts
- Professional paint finish in pearl white
- Blacked out trim and accents

Complete transformation showcasing the perfect balance of style and performance. This build demonstrates how proper modifications can elevate any platform.

#camry #toyota #stance #widebody #airsuspension #modified #tuning #cuztomutuning #clean #build`,
      username: "cuztomutuning",
      date: "December 20, 2024",
      likes: "428",
      hashtags: ["#camry", "#toyota", "#stance", "#widebody", "#airsuspension", "#modified"],
      url: "https://www.instagram.com/p/DJXj_0bh8s3/?img_index=1"
    },
    {
      id: "C03IoQ5LiVb",
      image: "/lovable-uploads/514b54f8-15be-4bba-aafe-1f542b49ebd5.png",
      caption: "ACR Style Body Kit For 18-22 Accord - Complete transformation package with aggressive styling",
      fullDescription: `ACR Style Body Kit For 18-22 Accord

Transform your 2018-2022 Honda Accord with our complete ACR Style Body Kit featuring:

Kit Components:
- ACR Style Front Lip Spoiler for aggressive front-end styling
- ACR Style Side Skirts for enhanced aerodynamics and side profile
- ACR Style Rear Diffuser with integrated LED accent lighting
- Professional fitment designed specifically for 18-22 Accord models
- Available in multiple color options to match your vehicle

This comprehensive body kit completely transforms the look of your Accord, giving it an aggressive, race-inspired appearance while maintaining excellent build quality and fitment.

Professional installation recommended. More colors available upon request.

#honda #accord #2018accord #2019accord #2020accord #2021accord #2022accord #acrstyle #bodykit #aero #cuztomutuning #aggressive #stance #modified`,
      username: "cuztomutuning",
      date: "December 8, 2023",
      likes: "387",
      hashtags: ["#honda", "#accord", "#acrstyle", "#bodykit", "#aero", "#cuztomutuning"],
      url: "https://www.instagram.com/p/C03IoQ5LiVb/?img_index=1"
    }
  ];

  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <Instagram className="h-6 md:h-8 w-6 md:w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-automotive text-foreground tracking-tight">
              FOLLOW US ON INSTAGRAM
            </h2>
          </div>
          <p className="text-base md:text-lg text-primary font-semibold tracking-wider">
            #Cuztomtuning
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
          {posts.map((post, index) => (
            <Card 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer aspect-square"
            >
              {/* Post Image */}
              <div className="absolute inset-0">
                <img 
                  src={post.image}
                  alt={`Instagram post by ${post.username}`}
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

        {/* Instagram Post Modal */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
            {selectedPost && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="flex-1 bg-black flex items-center justify-center">
                  <img 
                    src={selectedPost.image}
                    alt={`Instagram post by ${selectedPost.username}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                {/* Content Section */}
                <div className="w-full md:w-96 flex flex-col bg-background">
                  {/* Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-border">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <span className="font-semibold text-foreground">{selectedPost.username}</span>
                  </div>
                  
                  {/* Caption */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">C</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground whitespace-pre-line">
                          <span className="font-semibold">{selectedPost.username}</span> {selectedPost.fullDescription}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">{selectedPost.date}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="border-t border-border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <Heart className="h-6 w-6 text-foreground hover:text-red-500 cursor-pointer transition-colors" />
                        <MessageCircle className="h-6 w-6 text-foreground hover:text-primary cursor-pointer transition-colors" />
                        <Send className="h-6 w-6 text-foreground hover:text-primary cursor-pointer transition-colors" />
                      </div>
                      <Bookmark className="h-6 w-6 text-foreground hover:text-primary cursor-pointer transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Liked by <span className="font-normal">cuztomutuning9genxse</span> and <span className="font-normal">{selectedPost.likes} others</span>
                    </p>
                    {selectedPost.url !== "#" && (
                      <a 
                        href={selectedPost.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        View on Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Instagram className="h-5 w-5" />
            Follow @cuztomutuning
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;