import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Instagram, Facebook } from 'lucide-react';
import TikTok from './icons/TikTok';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const announcements = ["🚗 Free shipping on All Orders - Limited Time Offer", "🏁 New Collection Now Available", "⚡ 10% OFF New Customers", "🛠️ Ship Internationally"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);
  const navItems = ['AESTHETICS', 'PERFORMANCE', 'WHEELS', 'ACCESSORIES', 'BESPOKE SERVICES'];
  return <header className="relative z-50 w-full">
      {/* Auto-rotating Announcement Banner */}
      <div className="relative overflow-hidden" style={{ background: 'var(--gradient-accent)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="w-full max-w-none px-6 py-2 relative">
          <div className="flex items-center justify-center">
            <div className="text-center transition-all duration-500 ease-in-out">
              <p className="text-sm font-semibold tracking-wide text-white/95 drop-shadow-sm">
                {announcements[currentAnnouncementIndex]}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Main Header */}
      <div className="bg-background backdrop-blur-md pb-2">
        <div className="w-full max-w-none px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Mobile Layout */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Hamburger Menu - Left */}
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Menu className="h-7 w-7" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-72 bg-background border border-border shadow-xl z-50 p-0 mt-2 rounded-lg" 
                    align="start"
                    sideOffset={8}
                  >
                    <div className="py-4">
                      {/* Main Navigation Items */}
                      <div className="space-y-1 px-2">
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#shop-by-vehicle" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors group">
                            SHOP BY VEHICLE
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#shop-by-category" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors group">
                            SHOP BY CATEGORY
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#top-brands" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors group">
                            TOP BRANDS
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#services" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors">
                            SERVICES
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#merch" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors">
                            MERCH
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#financing" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors">
                            FINANCING
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#affiliate" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors">
                            AFFILIATE PROGRAM
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#faq" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors">
                            FAQ
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#contact" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors">
                            CONTACT US
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <a href="#help" className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground rounded-md transition-colors">
                            DIDN'T FIND WHAT YOU NEED?
                          </a>
                        </DropdownMenuItem>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="mt-6 pt-4 border-t border-border px-6">
                        {/* Login Button */}
                        <Button className="w-full mb-4 bg-foreground text-background hover:bg-foreground/90 font-medium">
                          Login
                        </Button>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center justify-center space-x-4">
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                              <Facebook className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                              <Instagram className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                              <TikTok className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Logo - Center */}
              <div className="flex items-center justify-center flex-1">
                <img 
                  src="/lovable-uploads/8e5d317a-b86d-44bf-859d-d1c8bfc9d23b.png" 
                  alt="Custom Tuning Company Logo" 
                  className="h-16 w-auto max-w-[200px]"
                />
              </div>
              
              {/* Actions - Right */}
              <div className="flex items-center space-x-2">
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                   <ShoppingCart className="h-7 w-7" />
                 </Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                   <User className="h-7 w-7" />
                 </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center w-full sticky-header relative">
              {/* Social Media Icons - Left */}
              <div className="flex items-center space-x-4 absolute left-0">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                     <Instagram className="h-7 w-7" />
                   </a>
                 </Button>
                 <Button variant="ghost" size="icon" asChild>
                   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                     <Facebook className="h-7 w-7" />
                   </a>
                 </Button>
                 <Button variant="ghost" size="icon" asChild>
                   <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                     <TikTok className="h-7 w-7" />
                  </a>
                </Button>
              </div>

              {/* Logo - Center */}
              <div className="flex items-center justify-center w-full">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/8e5d317a-b86d-44bf-859d-d1c8bfc9d23b.png" 
                    alt="Custom Tuning Company Logo" 
                    className="h-28 lg:h-32 w-auto max-w-md mx-auto"
                  />
                </div>
              </div>

              {/* Actions & Menu - Right */}
              <div className="flex items-center space-x-4 absolute right-0">
                {/* Desktop Navigation Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                       <Menu className="h-7 w-7" />
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg z-50">
                     {navItems.map((item, index) => (
                       <DropdownMenuItem key={index} asChild>
                         <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wider cursor-pointer">
                           {item}
                         </a>
                       </DropdownMenuItem>
                     ))}
                   </DropdownMenuContent>
                 </DropdownMenu>
                 
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                   <ShoppingCart className="h-7 w-7" />
                 </Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                   <User className="h-7 w-7" />
                 </Button>
              </div>
            </div>
          </div>



          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <a 
                    key={index} 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider py-2" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>;
};
export default Header;