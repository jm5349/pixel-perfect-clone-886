import client from "@/lib/shopify";

export const analyzeProducts = async (productIds: string[]) => {
  const results = [];
  
  for (const id of productIds) {
    try {
      const formats = [
        `gid://shopify/Product/${id}`,
        id,
        id.replace('gid://shopify/Product/', '')
      ];
      
      let product = null;
      for (const formatId of formats) {
        try {
          product = await (client as any).product?.fetch?.(formatId);
          if (product) break;
        } catch (e) {
          continue;
        }
      }
      
      if (product) {
        results.push({
          id: product.id,
          numericId: id,
          title: product.title,
          vendor: product.vendor,
          productType: product.productType,
          tags: product.tags || []
        });
      } else {
        results.push({
          id: null,
          numericId: id,
          error: 'Product not found'
        });
      }
    } catch (e: any) {
      results.push({
        id: null,
        numericId: id,
        error: e.message || 'Failed to fetch'
      });
    }
  }
  
  return results;
};
