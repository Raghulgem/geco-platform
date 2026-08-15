// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial

"use client";

import React, { useState } from "react";
import Link from "next/link";

// Mock category data with counts
const categories = [
  { name: "All Machinery", slug: "all", icon: "🏭", count: 42 },
  { name: "Jaw Crushers", slug: "jaw-crushers", icon: "⚙️", count: 8 },
  { name: "Cone Crushers", slug: "cone-crushers", icon: "🔩", count: 4 },
  { name: "Impactors (HSI/VSI)", slug: "impactors", icon: "🔨", count: 6 },
  { name: "Mobile Plants", slug: "mobile-plants", icon: "🚜", count: 3 },
  { name: "Washing & Screening", slug: "washing-screening", icon: "🌊", count: 7 },
  { name: "Spare Parts", slug: "spare-parts", icon: "🔧", count: 145 },
];

export default function AppSidebar() {
  // Simple state to simulate an active category
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <aside className="w-72 hidden lg:flex flex-col bg-[#0A0B0E] border-r border-[#262B36] h-[calc(100vh-80px)] sticky top-20 left-0 overflow-y-auto no-scrollbar">
      
      {/* Sidebar Header */}
      <div className="p-6 border-b border-[#262B36]">
        <h2 className="text-[#9CA3AF] font-mono text-xs uppercase tracking-[0.2em] mb-1">
          Database
        </h2>
        <h3 className="text-white font-extrabold uppercase tracking-wide text-lg">
          Categories
        </h3>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded transition-all duration-300 group ${
                isActive 
                  ? "bg-[#14171D] border border-[#FFC700]/50" 
                  : "bg-transparent border border-transparent hover:bg-[#14171D] hover:border-[#262B36]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg grayscale transition-all duration-300 ${isActive ? "grayscale-0" : "group-hover:grayscale-0"}`}>
                  {cat.icon}
                </span>
                <span className={`text-sm uppercase font-bold tracking-wider transition-colors ${
                  isActive ? "text-[#FFC700]" : "text-[#9CA3AF] group-hover:text-white"
                }`}>
                  {cat.name}
                </span>
              </div>
              
              {/* Data Count (Monospace) */}
              <span className={`font-mono text-xs ${
                isActive ? "text-[#FFC700]" : "text-[#262B36] group-hover:text-[#9CA3AF]"
              }`}>
                [{String(cat.count).padStart(3, '0')}]
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Tech/Support Widget */}
      <div className="p-6 border-t border-[#262B36] bg-[#14171D]/50">
        <div className="flex items-center gap-3 mb-4">
          {/* Pulsing online indicator */}
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[#9CA3AF] font-mono text-[10px] uppercase tracking-widest">
            System Online
          </span>
        </div>
        
        <div className="bg-[#0A0B0E] border border-[#262B36] rounded p-4 text-center">
          <p className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mb-3">
            Need Custom Specs?
          </p>
          <Link 
            href="/contact"
            className="block w-full border border-[#FFC700] text-[#FFC700] hover:bg-[#FFC700] hover:text-black uppercase text-[10px] font-extrabold tracking-widest py-2 rounded transition-colors"
          >
            Contact Engineering
          </Link>
        </div>
      </div>
      
    </aside>
  );
}