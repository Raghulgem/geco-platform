// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial

import React from "react";
import ProductCard, { Product } from "@/components/ui/product-card";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {products?.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))
      ) : (
        /* Empty State Fallback (If filters yield no results) */
        <div className="col-span-full py-24 flex flex-col items-center justify-center border border-dashed border-[#262B36] rounded-lg bg-[#14171D]/50">
          <span className="text-4xl grayscale opacity-50 mb-4">⚙️</span>
          <p className="text-[#9CA3AF] font-mono text-sm uppercase tracking-widest animate-pulse-slow">
            No machinery found matching this specification.
          </p>
        </div>
      )}
    </div>
  );
}