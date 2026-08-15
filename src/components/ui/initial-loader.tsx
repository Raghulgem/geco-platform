// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Initial Boot Loader)
// Location: src/components/ui/initial-loader.tsx

"use client";

import React, { useState, useEffect } from "react";

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Lock the scroll when loader mounts
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    // 2. CRITICAL CLEANUP: Always unlock scroll and clear interval if component unmounts early
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    let fadeTimeout: NodeJS.Timeout;
    let removeTimeout: NodeJS.Timeout;

    if (progress >= 100) {
      fadeTimeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 400);

      removeTimeout = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "auto"; // Restore scrolling for normal flow
      }, 1200);
    }

    // Cleanup timeouts to prevent memory leaks
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [progress]);

  // Don't render anything once it's done
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0B0E] text-[#F3F4F6] transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFC700] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        
        {/* Main Logo Branding */}
        <div className="mb-8 flex items-center justify-center">
          <div className="bg-[#FFC700] text-black font-extrabold text-4xl px-4 py-2 rounded rounded-tl-2xl rounded-br-2xl tracking-widest shadow-[0_0_30px_rgba(255,199,0,0.3)]">
            GECO
          </div>
        </div>

        {/* Loading Bar Container */}
        <div className="w-full bg-[#14171D] border border-[#262B36] p-1 rounded-sm mb-4 relative overflow-hidden">
          {/* The Actual Progress Bar */}
          <div 
            className="h-1 bg-[#FFC700] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,199,0,0.5)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* System Diagnostics Text */}
        <div className="w-full flex justify-between items-center text-[#9CA3AF] font-mono text-xs uppercase tracking-widest">
          <span className="animate-pulse">
            {progress < 100 ? "Booting Engine..." : "System Ready"}
          </span>
          <span className="text-[#FFC700] font-bold">
            {Math.min(progress, 100)}%
          </span>
        </div>

      </div>
    </div>
  );
}