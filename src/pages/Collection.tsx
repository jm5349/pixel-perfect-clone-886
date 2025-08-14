import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import BusinessInfo from "@/components/BusinessInfo";
import SearchBar from "@/components/SearchBar";
import client from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const currency = (amount?: number | string, code?: string) => {
  if (amount === undefined || amount === null || amount === "") return "—";
  const value = Number(amount);
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: code || "USD" }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};

// Derive minimal price for a product from its variants
const getMinPrice = (p: any) => {
  const prices = (p?.variants || []).map((v: any) => Number(v?.price?.amount || 0)).filter(Boolean);
  return prices.length ? Math.min(...prices) : 0;
};

const anyAvailable = (p: any) => (p?.variants || []).some((v: any) => !!v?.available);

// Extra products to append by collection handle
const EXTRA_PRODUCTS: Record<string, string[]> = {
  'body-kit': ['9928841036069', '9928832876837', '9928328249637']
};

const CollectionPage: React.FC = () => {
  const { handle = "" } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Collection");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  // Filters
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState<string>("featured");

  useEffect(() => {
    let cancelled = false;
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      try {
        const rawHandle = (handle || "").trim();
        let h = (!rawHandle || rawHandle.startsWith(":")) ? "body-kit" : rawHandle;
        // 1) Try fetch by handle to get collection id/title
        let col: any = null;
        try {
          // @ts-ignore - shopify-buy may not type this
          col = await (client as any).collection?.fetchByHandle?.(h);
        } catch {}
        // 2) If we have id, fetch with products for up to 50 items
        let colWithProducts: any = null;
        if (col?.id) {
          try {
            // @ts-ignore
            colWithProducts = await (client as any).collection?.fetchWithProducts?.(col.id, { productsFirst: 50 });
          } catch {}
        }
        let prods: any[] = (colWithProducts?.products || col?.products || []);
        const extraIds: string[] = EXTRA_PRODUCTS[h] || [];
        if (extraIds.length) {
          try {
            const fetched = await Promise.all(
              extraIds.map(id => (client as any).product?.fetch?.(id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`))
            );
            const byId = new Set(prods.map((p: any) => p.id));
            for (const item of fetched) {
              if (item && !byId.has((item as any).id)) prods.push(item as any);
            }
          } catch (e) {
            console.warn('Extra products fetch failed', e);
          }
        }
        if (!cancelled) {
          setProducts(prods as ShopifyProduct[]);
          setTitle(col?.title || (h.replace(/-/g, " ")).replace(/\b\w/g, c => c.toUpperCase()));
        }
      } catch (e) {
        console.error("Collection load error:", e);
        if (!cancelled) setError("Failed to load collection.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchCollection();
    return () => { cancelled = true; };
  }, [handle]);

  // SEO
  useEffect(() => {
    const prevTitle = document.title;
    const prevCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let createdCanonical: HTMLLinkElement | null = null;
    const pageTitle = `${title} | Collections`;
    document.title = pageTitle;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = `${title} body kit collection. Shop curated upgrades.`.slice(0, 155);
    if (prevCanonical) {
      prevCanonical.href = window.location.href;
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
      createdCanonical = link;
    }
    return () => {
      document.title = prevTitle;
      if (createdCanonical) document.head.removeChild(createdCanonical);
    };
  }, [title]);

  // Derived data
  const allVendors = useMemo(() => Array.from(new Set(products.map((p: any) => p.vendor).filter(Boolean))), [products]);
  const allProductTypes = useMemo(() => Array.from(new Set(products.map((p: any) => p.productType).filter(Boolean))), [products]);
  const minPrice = useMemo(() => (products.length ? Math.min(...products.map(p => getMinPrice(p))) : 0), [products]);
  const maxPrice = useMemo(() => (products.length ? Math.max(...products.map(p => getMinPrice(p))) : 1000), [products]);
  useEffect(() => {
    // Reset range when products set
    if (products.length) setPriceRange([Math.floor(minPrice), Math.ceil(maxPrice)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  const filtered = useMemo(() => {
    let list: any[] = [...products];
    if (inStockOnly) list = list.filter(p => anyAvailable(p));
    if (selectedVendors.length) list = list.filter(p => selectedVendors.includes((p as any).vendor));
    if (selectedProductTypes.length) list = list.filter(p => selectedProductTypes.includes((p as any).productType));
    list = list.filter(p => {
      const price = getMinPrice(p);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => getMinPrice(b) - getMinPrice(a));
        break;
      case "newest":
        // No createdAt in our interface; leave as-is or by title
        list.sort((a, b) => String((b as any).title).localeCompare(String((a as any).title)));
        break;
      default:
        break;
    }
    return list as ShopifyProduct[];
  }, [products, inStockOnly, selectedVendors, selectedProductTypes, priceRange, sort]);

  // ItemList structured data
  const itemListLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${title} Collection`,
    itemListElement: filtered.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/products/${(p as any).handle || (p as any).id}`,
      name: p.title
    }))
  }), [filtered, title]);

  const Filters = (
    <aside className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Availability</h3>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
          <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(Boolean(v))} />
          In stock only
        </label>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-auto pr-2">
          {allVendors.length ? allVendors.map(v => (
            <label key={v} className="flex items-center gap-3 text-sm text-muted-foreground">
              <Checkbox
                checked={selectedVendors.includes(v)}
                onCheckedChange={(checked) => {
                  setSelectedVendors(prev => checked ? [...prev, v] : prev.filter(x => x !== v));
                }}
              />
              {v}
            </label>
          )) : <p className="text-xs text-muted-foreground">No brands detected</p>}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Product Type</h3>
        <div className="space-y-2 max-h-48 overflow-auto pr-2">
          {allProductTypes.length ? allProductTypes.map(type => (
            <label key={type} className="flex items-center gap-3 text-sm text-muted-foreground">
              <Checkbox
                checked={selectedProductTypes.includes(type)}
                onCheckedChange={(checked) => {
                  setSelectedProductTypes(prev => checked ? [...prev, type] : prev.filter(x => x !== type));
                }}
              />
              {type}
            </label>
          )) : <p className="text-xs text-muted-foreground">No product types detected</p>}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Price</h3>
        <Slider
          min={Math.floor(minPrice)}
          max={Math.ceil(maxPrice)}
          step={1}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={(v: number[]) => setPriceRange([v[0], v[1]] as [number, number])}
        />
        <div className="mt-2 text-xs text-muted-foreground">
          {currency(priceRange[0])} – {currency(priceRange[1])}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BusinessInfo />
      <SearchBar />
      <main>
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><Link className="story-link" to="/">Home</Link></li>
                <li>/</li>
                <li className="text-foreground">{title}</li>
              </ol>
            </nav>

            {/* Heading + Controls */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <h1 className="text-2xl md:text-4xl font-automotive text-foreground leading-tight">{title}</h1>
              <div className="flex items-center gap-3">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Filters</Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-sm">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">{Filters}</div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar Filters (Desktop) */}
              <div className="hidden md:block md:col-span-1">
                {Filters}
              </div>

              {/* Products Grid */}
              <div className="md:col-span-3">
                {loading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="h-56 md:h-72 bg-muted animate-pulse rounded-xl" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground mb-3">{error}</p>
                    <Button asChild><Link to="/">Back to Home</Link></Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filtered.map((p: any) => {
                      const minP = getMinPrice(p);
                      const firstImg = (p.images?.[0]?.src) || "/placeholder.svg";
                      return (
                        <Card key={p.id} className="overflow-hidden bg-card border-border group">
                          <Link to={`/products/${p.handle || p.id}`} className="block">
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={firstImg}
                                alt={`${p.title} body kit product image`}
                                className="w-full h-full object-contain bg-muted p-2 transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div className="p-3">
                              <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-2">{p.title}</h3>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-primary font-automotive">{currency(minP, p.variants?.[0]?.price?.currencyCode)}</span>
                                <span className="text-xs text-muted-foreground">{p.vendor || ""}</span>
                              </div>
                            </div>
                          </Link>
                        </Card>
                      );
                    })}
                    {!filtered.length && (
                      <div className="col-span-full text-center text-muted-foreground py-16">No products match your filters.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CollectionPage;
