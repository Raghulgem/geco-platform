// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Adaptive Quote Modal)

"use client";

import React, { useState } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: string;
  productImage?: string;
  specs?: { label: string; value: string }[];
}

export default function QuoteModal({
  isOpen,
  onClose,
  productName,
  productPrice,
  productImage,
  specs = [],
}: QuoteModalProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMobileNumber("");
      onClose();
      alert("Inquiry transmitted successfully to Geco Grinding Centre!");
    }, 1500);
  };

  // If no product image is provided, render the clean, centered general form
  const isGeneral = !productImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className={`relative w-full bg-[#0E1116] border border-[#262B36] rounded-2xl shadow-2xl overflow-hidden ${
          isGeneral ? "max-w-3xl p-8 md:p-10" : "max-w-4xl grid grid-cols-1 md:grid-cols-2"
        }`}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-[#1A1D24] hover:bg-[#262B36] p-2 rounded-full transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT PANEL: Only shows if product image exists */}
        {!isGeneral && (
          <div className="bg-[#050507] p-8 border-b md:border-b-0 md:border-r border-[#262B36] flex flex-col justify-between">
            <div>
              <div className="h-48 w-full bg-[#0E1116] border border-[#262B36] rounded-xl flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                <img src={productImage} alt={productName} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-extrabold text-white uppercase tracking-tight mb-1">{productName}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <p className="text-[#FFC700] font-mono text-base font-bold">{productPrice}</p>
                <span className="text-gray-500 text-[10px] uppercase">/ Unit</span>
              </div>

              {specs.length > 0 && (
                <div className="space-y-2 border-t border-[#262B36] pt-4 font-mono text-xs">
                  <p className="text-[#FFC700] uppercase text-[10px] tracking-widest mb-2">/// Specifications</p>
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between text-gray-400">
                      <span>{spec.label}:</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#262B36] text-[10px] font-mono text-gray-500 uppercase">
              Sold By: <span className="text-white font-bold">Geco Grinding Centre</span>
            </div>
          </div>
        )}

        {/* RIGHT PANEL (or Full Panel if General): Mobile Input & Submission */}
        <div className={`p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-[#14171D] to-[#0A0B0E] ${isGeneral ? "" : ""}`}>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FFC700]/10 border border-[#FFC700]/30 text-[9px] uppercase tracking-widest text-[#FFC700] mb-3 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC700] animate-pulse"></span>
              Direct Inquiry Channel
            </div>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide mb-2">
              Get <span className="text-[#FFC700]">Best Quote</span>
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed font-mono">
              Get best price and verified details directly from <span className="text-white font-bold">"Geco Grinding Centre"</span> on your mobile quickly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                Mobile Number
              </label>
              <div className="flex items-center bg-[#050507] border border-[#262B36] rounded-lg overflow-hidden focus-within:border-[#FFC700] transition-colors">
                <div className="flex items-center gap-1.5 px-4 py-3.5 bg-[#14171D] border-r border-[#262B36] text-xs font-mono text-white">
                  <span>🇮🇳</span>
                  <span className="font-bold">+91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter your 10-digit mobile number"
                  className="w-full bg-transparent px-4 py-3.5 text-white font-mono text-sm focus:outline-none placeholder:text-gray-600"
                />
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-2">We will contact you on this number shortly. No spam guaranteed.</p>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-[#FFC700] hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(255,199,0,0.3)] disabled:opacity-50 text-xs cursor-pointer"
            >
              {submitted ? "Transmitting Inquiry..." : "Submit Now →"}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#262B36] flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
            <span>Response Time: &lt; 2 Hours</span>
            <span>Verified Manufacturer</span>
          </div>
        </div>

      </div>
    </div>
  );
}