import { useEffect, useState } from "react";
import { analyzeProducts } from "@/utils/analyzeProducts";

const productIds = [
  '10199197810981',
  '10199197712677',
  '10199197679909',
  '10199197548837',
  '10199197352229'
];

export default function AnalyzeProducts() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeProducts(productIds).then((data) => {
      console.log('=== PRODUCT ANALYSIS ===');
      data.forEach((product, index) => {
        console.log(`\n[${index + 1}] Product ID: ${product.numericId}`);
        if (product.error) {
          console.log(`   ERROR: ${product.error}`);
        } else {
          console.log(`   Title: ${product.title}`);
          console.log(`   Vendor: ${product.vendor}`);
          console.log(`   Product Type: ${product.productType}`);
          console.log(`   Tags: ${product.tags?.join(', ')}`);
        }
      });
      console.log('\n=== END ANALYSIS ===');
      setResults(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8">Analyzing products...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Product Analysis Results</h1>
      
      {results.map((product, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-2">
          <div className="font-semibold">Product ID: {product.numericId}</div>
          {product.error ? (
            <div className="text-red-500">ERROR: {product.error}</div>
          ) : (
            <>
              <div><strong>Title:</strong> {product.title}</div>
              <div><strong>Vendor:</strong> {product.vendor}</div>
              <div><strong>Product Type:</strong> {product.productType}</div>
              <div><strong>Tags:</strong> {product.tags?.join(', ')}</div>
              
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <div className="font-semibold mb-2">Suggested Collection:</div>
                <div className="text-sm">
                  {product.vendor === 'Yofer Design' ? '✓ yofer-design' : ''}
                  {product.vendor === 'GF Bodykit' ? '✓ gf-bodykit' : ''}
                  {product.productType === 'Mirror Caps' ? '✓ mirror-caps' : ''}
                  {product.productType === 'Trunk Spoiler' ? '✓ spoilers' : ''}
                  {product.productType === 'Mirror Running Light' ? '✓ drls-and-others' : ''}
                  {product.productType && !['Mirror Caps', 'Trunk Spoiler', 'Mirror Running Light'].includes(product.productType) ? '✓ body-kits' : ''}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
