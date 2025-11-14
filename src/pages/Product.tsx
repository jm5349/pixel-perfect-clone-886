import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, Truck, Wrench, BadgeCheck, FileText, CheckCircle2, HelpCircle, Package, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductTrustSignals from "@/components/product/ProductTrustSignals";
import ProductHighlights from "@/components/product/ProductHighlights";
import ProductPolicies from "@/components/product/ProductPolicies";
import VariantSelector from "@/components/product/VariantSelector";
import Header from "@/components/Header";
import BusinessInfo from "@/components/BusinessInfo";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import Hls from "hls.js";
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

// Parse fitment information from product title
const parseFitmentFromTitle = (title: string) => {
  const lowerTitle = title.toLowerCase();

  // Extract year range or single year
  const yearMatch = title.match(/\b(20\d{2})(?:[-–]\s?(20?\d{2}))?\b/);
  const yearInfo = yearMatch ? yearMatch[2] ? `${yearMatch[1]}-${yearMatch[2]}` : yearMatch[1] : "";

  // Extract make and model
  let make = "";
  let model = "";
  let trims = "";
  if (lowerTitle.includes("toyota camry")) {
    make = "Toyota";
    model = "Camry";
    const trimMatch = title.match(/\b(LE|XLE|SE|XSE|TRD|Hybrid|Limited)\b/gi);
    trims = trimMatch ? trimMatch.join(", ") : "";
  } else if (lowerTitle.includes("honda civic")) {
    make = "Honda";
    model = "Civic";
    const trimMatch = title.match(/\b(LX|EX|Sport|Touring|Type R|Si|Sedan|Hatchback)\b/gi);
    trims = trimMatch ? trimMatch.join(", ") : "";
  } else if (lowerTitle.includes("acura integra")) {
    make = "Acura";
    model = "Integra";
    const trimMatch = title.match(/\b(A-Spec|Technology|Limited)\b/gi);
    trims = trimMatch ? trimMatch.join(", ") : "";
  }

  // Determine product type for specific installation guidance
  let productType = "accessory";
  if (lowerTitle.includes("door handle")) productType = "door_handle";else if (lowerTitle.includes("body kit") || lowerTitle.includes("front lip") || lowerTitle.includes("splitter")) productType = "body_kit";else if (lowerTitle.includes("spoiler") || lowerTitle.includes("wing")) productType = "spoiler";else if (lowerTitle.includes("mirror")) productType = "mirror";else if (lowerTitle.includes("grille") || lowerTitle.includes("grill")) productType = "grille";
  return {
    yearInfo,
    make,
    model,
    trims,
    productType
  };
};
const getFitmentInfo = (title: string) => {
  const {
    yearInfo,
    make,
    model,
    trims,
    productType
  } = parseFitmentFromTitle(title);
  const vehicleInfo = `${yearInfo ? `${yearInfo} ` : ""}${make}${model ? ` ${model}` : ""}${trims ? ` (${trims})` : ""}`.trim() || "your vehicle";
  const compatibility = vehicleInfo === "your vehicle" ? "Please verify fitment compatibility with your specific vehicle model and year before ordering. Or feel free to contact us to verify: support@cuztomtuning.com" : `Designed specifically for ${vehicleInfo}. Please verify your exact model and trim before ordering to ensure proper fitment. Or feel free to contact us to verify: support@cuztomtuning.com`;
  const material = productType === "door_handle" ? "High-quality ABS plastic with automotive-grade finish. UV-resistant coating prevents fading and ensures long-lasting durability." : productType === "body_kit" ? "Premium ABS/FRP or carbon fiber depending on selected variant. Lightweight yet durable construction for aerodynamic design." : "Quality automotive-grade materials designed for durability and long-lasting performance.";
  const installation = productType === "door_handle" ? "Easy DIY installation with pre-applied 3M automotive tape. No drilling required. Clean surface thoroughly before application for best adhesion." : productType === "body_kit" ? "Professional installation recommended. May require drilling and minor adjustments. Always test-fit prior to paint or PPF application." : "Professional installation recommended. Verify all fitment and clearances before final installation.";
  return {
    compatibility,
    material,
    installation
  };
};

