import React from "react";
import Link from "next/link";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function ActionButton({
  children,
  variant = "primary",
  href,
  fullWidth = false,
  icon,
  className = "",
  ...props
}: ActionButtonProps) {
  // Base styling for the Dark Cyber-Industrial theme
  const baseStyles = "inline-flex items-center justify-center gap-2 uppercase text-xs font-bold tracking-widest py-3 px-6 rounded transition-all duration-300";
  
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  // Variant styling mappings
  const variants = {
    primary: "bg-[#FFC700] hover:bg-[#e6b300] text-black transform hover:scale-[1.02] shadow-[0_0_15px_rgba(255,199,0,0.15)] hover:shadow-[0_0_20px_rgba(255,199,0,0.3)] disabled:opacity-70 disabled:hover:scale-100",
    secondary: "bg-[#262B36] text-white border border-[#323846] hover:bg-[#14171D] hover:border-[#FFC700] hover:text-[#FFC700]",
    outline: "bg-transparent border border-[#FFC700] text-[#FFC700] hover:bg-[#FFC700] hover:text-black",
  };

  const combinedClasses = `${baseStyles} ${widthStyles} ${variants[variant]} ${className}`;

  // If an 'href' is provided, render a Next.js Link instead of a button
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="text-lg">{icon}</span>}
      </Link>
    );
  }

  // Otherwise, render a standard HTML button
  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && <span className="text-lg">{icon}</span>}
    </button>
  );
}