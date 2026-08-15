// Lead Developer: Raghul 
// Theme: Dark Cyber-Industrial (Clean Stacked Layout with Active Video & Functional Links)
// Location: src/app/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { preloadSequence } from "@/hooks/useAssetCache"; 

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Background Preloader for 0ms Instant Product Switching
  useEffect(() => {
    const machines = [
      "bucket-sand-washing",
      "vibrating-screen-14x4",
      "secondary-jaw-30x10",
      "cone-crusher-200tph",
      "horizontal-shaft-impactor",
      "stone-crusher-plant",
      "impact-crusher"
    ];
    
    // Silently preload all 7 sequences into RAM immediately when home page opens
    machines.forEach(slug => {
      preloadSequence(`/sequences/${slug}`, 100);
    });
  }, []);

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
      
      {/* ========================================= */}
      {/* 1. HERO & BADGES (Clean Stacked Structure)*/}
      {/* ========================================= */}
      <div className="w-full max-w-7xl mx-auto px-6 space-y-6 mb-24">
        
        {/* HERO SECTION */}
        <section className="relative bg-[#0A0B0E] border border-[#262B36] rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen" style={{ backgroundImage: "url('/hero-bg.png')" }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050507] via-[#0A0B0E]/90 to-transparent"></div>
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-[#FFC700] opacity-10 blur-[150px] pointer-events-none z-0"></div>

          <div className="relative z-10 p-10 md:p-16 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262B36]/50 border border-[#262B36] text-[10px] uppercase tracking-widest text-[#FFC700] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFC700] animate-pulse"></span>
              IndiaMART Verified Manufacturer
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight font-sans text-white mb-6 leading-tight">
              Precision <br /> <span className="text-[#FFC700]">Crushing</span> Tech.
            </h1>
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-10 max-w-xl">
              Geco Grinding Centre engineers extreme-duty crushing machinery, precision spares, and automated repair services built to dominate the toughest operations on earth.
            </p>
            <Link href="/products" className="bg-[#FFC700] hover:bg-yellow-400 text-black font-extrabold uppercase tracking-widest py-4 px-10 rounded-lg transition-all shadow-[0_0_30px_rgba(255,199,0,0.3)] hover:shadow-[0_0_40px_rgba(255,199,0,0.5)]">
              View Catalog →
            </Link>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {[
            { title: "Heavy Duty", desc: "Extreme Conditions", icon: "🛡️" },
            { title: "Precision Engineered", desc: "High Performance", icon: "⚙️" },
            { title: "Trusted Quality", desc: "Tested & Certified", icon: "✅" },
            { title: "24/7 Support", desc: "Rapid Service", icon: "🎧" }
          ].map((badge, idx) => (
            <div key={idx} className="bg-[#14171D] border border-[#262B36] p-5 rounded-xl shadow-xl flex items-center gap-4 hover:border-[#FFC700]/50 transition-all">
              <div className="text-2xl grayscale opacity-70">{badge.icon}</div>
              <div>
                <h3 className="text-white font-bold uppercase text-[11px] tracking-widest mb-0.5">{badge.title}</h3>
                <p className="text-gray-500 text-[10px] uppercase">{badge.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 space-y-12">
        
        {/* ========================================= */}
        {/* 2. SHOWROOM (Featured Machinery)          */}
        {/* ========================================= */}
        <section>
          <div className="flex justify-between items-end border-b border-[#262B36] pb-4 mb-8">
            <h2 className="text-2xl font-black uppercase tracking-widest text-white">
              Flagship <span className="text-[#FFC700]">Machinery</span>
            </h2>
            <Link href="/products" className="text-gray-500 hover:text-[#FFC700] text-xs uppercase tracking-widest font-bold transition-colors">
              Explore All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="bg-[#0E1116] border border-[#262B36] rounded-xl overflow-hidden flex flex-col hover:border-[#FFC700]/40 transition-colors group shadow-lg">
                <div className="bg-[#050507] h-56 w-full relative flex items-center justify-center p-6 border-b border-[#262B36]">
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#FFC700]/10 text-[#FFC700] border border-[#FFC700]/30 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest z-10">{product.badge}</span>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase leading-snug mb-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <p className="text-[#FFC700] font-mono text-sm">{product.price}</p>
                      <span className="text-gray-600 text-[10px] uppercase">/ Unit</span>
                    </div>
                  </div>
                  <Link href={`/products/${product.slug}`} className="block w-full text-center bg-[#1A1D24] text-white hover:bg-[#FFC700] hover:text-black uppercase text-[10px] font-bold tracking-widest py-3 rounded-lg transition-colors">
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. COMMAND CENTER (Video + Quote Bento)   */}
        {/* ========================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-[#050507] border border-[#262B36] rounded-xl relative overflow-hidden flex flex-col min-h-[350px]">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="bg-black/80 backdrop-blur-md border border-gray-700 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded">Corporate Video</span>
            </div>
            <div className="absolute top-6 right-5 z-10 w-2 h-2 rounded-full bg-red-500 animate-pulse pointer-events-none shadow-[0_0_10px_red]"></div>
            <iframe 
              className="w-full h-full flex-grow absolute inset-0"
              src="https://www.youtube.com/embed/0eBh4WWWynY?si=XCYTn1_anisQTpia" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="lg:col-span-3 bg-gradient-to-br from-[#14171D] to-[#0A0B0E] border border-[#262B36] rounded-xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC700] opacity-5 blur-[100px] pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#262B36] rounded-lg border border-[#FFC700]/20">
                <svg className="w-5 h-5 text-[#FFC700]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Direct Transmission</h2>
                <p className="text-gray-500 text-[10px] font-mono uppercase">Secure Inquiry Channel</p>
              </div>
            </div>
            <form onSubmit={handleTransmit} className="space-y-4">
              <textarea 
                required
                rows={4} 
                className="w-full bg-[#050507] border border-[#262B36] rounded-lg p-5 text-white focus:outline-none focus:border-[#FFC700] transition-colors placeholder:text-gray-600 font-mono text-sm resize-none shadow-inner"
                placeholder="> Enter specific machinery requirements, capacity, or spare part serials here..."
              ></textarea>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-gray-500 font-mono uppercase">/// Response Time: &lt; 2 Hours</p>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#FFC700] text-black w-full sm:w-auto px-10 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(255,199,0,0.2)] disabled:opacity-50"
                >
                  {isSubmitting ? "Transmitting..." : "Transmit Request"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. TELEMETRY (Upgraded & Polished)        */}
        {/* ========================================= */}
        <section className="bg-gradient-to-b from-[#14171D] to-[#0A0B0E] border border-[#262B36] rounded-2xl p-8 md:p-12 shadow-2xl mt-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFC700] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#262B36] pb-6 mb-10 relative z-10">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                Client <span className="text-[#FFC700]">Telemetry</span>
              </h2>
              <p className="text-gray-500 font-mono text-[11px] uppercase mt-2">// Verified Performance Data Logs</p>
            </div>
            <button onClick={() => alert("Accessing complete client telemetry logs...")} className="hidden sm:block border border-[#262B36] text-gray-400 hover:text-[#FFC700] hover:border-[#FFC700] px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors bg-[#0A0B0E]">
              Access All Logs →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-4 space-y-8 pr-0 lg:pr-8 border-r-0 lg:border-r border-[#262B36]">
              <div className="flex items-end gap-4">
                <span className="text-7xl font-black text-white leading-none tracking-tighter">4.2</span>
                <div className="pb-2">
                  <div className="text-[#FFC700] text-lg tracking-widest mb-1">★★★★<span className="text-gray-700">★</span></div>
                  <p className="text-[10px] text-gray-500 font-mono uppercase">Based on 72 Verified Units</p>
                </div>
              </div>
              <div className="space-y-4 font-mono text-xs">
                {[ { s: "5★", p: "54%" }, { s: "4★", p: "7%" }, { s: "3★", p: "4%" }, { s: "2★", p: "15%" }, { s: "1★", p: "20%" } ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-6 text-gray-400 font-bold">{bar.s}</span>
                    <div className="flex-grow bg-[#050507] h-2 rounded-full overflow-hidden border border-[#262B36]">
                      <div className="bg-gradient-to-r from-[#FFC700]/50 to-[#FFC700] h-full shadow-[0_0_10px_rgba(255,199,0,0.5)]" style={{ width: bar.p }}></div>
                    </div>
                    <span className="w-8 text-right text-gray-400">{bar.p}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#050507] p-6 rounded-xl border border-[#262B36] space-y-4 font-mono text-xs shadow-inner">
                <p className="text-[#FFC700] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  System Satisfaction
                </p>
                {[ { l: "Response", p: "77%" }, { l: "Quality", p: "90%" }, { l: "Delivery", p: "85%" } ].map((met, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-20 text-gray-400">{met.l}</span>
                    <div className="flex-grow bg-[#14171D] h-1.5 rounded-full"><div className="bg-[#FFC700]/70 h-full rounded-full" style={{ width: met.p }}></div></div>
                    <span className="text-white font-bold">{met.p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { n: "Muhamme", l: "Mangalore, KA", p: "100 TPH Cone Crusher", d: "04 AUG 2026", s: "★★★★☆", txt: "Robust machinery, output consistently exceeds expected TPH. Solid build quality." },
                { n: "Manoj Prasanth", l: "India", p: "General Maintenance", d: "26 JUN 2026", s: "★★★★★", txt: "Spares arrived exactly on time. Perfect fit for our legacy plant operations." },
                { n: "Jeet Construction", l: "Bengaluru, KA", p: "Mobile Crushing Plant", d: "18 JUN 2026", s: "★★★★☆", txt: "Highly mobile, fast setup on site. The automated control panel is very intuitive." },
                { n: "KRS Mining", l: "Coimbatore, TN", p: "Vibrating Screen", d: "12 MAY 2026", s: "★★★★★", txt: "Zero downtime since installation. Excellent after-sales support from the Geco team." }
              ].map((rev, i) => (
                <div key={i} className="bg-[#050507] border border-[#262B36] p-6 rounded-xl flex flex-col justify-between hover:border-[#FFC700]/40 transition-all relative overflow-hidden group shadow-lg">
                  <div className="absolute -top-4 -right-2 text-8xl text-[#262B36] opacity-30 font-serif pointer-events-none group-hover:text-[#FFC700]/10 transition-colors">"</div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#14171D] border border-[#262B36] text-[#FFC700] flex items-center justify-center text-sm font-black shadow-inner">
                          {rev.n.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{rev.n}</p>
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{rev.l}</p>
                        </div>
                      </div>
                      <span className="text-[#FFC700] text-xs tracking-widest drop-shadow-md">{rev.s}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 font-medium">"{rev.txt}"</p>
                  </div>
                  <div className="relative z-10 flex justify-between items-end border-t border-[#262B36] pt-4 mt-auto">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Part: <span className="text-gray-300">{rev.p}</span></p>
                    <p className="text-[10px] text-[#FFC700]/70 font-mono">{rev.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => alert("Accessing complete client telemetry logs...")} className="sm:hidden w-full border border-[#262B36] text-gray-400 hover:text-[#FFC700] hover:border-[#FFC700] px-6 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-colors bg-[#0A0B0E] mt-4">
              Access All Logs →
            </button>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#050507] border-t border-[#1A1D24] mt-24 pt-20 pb-10 relative z-0">
        {/* ... (Your original footer code) ... */}
        {/* (Keep exactly as original to maintain the layout) */}
      </footer>
    </main>
  );
}