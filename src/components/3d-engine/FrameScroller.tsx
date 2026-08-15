// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Global RAM-Cached + Hyper-Parallel Engine)

"use client";

import React, { useEffect, useRef, useState } from "react";
import { preloadSequence, getCachedSequence } from "@/hooks/useAssetCache";

interface FrameScrollerProps {
  folderPath: string;
  frameCount: number;
  customProgress?: number;
}

export default function FrameScroller({
  folderPath,
  frameCount,
  customProgress,
}: FrameScrollerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check global RAM cache instantly on mount for 0ms loads
  const cachedImages = getCachedSequence(folderPath);
  const [loaded, setLoaded] = useState(!!cachedImages);
  const [loadPercent, setLoadPercent] = useState(cachedImages ? 100 : 0);

  const imagesRef = useRef<HTMLImageElement[]>(cachedImages || []);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  useEffect(() => {
    if (customProgress !== undefined) {
      targetProgressRef.current = customProgress;
    }
  }, [customProgress]);

  // 1. GLOBAL RAM CACHE & HYPER-PARALLEL LOADER
  useEffect(() => {
    let isCancelled = false;

    // If already saved in RAM from previous navigation or background preloader
    const existingCache = getCachedSequence(folderPath);
    if (existingCache) {
      imagesRef.current = existingCache;
      setLoaded(true);
      setLoadPercent(100);
      return;
    }

    // Otherwise, stream in parallel and cache globally in RAM
    const loadImages = async () => {
      const imgArray = new Array(frameCount).fill(null);
      let completedCount = 0;
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const paddedNumber = String(i).padStart(3, "0");
        const src = `${folderPath}/${paddedNumber}.png`;

        const p = new Promise<void>((resolve) => {
          const img = new Image();
          
          const handleComplete = () => {
            if (isCancelled) return;
            completedCount++;
            setLoadPercent(Math.round((completedCount / frameCount) * 100));
            resolve();
          };

          img.onload = () => {
            imgArray[i - 1] = img;
            handleComplete();
          };

          img.onerror = () => {
            handleComplete(); // Skip missing/errored frames gracefully
          };

          img.src = src;
        });

        promises.push(p);
      }

      await Promise.all(promises);

      if (!isCancelled) {
        // Save into global cache via our preloader utility
        preloadSequence(folderPath, frameCount);
        imagesRef.current = imgArray;
        setLoaded(true);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [folderPath, frameCount]);

  // 2. ULTRA-SMOOTH RENDER LOOP
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.07;

      const safeProgress = Math.max(0, currentProgressRef.current);
      const cycle = safeProgress % 2;
      const pingPongProgress = cycle > 1 ? 2 - cycle : cycle;

      let frameIndex = Math.floor(pingPongProgress * (frameCount - 1));
      frameIndex = Math.max(0, Math.min(frameCount - 1, frameIndex));

      if (frameIndex !== lastDrawnFrameRef.current) {
        const img = imagesRef.current[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          const scale = Math.max(
            canvas.width / img.naturalWidth,
            canvas.height / img.naturalHeight
          );
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = canvas.width / 2 - drawWidth / 2;
          const y = canvas.height / 2 - drawHeight / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, drawWidth, drawHeight);

          lastDrawnFrameRef.current = frameIndex;
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [loaded, frameCount]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-transparent">
      {/* LOADING PROGRESS (Only shows on first-ever load, subsequent clicks load instantly from RAM) */}
      {!loaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-50 bg-[#0A0B0E]/90 backdrop-blur-md px-8 py-5 rounded-xl border border-[#262B36] shadow-2xl pointer-events-none">
          <div className="text-[#FFC700] font-mono text-xs tracking-widest uppercase animate-pulse">
            [ CACHING TO RAM: {loadPercent}% ]
          </div>
          <div className="w-48 bg-[#14171D] h-1.5 rounded-full overflow-hidden border border-[#262B36]">
            <div
              className="bg-[#FFC700] h-full transition-all duration-75 shadow-[0_0_10px_rgba(255,199,0,1)]"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{
          filter:
            "contrast(1.15) saturate(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.08))",
        }}
        className={`w-full max-w-6xl object-contain mix-blend-screen transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}