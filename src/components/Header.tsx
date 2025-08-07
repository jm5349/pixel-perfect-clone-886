import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Instagram, Facebook, Twitter } from 'lucide-react';
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
      <div className="bg-primary text-primary-foreground border-b border-border">
        <div className="w-full max-w-none px-6 py-3">
          <div className="flex items-center justify-center">
            <div className="text-center transition-all duration-500 ease-in-out">
              <p className="text-sm font-medium">
                {announcements[currentAnnouncementIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background backdrop-blur-md pb-2">
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Layout */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Hamburger Menu - Left */}
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Menu className="h-5 w-5" />
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
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center w-full sticky-header relative">
              {/* Social Media Icons - Left */}
              <div className="flex items-center space-x-3 absolute left-0">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
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
                      <Menu className="h-5 w-5" />
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
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <User className="h-5 w-5" />
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