import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '@/lib/shopify';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BusinessInfo from '@/components/BusinessInfo';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

interface CartItem {
  id: string;
  title: string;
  quantity: number;
  variant: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      src: string;
    };
  };
}

const formatCurrency = (amount: string, code: string) => {
  const value = Number(amount);
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code || 'USD'
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
};

const Cart = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    const storedCheckoutId = localStorage.getItem('shopify_checkout_id');
    
    if (!storedCheckoutId) {
      setLoading(false);
      setCartItems([]);
      return;
    }

    try {
      const checkout = await client.checkout.fetch(storedCheckoutId);
      
      if ((checkout as any).completedAt) {
        localStorage.removeItem('shopify_checkout_id');
        setCartItems([]);
        setCheckoutUrl(null);
        setCheckoutId(null);
      } else {
        const items = ((checkout as any).lineItems || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          variant: {
            id: item.variant.id,
            title: item.variant.title,
            price: item.variant.price,
            image: item.variant.image
          }
        }));
        
        setCartItems(items);
        setCheckoutUrl((checkout as any).webUrl);
        setCheckoutId(storedCheckoutId);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (lineItemId: string, newQuantity: number) => {
    if (!checkoutId || newQuantity < 1) return;
    
    setUpdating(lineItemId);
    try {
      await client.checkout.updateLineItems(checkoutId, [
        { id: lineItemId, quantity: newQuantity }
      ]);
      
      await fetchCart();
      window.dispatchEvent(new Event('cart-updated'));
      
      toast({
        title: "Cart updated",
        description: "Quantity updated successfully"
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (lineItemId: string) => {
    if (!checkoutId) return;
    
    setUpdating(lineItemId);
    try {
      await client.checkout.removeLineItems(checkoutId, [lineItemId]);
      
      await fetchCart();
      window.dispatchEvent(new Event('cart-updated'));
      
      toast({
        title: "Item removed",
        description: "Item removed from cart"
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    } finally {
      setUpdating(null);
    }
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + (Number(item.variant.price.amount) * item.quantity);
  }, 0);

  const currencyCode = cartItems[0]?.variant.price.currencyCode || 'USD';

  if (loading) {
    return (
      <>
        <Header />
        <BusinessInfo />
        <div className="relative z-[1000]">
          <SearchBar />
        </div>
        <main className="min-h-screen bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-muted animate-pulse rounded w-48 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <BusinessInfo />
      <div className="relative z-[1000]">
        <SearchBar />
      </div>
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
              <h1 className="text-3xl md:text-4xl font-automotive text-foreground">
                Shopping Cart
              </h1>
            </div>

            {cartItems.length === 0 ? (
              <Card className="p-12 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-automotive text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Add some items to get started
                </p>
                <Button asChild>
                  <Link to="/">Browse Products</Link>
                </Button>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                          {item.variant.image ? (
                            <img 
                              src={item.variant.image.src} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          {item.variant.title !== 'Default Title' && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.variant.title}
                            </p>
                          )}
                          <p className="text-primary font-medium">
                            {formatCurrency(item.variant.price.amount, item.variant.price.currencyCode)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center border border-border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={updating === item.id || item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={updating === item.id}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                              disabled={updating === item.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-medium text-foreground">
                            {formatCurrency(
                              (Number(item.variant.price.amount) * item.quantity).toString(),
                              item.variant.price.currencyCode
                            )}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="p-6 sticky top-4">
                    <h2 className="text-xl font-automotive text-foreground mb-4">
                      Order Summary
                    </h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>{formatCurrency(subtotal.toString(), currencyCode)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-medium text-foreground mb-6">
                      <span>Total</span>
                      <span>{formatCurrency(subtotal.toString(), currencyCode)}</span>
                    </div>

                    <Button 
                      className="w-full mb-3" 
                      size="lg"
                      onClick={() => checkoutUrl && window.open(checkoutUrl, '_blank')}
                    >
                      Proceed to Checkout
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link to="/">Continue Shopping</Link>
                    </Button>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        Secure checkout powered by Shopify
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
