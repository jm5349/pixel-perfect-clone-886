import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Instagram, Facebook, Mail } from 'lucide-react';
import TikTok from './icons/TikTok';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const announcements = ["🚗 Free shipping on All Orders", "🏁 New Collection Now Available", "⚡ 10% OFF New Customers", "🛠️ Ship Internationally"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);
  const navItems = ['AESTHETICS', 'PERFORMANCE', 'WHEELS', 'ACCESSORIES', 'BESPOKE SERVICES'];
  return <header className="relative z-50 w-full">
      {/* Auto-rotating Announcement Banner */}
      <div className="relative overflow-hidden h-10" style={{ background: 'var(--gradient-accent)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="w-full max-w-none px-6 py-1 relative h-full">
          <div className="flex items-center justify-between h-full">
            {/* Social Media Icons - Left - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-200">
                  <TikTok className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="mailto:info@company.com" className="text-white/80 hover:text-white transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
            
            {/* Announcement Text - Centered on mobile, balanced on desktop */}
            <div className="text-center transition-all duration-500 ease-in-out flex-1 lg:flex-1">
              <p className="text-sm font-semibold tracking-wide text-white/95 drop-shadow-sm truncate">
                {announcements[currentAnnouncementIndex]}
              </p>
            </div>
            
            {/* Empty space for balance - Hidden on mobile */}
            <div className="hidden lg:block w-32"></div>
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
                    className="w-72 border border-border shadow-xl z-50 p-0 mt-2 rounded-lg
                               data-[state=open]:animate-in data-[state=open]:slide-in-from-left-2 data-[state=open]:fade-in-0
                               data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-2 data-[state=closed]:fade-out-0
                               data-[state=open]:duration-300 data-[state=closed]:duration-200" 
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 50%, hsl(var(--background)) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 25px -5px hsl(var(--primary) / 0.1), 0 10px 10px -5px hsl(var(--primary) / 0.04)',
                      borderLeft: '3px solid hsl(var(--primary))'
                    }}
                    align="start"
                    sideOffset={8}
                  >
                    <div className="py-4">
                      {/* Main Navigation Items */}
                      <div className="space-y-1 px-2">
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <DropdownMenuItem className="cursor-pointer group">
                               <div className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                 SHOP BY VEHICLE
                                 <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                               </div>
                             </DropdownMenuItem>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent 
                             className="w-56 border border-border shadow-xl z-50 bg-background backdrop-blur-md"
                             side="right"
                             align="start"
                             sideOffset={8}
                           >
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#toyota-camry" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Toyota Camry
                               </a>
                             </DropdownMenuItem>
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#toyota-corolla" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Toyota Corolla
                               </a>
                             </DropdownMenuItem>
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#honda-civic" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Honda Civic
                               </a>
                             </DropdownMenuItem>
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#honda-accord" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Honda Accord
                               </a>
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                        
                         <DropdownMenuItem asChild className="cursor-pointer group">
                           <a href="#shop-by-category" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             SHOP BY CATEGORY
                             <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                           </a>
                         </DropdownMenuItem>
                        
                         <DropdownMenuItem asChild className="cursor-pointer group">
                           <a href="#top-brands" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             TOP BRANDS
                             <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                           </a>
                         </DropdownMenuItem>
                         
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#affiliate" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             AFFILIATE PROGRAM
                           </a>
                         </DropdownMenuItem>
                         
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#faq" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             FAQ
                           </a>
                         </DropdownMenuItem>
                        
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#contact" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             CONTACT US
                           </a>
                         </DropdownMenuItem>
                         
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#help" className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             DIDN'T FIND WHAT YOU NEED?
                           </a>
                         </DropdownMenuItem>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="mt-6 pt-4 border-t border-border px-6">
                         {/* Login Button */}
                         <Button className="w-full mb-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg shadow-primary/25">
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
                <Link to="/" aria-label="Back to homepage">
                  <img 
                    src="/lovable-uploads/8e5d317a-b86d-44bf-859d-d1c8bfc9d23b.png" 
                    alt="Custom Tuning Company Logo" 
                    className="h-16 w-auto max-w-[200px]"
                  />
                </Link>
              </div>
              
              {/* Actions - Right */}
              <div className="flex items-center space-x-2">
                 <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                   <ShoppingCart className="h-10 w-10" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                   <User className="h-10 w-10" />
                 </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center w-full sticky-header relative">
              {/* Hamburger Menu - Left */}
              <div className="flex items-center absolute left-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                      <Menu className="h-10 w-10" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-72 border border-border shadow-xl z-50 p-0 mt-2 rounded-lg
                               data-[state=open]:animate-in data-[state=open]:slide-in-from-left-2 data-[state=open]:fade-in-0
                               data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-2 data-[state=closed]:fade-out-0
                               data-[state=open]:duration-300 data-[state=closed]:duration-200" 
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 50%, hsl(var(--background)) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 25px -5px hsl(var(--primary) / 0.1), 0 10px 10px -5px hsl(var(--primary) / 0.04)',
                      borderLeft: '3px solid hsl(var(--primary))'
                    }}
                    align="start"
                    sideOffset={8}
                  >
                    <div className="py-4">
                      {/* Main Navigation Items */}
                      <div className="space-y-1 px-2">
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <DropdownMenuItem className="cursor-pointer group">
                               <div className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                 SHOP BY VEHICLE
                                 <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                               </div>
                             </DropdownMenuItem>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent 
                             className="w-56 border border-border shadow-xl z-50 bg-background backdrop-blur-md"
                             side="right"
                             align="start"
                             sideOffset={8}
                           >
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#toyota-camry" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Toyota Camry
                               </a>
                             </DropdownMenuItem>
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#toyota-corolla" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Toyota Corolla
                               </a>
                             </DropdownMenuItem>
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#honda-civic" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Honda Civic
                               </a>
                             </DropdownMenuItem>
                             <DropdownMenuItem asChild className="cursor-pointer">
                               <a href="#honda-accord" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors">
                                 Honda Accord
                               </a>
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                        
                         <DropdownMenuItem asChild className="cursor-pointer group">
                           <a href="#shop-by-category" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             SHOP BY CATEGORY
                             <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                           </a>
                         </DropdownMenuItem>
                        
                         <DropdownMenuItem asChild className="cursor-pointer group">
                           <a href="#top-brands" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             TOP BRANDS
                             <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                           </a>
                         </DropdownMenuItem>
                         
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#affiliate" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             AFFILIATE PROGRAM
                           </a>
                         </DropdownMenuItem>
                         
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#faq" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             FAQ
                           </a>
                         </DropdownMenuItem>
                        
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#contact" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             CONTACT US
                           </a>
                         </DropdownMenuItem>
                         
                         <DropdownMenuItem asChild className="cursor-pointer">
                           <a href="#help" className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                             DIDN'T FIND WHAT YOU NEED?
                           </a>
                         </DropdownMenuItem>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="mt-6 pt-4 border-t border-border px-6">
                         {/* Login Button */}
                         <Button className="w-full mb-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg shadow-primary/25">
                           Login
                         </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Logo - Center */}
              <div className="flex items-center justify-center w-full">
                <div className="text-center">
                  <Link to="/" aria-label="Back to homepage">
                    <img 
                      src="/lovable-uploads/8e5d317a-b86d-44bf-859d-d1c8bfc9d23b.png" 
                      alt="Custom Tuning Company Logo" 
                      className="h-28 lg:h-32 w-auto max-w-md mx-auto"
                    />
                  </Link>
                </div>
              </div>

              {/* Actions - Right */}
              <div className="flex items-center space-x-4 absolute right-0">
                 <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                   <ShoppingCart className="h-9 w-9" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                   <User className="h-9 w-9" />
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