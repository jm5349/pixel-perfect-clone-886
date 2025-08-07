import Client from 'shopify-buy';

// Replace with your shop's domain and storefront access token
const client = Client.buildClient({
  domain: 'your-shop-name.myshopify.com', // Replace with your shop domain
  storefrontAccessToken: 'your-storefront-access-token' // Replace with your token
});

export default client;

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
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