import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronLeft, Instagram, Mail } from 'lucide-react';
import TikTok from './icons/TikTok';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Link } from 'react-router-dom';
import CustomerLogin from './CustomerLogin';
import client from '@/lib/shopify';
import { Badge } from '@/components/ui/badge';
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const announcements = ["🚗 Free shipping on All Orders", "🏁 New Collection Now Available", "🛠️ Ship Internationally"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      const checkoutId = localStorage.getItem('shopify_checkout_id');
      if (!checkoutId) {
        setCartItemCount(0);
        return;
      }

      try {
        const checkout = await client.checkout.fetch(checkoutId);
        if ((checkout as any).completedAt) {
          // Checkout is completed, reset
          localStorage.removeItem('shopify_checkout_id');
          setCartItemCount(0);
        } else {
          const lineItems = (checkout as any).lineItems || [];
          const count = lineItems.reduce((total: number, item: any) => total + item.quantity, 0);
          setCartItemCount(count);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartItemCount(0);
      }
    };

    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const navItems = ['AESTHETICS', 'PERFORMANCE', 'WHEELS', 'ACCESSORIES', 'BESPOKE SERVICES'];
  return <header className="relative z-[95] w-full">
      {/* Auto-rotating Announcement Banner */}
      <div className="relative overflow-hidden h-10" style={{ background: 'var(--gradient-accent)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="w-full max-w-none px-6 py-1 relative h-full">
          <div className="flex items-center justify-between h-full">
            {/* Social Media Icons - Left - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://www.instagram.com/cuztomtuning/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://www.tiktok.com/@cuztomtuning" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-200">
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-7 w-7" />
                </Button>
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
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="h-12 w-12 text-muted-foreground hover:text-primary relative"
                   asChild
                 >
                   <Link to="/cart">
                     <ShoppingCart className="h-10 w-10" />
                     {cartItemCount > 0 && (
                       <Badge 
                         className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                       >
                         {cartItemCount}
                       </Badge>
                     )}
                   </Link>
                 </Button>
                 <CustomerLogin>
                   <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                     <User className="h-10 w-10" />
                   </Button>
                 </CustomerLogin>
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
                    className="w-72 border border-border shadow-xl z-[96] p-0 mt-2 rounded-lg
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
                              className="w-56 border border-border shadow-xl z-[97] p-0 rounded-lg
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
                             side="right"
                             align="start"
                             sideOffset={8}
                           >
                             <div className="py-4">
                               <div className="space-y-1 px-2">
                                   <DropdownMenuItem asChild className="cursor-pointer">
                                     <Link to="/collections/toyota-camry" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                       Toyota Camry
                                     </Link>
                                   </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/collections/honda-civic" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Honda Civic
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <a href="#honda-accord" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Honda Accord
                                    </a>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <a href="#tesla-model-y" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Tesla Model Y
                                    </a>
                                  </DropdownMenuItem>
                                </div>
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <DropdownMenuItem className="cursor-pointer group">
                               <div className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                 SHOP BY CATEGORY
                                 <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                               </div>
                             </DropdownMenuItem>
                           </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              className="w-56 border border-border shadow-xl z-[97] p-0 rounded-lg
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
                             side="right"
                             align="start"
                             sideOffset={8}
                           >
                             <div className="py-4">
                               <div className="space-y-1 px-2">
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/collections/body-kits" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Body Kits
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/collections/spoilers" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Spoilers
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/collections/mirror-caps" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Mirror Caps
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/collections/drls-and-others" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      DRLs & Others
                                    </Link>
                                  </DropdownMenuItem>
                               </div>
                             </div>
                           </DropdownMenuContent>
                         </DropdownMenu>
                        
                         <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                             <DropdownMenuItem className="cursor-pointer group">
                               <div className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                 TOP BRANDS
                                 <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                               </div>
                             </DropdownMenuItem>
                           </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              className="w-56 border border-border shadow-xl z-[97] p-0 rounded-lg
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
                             side="right"
                             align="start"
                             sideOffset={8}
                           >
                             <div className="py-4">
                               <div className="space-y-1 px-2">
                                 <DropdownMenuItem asChild className="cursor-pointer">
                                   <a href="#ctm-design" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                     CTM Design
                                   </a>
                                 </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/collections/yofer-design" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                      Yofer Design
                                    </Link>
                                  </DropdownMenuItem>
                                   <DropdownMenuItem asChild className="cursor-pointer">
                                     <Link to="/collections/gf-bodykit" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                       GF Bodykit
                                     </Link>
                                   </DropdownMenuItem>
                                 <DropdownMenuItem asChild className="cursor-pointer">
                                   <a href="#akasaka-genuine-parts" className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition-colors border-l-2 border-transparent hover:border-primary">
                                     Akasaka Genuine Parts
                                   </a>
                                 </DropdownMenuItem>
                               </div>
                             </div>
                           </DropdownMenuContent>
                         </DropdownMenu>
                         
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
                 <Button 
                   variant="ghost" 
                   size="icon" 
                   className="h-12 w-12 text-muted-foreground hover:text-primary relative"
                   asChild
                 >
                   <Link to="/cart">
                     <ShoppingCart className="h-9 w-9" />
                     {cartItemCount > 0 && (
                       <Badge 
                         className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                       >
                         {cartItemCount}
                       </Badge>
                     )}
                   </Link>
                 </Button>
                 <CustomerLogin>
                   <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground hover:text-primary">
                     <User className="h-9 w-9" />
                   </Button>
                 </CustomerLogin>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer open={isMobileMenuOpen} onOpenChange={(open) => {
        setIsMobileMenuOpen(open);
        if (!open) setActiveSubMenu(null);
      }}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              {activeSubMenu && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setActiveSubMenu(null)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}
              <DrawerTitle className="flex-1 text-center">
                {activeSubMenu || 'Menu'}
              </DrawerTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-primary"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </DrawerHeader>
          
          <div className="overflow-y-auto flex-1 p-4">
            {!activeSubMenu ? (
              // Main Menu
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSubMenu('SHOP BY VEHICLE')}
                  className="w-full flex items-center justify-between px-4 py-4 text-left text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  SHOP BY VEHICLE
                  <ChevronDown className="h-5 w-5 -rotate-90 text-muted-foreground" />
                </button>
                
                <button
                  onClick={() => setActiveSubMenu('SHOP BY CATEGORY')}
                  className="w-full flex items-center justify-between px-4 py-4 text-left text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  SHOP BY CATEGORY
                  <ChevronDown className="h-5 w-5 -rotate-90 text-muted-foreground" />
                </button>
                
                <button
                  onClick={() => setActiveSubMenu('TOP BRANDS')}
                  className="w-full flex items-center justify-between px-4 py-4 text-left text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  TOP BRANDS
                  <ChevronDown className="h-5 w-5 -rotate-90 text-muted-foreground" />
                </button>
                
                <a
                  href="#affiliate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  AFFILIATE PROGRAM
                </a>
                
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  ABOUT US
                </a>
              </div>
            ) : activeSubMenu === 'SHOP BY VEHICLE' ? (
              // Vehicle Submenu
              <div className="space-y-2">
                <Link
                  to="/collections/toyota-camry"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Toyota Camry
                </Link>
                <Link
                  to="/collections/honda-civic"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Honda Civic
                </Link>
                <a
                  href="#honda-accord"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Honda Accord
                </a>
                <a
                  href="#tesla-model-y"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Tesla Model Y
                </a>
              </div>
            ) : activeSubMenu === 'SHOP BY CATEGORY' ? (
              // Category Submenu
              <div className="space-y-2">
                <Link
                  to="/collections/body-kits"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Body Kits
                </Link>
                <Link
                  to="/collections/spoilers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Spoilers
                </Link>
                <Link
                  to="/collections/mirror-caps"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Mirror Caps
                </Link>
                <Link
                  to="/collections/drls-and-others"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  DRLs & Others
                </Link>
              </div>
            ) : activeSubMenu === 'TOP BRANDS' ? (
              // Brands Submenu
              <div className="space-y-2">
                <a
                  href="#ctm-design"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  CTM Design
                </a>
                <a
                  href="#yofer-design"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Yofer Design
                </a>
                <a
                  href="#yofer-design"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Yofer Design
                </a>
                <a
                  href="#akasaka-genuine-parts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  Akasaka Genuine Parts
                </a>
              </div>
            ) : null}
          </div>
        </DrawerContent>
      </Drawer>
    </header>;
};
export default Header;