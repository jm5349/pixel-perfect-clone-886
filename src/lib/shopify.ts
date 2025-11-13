import Client from 'shopify-buy';

// Your actual Shopify store credentials
const client = Client.buildClient({
  domain: 'd31c8d-3.myshopify.com',
  storefrontAccessToken: 'd49b034ec729dadfb98376a9f41b7a63'
});

export default client;

// Custom query to fetch product with media (videos)
export const PRODUCT_WITH_MEDIA_QUERY = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      handle
      vendor
      productType
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      media(first: 10) {
        edges {
          node {
            mediaContentType
            alt
            ... on Video {
              sources {
                url
                mimeType
              }
              previewImage {
                url
              }
            }
            ... on ExternalVideo {
              embedUrl
              previewImage {
                url
              }
            }
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export async function fetchProductWithMedia(productId: string) {
  const response = await fetch(
    `https://d31c8d-3.myshopify.com/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'd49b034ec729dadfb98376a9f41b7a63'
      },
      body: JSON.stringify({
        query: PRODUCT_WITH_MEDIA_QUERY,
        variables: { id: productId }
      })
    }
  );
  
  const data = await response.json();
  return data.data?.product;
}

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