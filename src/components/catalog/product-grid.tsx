// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Product Card with Fixed Routing)

"use client";

import React from "react";
import Link from "next/link";

export interface Product {
  slug: string;
  name: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-[#0E1116] border border-[#262B36] rounded-xl overflow-hidden flex flex-col hover:border-[#FFC700]/40 transition-colors group shadow-lg">
      <div className="bg-[#050507] h-56 w-full relative flex items-center justify-center p-6 border-b border-[#262B36]">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#FFC700]/10 text-[#FFC700] border border-[#FFC700]/30 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest z-10">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-widest bg-[#262B36]/60 text-gray-400 px-2 py-1 rounded border border-[#262B36]">
          3D View Available
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
        <div>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            {product.category || "Heavy Machinery"}
          </span>
          <h3 className="text-sm font-bold text-white uppercase leading-snug mt-1 mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-[#FFC700] font-mono text-sm font-bold">{product.price}</p>
            <span className="text-gray-600 text-[10px] uppercase">/ Unit</span>
          </div>
        </div>

        {/* FIXED LINK: Now routes properly to /products/[slug] */}
        <Link
          href={`/products/${product.slug}`}
          className="block w-full text-center bg-[#1A1D24] text-white hover:bg-[#FFC700] hover:text-black uppercase text-[10px] font-bold tracking-widest py-3 rounded-lg transition-colors shadow-md"
        >
          View Machine →
        </Link>
      </div>
    </div>
  );
}