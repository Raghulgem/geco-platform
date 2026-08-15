"use client";

import { useState, useEffect } from "react";

interface PreloaderResult {
  images: HTMLImageElement[];
  isLoaded: boolean;
  progress: number;
}

/**
 * Custom hook to pre-load an array of image URLs into browser memory.
 * Perfect for heavy 3D frame sequences to ensure buttery smooth scrolling.
 * 
 * @param imageUrls - Array of strings representing the image paths to load.
 * @returns Object containing the loaded Image elements, completion status, and progress percentage.
 */
export function useImagePreloader(imageUrls: string[]): PreloaderResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    
    // Create an array with the same length to preserve the exact frame order
    const loadedImages: HTMLImageElement[] = new Array(imageUrls.length);

    if (!imageUrls || imageUrls.length === 0) {
      setIsLoaded(true);
      return;
    }

    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;

      const handleLoad = () => {
        if (!isMounted) return;
        
        loadedCount++;
        loadedImages[index] = img; // Insert at correct index to maintain sequence
        setProgress(Math.round((loadedCount / imageUrls.length) * 100));

        // Once all images have fired the onload (or onerror) event
        if (loadedCount === imageUrls.length) {
          // Filter out any potential empty slots if an image completely failed
          setImages(loadedImages.filter(Boolean));
          setIsLoaded(true);
        }
      };

      // We treat errors as "loaded" so a single broken frame doesn't freeze the whole site
      img.onload = handleLoad;
      img.onerror = handleLoad; 
    });

    // Cleanup function to prevent memory leaks if the user navigates away mid-load
    return () => {
      isMounted = false;
    };
  }, [imageUrls]); // Re-run if the URL array changes

  return { images, isLoaded, progress };
}