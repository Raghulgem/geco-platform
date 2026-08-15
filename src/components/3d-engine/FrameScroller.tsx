// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Infinite Loop GPU-Accelerated Engine)

"use client";

import React, { useEffect, useRef, useState } from "react";

interface FrameScrollerProps {
  folderPath: string; 
  frameCount: number; 
  customProgress?: number; 
}

export default function FrameScroller({ folderPath, frameCount, customProgress }: FrameScrollerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  
  const lastDrawnFrameRef = useRef<number>(-1); 

  useEffect(() => {
    if (customProgress !== undefined) {
      targetProgressRef.current = customProgress;
    }
  }, [customProgress]);

  // 1. Preload all images into memory
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedNumber = String(i).padStart(3, "0");
      img.src = `${folderPath}/${paddedNumber}.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(imgArray);
          setLoaded(true);
        }
      };
      
      img.onerror = () => {
        console.error(`[GECO DEBUG] Missing image: ${img.src}`);
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(imgArray);
          setLoaded(true);
        }
      }
      
      imgArray.push(img);
    }
  }, [folderPath, frameCount]);

  // 2. Ultra-Lightweight Infinite Loop Animation
  useEffect(() => {
    if (!loaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    // alpha: false optimizes the canvas for speed when we don't need native transparency
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // Smooth interpolation catch-up (0.07 is buttery smooth)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.07;

      // Prevent negative frames if scrolling up at the very start
      let safeProgress = Math.max(0, currentProgressRef.current);

      // PERFECT PING-PONG MATH:
      // Converts infinite scrolling (0, 1, 2, 3...) into a bouncy loop (0 -> 1 -> 0 -> 1)
      let cycle = safeProgress % 2;
      let pingPongProgress = cycle > 1 ? 2 - cycle : cycle;

      let frameIndex = Math.floor(pingPongProgress * (frameCount - 1));
      frameIndex = Math.max(0, Math.min(images.length - 1, frameIndex));

      // PERFORMANCE HACK: Only draw if the frame actually changed!
      if (frameIndex !== lastDrawnFrameRef.current) {
        const img = images[frameIndex];
        
        if (img && img.naturalWidth > 0) {
          const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = (canvas.width / 2) - (drawWidth / 2);
          const y = (canvas.height / 2) - (drawHeight / 2);

          ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill black background fast
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
  }, [loaded, images, frameCount]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-transparent">
      {!loaded && (
        <div className="absolute text-[#FFC700] font-mono animate-pulse tracking-widest text-sm z-50">
          [ SYSTEM BOOTING: LOADING ASSETS ]
        </div>
      )}
      
      {/* 
        GPU ACCELERATION MAGIC: 
        We use CSS mix-blend-screen to drop the black background, 
        and CSS filters for the HDR Bloom. This runs at 144hz flawlessly!
      */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{
          filter: "contrast(1.15) saturate(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.15))"
        }}
        className={`w-full max-w-6xl object-contain mix-blend-screen transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}