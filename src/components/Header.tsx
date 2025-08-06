import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const announcements = [
    "🚗 Free shipping on orders over $500 - Limited time offer",
    "🏁 New Performance Parts Collection Now Available",
    "⚡ 15% OFF All Aesthetic Modifications This Month",
    "🛠️ Professional Installation Services Available Nationwide"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => 
        (prev + 1) % announcements.length
      );
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  const businessInfo = [
    { label: 'Business Hours', value: 'Mon-Fri 8AM-6PM EST' },
    { label: 'Warranty', value: '2 Year Guarantee' },
    { label: 'Support', value: 'US-Based Customer Service' }
  ];

  const navItems = [
    'AESTHETICS',
    'PERFORMANCE', 
    'WHEELS',
    'ACCESSORIES',
    'BESPOKE SERVICES'
  ];

  return (
    <header className="relative z-50">
      {/* Auto-rotating Announcement Banner */}
      <div className="bg-primary text-primary-foreground border-b border-border">
        <div className="container mx-auto px-4 py-3">
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Business Information - Left */}
            <div className="hidden lg:flex flex-col space-y-1">
              {businessInfo.map((info, index) => (
                <div key={index} className="text-xs">
                  <span className="text-muted-foreground">{info.label}:</span>
                  <span className="text-foreground font-medium ml-1">{info.value}</span>
                </div>
              ))}
            </div>

            {/* Logo - Center */}
            <div className="flex items-center justify-center flex-1 lg:flex-initial">
              <h1 className="text-2xl font-automotive text-foreground tracking-wider text-center">
                ETERNA
                <span className="text-primary">MOTORWORKS</span>
              </h1>
            </div>

            {/* Actions - Right */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Desktop Navigation - Below main header */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 mt-4 pt-4 border-t border-border">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Business Info */}
          <div className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 gap-2 text-center">
              {businessInfo.map((info, index) => (
                <div key={index} className="text-xs">
                  <span className="text-muted-foreground">{info.label}:</span>
                  <span className="text-foreground font-medium ml-1">{info.value}</span>
                </div>
              ))}
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
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
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
    </header>
  );
};

export default Header;