// Lead Developer: Siva Shree
// Theme: Dark Cyber-Industrial
// Purpose: Global TypeScript declarations for custom asset types

// 1. 3D Model Asset Declarations
// Tells TypeScript that importing a .glb or .gltf file will resolve to a string (the URL path).
declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

// 2. Image Asset Declarations
// Next.js usually handles this automatically in `next-env.d.ts`, 
// but it is best practice to declare them if you are doing custom Canvas painting.
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// 3. Global Window Interfaces (Optional)
// If you ever need to attach a custom variable to the browser's window object 
// for debugging your 3D canvas, you would declare it here.
interface Window {
  __GECO_DEBUG_MODE__?: boolean;
}