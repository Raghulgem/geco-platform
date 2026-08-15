// Lead Developer: Raghul
// Location: src/app/layout.tsx

import type { Metadata } from "next";

// Force TypeScript to ignore the CSS module side-effect error
// @ts-ignore
import "@/app/globals.css"; 

// Correct imports pointing to your UI and navigation folder structure
import InitialLoader from "@/components/ui/initial-loader";
import ParticleBackground from "@/components/ui/particle-background";
import MainNav from "@/components/navigation/main-nav";

export const metadata: Metadata = {
  title: "Geco Grinding Centre",
  description: "Heavy Duty Crushing Machinery & Precision Spare Parts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0B0E] text-[#F3F4F6] min-h-screen relative selection:bg-[#FFC700] selection:text-black">
        
        {/* 🚀 INITIAL BOOT LOADER (Fires immediately on site launch) 🚀 */}
        <InitialLoader />
        
        {/* GLOBAL PARTICLE BACKGROUND (Renders behind all pages automatically) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticleBackground />
        </div>

        {/* MAIN PAGE CONTENT WRAPPER */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <MainNav />
          <main className="flex-grow">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}