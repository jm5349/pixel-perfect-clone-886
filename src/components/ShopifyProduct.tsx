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
    const fetchProduct = async () => {
      try {
        // Convert numeric ID to base64-encoded GID format
        let productIdToFetch = productId;
        
        // If it's a plain numeric ID, convert to base64-encoded GID
        if (/^\d+$/.test(productId)) {
          productIdToFetch = btoa(`gid://shopify/Product/${productId}`);
        }
        
        const fetchedProduct = await client.product.fetch(productIdToFetch);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct as any);
          setSelectedVariantId((fetchedProduct as any).variants?.[0]?.id || null);
        } else {
          console.error('Product not found:', productId);
        }
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
          alt={`${product.title} product image`}
          loading="lazy"
          decoding="async"
          className="w-full h-64 md:h-64 object-contain md:object-cover bg-muted p-2 transition-transform duration-700 md:group-hover:scale-105"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-primary/10 text-primary border-primary/20 text-xs"
        >
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <p className="text-xs md:text-sm text-muted-foreground font-medium">
          Vendor: <span className="text-primary font-semibold">{product.vendor}</span>
        </p>
        <h3 className="text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>
        
        {/* Variant Selector */}
        {product.variants?.length > 1 && (
          <div className="mb-3 md:mb-4">
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariantId || product.variants[0].id}
              onVariantChange={setSelectedVariantId}
            />
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <span className="text-xl md:text-2xl font-automotive text-primary">
            {price}
          </span>
          <Button 
            size="sm" 
            onClick={addToCart}
            disabled={!isAvailable || addingToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:transform md:translate-x-4 md:group-hover:translate-x-0 text-sm w-full sm:w-auto"
          >
            {addingToCart ? 'Adding...' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShopifyProductCard;