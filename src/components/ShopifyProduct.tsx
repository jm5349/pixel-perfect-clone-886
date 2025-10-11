import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import client from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import VariantSelector from '@/components/product/VariantSelector';

interface ShopifyProductCardProps {
  productId: string;
}

const ShopifyProductCard: React.FC<ShopifyProductCardProps> = ({ productId }) => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const normalizeProductId = (id: string) => {
      // If already a base64-encoded Shopify GID
      try {
        const decoded = atob(id);
        if (decoded.startsWith('gid://shopify/Product/')) {
          return id;
        }
      } catch {}

      // If a gid URL, encode to base64 as expected by Storefront API
      if (id.startsWith('gid://shopify/')) {
        try {
          return btoa(id);
        } catch {}
      }

      // If plain numeric ID, build the gid and base64 encode it
      if (/^\d+$/.test(id)) {
        return btoa(`gid://shopify/Product/${id}`);
      }

      // Fallback: use as-is
      return id;
    };

    const fetchProduct = async () => {
      try {
        const normalizedId = normalizeProductId(productId);
        const fetchedProduct = await client.product.fetch(normalizedId);
        setProduct(fetchedProduct as any);
        setSelectedVariantId((fetchedProduct as any).variants?.[0]?.id || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, toast]);

  const addToCart = async () => {
    const variant = product?.variants.find(v => v.id === selectedVariantId) || product?.variants[0];
    if (!product || !variant) return;

    setAddingToCart(true);
    try {
      // Create checkout
      const checkout = await client.checkout.create();
      
      // Add items to checkout
      const lineItemsToAdd = [{
        variantId: variant.id,
        quantity: 1
      }];

      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      
      // Redirect to checkout
      window.open(updatedCheckout.webUrl, '_blank');
      
      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <Card className="group bg-background border-border overflow-hidden animate-pulse">
        <div className="bg-muted h-40 md:h-64"></div>
        <div className="p-3 md:p-6">
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-6 bg-muted rounded mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-muted rounded w-20"></div>
            <div className="h-9 bg-muted rounded w-16"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!product) {
    return null;
  }

  const mainImage = product.images[0]?.src || '';
  const variant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const price = variant ? `$${variant.price.amount}` : 'N/A';
  const isAvailable = variant?.available || false;

  return (
    <Card className="group bg-background border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={mainImage} 
          alt={product.title}
          className="w-full h-40 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 bg-primary/10 text-primary border-primary/20"
        >
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-6">
        <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
          Vendor: <span className="text-primary">{product.vendor}</span>
        </p>
        <h3 className="text-sm md:text-lg font-semibold text-foreground mb-2 md:mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>
        
        {/* Variant Selector */}
        {product.variants?.length > 1 && (
          <div className="mb-4">
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariantId || product.variants[0].id}
              onVariantChange={setSelectedVariantId}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-2xl font-automotive text-primary">
            {price}
          </span>
          <Button 
            size="sm" 
            onClick={addToCart}
            disabled={!isAvailable || addingToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 text-xs md:text-sm"
          >
            {addingToCart ? 'Adding...' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShopifyProductCard;