// Lead Developer: Raghul 
// Location: src/app/products/[slug]/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import FrameScroller from "@/components/3d-engine/FrameScroller"; 
import ParticleBackground from "@/components/ui/particle-background";

const productData: Record<string, any> = {
  "bucket-sand-washing": {
    name: "Bucket Sand Washing Machine",
    price: "₹ 18.00 LAKH / Unit",
    capacity: "50-100 TPH",
    type: "Sand Washer",
    desc: "Provides both M-sand and P-sand output with inbuilt planetary gearbox.",
    frames: 75, 
  },
  "vibrating-screen-14x4": {
    name: "GECO Vibrating Screen 14 x 4",
    price: "₹ 8.00 LAKH / Unit",
    capacity: "Varies",
    type: "Vibrating Screen",
    desc: "High-frequency screening for precise material separation.",
    frames: 83, 
  },
  "secondary-jaw-30x10": {
    name: "Secondary Jaw Crusher 30x10",
    price: "₹ 13.00 LAKH / Piece",
    capacity: "20–50 TPH",
    type: "Jaw Crusher",
    desc: "Optimized for recycling, construction, and heavy stone crushing.",
    frames: 77, 
  },
  "horizontal-shaft-impactor": {
    name: "Horizontal Shaft Impactor 100 TPH",
    price: "₹ 16.50 LAKH / Piece",
    capacity: "100 TPH",
    type: "Impact Crusher",
    desc: "Features a 760mm rotor size for maximum impact efficiency.",
    frames: 87, 
  },
  "cone-crusher-200tph": {
    name: "Cone Crusher Manufacturer 200 TPH",
    price: "₹ 60.00 LAKH / Piece",
    capacity: "200 TPH",
    type: "Cone Crusher",
    desc: "Heavy-duty secondary crushing for the toughest granite and ores.",
    frames: 75, 
  },
  "stone-crusher-30x08": {
    name: "Stone Crusher 30 x 08",
    price: "₹ 12.60 LAKH / Piece",
    capacity: "50 TPH",
    type: "Jaw Crusher",
    desc: "Features a 150x250 mm jaw opening size for primary stage crushing.",
    frames: 75, 
  },
  "stone-crusher-plant": {
    name: "Mobile Stone Crusher Plant",
    price: "₹ 80.00 LAKH / Piece",
    capacity: "50–100 TPH",
    type: "Mobile Crushing Plant",
    desc: "Wheel-mounted chassis for rapid deployment across quarry sites.",
    frames: 86, 
  },
  "vibrating-screen-machine": {
    name: "Vibrating Screen Machine",
    price: "₹ 13.50 LAKH / Piece",
    capacity: "Custom",
    type: "Vibrating Screen",
    desc: "Built for extreme load capacities and continuous operational sorting.",
    frames: 83, 
  },
  "impact-crusher": {
    name: "Impact Crusher",
    price: "₹ 15.00 LAKH / Piece",
    capacity: "100-150 TPH",
    type: "Impact Crusher",
    desc: "Heavy-duty impact crusher engineered for extreme durability and high-performance material reduction.",
    frames: 100, 
  }
};

export default function ProductScrollerPage({ params }: { params: { slug: string } }) {
  const product = productData[params.slug];

  if (!product) {
    notFound();
  }

  const [wheelProgress, setWheelProgress] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      setWheelProgress((prev) => {
        const delta = e.deltaY / 2500; 
        const next = prev + delta;
        return Math.max(0, Math.min(1, next)); 
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <main className="bg-[#0A0B0E] text-[#F3F4F6] fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between select-none">
      
      {/* FULL SCREEN FIXED CANVAS BACKGROUND */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <FrameScroller 
          folderPath={`/sequences/${params.slug}`} 
          frameCount={product.frames} 
          customProgress={wheelProgress} 
        />
      </div>

      {/* AMBIENT PARTICLE BACKGROUND LAYER */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-60">
        <ParticleBackground />
      </div>

      {/* VIGNETTE OVERLAY */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_25%,#0A0B0E_88%)]" />

      {/* HEADER SECTION */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-4 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-2">
          <Link href="/products" className="text-gray-500 hover:text-[#FFC700] text-xs font-mono uppercase tracking-widest transition-colors mr-4">
            ← Back to Catalog
          </Link>
          <span className="w-2 h-2 rounded-full bg-[#FFC700] animate-pulse"></span>
          <span className="text-[11px] font-mono text-gray-400 tracking-widest uppercase hidden sm:block">
            Stationary Telemetry // Active
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#FFC700] border border-[#FFC700]/30 px-3 py-0.5 rounded-full bg-[#FFC700]/5">
          SEC-01 // EXPLODED VIEW
        </span>
      </header>

      {/* LOWER INTERACTIVE HUD CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-6 flex flex-col md:flex-row justify-between items-end pointer-events-none">
        
        {/* PRODUCT CARD */}
        <div className="bg-[#0E1116]/90 backdrop-blur-xl border border-[#262B36] p-4 md:p-5 rounded-xl shadow-2xl max-w-[340px] w-full relative overflow-hidden group hover:border-[#FFC700]/40 transition-all pointer-events-auto">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FFC700]/10 rounded-full blur-3xl pointer-events-none"></div>

          <span className="inline-block text-[#FFC700] text-[10px] font-bold uppercase tracking-widest border border-[#FFC700]/40 px-2 py-0.5 rounded bg-[#FFC700]/10 mb-1.5">
            {product.type}
          </span>
          
          <h1 className="text-base md:text-lg font-black uppercase tracking-tight text-white mb-1 font-sans leading-snug">
            {product.name}
          </h1>
          
          <p className="text-gray-400 text-[11px] mb-3 leading-relaxed line-clamp-2">
            {product.desc}
          </p>

          <div className="space-y-1.5 mb-3 border-t border-[#262B36] pt-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Capacity</span>
              <span className="font-mono text-white font-bold text-xs">{product.capacity}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Base Price</span>
              <span className="font-mono text-[#FFC700] font-bold text-xs">{product.price}</span>
            </div>
          </div>

          <Link 
            href="/contact"
            className="block w-full text-center bg-[#FFC700] hover:bg-yellow-400 text-black font-extrabold uppercase tracking-widest py-2 rounded-lg transition-all shadow-md shadow-[#FFC700]/10 text-xs"
          >
            Get Best Quote →
          </Link>
        </div>

        {/* WHEEL SCRUBBING MONITOR */}
        <div className="bg-[#0E1116]/85 backdrop-blur-md border border-[#262B36] px-4 py-2.5 rounded-xl flex flex-col items-center gap-1 max-w-[240px] w-full shadow-xl pointer-events-auto mt-4 md:mt-0">
          <div className="flex justify-between w-full text-[9px] font-mono text-gray-400 uppercase tracking-widest">
            <span>Assembled</span>
            <span className="text-[#FFC700]">Scroll Control</span>
            <span>Exploded</span>
          </div>
          <div className="w-full bg-[#262B36] h-1 rounded-lg overflow-hidden relative">
            <div 
              className="bg-[#FFC700] h-full transition-all duration-75"
              style={{ width: `${wheelProgress * 100}%` }}
            ></div>
          </div>
          <span className="text-[9px] font-mono text-gray-500">Roll mouse wheel to animate</span>
        </div>

      </div>

    </main>
  );
}