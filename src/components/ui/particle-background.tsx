// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial (Global Ambient Sparks & Dust)
// Location: src/components/ui/particle-background.tsx

"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  // Only turn off on the full-screen 3D scroller viewer page
  const isProductSlugPage = pathname?.startsWith("/products/") && pathname.split("/").length > 2;

  useEffect(() => {
    if (isProductSlugPage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const particleCount = 80; 
    const colors = ["#FFC700", "#FFC700", "#ffdf6d", "#262B36"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2.8 + 1;
        this.speedX = Math.random() * 0.4 - 0.2; 
        this.speedY = Math.random() * -1.2 - 0.3; 
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.015 + 0.004;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.opacity += this.fadeSpeed;
        if (this.opacity >= 1 || this.opacity <= 0.15) {
          this.fadeSpeed = -this.fadeSpeed;
        }

        if (this.y < 0) {
          this.y = canvas!.height + 10;
          this.x = Math.random() * canvas!.width;
        }
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.color === "#FFC700" || this.color === "#ffdf6d") {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FFC700";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isProductSlugPage]);

  if (isProductSlugPage) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full block"
    />
  );
}