import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
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
  return <header className="sticky top-0 z-50 w-full">
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
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Layout */}
            <div className="lg:hidden flex items-center justify-between w-full">
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

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Search Bar - Left */}
              <div className="flex items-center flex-1">
                <div className="relative flex items-center">
                  <div className="flex items-center bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full transition-all duration-300 hover:shadow-glow w-80 pr-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-12 w-12 text-primary hover:text-primary hover:bg-primary/20 rounded-full flex-shrink-0"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                    <input
                      type="text"
                      placeholder="Search parts, brands, models..."
                      className="bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none flex-1 w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Logo - Center */}
              <div className="flex items-center justify-center flex-1">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/8e5d317a-b86d-44bf-859d-d1c8bfc9d23b.png" 
                    alt="Custom Tuning Company Logo" 
                    className="h-28 lg:h-32 w-auto max-w-md mx-auto"
                  />
                </div>
              </div>

              {/* Actions & Menu - Right */}
              <div className="flex items-center space-x-4 flex-1 justify-end">
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


          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <div className="flex items-center bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full transition-all duration-300 hover:shadow-glow pr-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 text-primary hover:text-primary hover:bg-primary/20 rounded-full flex-shrink-0"
              >
                <Search className="h-4 w-4" />
              </Button>
              <input
                type="text"
                placeholder="Search parts, brands, models..."
                className="bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none flex-1 w-full text-sm"
              />
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