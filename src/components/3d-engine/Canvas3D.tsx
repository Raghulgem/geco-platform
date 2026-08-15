"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Stage, 
  useGLTF, 
  Html 
} from "@react-three/drei";

/**
 * Props for the Canvas3D Component
 * @param modelPath - The path to the .glb file in the public folder (e.g., "/models/blow-bar.glb")
 * @param scale - Optional scaling factor if some models load too large/small
 */
interface Canvas3DProps {
  modelPath: string;
  scale?: number;
}

// 1. Component that actually loads the .glb geometry
function Model({ modelPath, scale = 1 }: Canvas3DProps) {
  // useGLTF automatically caches the model so it doesn't redownload on re-renders
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} />;
}

// 2. Custom Loader to show while the 3D file is downloading
function LoaderFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-[#FFC700] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[#9CA3AF] text-xs font-mono uppercase tracking-widest">Loading Asset</span>
      </div>
    </Html>
  );
}

// 3. The Main Canvas Wrapper
export default function Canvas3D({ modelPath, scale = 1 }: Canvas3DProps) {
  return (
    <div className="w-full h-full bg-[#0A0B0E] relative overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 45 }}>
        
        {/* LIGHTING - Dark Industrial Setup */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          color="#FFC700" /* Gives the metal a subtle yellow/gold rim light */
          castShadow 
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.5} 
          color="#262B36" /* Fill light to prevent pitch-black shadows */
        />

        <Suspense fallback={<LoaderFallback />}>
          {/* Stage automatically centers the model and creates contact shadows */}
          <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
            <Model modelPath={modelPath} scale={scale} />
          </Stage>
        </Suspense>

        {/* 
          CONTROLS 
          Allows the user to click, drag, rotate, and zoom the spare part.
          autoRotate gives it a premium showroom feel when the user isn't touching it.
        */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={2} 
          maxDistance={10} 
          autoRotate 
          autoRotateSpeed={1.5}
        />
      </Canvas>
      
      {/* Interactive Overlay Hint */}
      <div className="absolute bottom-2 right-2 pointer-events-none opacity-50">
        <span className="text-[#9CA3AF] text-[10px] uppercase tracking-widest font-mono">
          3D Interactive
        </span>
      </div>
    </div>
  );
}

// Pre-load the common models if needed
// useGLTF.preload('/models/blow-bar.glb');