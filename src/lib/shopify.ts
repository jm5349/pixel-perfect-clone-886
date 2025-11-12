import Client from 'shopify-buy';

// Your actual Shopify store credentials
const client = Client.buildClient({
  domain: 'pixel-perfect-clone-886-bjhhb.myshopify.com',
  storefrontAccessToken: '6469c791d394e23f61342d800848312c'
});

export default client;

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    src: string;
    altText?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    available: boolean;
  }>;
  vendor: string;
  productType: string;
}