"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track the vertical scroll progress of the page.
 * Returns a normalized value between 0 (top of page) and 1 (bottom of page).
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // How far down the user has scrolled
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Total scrollable height of the document minus the viewport height
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Prevent division by zero on very short pages
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }

      // Calculate the fraction (0.0 to 1.0)
      const currentProgress = scrollTop / maxScroll;
      
      // Ensure the value stays strictly between 0 and 1
      setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Call it once on mount to set initial state
    handleScroll();

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}