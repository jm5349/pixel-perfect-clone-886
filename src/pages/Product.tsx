import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, Truck, Wrench, BadgeCheck } from "lucide-react";
import ProductTrustSignals from "@/components/product/ProductTrustSignals";
import ProductHighlights from "@/components/product/ProductHighlights";
import ProductPolicies from "@/components/product/ProductPolicies";
import BeforeAfterCompare from "@/components/BeforeAfterCompare";
import beforeImg from "@/assets/hero-car.jpg";
import afterImg from "@/assets/aesthetics-category.jpg";
import Header from "@/components/Header";
import BusinessInfo from "@/components/BusinessInfo";
import SearchBar from "@/components/SearchBar";
const currency = (amount?: string, code?: string) => {
  if (!amount) return "—";
  const value = Number(amount);
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code || "USD"
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};
const slugToIsNumericId = (s: string) => /^\d+$/.test(s.trim());
const ProductPage: React.FC = () => {
  const {
    handle = ""
  } = useParams();
  const {
    toast
  } = useToast();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        let p: any = null;
        // Normalize route param and provide sensible fallback when visiting the literal template "/products/:handle"
        let slug = (handle || "").trim();
        if (!slug || slug === ":handle") {
          // Fallback to the sample product (Home page first product)
          slug = "for-2025-26-toyota-camry-se-xse-gf-bodykit-pearl-white-black-front-lip-splitter";
        }
        if (slugToIsNumericId(slug)) {
          const gid = `gid://shopify/Product/${slug}`;
          try {
            p = await (client as any).product.fetch(gid);
          } catch {}
          if (!p) {
            try {
              p = await (client as any).product.fetch(slug);
            } catch {}
          }
        } else if ((client as any).product?.fetchByHandle) {
          try {
            p = await (client as any).product.fetchByHandle(slug);
          } catch {}
        }
        if (!p && (client as any).product?.fetchAll) {
          try {
            const all = await (client as any).product.fetchAll();
            p = Array.isArray(all) ? all.find((it: any) => it.handle === slug || String(it?.id || "").endsWith(`/${slug}`)) : null;
          } catch {}
        }
        if (!p) throw new Error("Product not found");
        if (!cancelled) {
          setProduct(p as ShopifyProduct);
          setSelectedVariantId((p as ShopifyProduct).variants?.[0]?.id ?? null);
          setSelectedImage(0);
        }
      } catch (e: any) {
        console.error("Error loading product:", e);
        if (!cancelled) {
          setError("Failed to load this product. Please try again later.");
          toast({
            title: "Load failed",
            description: "Unable to fetch product information",
            variant: "destructive"
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [handle, toast]);

  // SEO: title, description, canonical
  useEffect(() => {
    const prevTitle = document.title;
    const prevCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let createdCanonical: HTMLLinkElement | null = null;
    if (product) {
      document.title = `${product.title} | Products`;
      const description = (product as any).description || "High-quality automotive accessory product page.";
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description.slice(0, 155);
      if (prevCanonical) {
        prevCanonical.href = window.location.href;
      } else {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = window.location.href;
        document.head.appendChild(link);
        createdCanonical = link;
      }
    }
    return () => {
      document.title = prevTitle;
      if (createdCanonical) document.head.removeChild(createdCanonical);
    };
  }, [product]);
  const variant = useMemo(() => {
    if (!product) return null;
    return product.variants.find(v => v.id === selectedVariantId) || product.variants[0] || null;
  }, [product, selectedVariantId]);
  const priceLabel = variant ? currency(variant.price.amount, variant.price.currencyCode) : "—";
  const isAvailable = Boolean(variant?.available);
  const productLd = useMemo(() => {
    if (!product) return null;
    const imgs = (product.images || []).map(i => i.src).filter(Boolean);
    const offer = variant ? {
      "@type": "Offer",
      priceCurrency: variant.price.currencyCode || "USD",
      price: variant.price.amount,
      availability: isAvailable ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
      url: typeof window !== 'undefined' ? window.location.href : ''
    } : undefined;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      image: imgs,
      description: (product as any).description || "",
      brand: product.vendor ? {
        "@type": "Brand",
        name: product.vendor
      } : undefined,
      sku: variant?.title || undefined,
      offers: offer
    } as any;
  }, [product, variant, isAvailable]);

  // FAQ content used for both UI and structured data
  const faqItems = [{
    q: "Do you offer in-store installation?",
    a: "No. We don't offer in-store installation and we always recommend professional installation"
  }, {
    q: "How long does shipping take?",
    a: "In-stock items ship within 24–48 business hours. back-ordered items vary; we’ll confirm by email."
  }, {
    q: "Will this fit my vehicle?",
    a: "Designed for Toyota Camry 2025–2026 SE & XSE Models. You can always email us to verify your fitment."
  }, {
    q: "Can I return a painted or installed part?",
    a: "Please test-fit before paint/film. Painted or installed items are typically not returnable."
  }];
  const faqLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(it => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a
      }
    }))
  }), []);
  const addToCart = async () => {
    if (!variant) return;
    setAddingToCart(true);
    try {
      const checkout = await client.checkout.create();
      const lineItemsToAdd = [{
        variantId: variant.id,
        quantity: Math.max(1, quantity)
      }];
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      window.open(updatedCheckout.webUrl, "_blank");
      toast({
        title: "Added to cart",
        description: `${product?.title ?? "Product"} has been added to your cart`
      });
    } catch (e) {
      console.error("Add to cart error:", e);
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive"
      });
    } finally {
      setAddingToCart(false);
    }
  };
  if (loading) {
    return <>
      <Header />
      <BusinessInfo />
      <SearchBar />
      <section className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-72 md:h-[480px] bg-muted animate-pulse rounded-xl" />
          <div className="space-y-4">
            <div className="h-6 bg-muted animate-pulse rounded w-2/3" />
            <div className="h-10 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-10 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-12 bg-muted animate-pulse rounded w-full" />
          </div>
        </div>
      </section>
      </>;
  }
  if (error || !product) {
    return <>
      <Header />
      <BusinessInfo />
      <SearchBar />
      <section className="container mx-auto px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl md:text-4xl font-automotive text-foreground mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-8">Please verify the link or try again later.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </section>
      </>;
  }
  const images = product.images || [];
  const mainImage = images[selectedImage]?.src || images[0]?.src || "";
  return <>
      <Header />
      <BusinessInfo />
      <SearchBar />
      <main>
      <section className="relative py-10 md:py-16 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.04)_0%,transparent_50%)]" />
        <div className="relative container mx-auto px-6 lg:px-8">
          {productLd && <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(productLd)
        }} />}
          {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd)
        }} />}
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link className="story-link" to="/">Home</Link></li>
              <li>/</li>
              <li className="text-foreground">Product Details</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Left: Gallery */}
            <div>
              <Card className="overflow-hidden bg-card border-border">
                <img src={mainImage} alt={`${product.title} main image – front lip splitter`} className="w-full h-72 md:h-[520px] object-cover" loading="eager" />
              </Card>
              {images.length > 1 && <div className="mt-3 grid grid-cols-5 gap-2">
                  {images.map((img, i) => <button key={`${img.src}-${i}`} onClick={() => setSelectedImage(i)} className={`rounded-lg overflow-hidden border ${i === selectedImage ? "border-primary" : "border-border"}`} aria-label={`Thumbnail ${i + 1}`}>
                      <img src={img.src} alt={img.altText || `${product.title} thumbnail ${i + 1}`} className="h-16 w-full object-cover" loading="lazy" />
                    </button>)}
                </div>}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">GF Bodykit®</Badge>
              </div>
              <h1 className="text-2xl md:text-4xl font-automotive text-foreground mb-3 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-automotive text-primary">{priceLabel}</span>
                <span className="text-sm text-muted-foreground">{isAvailable ? "In stock" : "Out of stock"}</span>
              </div>

              {/* Variant selector (simple) */}
              {product.variants?.length > 1 && <div className="mb-4">
                  <label className="block mb-2 text-sm text-muted-foreground">Select variant</label>
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2" value={selectedVariantId ?? product.variants[0].id} onChange={e => setSelectedVariantId(e.target.value)}>
                    {product.variants.map(v => <option key={v.id} value={v.id}>{v.title}</option>)}
                  </select>
                </div>}

              {/* Quantity */}
              <div className="mb-6 flex items-center gap-3">
                <label className="text-sm text-muted-foreground">Quantity</label>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))} className="w-24 rounded-md border border-border bg-background px-3 py-2" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={addToCart} disabled={!isAvailable || addingToCart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {addingToCart ? "Processing..." : "Add to cart & checkout"}
                </Button>
              </div>

              {/* Payment Information */}
              <div className="mt-6 space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card/50">
                  <h3 className="text-sm font-medium text-foreground mb-3">Secure Payment</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white flex items-center justify-center font-bold text-[8px]">VISA</div>
                      <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white flex items-center justify-center font-bold text-[8px]">MC</div>
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-300 rounded text-white flex items-center justify-center font-bold text-[8px]">AMEX</div>
                      <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-purple-400 rounded text-white flex items-center justify-center font-bold text-[8px]">PP</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">SSL encrypted • Your payment info is secure</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free shipping </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>1-year warranty</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Expert support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Details / Specs / Fitment / FAQ */}
          <div className="mt-8 md:mt-12">
            <Tabs defaultValue="details" className="w-full">
              {/* Desktop Tabs */}
              <TabsList className="hidden md:grid md:grid-cols-4 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="fitment">Fitment</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              {/* Mobile/Tablet Dropdown */}
              <div className="md:hidden mb-4">
                <select 
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  onChange={(e) => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const trigger = tabs?.querySelector(`[value="${e.target.value}"]`) as HTMLElement;
                    trigger?.click();
                  }}
                  defaultValue="details"
                >
                  <option value="details">Product Details</option>
                  <option value="specs">Specifications</option>
                  <option value="fitment">Fitment Information</option>
                  <option value="faq">Frequently Asked Questions</option>
                </select>
              </div>
              
              <TabsContent value="details" className="mt-4 md:mt-6">
                <Card className="p-4 md:p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4">Product Details</h3>
                  <article className="prose prose-invert max-w-none text-foreground">
                    <div 
                      className="text-sm md:text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                      __html: (product as any).descriptionHtml || (product as any).description || "Premium automotive upgrade part designed for enhanced performance and aesthetics."
                    }} />
                  </article>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-4 md:mt-6">
                <Card className="p-4 md:p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Brand</h4>
                      <p className="text-muted-foreground text-sm">{product.vendor || "GF Bodykit"}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Type</h4>
                      <p className="text-muted-foreground text-sm">{product.productType || "Body Kit Component"}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                      <h4 className="font-medium mb-2 text-sm md:text-base">SKU/Variant</h4>
                      <p className="text-muted-foreground text-sm">{variant?.title || product.variants?.[0]?.title || "Standard"}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="fitment" className="mt-4 md:mt-6">
                <Card className="p-4 md:p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4">Fitment Information</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                      <h4 className="font-medium text-foreground mb-2 text-sm md:text-base flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-primary" />
                        Compatibility
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground">Toyota Camry 2025–2026 SE/XSE (GF). Verify your bumper style before ordering.</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                      <h4 className="font-medium text-foreground mb-2 text-sm md:text-base flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-primary" />
                        Material & Finish
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground">Premium ABS/FRP or carbon fiber depending on selected variant.</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                      <h4 className="font-medium text-foreground mb-2 text-sm md:text-base flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        Installation Note
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground">Always test-fit prior to paint or PPF; minor adjustments may be required.</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-4 md:mt-6">
                <Card className="p-4 md:p-6 bg-card border-border">
                  <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, idx) => 
                      <AccordionItem key={idx} value={`item-${idx + 1}`} className="border-muted/30">
                        <AccordionTrigger className="text-sm md:text-base text-left hover:text-primary">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-muted-foreground">{item.a}</AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="mt-10 space-y-8">
              <ProductTrustSignals />
              <ProductHighlights product={product} />
              <Card className="p-4 md:p-6 bg-card border-border">
                <BeforeAfterCompare
                  beforeSrc={beforeImg}
                  afterSrc={afterImg}
                  title="Before & After Comparison"
                  description="Drag the slider to see the difference before and after installing the upgrade."
                  beforeLabel="Before"
                  afterLabel="After"
                  beforeAlt="Vehicle appearance before upgrade"
                  afterAlt="Vehicle appearance after upgrade"
                  shopLabel="Shop the look"
                  hotspots={[
                    {
                      id: "main-product",
                      x: 72,
                      y: 62,
                      title: product.title,
                      price: `${priceLabel}`,
                      handle: (product as any).handle || (handle || ""),
                      imageSrc: mainImage,
                      description: "The main upgrade part shown can be purchased directly."
                    }
                  ]}
                />
              </Card>
              <ProductPolicies />
            </div>
          </div>
        </div>
      </section>
    </main>
      </>;
};
export default ProductPage;