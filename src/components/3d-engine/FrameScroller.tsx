// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Double-Buffered Flicker-Free Engine)

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
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  useEffect(() => {
    if (customProgress !== undefined) {
      targetProgressRef.current = customProgress;
    }
  }, [customProgress]);

  // Parallel Loader
  useEffect(() => {
    let isCancelled = false;
    let completedCount = 0;
    const imgArray: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    imagesRef.current = imgArray;

    const loadAllImages = async () => {
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const paddedNumber = String(i).padStart(3, "0");
        const src = `${folderPath}/${paddedNumber}.png`;

        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          
          const handleCompletion = () => {
            if (isCancelled) return;
            completedCount++;
            setLoadPercent(Math.round((completedCount / frameCount) * 100));
            resolve();
          };

          img.onload = () => {
            imgArray[i - 1] = img;
            handleCompletion();
          };

          img.onerror = () => {
            handleCompletion();
          };

          img.src = src;
        });

        promises.push(promise);
      }

      await Promise.all(promises);

      if (!isCancelled) {
        setLoaded(true);
      }
    };

    loadAllImages();

    return () => {
      isCancelled = true;
    };
  }, [folderPath, frameCount]);

  // DOUBLE-BUFFERED FLICKER-FREE RENDER LOOP
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Create an offscreen buffer canvas to prevent any tearing/flickering
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = 1920;
    offscreenCanvas.height = 1080;
    const offscreenCtx = offscreenCanvas.getContext("2d", { alpha: false });
    if (!offscreenCtx) return;

    offscreenCtx.imageSmoothingEnabled = true;
    offscreenCtx.imageSmoothingQuality = "high";

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // Tightened interpolation curve for buttery motion without lag
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.15;

      const safeProgress = Math.max(0, currentProgressRef.current);
      const cycle = safeProgress % 2;
      const pingPongProgress = cycle > 1 ? 2 - cycle : cycle;

      let frameIndex = Math.floor(pingPongProgress * (frameCount - 1));
      frameIndex = Math.max(0, Math.min(frameCount - 1, frameIndex));

      if (frameIndex !== lastDrawnFrameRef.current) {
        const img = imagesRef.current[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          const scale = Math.max(
            offscreenCanvas.width / img.naturalWidth,
            offscreenCanvas.height / img.naturalHeight
          );
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = offscreenCanvas.width / 2 - drawWidth / 2;
          const y = offscreenCanvas.height / 2 - drawHeight / 2;

          // 1. Draw to hidden buffer first (Zero visual flicker)
          offscreenCtx.fillStyle = "#050507";
          offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          offscreenCtx.drawImage(img, x, y, drawWidth, drawHeight);

          // 2. Stamp finished buffer directly to main canvas in 1 atomic frame
          ctx.drawImage(offscreenCanvas, 0, 0);

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
      {!loaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-50 bg-[#0A0B0E]/95 backdrop-blur-md px-8 py-5 rounded-xl border border-[#262B36] shadow-2xl pointer-events-none">
          <div className="text-[#FFC700] font-mono text-xs tracking-widest uppercase animate-pulse">
            [ BUFFERING 3D SEQUENCE: {loadPercent}% ]
          </div>
          <div className="w-48 bg-[#14171D] h-1.5 rounded-full overflow-hidden border border-[#262B36]">
            <div
              className="bg-[#FFC700] h-full transition-all duration-75 shadow-[0_0_10px_rgba(255,199,0,1)]"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{
          filter:
            "contrast(1.15) saturate(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.08))",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        className={`w-full max-w-6xl object-contain mix-blend-screen transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}