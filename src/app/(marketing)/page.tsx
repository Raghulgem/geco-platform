// Lead Developer: Raghul 
// Theme: Dark Cyber-Industrial (Restored Homepage)
// Location: src/app/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
// We keep the import but removed the background preloader useEffect
// to keep your homepage lightweight and fast.

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Transmission successful! Inquiry routed to Geco Grinding Centre.");
    }, 1000);
  };

  const featuredProducts = [
    { name: "Jaw Crusher 30 x 10", price: "₹ 13.00 LAKH", image: "/sequences/secondary-jaw-30x10/001.png", slug: "secondary-jaw-30x10", badge: "Best Seller" },
    { name: "Bucket Sand Washing Machine", price: "₹ 18.00 LAKH", image: "/sequences/bucket-sand-washing/001.png", slug: "bucket-sand-washing" },
    { name: "Cone Crusher 200 TPH", price: "₹ 60.00 LAKH", image: "/sequences/cone-crusher-200tph/001.png", slug: "cone-crusher-200tph" },
    { name: "Horizontal Shaft Impactor", price: "₹ 16.50 LAKH", image: "/sequences/horizontal-shaft-impactor/001.png", slug: "horizontal-shaft-impactor" }
  ];

  return (
    <main className="relative min-h-screen text-[#F3F4F6] pt-32 pb-0 z-10 flex flex-col items-center">
      
      {/* 1. HERO & BADGES */}
      <div className="w-full max-w-7xl mx-auto px-6 space-y-6 mb-24">
        <section className="relative bg-[#0A0B0E] border border-[#262B36] rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen" style={{ backgroundImage: "url('/hero-bg.png')" }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050507] via-[#0A0B0E]/90 to-transparent"></div>
          <div className="relative z-10 p-10 md:p-16 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white mb-6">
              Precision <br /> <span className="text-[#FFC700]">Crushing</span> Tech.
            </h1>
            <Link href="/products" className="bg-[#FFC700] hover:bg-yellow-400 text-black font-extrabold uppercase tracking-widest py-4 px-10 rounded-lg">
              View Catalog →
            </Link>
          </div>
        </section>
      </div>

      {/* 2. SHOWROOM */}
      <div className="w-full max-w-7xl mx-auto px-6 space-y-12">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="bg-[#0E1116] border border-[#262B36] rounded-xl overflow-hidden shadow-lg">
                <div className="bg-[#050507] h-56 flex items-center justify-center border-b border-[#262B36]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold text-white uppercase mb-2">{product.name}</h3>
                  <Link href={`/products/${product.slug}`} className="block w-full text-center bg-[#1A1D24] text-white py-3 rounded-lg hover:bg-[#FFC700] hover:text-black transition-colors">Get Quote</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. COMMAND CENTER */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-[#050507] border border-[#262B36] rounded-xl min-h-[350px]">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/0eBh4WWWynY?si=XCYTn1_anisQTpia" allowFullScreen></iframe>
            </div>
            <div className="lg:col-span-3 bg-[#14171D] border border-[#262B36] rounded-xl p-10">
                <form onSubmit={handleTransmit} className="space-y-4">
                    <textarea className="w-full bg-[#050507] border border-[#262B36] p-5 text-white" placeholder="> Requirements..."></textarea>
                    <button type="submit" className="bg-[#FFC700] text-black px-10 py-3 rounded-lg font-bold">Transmit Request</button>
                </form>
            </div>
        </section>
      </div>

      {/* 4. FOOTER */}
      <footer className="w-full bg-[#050507] border-t border-[#1A1D24] mt-24 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-xs">
            © 2026 Geco Grinding Centre. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}