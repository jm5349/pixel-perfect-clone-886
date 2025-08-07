import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  return (
    <section className="w-full bg-background py-6">
      <div className="container mx-auto px-6">
        {/* Desktop Search Bar */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full transition-all duration-300 hover:shadow-glow w-full max-w-2xl pr-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-14 w-14 text-primary hover:text-primary hover:bg-primary/20 rounded-full flex-shrink-0"
              >
                <Search className="h-6 w-6" />
              </Button>
              <input
                type="text"
                placeholder="Search parts, brands, models..."
                className="bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none flex-1 w-full text-lg px-2"
              />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden">
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
      </div>
    </section>
  );
};

export default SearchBar;