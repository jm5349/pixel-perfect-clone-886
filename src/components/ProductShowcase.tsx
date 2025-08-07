import React from 'react';

import ShopifyBuyButton from './ShopifyBuyButton';
const ProductShowcase = () => {
  // Your actual Shopify product IDs
  const featuredProductIds = ['9928841036069',
  // Toyota Camry front lip splitter
  '9928832876837' // Second product
  ];
  return (
    <>
      {featuredProductIds.map((productId, index) => (
        <ShopifyBuyButton key={`${productId}-${index}`} productId={productId} />
      ))}
    </>
  );
};
export default ProductShowcase;