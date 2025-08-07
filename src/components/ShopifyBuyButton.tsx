import React, { useEffect, useRef } from 'react';

interface ShopifyBuyButtonProps {
  productId: string;
  className?: string;
}

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

const ShopifyBuyButton: React.FC<ShopifyBuyButtonProps> = ({ productId, className = '' }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current || !componentRef.current) return;

    const componentId = `product-component-${productId}`;
    componentRef.current.id = componentId;

    const loadShopifyBuyButton = () => {
      const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      
      const initShopifyBuy = () => {
        if (!window.ShopifyBuy) return;
        
        const client = window.ShopifyBuy.buildClient({
          domain: 'd31c8d-3.myshopify.com',
          storefrontAccessToken: 'd49b034ec729dadfb98376a9f41b7a63',
        });

        window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
          const targetNode = document.getElementById(componentId);
          if (!targetNode) return;

          ui.createComponent('product', {
            id: productId,
            node: targetNode,
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              "product": {
                "styles": {
                  "product": {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px"
                    },
                    "text-align": "left",
                    "background-color": "transparent",
                    "border": "none",
                    "padding": "0"
                  },
                  "img": {
                    "width": "100%",
                    "height": "240px",
                    "object-fit": "cover",
                    "border-radius": "12px",
                    "margin-bottom": "16px",
                    "transition": "transform 0.3s ease",
                    "box-shadow": "0 4px 12px rgba(0,0,0,0.1)"
                  },
                  "title": {
                    "font-family": "var(--font-automotive), -apple-system, BlinkMacSystemFont, sans-serif",
                    "font-weight": "600",
                    "font-size": "16px",
                    "line-height": "1.4",
                    "color": "hsl(var(--foreground))",
                    "margin-bottom": "12px",
                    "display": "-webkit-box",
                    "-webkit-line-clamp": "2",
                    "-webkit-box-orient": "vertical",
                    "overflow": "hidden",
                    "min-height": "44px"
                  },
                  "price": {
                    "font-family": "var(--font-automotive), -apple-system, BlinkMacSystemFont, sans-serif",
                    "font-size": "24px",
                    "font-weight": "700",
                    "color": "hsl(var(--primary))",
                    "margin-bottom": "20px"
                  },
                  "compareAt": {
                    "font-size": "14px",
                    "color": "hsl(var(--muted-foreground))",
                    "text-decoration": "line-through",
                    "margin-left": "8px"
                  },
                  "button": {
                    "background": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 100%)",
                    "color": "white",
                    "border": "2px solid hsl(var(--primary))",
                    "border-radius": "12px",
                    "padding": "14px 28px",
                    "font-size": "16px",
                    "font-weight": "600",
                    "cursor": "pointer",
                    "width": "100%",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.5px",
                    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "box-shadow": "0 4px 14px 0 hsl(var(--primary)/0.3), 0 2px 4px 0 rgba(0,0,0,0.1)",
                    "position": "relative",
                    "overflow": "hidden",
                    ":hover": {
                      "background": "linear-gradient(135deg, hsl(var(--primary)/0.9) 0%, hsl(var(--primary)/0.7) 100%)",
                      "transform": "translateY(-2px) scale(1.02)",
                      "box-shadow": "0 8px 25px 0 hsl(var(--primary)/0.4), 0 4px 8px 0 rgba(0,0,0,0.15)",
                      "border-color": "hsl(var(--primary)/0.8)"
                    },
                    ":active": {
                      "transform": "translateY(0) scale(0.98)"
                    },
                    ":focus": {
                      "outline": "none",
                      "box-shadow": "0 0 0 3px hsl(var(--primary)/0.3), 0 4px 14px 0 hsl(var(--primary)/0.3)"
                    }
                  }
                },
                "contents": {
                  "img": true,
                  "title": true,
                  "price": true,
                  "description": false
                },
                "text": {
                  "button": "Add to Cart"
                }
              },
              "productSet": {
                "styles": {
                  "products": {
                    "@media (min-width: 601px)": {
                      "margin-left": "0px"
                    }
                  }
                }
              },
              "modalProduct": {
                "contents": {
                  "img": false,
                  "imgWithCarousel": true,
                  "button": false,
                  "buttonWithQuantity": true
                },
                "styles": {
                  "product": {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px"
                    }
                  }
                },
                "text": {
                  "button": "Add to Cart"
                }
              },
              "option": {},
              "cart": {
                "text": {
                  "total": "Subtotal",
                  "button": "Checkout"
                },
                "popup": false,
                "styles": {
                  "button": {
                    "background-color": "hsl(var(--primary))",
                    "color": "hsl(var(--primary-foreground))",
                    ":hover": {
                      "background-color": "hsl(var(--primary) / 0.9)"
                    }
                  }
                }
              },
              "toggle": {
                "styles": {
                  "toggle": {
                    "background-color": "hsl(var(--primary))",
                    "color": "hsl(var(--primary-foreground))",
                    ":hover": {
                      "background-color": "hsl(var(--primary) / 0.9)"
                    }
                  }
                }
              }
            },
          });
        });
      };

      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          initShopifyBuy();
        } else {
          const script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          script.onload = initShopifyBuy;
          document.head.appendChild(script);
        }
      } else {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        script.onload = initShopifyBuy;
        document.head.appendChild(script);
      }

      scriptLoadedRef.current = true;
    };

    loadShopifyBuyButton();
  }, [productId]);

  return <div ref={componentRef} className={className}></div>;
};

export default ShopifyBuyButton;