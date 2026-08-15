import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes safely.
 * It combines `clsx` (for conditional classes) and `tailwind-merge` 
 * (to resolve any conflicting Tailwind utility classes).
 * 
 * Usage: cn("base-class", condition && "conditional-class")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to format numbers into standard Indian Rupee (INR) string formats.
 * Useful if you decide to calculate dynamic pricing later instead of hardcoding strings.
 * 
 * @param amount - The numerical value to format
 * @returns Formatted INR string (e.g., ₹ 12,60,000.00)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Utility to add a delay (sleep) in async functions.
 * Helpful for simulating loading states (like in the API routes).
 * 
 * @param ms - Milliseconds to delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}