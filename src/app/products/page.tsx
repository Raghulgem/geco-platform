// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Catalog Page with Particle Background)
// Location: src/app/products/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ui/particle-background";

// Cleaned up catalog containing only the fully rendered 3D flagship machines
const catalogItems = [
  { 
    name: "GECO Vibrating Screen 14 x 4", 
    price: "₹ 8.00 LAKH", 
    slug: "vibrating-screen-14x4", 
    isFlagship: true,
    thumb: "/sequences/vibrating-screen-14x4/001.png" 
  },
  { 
    name: "Bucket Sand Washing Machine", 
    price: "₹ 18.00 LAKH", 
    slug: "bucket-sand-washing", 
    isFlagship: true,
    thumb: "/sequences/bucket-sand-washing/001.png" 
  },
  { 
    name: "Secondary Jaw Crusher 30x10", 
    price: "₹ 13.00 LAKH", 
    slug: "secondary-jaw-30x10", 
    isFlagship: true, 
    thumb: "/sequences/secondary-jaw-30x10/001.png" 
  },
  { 
    name: "Cone Crusher 200 TPH", 
    price: "₹ 60.00 LAKH", 
    slug: "cone-crusher-200tph", 
    isFlagship: true, 
    thumb: "/sequences/cone-crusher-200tph/001.png"
  },
  { 
    name: "Horizontal Shaft Impactor", 
    price: "₹ 16.50 LAKH", 
    slug: "horizontal-shaft-impactor", 
    isFlagship: true, 
    thumb: "/sequences/horizontal-shaft-impactor/001.png" 
  },
  { 
    name: "Mobile Stone Crusher Plant", 
    price: "₹ 80.00 LAKH", 
    slug: "stone-crusher-plant", 
    isFlagship: true, 
    thumb: "/sequences/stone-crusher-plant/001.png" 
  },
  { 
    name: "Impact Crusher", 
    price: "₹ 15.00 LAKH", 
    slug: "impact-crusher", 
    isFlagship: true, 
    thumb: "/sequences/impact-crusher/001.png" 
  }
];

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0E]/85 text-[#F3F4F6] pt-24 pb-16 px-6 relative z-10">
      
      {/* GLOBAL PARTICLE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Catalog Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#262B36] pb-6">
          <div>
            <h1 className="text-4xl font-extrabold uppercase tracking-wider font-sans mb-2">
              Product <span className="text-[#FFC700]">Catalog</span>
            </h1>
            <p className="text-[#9CA3AF] text-sm">
              Explore our full range of heavy-duty machinery and precision spare parts.
            </p>
          </div>

          {/* Simple UI Filter Bar */}
          <div className="flex w-full md:w-auto gap-3">
            <select className="bg-[#14171D] border border-[#262B36] text-[#9CA3AF] text-sm rounded px-4 py-2 focus:outline-none focus:border-[#FFC700]">
              <option>All Categories</option>
              <option>Crushers</option>
              <option>Washing Plants</option>
            </select>
            <button className="bg-[#262B36] hover:bg-[#323846] text-white px-4 py-2 rounded text-sm transition-colors">
              Filter ⚙️
            </button>
          </div>
        </div>

        {/* Product Grid - Restructured to a perfect 3-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {catalogItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#14171D] border border-[#262B36] rounded-lg overflow-hidden hover:border-[#FFC700] transition-all group flex flex-col relative shadow-lg"
            >
              {/* Product Badge */}
              {item.isFlagship && (
                <span className="absolute top-3 left-3 bg-black text-[#FFC700] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10 border border-[#FFC700]/30 shadow-md">
                  3D View Available
                </span>
              )}

              {/* 3D Viewer / Image Area */}
              <div className="bg-[#0A0B0E] h-56 w-full relative flex items-center justify-center p-4 border-b border-[#262B36] overflow-hidden">
                {item.thumb ? (
                  <img 
                    src={item.thumb} 
                    alt={item.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full border border-[#262B36] border-dashed rounded flex flex-col items-center justify-center text-[#262B36] group-hover:border-[#FFC700]/30 transition-colors">
                    <span className="text-2xl mb-1">{item.isFlagship ? "🏭" : "⚙️"}</span>
                    <span className="font-mono text-xs opacity-50">Viewport Loaded</span>
                  </div>
                )}
              </div>

              {/* Minimalist Card Content (No Descriptions) */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-5">
                <div>
                  <h3 className="text-md font-bold text-white uppercase leading-snug mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[#FFC700] font-mono text-sm font-bold">
                    {item.price}
                  </p>
                </div>
                
                {/* Action Buttons */}
                {item.isFlagship ? (
                  <Link 
                    href={`/products/${item.slug}`}
                    className="block w-full text-center bg-[#262B36] text-white hover:bg-[#FFC700] hover:text-black uppercase text-xs font-bold tracking-widest py-3 rounded transition-colors"
                  >
                    View Machine →
                  </Link>
                ) : (
                  <Link 
                    href="/contact"
                    className="block w-full text-center border border-[#262B36] text-[#9CA3AF] hover:text-[#FFC700] hover:border-[#FFC700] uppercase text-xs font-bold tracking-widest py-3 rounded transition-colors"
                  >
                    Get Quote
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}