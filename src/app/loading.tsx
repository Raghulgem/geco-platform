import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0B0E] text-[#F3F4F6]">
      
      {/* 
        THE MECHANICAL SPINNER 
        Uses a double-ring setup to look like a rotating industrial gear or bearing.
      */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer fast-spinning ring */}
        <div className="absolute inset-0 border-t-4 border-[#FFC700] border-r-4 border-transparent rounded-full animate-spin"></div>
        
        {/* Inner slow-spinning structural ring */}
        <div className="absolute inset-2 border-b-4 border-[#262B36] border-l-4 border-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
        
        {/* Center Logo/Text */}
        <div className="absolute text-center animate-pulse">
          <span className="font-sans font-extrabold text-xl tracking-widest text-[#FFC700]">
            GECO
          </span>
        </div>
      </div>

      {/* 
        SYSTEM STATUS TEXT
        Monospace font to match the high-tech, diagnostic UI feel.
      */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-[#9CA3AF] font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
          Initializing Machinery
        </h2>
        {/* Decorative loading bar */}
        <div className="w-48 h-1 bg-[#14171D] border border-[#262B36] rounded overflow-hidden">
          <div className="w-full h-full bg-[#FFC700] animate-[pulse_1s_ease-in-out_infinite] origin-left"></div>
        </div>
      </div>

    </div>
  );
}