const getPackageContents = (title: string) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("bumper lip") || lowerTitle.includes("front bumper")) {
    return [
      "1 * 3-Piece Front Bumper Lip Kit",
      "Mounting Hardware"
    ];
  } else if (lowerTitle.includes("louver")) {
    return [
      "1 Pair of Left & Right Window Louver Cover",
      "Adhesive Tape"
    ];
  } else if (lowerTitle.includes("window visor") || lowerTitle.includes("rain guard")) {
    return [
      "1 Set of 4 Piece Window Visor Rain Guard"
    ];
  } else if (lowerTitle.includes("side skirt")) {
    return [
      "1 Set of Left & Right Side Skirt Extension",
      "Mounting Hardware"
    ];
  } else if (lowerTitle.includes("door handle")) {
    const pieceCount = title.match(/(\d+)pc/i)?.[1] || "4";
    return [
      `A Set of ${pieceCount} Door Handle Covers`,
      "Pre-applied automotive adhesive tape"
    ];
  } else if (lowerTitle.includes("front lip") || lowerTitle.includes("splitter")) {
    return [
      "Front lip splitter components (as shown)",
      "Mounting hardware kit",
      "Installation instructions",
      "Technical support access"
    ];
  } else if (lowerTitle.includes("body kit")) {
    return [
      "Complete body kit components",
      "Mounting brackets and hardware",
      "Installation guide",
      "Fitment verification photos"
    ];
  } else if (lowerTitle.includes("spoiler") || lowerTitle.includes("wing")) {
    return [
      "Spoiler/wing assembly",
      "Mounting hardware and brackets",
      "Installation instructions",
      "Gasket or seal (if applicable)"
    ];
  } else if (lowerTitle.includes("mirror")) {
    return [
      "Mirror cap covers (pair)",
      "3M adhesive tape (pre-applied)",
      "Installation guide",
      "Surface preparation instructions"
    ];
  } else {
    return [
      "Product components (as described)",
      "Mounting hardware (if required)",
      "Installation instructions",
      "Customer support access"
    ];
  }
};
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
            // Try to fetch with media first
            const { fetchProductWithMedia } = await import('@/lib/shopify');
            const productWithMedia = await fetchProductWithMedia(gid);
            if (productWithMedia) {
              // Transform the GraphQL response to match the SDK format
              p = {
                ...productWithMedia,
                media: productWithMedia.media, // keep media edges structure
                images: productWithMedia.images?.edges?.map((e: any) => ({
                  src: e.node.url,
                  altText: e.node.altText
                })) || [],
                variants: productWithMedia.variants?.edges?.map((e: any) => ({
                  id: e.node.id,
                  title: e.node.title,
                  price: e.node.price,
                  available: e.node.availableForSale,
                  selectedOptions: e.node.selectedOptions,
                  image: e.node.image
                })) || []
              };
            }
          } catch (err) {
            console.log('Failed to fetch with media, trying standard fetch:', err);
          }
          
          // Fallback to standard fetch if media fetch fails
          if (!p) {
            try {
              p = await (client as any).product.fetch(gid);
            } catch {}
          }
          if (!p) {
            try {
              p = await (client as any).product.fetch(slug);
            } catch {}
          }
        } else if ((client as any).product?.fetchByHandle) {
          // Try GraphQL with media for handle first
          try {
            const { fetchProductByHandleWithMedia } = await import('@/lib/shopify');
            const productWithMedia = await fetchProductByHandleWithMedia(slug);
            if (productWithMedia) {
              p = {
                ...productWithMedia,
                media: productWithMedia.media,
                images: productWithMedia.images?.edges?.map((e: any) => ({
                  src: e.node.url,
                  altText: e.node.altText
                })) || [],
                variants: productWithMedia.variants?.edges?.map((e: any) => ({
                  id: e.node.id,
                  title: e.node.title,
                  price: e.node.price,
                  available: e.node.availableForSale,
                  selectedOptions: e.node.selectedOptions,
                  image: e.node.image
                })) || []
              };
            }
          } catch {}
          // Fallback to Buy SDK if GraphQL fails
          if (!p) {
            try {
              p = await (client as any).product.fetchByHandle(slug);
            } catch {}
          }
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

  // Update selected image when variant changes
  useEffect(() => {
    if (!variant || !product) return;

    // Check if variant has an associated image
    const variantImage = (variant as any).image;
    if (variantImage?.src) {
      // Find the index of this image in the product images array
      const imageIndex = product.images.findIndex(img => img.src === variantImage.src);
      if (imageIndex !== -1) {
        setSelectedImage(imageIndex);
      }
    }
  }, [variant, product]);
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
    a: "In-stock items ship within 24–48 business hours. back-ordered items vary; we'll confirm by email."
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
      // Get existing checkout from localStorage or create new one
      let checkoutId = localStorage.getItem('shopify_checkout_id');
      let checkout: any;
      if (checkoutId) {
        try {
          checkout = await client.checkout.fetch(checkoutId);
          // If checkout is completed, create a new one
          if ((checkout as any).completedAt) {
            checkout = await client.checkout.create();
            localStorage.setItem('shopify_checkout_id', checkout.id);
          }
        } catch {
          // If fetch fails, create new checkout
          checkout = await client.checkout.create();
          localStorage.setItem('shopify_checkout_id', checkout.id);
        }
      } else {
        checkout = await client.checkout.create();
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }
      const lineItemsToAdd = [{
        variantId: variant.id,
        quantity: Math.max(1, quantity)
      }];
      await client.checkout.addLineItems(checkout.id, lineItemsToAdd);

      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event('cart-updated'));
      toast({
        title: "Added to cart",
        description: `${product?.title ?? "Product"} added to your cart successfully`
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
  // Extract media data before any early returns to avoid hooks violation
  const images = product?.images || [];
  const media = (product as any)?.media?.edges || [];
  const allMedia = media.length > 0 ? media.map((m: any) => m.node) : images.map((img: any) => ({ 
    mediaContentType: 'IMAGE',
    image: { url: img.src, altText: img.altText }
  }));
  
  const currentMedia = allMedia[selectedImage] || allMedia[0];
  const isVideo = currentMedia?.mediaContentType === 'VIDEO' || currentMedia?.mediaContentType === 'EXTERNAL_VIDEO';
  const mainImage = isVideo ? '' : (currentMedia?.image?.url || images[selectedImage]?.src || images[0]?.src || "");
  
  // HLS playback support for .m3u8 Shopify video sources - must be before any conditional returns
  useEffect(() => {
    if (!product || !isVideo || !videoRef.current) return;
    const sources = (currentMedia as any)?.sources || [];
    const hlsSource = sources.find((s: any) => ((s.mimeType || "").includes("mpegURL") || (s.url || "").includes(".m3u8")))?.url;
    if (!hlsSource) return;
    const el = videoRef.current as HTMLVideoElement;
    let hls: Hls | null = null;
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = hlsSource;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(hlsSource);
      hls.attachMedia(el);
    }
    return () => { if (hls) hls.destroy(); };
  }, [product, isVideo, selectedImage, currentMedia]);

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
              <li><Link className="story-link" to="/collections/body-kits">Body Kits</Link></li>
              <li>/</li>
              <li className="text-foreground">Product Details</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Left: Gallery */}
            <div>
              <Card className="overflow-hidden bg-card border-border relative group">
                {isVideo ? (
                  <div className="w-full h-72 md:h-[520px] bg-background flex items-center justify-center">
                    {(currentMedia.sources?.length ?? 0) > 0 ? (
                      <video 
                        ref={videoRef}
                        controls
                        playsInline
                        preload="metadata"
                        crossOrigin="anonymous"
                        className="w-full h-72 md:h-[520px] object-contain pointer-events-auto"
                        poster={currentMedia.previewImage?.url}
                      >
                        {[...(currentMedia.sources || [])]
                          .sort((a: any, b: any) => {
                            const aMp4 = (a.mimeType || '').includes('mp4') ? 1 : 0;
                            const bMp4 = (b.mimeType || '').includes('mp4') ? 1 : 0;
                            return bMp4 - aMp4; // Prefer MP4 first for broad browser support
                          })
                          .map((src: any, idx: number) => (
                            <source key={idx} src={src.url} type={src.mimeType || 'video/mp4'} />
                          ))}
                        Your browser does not support the video tag.
                      </video>
                    ) : (currentMedia.embedUrl || currentMedia.embeddedUrl || currentMedia.originUrl) ? (
                      <iframe
                        src={currentMedia.embedUrl || currentMedia.embeddedUrl || currentMedia.originUrl}
                        className="w-full h-72 md:h-[520px]"
                        title={`${product.title} video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <p className="text-muted-foreground">Video unavailable</p>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-72 md:h-[520px] bg-background overflow-hidden flex items-center justify-center">
                    <img 
                      src={mainImage} 
                      alt={`${product.title} main image – front lip splitter`} 
                      className="w-full h-full object-contain cursor-zoom-in" 
                      loading="eager"
                      onClick={() => setIsFullscreen(true)}
                      style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s' }}
                    />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomLevel(prev => Math.min(prev + 0.25, 3));
                        }}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomLevel(prev => Math.max(prev - 0.25, 1));
                        }}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFullscreen(true);
                        }}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
              {allMedia.length > 1 && <div className="mt-3 grid grid-cols-5 gap-2">
                  {allMedia.map((media: any, i: number) => {
                    const isThumbVideo = media.mediaContentType === 'VIDEO' || media.mediaContentType === 'EXTERNAL_VIDEO';
                    const thumbSrc = isThumbVideo ? (media.previewImage?.url || media.image?.url) : media.image?.url || images[i]?.src;
                    
                    return (
                      <button 
                        key={`media-${i}`} 
                        onClick={() => setSelectedImage(i)} 
                        className={`rounded-lg overflow-hidden border ${i === selectedImage ? "border-primary" : "border-border"} bg-background relative`} 
                        aria-label={`Thumbnail ${i + 1}`}
                      >
                        <img 
                          src={thumbSrc} 
                          alt={media.alt || `${product.title} thumbnail ${i + 1}`} 
                          className="h-16 w-full object-contain" 
                          loading="lazy" 
                        />
                        {isThumbVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{product.vendor || "Yofer Design"}</Badge>
              </div>
              <h1 className="text-2xl md:text-4xl font-automotive text-foreground mb-3 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-automotive text-primary">{priceLabel}</span>
                <span className="text-sm text-muted-foreground">{isAvailable ? "In stock" : "Out of stock"}</span>
              </div>

              {/* Variant selector */}
              {product.variants?.length > 1 && <div className="mb-6">
                  <VariantSelector variants={product.variants} selectedVariantId={selectedVariantId ?? product.variants[0].id} onVariantChange={setSelectedVariantId} />
                </div>}

              {/* Quantity */}
              <div className="mb-6 flex items-center gap-3">
                <label className="text-sm text-muted-foreground">Quantity</label>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity(Math.max(1, Number(e.target.value) || 1))} className="w-24 rounded-md border border-border bg-background px-3 py-2" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={addToCart} disabled={!isAvailable || addingToCart} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </Button>
              </div>

              {/* Payment Information */}
              <div className="mt-6 space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card/50">
                  <h3 className="text-sm font-medium text-foreground mb-3">Secure Payment</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white flex items-center justify-center font-bold text-xs">VISA</div>
                      <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-400 rounded text-white flex items-center justify-center font-bold text-xs">MC</div>
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-300 rounded text-white flex items-center justify-center font-bold text-xs">AMEX</div>
                      <div className="w-12 h-8 bg-gradient-to-r from-purple-600 to-purple-400 rounded text-white flex items-center justify-center font-bold text-xs">PP</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">SSL encrypted • Your payment info is secure</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Worldwide shipping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">30-day returns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">1-year warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">US-base Customer Service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Sections */}
          <div className="mt-8 md:mt-12">
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <Tabs defaultValue="fitment" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="fitment">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Fitment</span>
                  </TabsTrigger>
                  <TabsTrigger value="details">
                    <FileText className="w-4 h-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="faq">
                    <HelpCircle className="w-4 h-4" />
                    <span>Customer Service</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <Card className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                      <h3 className="text-xl font-automotive font-bold text-foreground">Product Overview</h3>
                    </div>
                    
                    {/* Product Description */}
                    <div className="max-w-none mb-8">
                      {product.title.includes("Honda Civic") ? <div className="product-description text-base leading-relaxed space-y-4">
                          <p className="text-white font-normal">This comprehensive 4-piece YF Original Design Front Bumper Lip Splitter Kit transforms your vehicle's appearance while providing functional protection:</p>
                          <ul className="space-y-3 text-white font-normal">
                            <li className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>Complete 4-piece kit: 2 side splitters + 2 central lip splitters for full front coverage</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>Premium 2-tone finish creates an aggressive, race-inspired aesthetic</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>Constructed from durable, lightweight polypropylene (PP) for long-lasting performance</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>Shields your factory bumper from curbs, speed bumps, and road debris</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>Transforms your vehicle's front end with a bold, performance-oriented look</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>Requires professional installation with drilling for optimal fitment</span>
                            </li>
                          </ul>
                          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                            <p className="text-sm text-white font-normal">
                              <strong className="text-primary">Pro Installation Tip:</strong> Ensure secure mounting by using larger washers along with additional screws and adhesive tape for maximum durability.
                            </p>
                          </div>
                        </div> : <div className="product-description text-base leading-relaxed text-white font-normal" dangerouslySetInnerHTML={{
                        __html: (product as any).descriptionHtml || (product as any).description || "Premium automotive upgrade part engineered to enhance both performance and visual appeal of your vehicle."
                      }} />}
                    </div>

                    {/* What's Included */}
                    <div className="border-t border-primary/20 pt-6 mb-6">
                      <h4 className="text-lg font-automotive font-bold text-foreground mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        What's Included
                      </h4>
                      <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-lg p-5">
                        <ul className="space-y-3">
                          {getPackageContents(product.title).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white font-normal">
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </Card>
                </TabsContent>
                
                
                <TabsContent value="fitment" className="mt-6">
                  <Card className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                      <h3 className="text-xl font-automotive font-bold text-foreground">Fitment Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-automotive font-bold text-primary mb-3 flex items-center gap-2">
                          <BadgeCheck className="w-5 h-5" />
                          Compatibility
                        </h4>
                        <p className="text-white font-normal">
                          {getFitmentInfo(product.title).compatibility.split('support@cuztomtuning.com').map((part, index, array) => (
                            <React.Fragment key={index}>
                              {part}
                              {index < array.length - 1 && (
                                <a 
                                  href="mailto:support@cuztomtuning.com" 
                                  className="text-primary underline font-medium break-all inline-block touch-manipulation pointer-events-auto relative z-10"
                                  target="_self"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'mailto:support@cuztomtuning.com?subject=Fitment%20Verification&body=Hi%20CuztomTuning,%0A%0AMy%20vehicle%20details:%20[Year]%20[Make]%20[Model]%20[Trim]%0AProduct:%20' + encodeURIComponent(product?.title || '');
                                  }}
                                  aria-label="Email support@cuztomtuning.com"
                                >
                                  support@cuztomtuning.com
                                </a>
                              )}
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-automotive font-bold text-primary mb-3 flex items-center gap-2">
                          <Wrench className="w-5 h-5" />
                          Material & Construction
                        </h4>
                        <p className="text-white font-normal">
                          {getFitmentInfo(product.title).material}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-automotive font-bold text-primary mb-3 flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5" />
                          Installation Requirements
                        </h4>
                        <p className="text-white font-normal">
                          {getFitmentInfo(product.title).installation}
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="faq" className="mt-6">
                  <Card className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                      <h3 className="text-xl font-automotive font-bold text-foreground">Frequently Asked Questions</h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, idx) => <AccordionItem key={idx} value={`item-${idx + 1}`} className="border-primary/20">
                          <AccordionTrigger className="text-left text-white hover:text-primary font-automotive font-semibold">{item.q}</AccordionTrigger>
                          <AccordionContent className="text-white font-normal">{item.a}</AccordionContent>
                        </AccordionItem>)}
                    </Accordion>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Mobile/Tablet Stacked Layout */}
            <div className="md:hidden space-y-6">
              {/* Details Section */}
              <Card className="p-4 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="text-lg font-automotive font-bold text-foreground">Product Details</h3>
                </div>
                {product.title.includes("Honda Civic") ? <div className="product-description text-sm leading-relaxed space-y-3">
                    <p className="text-white font-normal">4-piece YF Original Design Front Bumper Lip Splitter Kit featuring:</p>
                    <ul className="space-y-2.5 text-white font-normal">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>2 pieces side splitters + 2 pieces central lip splitters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Special 2-tone color finish for enhanced aerodynamic look</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Quality lightweight PP (polypropylene) material</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Protects original bumper from road bumps and scratches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Dramatically improves sporty appearance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Professional installation recommended (drilling required)</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-xs text-white font-normal">
                        <strong className="text-primary">Installation Note:</strong> Use bigger washers and additional screws & tape for secure mounting.
                      </p>
                    </div>
                  </div> : <div className="product-description text-sm leading-relaxed text-white font-normal" dangerouslySetInnerHTML={{
                  __html: (product as any).descriptionHtml || (product as any).description || "Premium automotive upgrade part designed for enhanced performance and aesthetics."
                }} />}
              </Card>

              {/* What's Included Section */}
              <Card className="p-4 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="text-lg font-automotive font-bold text-foreground flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    What's Included
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-lg p-4">
                  <ul className="space-y-2.5">
                    {getPackageContents(product.title).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white font-normal text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Specifications Section */}
              <Card className="p-4 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="text-lg font-automotive font-bold text-foreground">Specifications</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-automotive font-bold mb-1 text-sm text-primary">Brand</h4>
                    <p className="text-foreground font-semibold text-sm">{product.vendor || "Yofer Design"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-automotive font-bold mb-1 text-sm text-primary">Type</h4>
                    <p className="text-foreground font-semibold text-sm">{product.productType || "Body Kit Component"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-automotive font-bold mb-1 text-sm text-primary">SKU/Variant</h4>
                    <p className="text-foreground font-semibold text-sm">{variant?.title || product.variants?.[0]?.title || "Standard"}</p>
                  </div>
                </div>
              </Card>

              {/* Fitment Section */}
              <Card className="p-4 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="text-lg font-automotive font-bold text-foreground">Fitment Information</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-automotive font-bold mb-2 text-sm flex items-center gap-2 text-primary">
                      <BadgeCheck className="w-4 h-4" />
                      Compatibility
                    </h4>
                    <p className="text-white font-normal text-sm">
                      {getFitmentInfo(product.title).compatibility.split('support@cuztomtuning.com').map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <a
                              href="mailto:support@cuztomtuning.com"
                              className="text-primary underline font-medium break-all inline-block touch-manipulation pointer-events-auto relative z-10"
                              target="_self"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'mailto:support@cuztomtuning.com?subject=Fitment%20Verification&body=Hi%20CuztomTuning,%0A%0AMy%20vehicle%20details:%20[Year]%20[Make]%20[Model]%20[Trim]%0AProduct:%20' + encodeURIComponent(product?.title || '');
                              }}
                              aria-label="Email support@cuztomtuning.com"
                            >
                              support@cuztomtuning.com
                            </a>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-automotive font-bold mb-2 text-sm flex items-center gap-2 text-primary">
                      <Wrench className="w-4 h-4" />
                      Material & Construction
                    </h4>
                    <p className="text-white font-normal text-sm">
                      {getFitmentInfo(product.title).material}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3">
                    <h4 className="font-automotive font-bold mb-2 text-sm flex items-center gap-2 text-primary">
                      <ShieldCheck className="w-4 h-4" />
                      Installation Requirements
                    </h4>
                    <p className="text-white font-normal text-sm">
                      {getFitmentInfo(product.title).installation}
                    </p>
                  </div>
                </div>
              </Card>

              {/* FAQ Section */}
              <Card className="p-4 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h3 className="text-lg font-automotive font-bold text-foreground">Frequently Asked Questions</h3>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, idx) => <AccordionItem key={idx} value={`item-${idx + 1}`} className="border-primary/20">
                      <AccordionTrigger className="text-left text-sm hover:text-primary font-automotive font-semibold text-white">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-white font-normal text-sm">{item.a}</AccordionContent>
                    </AccordionItem>)}
                </Accordion>
              </Card>
            </div>
          </div>
          
          <div className="mt-10 space-y-8">
            <ProductTrustSignals />
            <ProductHighlights product={product} />
            <ProductPolicies />
          </div>
        </div>
      </section>
    </main>
    <Footer />

    {/* Fullscreen Image Modal */}
    <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        <div className="relative w-full h-[95vh] bg-black/95 flex items-center justify-center">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 5))}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))}
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setZoomLevel(1)}
            >
              Reset
            </Button>
          </div>

          <div className="w-full h-full overflow-auto flex items-center justify-center p-8">
            <img 
              src={mainImage} 
              alt={product.title}
              className="max-w-full max-h-full object-contain"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s',
                transformOrigin: 'center'
              }}
            />
          </div>

          {/* Thumbnail Navigation in Fullscreen */}
          {allMedia.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 p-3 rounded-lg max-w-[90vw] overflow-x-auto">
              {allMedia.map((media: any, i: number) => {
                const isThumbVideo = media.mediaContentType === 'VIDEO' || media.mediaContentType === 'EXTERNAL_VIDEO';
                const thumbSrc = isThumbVideo ? (media.previewImage?.url || media.image?.url) : media.image?.url || images[i]?.src;
                
                return (
                  <button 
                    key={`fullscreen-thumb-${i}`}
                    onClick={() => {
                      setSelectedImage(i);
                      setZoomLevel(1);
                    }}
                    className={`w-16 h-16 border-2 rounded-md overflow-hidden hover:border-primary transition-colors flex-shrink-0 ${selectedImage === i ? 'border-primary' : 'border-white/30'}`}
                  >
                    <img src={thumbSrc} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  </>;
};
export default ProductPage;