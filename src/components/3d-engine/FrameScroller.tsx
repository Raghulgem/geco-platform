// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Zero-Flicker GPU Pre-Decoded Engine)

"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  // Sync scroll target smoothly
  useEffect(() => {
    if (customProgress !== undefined) {
      targetProgressRef.current = customProgress;
    }
  }, [customProgress]);

  // 1. ASYNC GPU PRE-DECODER WITH PERCENTAGE TRACKING
  useEffect(() => {
    let isCancelled = false;
    const imgArray: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    const preloadImages = async () => {
      const loadPromises = [];

      for (let i = 1; i <= frameCount; i++) {
        const paddedNumber = String(i).padStart(3, "0");
        const src = `${folderPath}/${paddedNumber}.png`;

        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;

          const onFinish = async () => {
            if (isCancelled) return;
            try {
              // Hardware-decode the PNG directly into GPU memory
              if ("decode" in img) {
                await img.decode();
              }
            } catch {
              // Fallback if image decode fails on legacy browsers
            }
            imgArray[i - 1] = img;
            loadedCount++;
            setLoadPercent(Math.round((loadedCount / frameCount) * 100));
            resolve();
          };

          img.onload = onFinish;
          img.onerror = onFinish; // Prevent infinite hanging on missing files
        });

        loadPromises.push(p);
      }

      await Promise.all(loadPromises);

      if (!isCancelled) {
        setImages(imgArray.filter(Boolean));
        setLoaded(true);
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [folderPath, frameCount]);

  // 2. ZERO-FLICKER ANIMATION LOOP
  useEffect(() => {
    if (!loaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // Heavy LERP Momentum (0.07 catch-up)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.07;

      const safeProgress = Math.max(0, currentProgressRef.current);

      // Ping-Pong Looping Math (0 -> 1 -> 0)
      const cycle = safeProgress % 2;
      const pingPongProgress = cycle > 1 ? 2 - cycle : cycle;

      let frameIndex = Math.floor(pingPongProgress * (images.length - 1));
      frameIndex = Math.max(0, Math.min(images.length - 1, frameIndex));

      // ZERO-FLICKER RULE:
      // Only execute clear & draw when the frame actually changed AND the image is ready
      if (frameIndex !== lastDrawnFrameRef.current) {
        const img = images[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          const scale = Math.max(
            canvas.width / img.naturalWidth,
            canvas.height / img.naturalHeight
          );
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = canvas.width / 2 - drawWidth / 2;
          const y = canvas.height / 2 - drawHeight / 2;

          // Clear transparent canvas and draw next frame synchronously
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, drawWidth, drawHeight);

          lastDrawnFrameRef.current = frameIndex;
        }
        // If image isn't ready, keep previous frame on screen (prevents black flashing)
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
  }, [loaded, images]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-transparent">
      {/* REAL-TIME ASSET STREAMING PROGRESS */}
      {!loaded && (
        <div className="flex flex-col items-center gap-3 z-50">
          <div className="text-[#FFC700] font-mono text-xs tracking-widest animate-pulse">
            [ INITIALIZING TELEMETRY: {loadPercent}% ]
          </div>
          <div className="w-48 bg-[#14171D] h-1 rounded-full overflow-hidden border border-[#262B36]">
            <div
              className="bg-[#FFC700] h-full transition-all duration-150"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* GPU HARDWARE ACCELERATED CANVAS */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{
          filter:
            "contrast(1.15) saturate(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.08))",
        }}
        className={`w-full max-w-6xl object-contain mix-blend-screen transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
}