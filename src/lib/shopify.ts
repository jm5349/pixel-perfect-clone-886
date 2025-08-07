import Client from 'shopify-buy';

// Your actual Shopify store credentials
const client = Client.buildClient({
  domain: 'd31c8d-3.myshopify.com',
  storefrontAccessToken: 'd49b034ec729dadfb98376a9f41b7a63'
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