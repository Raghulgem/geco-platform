// Lead Developer: Raghul
// Global RAM Asset Cache Manager (Non-Blocking Optimized)

const globalCache: Record<string, HTMLImageElement[]> = {};
const loadingPromises: Record<string, Promise<HTMLImageElement[]>> = {};

export function preloadSequence(folderPath: string, frameCount: number): Promise<HTMLImageElement[]> {
  if (globalCache[folderPath]) {
    return Promise.resolve(globalCache[folderPath]);
  }

  if (Object.prototype.hasOwnProperty.call(loadingPromises, folderPath)) {
    return loadingPromises[folderPath];
  }

  loadingPromises[folderPath] = new Promise((resolve) => {
    // Use requestIdleCallback or setTimeout so it NEVER blocks user interaction or page switching
    const startLoading = async () => {
      const imgArray: HTMLImageElement[] = new Array(frameCount).fill(null);
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const paddedNumber = String(i).padStart(3, "0");
        const src = `${folderPath}/${paddedNumber}.png`;

        promises.push(
          new Promise<void>((subResolve) => {
            const img = new Image();
            img.onload = () => {
              imgArray[i - 1] = img;
              subResolve();
            };
            img.onerror = () => subResolve();
            img.src = src;
          })
        );
      }

      await Promise.all(promises);
      globalCache[folderPath] = imgArray;
      resolve(imgArray);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => startLoading(), { timeout: 2000 });
    } else {
      setTimeout(startLoading, 300);
    }
  });

  return loadingPromises[folderPath];
}

export function getCachedSequence(folderPath: string): HTMLImageElement[] | undefined {
  return globalCache[folderPath];
}