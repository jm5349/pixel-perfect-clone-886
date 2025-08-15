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
      id: "sample3",
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      caption: "Your favorite E92 M3 is currently loading…..⏳ We offer a WIDE range of services.",
      fullDescription: "Your favorite E92 M3 is currently loading…..⏳ We offer a WIDE range of services including performance upgrades, aesthetic modifications, and complete vehicle transformations.",
      username: "cuztomutuning",
      date: "July 18, 2024",
      likes: "203",
      hashtags: ["#bmw", "#e92m3", "#m3", "#performance"],
      url: "#"
    },
    {
      id: "sample4",
      image: "https://images.unsplash.com/photo-1617654112329-d9a11d7faa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      caption: "This Mercedes E450 came in for the full treatment. We completed a comprehensive makeover.",
      fullDescription: "This Mercedes E450 came in for the full treatment. We completed a comprehensive makeover including exterior styling, performance enhancements, and premium interior upgrades.",
      username: "cuztomutuning",
      date: "July 15, 2024",
      likes: "178",
      hashtags: ["#mercedes", "#e450", "#luxury", "#makeover"],
      url: "#"
    },
    {
      id: "sample5",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      caption: "A90 Supra in for a full maintenance overhaul and fresh tires. Ready for the road ahead.",
      fullDescription: "A90 Supra in for a full maintenance overhaul and fresh tires. Ready for the road ahead with enhanced performance and reliability upgrades.",
      username: "cuztomutuning",
      date: "July 12, 2024",
      likes: "245",
      hashtags: ["#toyota", "#supra", "#a90", "#maintenance"],
      url: "#"
    },
    {
      id: "sample6",
      image: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      caption: "The journey officially begins. We're proud to finally reveal this incredible build.",
      fullDescription: "The journey officially begins. We're proud to finally reveal this incredible build that showcases the pinnacle of automotive craftsmanship and attention to detail.",
      username: "cuztomutuning",
      date: "July 10, 2024",
      likes: "312",
      hashtags: ["#build", "#reveal", "#craftsmanship", "#automotive"],
      url: "#"
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
            #BUILTBYETERNA
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