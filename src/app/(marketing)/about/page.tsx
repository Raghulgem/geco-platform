// Lead Developer: Raghul 
// Theme: Dark Cyber-Industrial (Comprehensive Corporate Dossier with Particle Background)
// Location: src/app/about/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ui/particle-background";

export default function AboutPage() {
  // Utility function to make data points interactive and copyable
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} successfully copied to clipboard: ${text}`);
  };

  return (
    <main className="min-h-screen bg-[#0A0B0E]/85 text-[#F3F4F6] pt-32 pb-24 px-6 relative z-10 flex flex-col items-center">
      
      {/* GLOBAL PARTICLE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FFC700] opacity-[0.03] blur-[150px] pointer-events-none rounded-full"></div>

      {/* ========================================= */}
      {/* 1. HEADER SECTION                           */}
      {/* ========================================= */}
      <div className="w-full max-w-7xl mx-auto mb-16 relative z-10">
        <div className="border-l-[6px] border-[#FFC700] pl-6 md:pl-10 py-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262B36]/50 border border-[#262B36] text-[10px] uppercase tracking-widest text-[#FFC700] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FFC700] animate-pulse"></span>
            Established 1987 // Verified IndiaMART Member
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            About <span className="text-[#FFC700]">Geco</span> Grinding Centre
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-3xl leading-relaxed">
            A premier manufacturer, supplier, and service provider of heavy-duty crushing machinery, roller bearings, lubricant oil, and conveyor accessories since 1987.
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. MAIN CONTENT GRID                        */}
      {/* ========================================= */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* LEFT COLUMN: Overview, Infrastructure, Vision */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Who We Are */}
          <div className="bg-[#14171D] border border-[#262B36] p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFC700] to-transparent opacity-50"></div>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              Who We Are <span className="text-[#FFC700] text-sm">///</span>
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
              <p>
                <strong className="text-white">Geco Grinding Centre</strong> is a leading manufacturer in Coimbatore, operating as a robust <strong className="text-white">Partnership</strong> firm since 1987. We specialize in offering a wide range of industrial hardware including Crushing Machines, Roller Bearings, Lubricant Oil, Conveyor Accessories, and specialized Repair & Maintenance Services.
              </p>
              <p>
                Led by Managing Director <strong className="text-[#FFC700]">Kumar Muthusamy</strong>, our organization relies on decades of engineering expertise to serve heavy industries across national and international markets.
              </p>
            </div>
          </div>

          {/* Infrastructure Unit */}
          <div className="bg-[#14171D] border border-[#262B36] p-8 md:p-10 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              Our Infrastructure <span className="text-[#FFC700] text-sm">///</span>
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm mb-6">
              <p>
                We have built a sound and sophisticated infrastructure unit supported by high-tech tools and technologies that enable us to manufacture bulk orders of quality products. Our facility features a massive covered factory area spanning <strong className="text-white">over 40,000 square feet</strong> alongside <strong className="text-white">2.5 acres of vacant land</strong> optimized for rapid loading, unloading, and staging.
              </p>
              <p className="font-mono text-xs text-[#FFC700] uppercase tracking-wider">
                Our operations are segregated into dedicated functional departments:
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Manufacturing Unit", desc: "Equipped with heavy fabrication and machining tools.", icon: "🏭" },
                { title: "Quality Unit", desc: "Rigorous stress-testing and calibration protocols.", icon: "🔍" },
                { title: "Logistic Unit", desc: "Streamlined shipping via road, air, cargo, and sea.", icon: "🚚" }
              ].map((dept, i) => (
                <div key={i} className="bg-[#050507] border border-[#262B36] p-5 rounded-xl">
                  <span className="text-2xl mb-2 block">{dept.icon}</span>
                  <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-1">{dept.title}</h3>
                  <p className="text-gray-500 text-[11px]">{dept.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#262B36] flex justify-between items-center">
              <span className="text-xs text-gray-400 font-mono">Have specific technical inquiries about our facility?</span>
              {/* Functioning Internal Route Button */}
              <Link href="/contact" className="bg-[#262B36] hover:bg-[#FFC700] hover:text-black text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors shadow-md">
                Contact Us →
              </Link>
            </div>
          </div>

          {/* Aim / Vision / Mission */}
          <div className="bg-[#14171D] border border-[#262B36] p-8 md:p-10 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-3">
              Aim / Vision / Mission <span className="text-[#FFC700] text-sm">///</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-[#FFC700] pl-4 py-1">
              "To be the largest company and pave our way to success in both national as well as in international marketplaces. We strive to make diligent efforts to fulfill demands for quality and customize products to precise client requirements."
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Heavy Duty", desc: "Built for extreme operational conditions.", icon: "🛡️" },
              { title: "Precision Engineered", desc: "High-performance, calibrated machines.", icon: "⚙️" },
              { title: "Trusted Quality", desc: "Tested and certified industrial products.", icon: "✅" },
              { title: "After Sales Support", desc: "Maintenance service you can rely on.", icon: "🎧" }
            ].map((badge, idx) => (
              <div key={idx} className="bg-[#0E1116] border border-[#262B36] p-5 rounded-xl shadow-lg flex items-start gap-4 hover:border-[#FFC700]/40 transition-all">
                <div className="text-2xl grayscale opacity-70 mt-0.5">{badge.icon}</div>
                <div>
                  <h3 className="text-white font-bold uppercase text-[11px] tracking-widest mb-0.5">{badge.title}</h3>
                  <p className="text-gray-500 text-[10px] leading-snug">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Fact Sheet, Statutory Profile, Payment/Shipment */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Company Fact Sheet */}
          <div className="bg-[#050507] border border-[#262B36] p-6 rounded-2xl shadow-2xl relative font-mono">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-[#262B36] pb-3 flex justify-between items-center">
              <span>Company Fact Sheet</span>
              <span className="text-[10px] text-[#FFC700] bg-[#FFC700]/10 px-2 py-0.5 rounded">Verified</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <p className="text-gray-500 uppercase text-[9px]">CEO / Managing Director</p>
                <p className="text-white font-bold text-sm">Kumar Muthusamy</p>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#262B36] pt-3">
                <div>
                  <p className="text-gray-500 uppercase text-[9px]">Established</p>
                  <p className="text-white font-bold">1987</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-[9px]">Workforce</p>
                  <p className="text-white font-bold">101 - 500 People</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#262B36] pt-3">
                <div>
                  <p className="text-gray-500 uppercase text-[9px]">Annual Turnover</p>
                  <p className="text-[#FFC700] font-bold">5 - 25 Cr</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase text-[9px]">Legal Status</p>
                  <p className="text-white font-bold">Partnership</p>
                </div>
              </div>

              <div className="border-t border-[#262B36] pt-3">
                <p className="text-gray-500 uppercase text-[9px] mb-1">Additional Business Sectors</p>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  Factory / Manufacturing • Wholesale • Retail • Works Contract
                </p>
              </div>

              <div className="border-t border-[#262B36] pt-3 group">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-gray-500 uppercase text-[9px]">Registered Address</p>
                  {/* Functioning External Route Button */}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=636%2F2%2C+Thiyagi+Shanmuga+Nagar%2C+Vasanth+Nagar%2C+Singanallur%2C+Coimbatore+-+641005%2C+TN%2C+India" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#3b82f6] text-[9px] uppercase font-bold tracking-widest hover:text-white transition-colors flex items-center gap-1"
                  >
                    Open Maps ⬈
                  </a>
                </div>
                <p className="text-gray-300 text-[11px]">
                  636/2, Thiyagi Shanmuga Nagar, Vasanth Nagar, Singanallur, Coimbatore - 641005, TN, India
                </p>
              </div>
            </div>
          </div>

          {/* Statutory Profile & Banking */}
          <div className="bg-[#050507] border border-[#262B36] p-6 rounded-2xl shadow-xl font-mono text-xs space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-[#262B36] pb-3">
              Statutory Profile
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 uppercase text-[9px]">GST Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-[#FFC700] font-bold tracking-wider">33AABFG1064F2ZZ</p>
                  {/* Functioning Copy Button */}
                  <button 
                    onClick={() => handleCopy("33AABFG1064F2ZZ", "GST Number")}
                    className="bg-[#14171D] hover:bg-[#262B36] border border-[#262B36] text-gray-400 hover:text-white px-2 py-1 rounded text-[9px] uppercase tracking-widest transition-colors active:scale-95"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[9px]">TAN Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">CMBG0*****</p>
                  {/* Functioning Copy Button */}
                  <button 
                    onClick={() => handleCopy("CMBG0*****", "TAN Number")}
                    className="bg-[#14171D] hover:bg-[#262B36] border border-[#262B36] text-gray-400 hover:text-white px-2 py-1 rounded text-[9px] uppercase tracking-widest transition-colors active:scale-95"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[9px]">GST Partners</p>
                <p className="text-gray-300 text-[10px]">Ponnathal, Subbiah Gounder Arulanandam Muthusamy</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[9px]">Bankers</p>
                <p className="text-white font-bold text-[11px]">• Karur Vysya Bank<br/>• Axis Bank</p>
              </div>
            </div>
          </div>

          {/* Logistics & Payment Modes */}
          <div className="bg-[#050507] border border-[#262B36] p-6 rounded-2xl shadow-xl font-mono text-xs space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-[#262B36] pb-3">
              Commercial Terms
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#FFC700] uppercase text-[9px] font-bold mb-1">Payment Modes</p>
                <ul className="text-gray-300 space-y-1 text-[11px]">
                  <li>• Cash</li>
                  <li>• Cheque</li>
                  <li>• Demand Draft (DD)</li>
                </ul>
              </div>
              <div>
                <p className="text-[#FFC700] uppercase text-[9px] font-bold mb-1">Shipment Modes</p>
                <ul className="text-gray-300 space-y-1 text-[11px]">
                  <li>• By Road</li>
                  <li>• By Air</li>
                  <li>• By Cargo / Sea</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upgrade CTA Panel */}
          <div className="bg-[#FFC700] rounded-2xl p-8 shadow-[0_0_40px_rgba(255,199,0,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-black text-xl font-black uppercase tracking-widest mb-3">
                Ready to Upgrade?
              </h3>
              <p className="text-black/80 text-sm font-medium mb-8 leading-relaxed">
                Browse our flagship machinery and request a custom quote today.
              </p>
              {/* Functioning Internal Route Button */}
              <Link 
                href="/products" 
                className="block w-full text-center bg-[#050507] hover:bg-[#14171D] text-[#FFC700] font-bold uppercase tracking-widest py-4 rounded-xl transition-colors shadow-xl text-xs"
              >
                View Catalog →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}