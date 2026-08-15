// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial

import React from "react";
import Link from "next/link";

export type Product = {
  name: string;
  price: string;
  slug: string;
  isFlagship: boolean;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#14171D] border border-[#262B36] rounded-lg overflow-hidden hover:border-[#FFC700] transition-all group flex flex-col relative shadow-lg">
      
      {/* Dynamic Badge */}
      {product.isFlagship ? (
        <span className="absolute top-3 left-3 bg-black text-[#FFC700] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 border border-[#FFC700]/30 shadow-md">
          3D Scroller
        </span>
      ) : (
        <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 border border-[#262B36] shadow-md">
          3D Interactive
        </span>
      )}

      {/* 3D Viewer / Sequence Image Placeholder */}
      <div className="bg-[#0A0B0E] h-56 w-full relative flex items-center justify-center p-4 border-b border-[#262B36]">
        <div className="w-full h-full border border-[#262B36] border-dashed rounded flex flex-col items-center justify-center text-[#262B36] group-hover:border-[#FFC700]/30 group-hover:bg-[#FFC700]/5 transition-colors">
          <span className="text-3xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
            {product.isFlagship ? "🏭" : "⚙️"}
          </span>
          <span className="font-mono text-xs opacity-50">
            {product.isFlagship ? `[ sequence: ${product.slug} ]` : `[ model: ${product.slug}.glb ]`}
          </span>
        </div>
      </div>

      {/* Minimalist Data Section */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-5">
        <div>
          <h3 className="text-md font-bold text-white uppercase leading-snug mb-1 group-hover:text-[#FFC700] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#FFC700] font-mono text-sm font-bold">
            {product.price}
          </p>
        </div>
        
        {/* Dynamic Action Button */}
        {product.isFlagship ? (
          <Link 
            href={`/products/${product.slug}`}
            className="block w-full text-center bg-[#262B36] text-white hover:bg-[#FFC700] hover:text-black uppercase text-xs font-bold tracking-widest py-3 rounded transition-colors"
          >
            Inspect Machine →
          </Link>
        ) : (
          <Link 
            href="/contact"
            className="block w-full text-center border border-[#262B36] text-[#9CA3AF] hover:text-[#FFC700] hover:border-[#FFC700] uppercase text-xs font-bold tracking-widest py-3 rounded transition-colors"
          >
            Request Quote
          </Link>
        )}
      </div>
    </div>
  );
}