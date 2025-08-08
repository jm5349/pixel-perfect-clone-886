import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "@/lib/shopify";
import type { ShopifyProduct } from "@/lib/shopify";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const currency = (amount?: string, code?: string) => {
  if (!amount) return "—";
  const value = Number(amount);
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: code || "USD" }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};

const slugToIsNumericId = (s: string) => /^\d+$/.test(s.trim());

const ProductPage: React.FC = () => {
  const { handle = "" } = useParams();
  const { toast } = useToast();

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
        if (slugToIsNumericId(handle)) {
          const gid = `gid://shopify/Product/${handle}`;
          try {
            p = await (client as any).product.fetch(gid);
          } catch {}
          if (!p) {
            try {
              p = await (client as any).product.fetch(handle);
            } catch {}
          }
        } else if ((client as any).product?.fetchByHandle) {
          try {
            p = await (client as any).product.fetchByHandle(handle);
          } catch {}
        }
        if (!p && (client as any).product?.fetchAll) {
          try {
            const all = await (client as any).product.fetchAll();
            p = Array.isArray(all) ? all.find((it: any) => it.handle === handle || String(it?.id || "").endsWith(`/${handle}`)) : null;
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
          setError("无法加载该商品，请稍后再试。");
          toast({ title: "加载失败", description: "商品信息获取失败", variant: "destructive" });
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
    const imgs = (product.images || []).map((i) => i.src).filter(Boolean);
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
      brand: product.vendor ? { "@type": "Brand", name: product.vendor } : undefined,
      sku: variant?.title || undefined,
      offers: offer
    } as any;
  }, [product, variant, isAvailable]);

  const addToCart = async () => {
    if (!variant) return;
    setAddingToCart(true);
    try {
      const checkout = await client.checkout.create();
      const lineItemsToAdd = [
        { variantId: variant.id, quantity: Math.max(1, quantity) }
      ];
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      window.open(updatedCheckout.webUrl, "_blank");
      toast({ title: "已加入购物车", description: `${product?.title ?? "商品"} 已添加到购物车` });
    } catch (e) {
      console.error("Add to cart error:", e);
      toast({ title: "出错了", description: "添加到购物车失败", variant: "destructive" });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
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
    );
  }

  if (error || !product) {
    return (
      <section className="container mx-auto px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl md:text-4xl font-automotive text-foreground mb-4">未找到该商品</h1>
        <p className="text-muted-foreground mb-8">请检查链接是否正确，或稍后再试。</p>
        <Button asChild>
          <Link to="/">返回首页</Link>
        </Button>
      </section>
    );
  }

  const images = product.images || [];
  const mainImage = images[selectedImage]?.src || images[0]?.src || "";

  return (
    <main>
      <section className="relative py-10 md:py-16 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.04)_0%,transparent_50%)]" />
        <div className="relative container mx-auto px-6 lg:px-8">
          {productLd && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
          )}
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link className="story-link" to="/">首页</Link></li>
              <li>/</li>
              <li className="text-foreground">产品详情</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {/* Left: Gallery */}
            <div>
              <Card className="overflow-hidden bg-card border-border">
                <img
                  src={mainImage}
                  alt={`${product.title} 主图 - 汽车前唇配件`}
                  className="w-full h-72 md:h-[520px] object-cover"
                  loading="eager"
                />
              </Card>
              {images.length > 1 && (
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {images.map((img, i) => (
                    <button
                      key={`${img.src}-${i}`}
                      onClick={() => setSelectedImage(i)}
                      className={`rounded-lg overflow-hidden border ${i === selectedImage ? "border-primary" : "border-border"}`}
                      aria-label={`缩略图 ${i + 1}`}
                    >
                      <img src={img.src} alt={img.altText || `${product.title} 缩略图 ${i + 1}`} className="h-16 w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{product.vendor || "旗舰店"}</Badge>
              </div>
              <h1 className="text-2xl md:text-4xl font-automotive text-foreground mb-3 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-automotive text-primary">{priceLabel}</span>
                <span className="text-sm text-muted-foreground">{isAvailable ? "现货" : "缺货"}</span>
              </div>

              {/* Variant selector (simple) */}
              {product.variants?.length > 1 && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm text-muted-foreground">选择款式</label>
                  <select
                    className="w-full rounded-md border border-border bg-background px-3 py-2"
                    value={selectedVariantId ?? product.variants[0].id}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                  >
                    {product.variants.map((v) => (
                      <option key={v.id} value={v.id}>{v.title}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6 flex items-center gap-3">
                <label className="text-sm text-muted-foreground">数量</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="w-24 rounded-md border border-border bg-background px-3 py-2"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={addToCart}
                  disabled={!isAvailable || addingToCart}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {addingToCart ? "处理中..." : "加入购物车并结算"}
                </Button>
              </div>

              {/* Benefits / badges */}
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <li className="bg-muted/30 rounded-md px-3 py-2">支持快速发货</li>
                <li className="bg-muted/30 rounded-md px-3 py-2">原厂兼容适配</li>
                <li className="bg-muted/30 rounded-md px-3 py-2">售后支持</li>
              </ul>
            </div>
          </div>

          {/* Tabs: Details / Specs / Fitment / FAQ */}
          <div className="mt-12">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                <TabsTrigger value="details">详情</TabsTrigger>
                <TabsTrigger value="specs">参数</TabsTrigger>
                <TabsTrigger value="fitment">适配</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <article className="prose prose-invert max-w-none text-foreground">
                  <div dangerouslySetInnerHTML={{ __html: (product as any).descriptionHtml || (product as any).description || "" }} />
                </article>
              </TabsContent>
              <TabsContent value="specs">
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="p-4"><h3 className="font-medium mb-2">品牌</h3><p className="text-muted-foreground">{product.vendor || "—"}</p></Card>
                  <Card className="p-4"><h3 className="font-medium mb-2">类型</h3><p className="text-muted-foreground">{product.productType || "—"}</p></Card>
                  <Card className="p-4"><h3 className="font-medium mb-2">SKU/Variant</h3><p className="text-muted-foreground">{variant?.title || product.variants?.[0]?.title || "—"}</p></Card>
                </div>
              </TabsContent>
              <TabsContent value="fitment">
                <div className="space-y-2 text-muted-foreground">
                  <p>适配车型：丰田凯美瑞 2025-2026（示例，可根据商品实际信息调整）</p>
                  <p>材质：碳纤维/FRP（以实际商品为准）</p>
                </div>
              </TabsContent>
              <TabsContent value="faq">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>是否支持到店安装？</AccordionTrigger>
                    <AccordionContent>支持到店安装或邮寄到家自行安装（无分期模块）。</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>发货时间多久？</AccordionTrigger>
                    <AccordionContent>现货一般48小时内发出，定制件以客服通知为准。</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
