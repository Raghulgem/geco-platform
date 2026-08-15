// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Navbar with Clean General Pop-up Quote Trigger)

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import QuoteModal from "@/components/ui/quote-modal";

export default function MainNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products & Services", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0A0B0E]/85 backdrop-blur-md border-b border-[#262B36] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-[#FFC700] text-black font-extrabold text-xl px-2 py-1 rounded rounded-tl-xl rounded-br-xl group-hover:scale-105 transition-transform">
              GECO
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-bold uppercase tracking-wider text-sm leading-tight">
                Grinding Centre
              </span>
              <span className="text-[#9CA3AF] font-mono text-[10px] tracking-[0.2em] uppercase">
                Heavy Machinery
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive ? "text-[#FFC700]" : "text-white hover:text-[#FFC700]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS (Contact & Quote Modal Trigger) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-right border-r border-[#262B36] pr-6">
              <span className="text-2xl grayscale opacity-70">📞</span>
              <div className="flex flex-col">
                <span className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-widest">
                  Support Line
                </span>
                <a href="tel:08047652002" className="text-white font-mono text-sm hover:text-[#FFC700] transition-colors">
                  08047652002
                </a>
              </div>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FFC700] hover:bg-[#e6b300] text-black font-extrabold uppercase text-xs tracking-widest px-6 py-3 rounded transition-transform transform hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(255,199,0,0.3)]"
            >
              Get Quote →
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-white text-2xl p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE DROP-DOWN MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#14171D] border-b border-[#262B36] px-6 py-4 flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white font-bold uppercase tracking-wider text-sm hover:text-[#FFC700] border-b border-[#262B36] pb-2"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full text-center bg-[#FFC700] text-black font-extrabold uppercase text-xs tracking-widest py-3 rounded mt-2"
            >
              Get Quote →
            </button>
          </div>
        )}
      </header>

      {/* GLOBAL GENERAL QUOTE MODAL POPUP (No Image/Specs) */}
      <QuoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}