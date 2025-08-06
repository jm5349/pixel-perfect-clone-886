import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const announcements = ["🚗 Free shipping on orders over $500 - Limited time offer", "🏁 New Performance Parts Collection Now Available", "⚡ 15% OFF All Aesthetic Modifications This Month", "🛠️ Professional Installation Services Available Nationwide"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);
  const businessInfo = [{
    label: 'Business Hours',
    value: 'Mon-Fri 8AM-6PM EST'
  }, {
    label: 'Warranty',
    value: '2 Year Guarantee'
  }, {
    label: 'Support',
    value: 'US-Based Customer Service'
  }];
  const navItems = ['AESTHETICS', 'PERFORMANCE', 'WHEELS', 'ACCESSORIES', 'BESPOKE SERVICES'];
  return <header className="relative z-50">
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
      <div className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0">
        <div className="w-full max-w-none px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search - Left */}
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Logo - Center */}
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <img 
                  src="/lovable-uploads/9c3a6696-3fa1-48b3-a64e-5e1937f3852c.png" 
                  alt="Custom Tuning Company Logo" 
                  className="h-12 w-auto mx-auto"
                />
                {/* Business Information - Below Logo */}
                <div className="hidden lg:flex justify-center space-x-8 mt-3">
                  {businessInfo.map((info, index) => <div key={index} className="text-xs bg-gradient-to-b from-background to-muted/20 border border-border/60 
                                 rounded-lg px-4 py-3 backdrop-blur-sm hover:border-primary/40 
                                 transition-all duration-300 shadow-sm hover:shadow-md 
                                 hover:bg-gradient-to-b hover:from-primary/5 hover:to-primary/10">
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-medium">{info.label}</span>
                        <span className="text-foreground font-semibold text-xs">{info.value}</span>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>

            {/* Actions & Menu - Right */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="hidden lg:flex">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg z-50">
                  {navItems.map((item, index) => <DropdownMenuItem key={index} asChild>
                      <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wider cursor-pointer">
                        {item}
                      </a>
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
              
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Business Info */}
          <div className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 gap-3 text-center">
              {businessInfo.map((info, index) => <div key={index} className="text-xs bg-gradient-to-b from-background to-muted/20 border border-border/60 
                             rounded-lg px-4 py-3 hover:border-primary/40 transition-all duration-300 shadow-sm">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-medium">{info.label}</span>
                    <span className="text-foreground font-semibold">{info.value}</span>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && <nav className="lg:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => <a key={index} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>
                    {item}
                  </a>)}
              </div>
            </nav>}
        </div>
      </div>
    </header>;
};
export default Header;