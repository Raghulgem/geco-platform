// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (HDR Canvas + Ultra-Smooth Heavy LERP Engine)

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

  // References to keep track of smooth interpolation without triggering re-renders
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Keep target progress synced when props change
  useEffect(() => {
    if (customProgress !== undefined) {
      targetProgressRef.current = customProgress;
    }
  }, [customProgress]);

  // 1. Preload all images into memory
  useEffect(() => {
    let loadedCount = 0;
    let localErrorCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedNumber = String(i).padStart(3, "0");
      img.src = `${folderPath}/frame_${paddedNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(imgArray);
          setLoaded(true);
        }
      };
      
      img.onerror = () => {
        console.error(`[GECO DEBUG] Missing image: ${img.src}`);
        localErrorCount++;
        setErrorCount(localErrorCount);
        loadedCount++;
        
        if (loadedCount === frameCount) {
          setImages(imgArray);
          setLoaded(true);
        }
      }
      
      imgArray.push(img);
    }
  }, [folderPath, frameCount]);

  // 2. Smooth LERP Animation Loop & Canvas Renderer
  useEffect(() => {
    if (!loaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // --- ULTRA-SMOOTH HEAVY LERP INTERPOLATION ---
      // Changed from 0.08 to 0.035. This adds "weight" to the machine parts, 
      // making them glide and float into position slowly instead of snapping instantly.
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.035;

      let safeProgress = isNaN(currentProgressRef.current) ? 0 : currentProgressRef.current;
      safeProgress = Math.max(0, Math.min(1, safeProgress));

      // Apply Boomerang effect (0 -> 1 -> 0)
      let virtualProgress = safeProgress * 2;
      if (virtualProgress > 1) {
        virtualProgress = 2 - virtualProgress;
      }

      let frameIndex = Math.floor(virtualProgress * frameCount);
      frameIndex = Math.max(0, Math.min(images.length - 1, frameIndex));

      const img = images[frameIndex];
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img && img.naturalWidth > 0) {
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const x = (canvas.width / 2) - (img.naturalWidth / 2) * scale;
        const y = (canvas.height / 2) - (img.naturalHeight / 2) * scale;
        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;

        // PASS A: Base Layer with HDR filters
        ctx.globalCompositeOperation = "source-over";
        ctx.filter = "contrast(1.15) saturate(1.3) brightness(0.95)";
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // PASS B: Intelligent Background Box Removal
        const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = frameData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i];
          const green = pixels[i + 1];
          const blue = pixels[i + 2];

          if (red < 20 && green < 20 && blue < 25) {
            pixels[i + 3] = 0; 
          }
        }
        ctx.putImageData(frameData, 0, 0);

        // PASS C: HDR Bloom Layer
        ctx.globalCompositeOperation = "screen"; 
        ctx.filter = "blur(8px) brightness(1.2) contrast(1.5)";
        ctx.globalAlpha = 0.3;
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // Reset context
        ctx.globalAlpha = 1.0;
        ctx.filter = "none";
        ctx.globalCompositeOperation = "source-over";
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
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className={`w-full max-w-6xl object-contain transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}