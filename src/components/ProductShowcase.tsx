import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product IDs
  const featuredProductIds = ['9928841036069',
  // Toyota Camry front lip splitter
  '9928832876837' // Second product
  ];
  return <section className="relative py-24 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      
      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-sm font-semibold text-primary uppercase tracking-[3px]">Featured Products</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-automotive text-foreground mb-6 tracking-tight leading-tight">
            NEW PRODUCT 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              RELEASE
            </span>
          </h2>
          
          
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-4"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <div className="relative">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 h-full">
              {Array.from({
              length: 8
            }).map((_, i) => <div key={i} className="border-l border-primary/20"></div>)}
            </div>
          </div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {featuredProductIds.map((productId, index) => <div key={`${productId}-${index}`} className="group relative">
                {/* Product Number Badge */}
                <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Main Product Card */}
                <div className="relative bg-gradient-card backdrop-blur-xl border border-border/30 rounded-2xl overflow-hidden hover:border-primary/60 transition-premium shadow-automotive hover:shadow-glow max-h-[400px] h-[400px] flex flex-col">
                  {/* Enhanced Automotive Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-premium"></div>
                  
                  {/* Premium accent lines */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10 p-4 h-full flex flex-col max-h-[400px]">
                    
                    {/* Using existing ShopifyBuyButton component */}
                    {index === 0 ? (
                      <ShopifyBuyButton productId="9928841036069" className="w-full h-full flex flex-col max-h-[350px]" />
                    ) : (
                      <ShopifyBuyButton productId={productId} className="shopify-product-card w-full h-full flex flex-col" />
                    )}
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20 rounded-br-2xl"></div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-24">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl"></div>
            <Button size="lg" className="relative bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90 text-white px-12 py-6 text-lg font-bold tracking-wider shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 border-2 border-primary/20 hover:border-primary/40">
              <span className="flex items-center gap-3">
                VIEW ALL PRODUCTS
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};

// Separate component for the first Shopify product
const ShopifyProductComponent = () => {
  useEffect(() => {
    console.log('ShopifyProductComponent mounted');
    
    const loadShopifyScript = () => {
      console.log('Loading Shopify script...');
      // Check if script already exists
      if (document.getElementById('shopify-buy-script')) {
        console.log('Script already exists, initializing UI');
        initializeShopifyUI();
        return;
      }

      const script = document.createElement('script');
      script.id = 'shopify-buy-script';
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      script.onload = () => {
        console.log('Shopify script loaded successfully');
        initializeShopifyUI();
      };
      script.onerror = () => {
        console.error('Failed to load Shopify script');
      };
      document.head.appendChild(script);
    };

    const initializeShopifyUI = () => {
      console.log('Initializing Shopify UI...');
      console.log('ShopifyBuy available:', !!window.ShopifyBuy);
      
      if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        console.log('Building Shopify client...');
        const client = window.ShopifyBuy.buildClient({
          domain: 'd31c8d-3.myshopify.com',
          storefrontAccessToken: 'd49b034ec729dadfb98376a9f41b7a63',
        });

        console.log('Client built, waiting for UI ready...');
        window.ShopifyBuy.UI.onReady(client).then((ui) => {
          console.log('UI ready, looking for target node...');
          const targetNode = document.getElementById('product-component-1754598975360');
          console.log('Target node found:', !!targetNode);
          console.log('Target node has children:', targetNode?.hasChildNodes());
          
          if (targetNode && !targetNode.hasChildNodes()) {
            console.log('Creating product component...');
            ui.createComponent('product', {
              id: '9928841036069',
              node: targetNode,
              moneyFormat: '%24%7B%7Bamount%7D%7D',
              options: {
                product: {
                  styles: {
                    product: {
                      'max-height': '350px !important',
                      'overflow': 'visible !important',
                      'display': 'flex !important',
                      'flex-direction': 'column !important',
                      '@media (min-width: 601px)': {
                        'max-width': '100% !important',
                        'margin-left': '0px !important',
                        'margin-bottom': '0px !important'
                      }
                    },
                    img: {
                      'max-height': '150px !important',
                      'width': '100% !important',
                      'object-fit': 'cover !important',
                      'border-radius': '8px !important'
                    },
                    title: {
                      'font-size': '1rem !important',
                      'font-weight': '600 !important',
                      'margin': '8px 0 4px 0 !important',
                      'line-height': '1.3 !important'
                    },
                    price: {
                      'font-size': '1.1rem !important',
                      'font-weight': 'bold !important',
                      'color': '#dc2626 !important',
                      'margin': '4px 0 8px 0 !important'
                    },
                    button: {
                      'background-color': '#dc2626 !important',
                      'color': '#ffffff !important',
                      'font-weight': 'bold !important',
                      'padding': '10px 20px !important',
                      'border-radius': '8px !important',
                      'border': 'none !important',
                      'cursor': 'pointer !important',
                      'margin-top': 'auto !important',
                      'width': '100% !important',
                      ':hover': {
                        'background-color': '#991b1b !important'
                      }
                    }
                  },
                  text: {
                    button: 'Add to cart'
                  }
                },
                cart: {
                  text: {
                    total: 'Subtotal',
                    button: 'Checkout'
                  }
                }
              }
            }).then((component) => {
              console.log('Product component created successfully:', component);
            }).catch((error) => {
              console.error('Error creating product component:', error);
            });
          } else {
            console.log('Target node not available or already has content');
          }
        }).catch((error) => {
          console.error('Error with Shopify UI:', error);
        });
      } else {
        console.log('ShopifyBuy or ShopifyBuy.UI not available');
      }
    };

    // Longer delay to ensure DOM is fully ready
    setTimeout(() => {
      console.log('Starting Shopify script load after timeout');
      loadShopifyScript();
    }, 500);
  }, []);

  return (
    <div id="product-component-1754598975360" className="w-full h-full flex flex-col max-h-[350px]">
      <style dangerouslySetInnerHTML={{
        __html: `
          #product-component-1754598975360 .shopify-buy__product {
            max-height: 350px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          #product-component-1754598975360 .shopify-buy__product-img-wrapper {
            max-height: 150px !important;
            overflow: hidden !important;
          }
          #product-component-1754598975360 .shopify-buy__product-img {
            max-height: 150px !important;
            width: 100% !important;
            object-fit: cover !important;
          }
          #product-component-1754598975360 .shopify-buy__btn {
            margin-top: auto !important;
            background-color: #dc2626 !important;
            color: white !important;
            font-weight: bold !important;
            padding: 10px 20px !important;
            border-radius: 8px !important;
          }
        `
      }} />
    </div>
  );
};

export default ProductShowcase;