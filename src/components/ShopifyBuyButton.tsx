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

    const componentId = `product-component-${productId}-${Date.now()}-${Math.random()}`;
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
          if (targetNode.hasChildNodes()) {
            targetNode.innerHTML = '';
          }

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
                    "height": "260px",
                    "object-fit": "contain",
                    "background-color": "hsl(var(--muted))",
                    "border-radius": "12px",
                    "margin-bottom": "16px",
                    "padding": "8px",
                    "transition": "transform 0.3s ease",
                    "box-shadow": "0 4px 12px rgba(0,0,0,0.1)"
                  },
                  "title": {
                      "font-family": "inherit",
                    "font-weight": "600",
                    "font-size": "16px",
                    "line-height": "1.4",
                      "color": "#ffffff",
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
                    "color": "#dc2626",
                    "margin-bottom": "20px"
                  },
                  "compareAt": {
                    "font-size": "14px",
                    "color": "hsl(var(--muted-foreground))",
                    "text-decoration": "line-through",
                    "margin-left": "8px"
                  },
                    "button": {
                      "background": "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
                      "color": "white",
                      "border": "2px solid #dc2626",
                      "border-radius": "12px",
                      "padding": "16px 32px",
                      "font-size": "16px",
                      "font-weight": "700",
                      "cursor": "pointer",
                      "width": "100%",
                      "text-transform": "uppercase",
                      "letter-spacing": "1px",
                      "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "box-shadow": "0 6px 20px 0 rgba(220, 38, 38, 0.4), 0 2px 6px 0 rgba(0,0,0,0.1)",
                      "margin-top": "auto",
                      "min-height": "56px",
                      ":hover": {
                        "background": "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
                        "transform": "translateY(-3px) scale(1.02)",
                        "box-shadow": "0 10px 30px 0 rgba(220, 38, 38, 0.5), 0 4px 12px 0 rgba(0,0,0,0.15)",
                        "border-color": "#ef4444"
                      },
                      ":active": {
                        "transform": "translateY(-1px) scale(0.98)"
                      },
                      ":focus": {
                        "outline": "none",
                        "box-shadow": "0 0 0 4px rgba(220, 38, 38, 0.3), 0 6px 20px 0 rgba(220, 38, 38, 0.4)"
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
              "option": {
                "styles": {
                  "label": {
                    "font-family": "inherit",
                    "font-size": "15px",
                    "font-weight": "700",
                    "color": "#ffffff",
                    "margin-bottom": "12px",
                    "display": "block",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.5px"
                  },
                  "select": {
                    "font-family": "inherit",
                    "font-size": "15px",
                    "font-weight": "600",
                    "padding": "14px 20px",
                    "border": "2px solid #dc2626",
                    "border-radius": "10px",
                    "background": "linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.05) 100%)",
                    "color": "#ffffff",
                    "width": "100%",
                    "cursor": "pointer",
                    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "margin-bottom": "20px",
                    "appearance": "none",
                    "background-image": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath fill='%23dc2626' stroke='%23dc2626' stroke-width='1' d='M12.293 4.293L7 9.586 1.707 4.293A1 1 0 00.293 5.707l6 6a1 1 0 001.414 0l6-6a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E\")",
                    "background-repeat": "no-repeat",
                    "background-position": "right 16px center, left top",
                    "padding-right": "48px",
                    "box-shadow": "0 4px 12px rgba(220, 38, 38, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                    ":hover": {
                      "border-color": "#ef4444",
                      "background": "linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%)",
                      "box-shadow": "0 6px 20px rgba(220, 38, 38, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.15)",
                      "transform": "translateY(-2px)"
                    },
                    ":focus": {
                      "outline": "none",
                      "border-color": "#ef4444",
                      "background": "linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.15) 100%)",
                      "box-shadow": "0 0 0 4px rgba(220, 38, 38, 0.2), 0 6px 20px rgba(220, 38, 38, 0.4)"
                    }
                  }
                }
              },
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

    return () => {
      if (componentRef.current) {
        componentRef.current.innerHTML = '';
      }
    };
  }, [productId]);

  return <div ref={componentRef} className={className}></div>;
};

export default ShopifyBuyButton;