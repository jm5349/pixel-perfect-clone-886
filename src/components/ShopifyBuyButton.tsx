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
                    "height": "200px",
                    "object-fit": "cover",
                    "border-radius": "8px",
                    "margin-bottom": "12px"
                  },
                  "title": {
                    "font-family": "var(--font-automotive), -apple-system, BlinkMacSystemFont, sans-serif",
                    "font-weight": "600",
                    "font-size": "14px",
                    "line-height": "1.4",
                    "color": "hsl(var(--foreground))",
                    "margin-bottom": "8px",
                    "display": "-webkit-box",
                    "-webkit-line-clamp": "2",
                    "-webkit-box-orient": "vertical",
                    "overflow": "hidden"
                  },
                  "price": {
                    "font-family": "var(--font-automotive), -apple-system, BlinkMacSystemFont, sans-serif",
                    "font-size": "18px",
                    "font-weight": "700",
                    "color": "hsl(var(--primary))",
                    "margin-bottom": "12px"
                  },
                  "compareAt": {
                    "font-size": "14px",
                    "color": "hsl(var(--muted-foreground))",
                    "text-decoration": "line-through",
                    "margin-left": "8px"
                  },
                  "button": {
                    "background-color": "hsl(var(--primary))",
                    "color": "hsl(var(--primary-foreground))",
                    "border": "none",
                    "border-radius": "6px",
                    "padding": "10px 20px",
                    "font-size": "14px",
                    "font-weight": "500",
                    "cursor": "pointer",
                    "width": "100%",
                    "transition": "all 0.2s ease",
                    ":hover": {
                      "background-color": "hsl(var(--primary) / 0.9)",
                      "transform": "translateY(-1px)"
                    },
                    ":focus": {
                      "outline": "2px solid hsl(var(--ring))",
                      "outline-offset": "2px"
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