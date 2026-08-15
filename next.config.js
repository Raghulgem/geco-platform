/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Transpile Three.js packages to prevent SSR mismatch errors in Next.js App Router
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  images: {
    // Disable default optimization to prevent bandwidth limits and lag 
    // when loading 300-frame 3D sequence arrays into the canvas.
    unoptimized: true,
    
    // If you eventually host your machinery images on an AWS S3 bucket or CDN, 
    // you would whitelist the domains here.
    remotePatterns: [],
  },
  
  webpack: (config) => {
    // Allows you to import .glb and .gltf files directly into your components 
    // if you choose not to put them in the /public folder.
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      }
    });

    return config;
  },
};

module.exports = nextConfig;