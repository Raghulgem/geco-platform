// Lead Developer: Raghul
// Global RAM Asset Cache Manager

const globalCache: Record<string, HTMLImageElement[]> = {};
const loadingPromises: Record<string, Promise<HTMLImageElement[]>> = {};

export function preloadSequence(folderPath: string, frameCount: number): Promise<HTMLImageElement[]> {
  if (globalCache[folderPath]) {
    return Promise.resolve(globalCache[folderPath]);
  }

  // Explicitly check if the promise entry exists in the dictionary object
  if (Object.prototype.hasOwnProperty.call(loadingPromises, folderPath)) {
    return loadingPromises[folderPath];
  }

  loadingPromises[folderPath] = new Promise(async (resolve) => {
    const imgArray: HTMLImageElement[] = new Array(frameCount).fill(null);
    const promises = [];

    for (let i = 1; i <= frameCount; i++) {
      const paddedNumber = String(i).padStart(3, "0");
      const src = `${folderPath}/${paddedNumber}.png`;

      const p = new Promise<void>((subResolve) => {
        const img = new Image();
        img.onload = () => {
          imgArray[i - 1] = img;
          subResolve();
        };
        img.onerror = () => {
          subResolve();
        };
        img.src = src;
      });

      promises.push(p);
    }

    await Promise.all(promises);
    globalCache[folderPath] = imgArray;
    resolve(imgArray);
  });

  return loadingPromises[folderPath];
}

export function getCachedSequence(folderPath: string): HTMLImageElement[] | undefined {
  return globalCache[folderPath];
}