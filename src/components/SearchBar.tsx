import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import client from '@/lib/shopify';

// Helper to compute min price
const minPrice = (p: any) => {
  const prices = (p?.variants || []).map((v: any) => Number(v?.price?.amount || 0)).filter(Boolean);
  return prices.length ? Math.min(...prices) : 0;
};

const formatCurrency = (amount?: number, code?: string) => {
  if (!amount && amount !== 0) return '—';
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: code || 'USD' }).format(amount || 0);
  } catch {
    return `$${(amount || 0).toFixed(2)}`;
  }
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const allProductsRef = useRef<any[] | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debRef = useRef<number | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (debRef.current) window.clearTimeout(debRef.current);
    if (!query || query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    debRef.current = window.setTimeout(async () => {
      try {
        setLoading(true);
        if (!allProductsRef.current) {
          // Fetch up to 100 products once, then filter client-side
          const list = await (client as any).product.fetchAll(100);
          allProductsRef.current = Array.isArray(list) ? list : [];
        }
        const q = query.toLowerCase();
        const filtered = (allProductsRef.current || []).filter((p: any) => {
          const title = String(p?.title || '').toLowerCase();
          const vendor = String(p?.vendor || '').toLowerCase();
          const handle = String((p as any)?.handle || '').toLowerCase();
          return title.includes(q) || vendor.includes(q) || handle.includes(q);
        }).slice(0, 8);
        setResults(filtered);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const ResultList = useMemo(() => (
    open && (results.length > 0 || loading) ? (
      <div className="absolute left-0 right-0 top-full mt-2 z-40">
        <div className="rounded-xl border border-border bg-popover/95 backdrop-blur supports-[backdrop-filter]:bg-popover/80 shadow-lg overflow-hidden">
          {loading && (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Searching products…
            </div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted-foreground">No matches found</div>
          )}
          {!loading && results.length > 0 && (
            <ul role="listbox" aria-label="Search suggestions" className="max-h-96 overflow-auto">
              {results.map((p: any) => {
                const img = p.images?.[0]?.src || '/placeholder.svg';
                const price = minPrice(p);
                const currency = p?.variants?.[0]?.price?.currencyCode || 'USD';
                const to = `/products/${(p as any).handle || p.id}`;
                return (
                  <li key={p.id} role="option">
                    <Link
                      to={to}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-accent focus:bg-accent transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <img src={img} alt={`${p.title} product image`} loading="lazy" className="h-10 w-10 rounded object-cover border border-border" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-foreground truncate">{p.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.vendor || ''}</p>
                      </div>
                      <div className="text-xs font-medium text-primary whitespace-nowrap">{formatCurrency(price, currency)}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    ) : null
  ), [open, results, loading]);

  return (
    <section className="w-full bg-background py-6">
      <div className="container mx-auto px-6">
        {/* Desktop Search Bar */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center">
            <div ref={containerRef} className="relative flex items-center bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full transition-all duration-300 hover:shadow-glow w-full max-w-2xl pr-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-14 w-14 text-primary hover:text-primary hover:bg-primary/20 rounded-full flex-shrink-0"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </Button>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim().length >= 2 && setOpen(true)}
                placeholder="Search parts, brands, models..."
                className="bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none flex-1 w-full text-lg px-2"
                aria-label="Search products"
                role="combobox"
                aria-expanded={open}
              />
              {ResultList}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden">
          <div ref={containerRef} className="relative flex items-center bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full transition-all duration-300 hover:shadow-glow pr-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 text-primary hover:text-primary hover:bg-primary/20 rounded-full flex-shrink-0"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 2 && setOpen(true)}
              placeholder="Search parts, brands, models..."
              className="bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none flex-1 w-full text-sm"
              aria-label="Search products"
              role="combobox"
              aria-expanded={open}
            />
            {ResultList}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;